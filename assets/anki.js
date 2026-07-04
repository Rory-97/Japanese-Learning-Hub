/* ============================================================
   anki.js — connect the hub to your real Anki deck.

   Two paths, auto-detected:
   • LIVE (desktop): talks to AnkiConnect at 127.0.0.1:8765 while
     Anki is open. Reads your cards, classifies each as "known"
     (mature, interval ≥ 21d) or "learning", and pulls the
     word / reading / meaning from the note fields.
   • IMPORTED: import a portable profile .json OR a plain Anki
     note export (.txt/.csv). Stored in this browser's localStorage.

   Everything downstream (quizzes, kanji page, home stats) reads
   from one normalized profile, so it doesn't care which path fed it.
   ============================================================ */
(function (global) {
  const KEY = 'jhub.anki.v1';
  const ENDPOINT = 'http://127.0.0.1:8765';
  const listeners = [];
  let cache = null;

  const KANJI_RE = /[一-鿿㐀-䶿]/;
  const JP_RE = /[぀-ヿ㐀-鿿ｦ-ﾟ]/;
  const KANA_ONLY_RE = /^[ぁ-んァ-ヶーゝゞヽヾ・\s]+$/;

  // ---------- helpers ----------
  const stripHTML = s => String(s == null ? '' : s).replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const stripFurigana = s => s.replace(/([一-鿿])\[[^\]]*\]/g, '$1').replace(/\s*\[[^\]]*\]/g, ''); // 漢字[かんじ] -> 漢字
  const isKana = s => s && KANA_ONLY_RE.test(s);
  const hasLatin = s => /[A-Za-z]/.test(s);

  // An English field is a *sentence translation* (not a word gloss) if it
  // reads like prose: starts capitalized, ends with sentence punctuation,
  // and has at least 4 words. "to be settled (e.g. a dispute)" -> gloss;
  // "This is the oldest building in Japan." -> sentence.
  const isSentence = v => /^["'“‘]?[A-Z]/.test(v) && /[.!?…"'”’]$/.test(v) && v.split(/\s+/).length >= 4;

  // From an Anki note's fields, guess {w, r, m, st}
  function fieldsToEntry(fieldValues) {
    const vals = fieldValues.map(v => stripFurigana(stripHTML(v))).filter(Boolean);
    const jp = vals.filter(v => JP_RE.test(v));
    if (!jp.length) return null;
    // word = shortest Japanese field (sentences are long, the target word is short)
    let w = jp.slice().sort((a, b) => a.length - b.length)[0];
    // reading = a pure-kana field that isn't the word itself
    let r = jp.find(v => v !== w && isKana(v)) || (isKana(w) ? w : '');
    // split English fields into short word glosses vs full sentence translations
    const latin = vals.filter(hasLatin);
    const glosses = latin.filter(v => !isSentence(v)).sort((a, b) => a.length - b.length);
    const sents = latin.filter(isSentence).sort((a, b) => b.length - a.length);
    let g = glosses[0] || '';
    if (g.length > 80) g = g.slice(0, 78) + '…';
    let st = sents[0] || '';
    if (st.length > 140) st = st.slice(0, 138) + '…';
    // Japanese example sentence = a Japanese field that contains the word.
    // Prefer fields with sentence punctuation, then fields with kanji (this
    // skips furigana/reading versions of the same sentence).
    let cand = jp.filter(v => v !== w && v.indexOf(w) >= 0 && v.length > w.length + 1);
    const punct = cand.filter(v => /[。！？!?]/.test(v));
    if (punct.length) cand = punct;
    else { const kk = cand.filter(v => KANJI_RE.test(v)); if (kk.length) cand = kk; }
    let s = cand.sort((a, b) => a.length - b.length)[0] || '';
    if (s.length > 120) s = s.slice(0, 118) + '…';
    // meaning = the word gloss when the note has one; sentence only as fallback
    let m = g || st;
    if (m.length > 90) m = m.slice(0, 88) + '…';
    const e = { w, r, m };
    if (g && st) e.st = st; // keep the sentence too, so pages can show it with the word highlighted
    if (s) e.s = s;
    return e;
  }

  // ---------- sentence highlighting ----------
  const HL_STOP = new Set(['the','a','an','to','of','and','or','in','on','at','for','with','be','is','are','was','it','its','one','not','very','who','that','this','something','someone','thing','person','etc']);
  const escapeHTML = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Returns HTML: the sentence with words matching the gloss wrapped in <mark class="hl">.
  // Prefix matching catches inflections: gloss "build(ing)" hits "building", "sharp" hits "sharp", "old" hits "oldest".
  function markSentence(sentence, gloss) {
    const keys = (String(gloss || '').toLowerCase().match(/[a-z']+/g) || []).filter(t => t.length >= 3 && !HL_STOP.has(t));
    if (!keys.length) return escapeHTML(sentence);
    // split into word / non-word pieces and escape each piece separately,
    // so <mark> tags never land inside an HTML entity
    return String(sentence == null ? '' : sentence).split(/([A-Za-z']+)/).map((piece, i) => {
      const esc = escapeHTML(piece);
      if (i % 2 === 0 || !piece) return esc; // non-word piece
      const lw = piece.toLowerCase();
      const hit = keys.some(k => lw === k || lw.startsWith(k) || (k.startsWith(lw) && lw.length >= 4));
      return hit ? '<mark class="hl">' + esc + '</mark>' : esc;
    }).join('');
  }

  // Returns HTML: the (Japanese) sentence with every occurrence of the target word marked.
  function markWord(sentence, word) {
    const esc = escapeHTML(sentence);
    if (!word) return esc;
    const ew = escapeHTML(word);
    return esc.split(ew).join('<mark class="hl">' + ew + '</mark>');
  }

  function buildProfile(entries, source) {
    const seen = new Set(), words = [];
    entries.forEach(e => {
      if (!e || !e.w || seen.has(e.w)) return;
      seen.add(e.w); words.push(e);
    });
    const kanjiAll = new Set(), kanjiKnown = new Set();
    let known = 0, learning = 0;
    words.forEach(e => {
      const isKnown = e.status === 'known';
      if (isKnown) known++; else learning++;
      for (const ch of e.w) if (KANJI_RE.test(ch)) { kanjiAll.add(ch); if (isKnown) kanjiKnown.add(ch); }
    });
    return {
      source, words,
      count: words.length, knownCount: known, learningCount: learning,
      kanjiArr: [...kanjiAll], kanjiKnownArr: [...kanjiKnown],
      kanjiCount: kanjiAll.size,
      updatedAt: new Date().toISOString()
    };
  }

  function persist(profile) {
    try { localStorage.setItem(KEY, JSON.stringify(profile)); } catch (e) {}
    cache = null; const d = read();
    listeners.forEach(fn => { try { fn(d); } catch (e) {} });
    return d;
  }

  function read() {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(KEY); if (!raw) return null;
      const o = JSON.parse(raw);
      o.kanji = new Set(o.kanjiArr || []);
      o.kanjiKnown = new Set(o.kanjiKnownArr || []);
      o.wordSet = new Set((o.words || []).map(w => w.w));
      cache = o; return o;
    } catch (e) { return null; }
  }

  // ---------- LIVE: AnkiConnect ----------
  function invoke(action, params) {
    // NOTE: deliberately NO custom headers. Setting Content-Type:application/json
    // turns this into a "preflighted" CORS request (an OPTIONS call) which many
    // browsers block for file:// pages talking to localhost. Omitting headers
    // makes it a "simple request" that AnkiConnect accepts and that sails past
    // the preflight problem.
    return fetch(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ action, version: 6, params: params || {} })
    }).then(r => r.json()).then(j => {
      if (j.error) throw new Error(j.error);
      return j.result;
    });
  }

  // Returns 'granted' | 'denied' | 'unreachable'
  function available() {
    return invoke('requestPermission')
      .then(res => (res && res.permission === 'granted') ? 'granted' : 'denied')
      .catch(() => 'unreachable');
  }

  async function syncLive(deckQuery) {
    let state;
    try { state = await available(); } catch (e) { state = 'unreachable'; }
    if (state === 'unreachable') return { ok: false, error: "Couldn't reach AnkiConnect.\n\nChecklist:\n1) The Anki desktop app is OPEN right now.\n2) AnkiConnect add-on is installed (Tools → Add-ons; code 2055492159) and Anki was restarted.\n3) If you opened this hub by double-clicking the file, add \"null\" to webCorsOriginList in the AnkiConnect config (Tools → Add-ons → AnkiConnect → Config), then restart Anki. The Setup page has the exact snippet.\n4) Make sure no other Anki window/dialog is blocking it." };
    if (state === 'denied') return { ok: false, error: "AnkiConnect refused the connection. Bring the Anki window to the front — it should show a popup asking to allow this page; click Yes. If none appears, add this page's origin to webCorsOriginList in the AnkiConnect config (use \"null\" for file:// ), then restart Anki." };
    try {
      const query = (deckQuery && deckQuery.trim()) ? deckQuery.trim() : 'deck:*';
      const ids = await invoke('findCards', { query });
      if (!ids.length) return { ok: false, error: 'Anki is connected, but no cards matched "' + query + '".' };
      const info = await invoke('cardsInfo', { cards: ids.slice(0, 8000) });
      const entries = info.map(c => {
        const fieldVals = Object.values(c.fields || {}).sort((a, b) => a.order - b.order).map(f => f.value);
        const e = fieldsToEntry(fieldVals);
        if (!e) return null;
        // type 2 = review card; mature if interval >= 21 days
        e.status = (c.type === 2 && c.interval >= 21) ? 'known' : 'learning';
        return e;
      }).filter(Boolean);
      if (!entries.length) return { ok: false, error: 'Connected, but no Japanese could be read from those cards’ fields.' };
      const profile = buildProfile(entries, 'live');
      if (deckQuery) profile.deckQuery = deckQuery;
      return { ok: true, data: persist(profile) };
    } catch (e) {
      return { ok: false, error: 'Anki error: ' + e.message };
    }
  }

  // ---------- IMPORT: profile JSON or Anki text export ----------
  function importText(text) {
    const t = text.trim();
    // (a) portable profile JSON
    if (t[0] === '{' || t[0] === '[') {
      try {
        const o = JSON.parse(t);
        const words = Array.isArray(o) ? o : (o.words || []);
        const entries = words.map(w => { const e = { w: w.w || w.word || '', r: w.r || w.reading || '', m: w.m || w.meaning || '', status: w.status || 'learning' }; if (w.st) e.st = w.st; if (w.s) e.s = w.s; return e; }).filter(e => e.w);
        if (entries.length) return { ok: true, data: persist(buildProfile(entries, 'imported')) };
      } catch (e) { /* fall through */ }
    }
    // (b) Anki "Notes in Plain Text" export — tab or comma separated, '#' comments
    const lines = t.split(/\r?\n/).filter(l => l && l[0] !== '#');
    const entries = [];
    lines.forEach(line => {
      const cells = line.indexOf('\t') >= 0 ? line.split('\t') : line.split(',');
      const e = fieldsToEntry(cells);
      if (e) { e.status = 'learning'; entries.push(e); }
    });
    if (entries.length) return { ok: true, data: persist(buildProfile(entries, 'imported')) };
    return { ok: false, error: 'No Japanese vocabulary found in that file.' };
  }

  function importFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(importText(String(reader.result || '')));
      reader.onerror = () => resolve({ ok: false, error: 'Could not read that file.' });
      reader.readAsText(file);
    });
  }

  // ---------- EXPORT portable profile (for mobile) ----------
  function exportProfile() {
    const d = read();
    if (!d) { alert('Nothing to export yet — sync or import first.'); return; }
    const payload = { words: d.words, exportedAt: new Date().toISOString(), source: d.source };
    const blob = new Blob([JSON.stringify(payload, null, 0)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'anki-profile.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  // ---------- public getters ----------
  function get() { return read(); }
  function connected() { return !!read(); }
  function source() { const d = read(); return d ? d.source : null; }
  function knowsKanji(ch) { const d = read(); return d ? d.kanji.has(ch) : false; }
  function maturedKanji(ch) { const d = read(); return d ? d.kanjiKnown.has(ch) : false; }
  function knowsWord(w) { const d = read(); return d ? d.wordSet.has(w) : false; }
  function words() { const d = read(); return d ? d.words : []; }
  function learningWords() { return words().filter(w => w.status !== 'known'); }
  function knownWords() { return words().filter(w => w.status === 'known'); }
  function clear() { try { localStorage.removeItem(KEY); } catch (e) {} cache = null; listeners.forEach(fn => { try { fn(null); } catch (e) {} }); }
  function onChange(fn) { listeners.push(fn); }

  // ---------- shared nav pill ----------
  function initPill(container) {
    if (!container) return;
    const pill = document.createElement('button');
    pill.className = 'mig-pill'; pill.type = 'button';
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json,.csv,.txt'; input.style.display = 'none';

    function render() {
      const d = read();
      if (d) {
        pill.classList.add('on');
        const tag = d.source === 'live' ? 'live' : 'imported';
        pill.innerHTML = '<span class="dot"></span>Anki · ' + d.count + ' · ' + tag;
        pill.title = d.knownCount + ' known · ' + d.learningCount + ' learning · ' + d.kanjiCount + ' kanji.\nClick = re-sync/import · Shift-click = disconnect.';
      } else {
        pill.classList.remove('on');
        pill.innerHTML = '<span class="dot"></span>Connect Anki';
        pill.title = 'Click to sync with Anki (desktop) or import a profile/Anki export.';
      }
    }
    pill.addEventListener('click', async e => {
      const d = read();
      if (d && e.shiftKey) { if (confirm('Disconnect Anki data from this device?')) clear(); return; }
      // try live first; if it fails, offer file import
      pill.innerHTML = '<span class="dot"></span>Syncing…';
      const res = await syncLive(d && d.deckQuery);
      if (res.ok) { render(); return; }
      render();
      if (confirm(res.error + '\n\nImport a profile / Anki export file instead?')) input.click();
    });
    input.addEventListener('change', async () => {
      if (!input.files || !input.files[0]) return;
      const res = await importFile(input.files[0]);
      if (!res.ok) alert(res.error);
      input.value = '';
    });
    onChange(render); render();
    container.appendChild(pill); container.appendChild(input);
  }

  global.AnkiData = {
    syncLive, importFile, importText, exportProfile, available,
    get, connected, source, knowsKanji, maturedKanji, knowsWord,
    words, learningWords, knownWords, clear, onChange, initPill,
    markSentence, markWord
  };
})(window);
