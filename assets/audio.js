/* ============================================================
   audio.js — speak Japanese text via the browser, free, no API.
   Usage:  JPAudio.speak('みず');   or attach to a button:
           JPAudio.button('水', el)   // toggles a .playing pulse
   ============================================================ */
(function (global) {
  let jpVoice = null;
  let voicesReady = false;

  function pickVoice() {
    const voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    if (!voices.length) return null;
    // Prefer an explicitly Japanese voice; fall back to anything with 'ja'.
    jpVoice =
      voices.find(v => /ja[-_]JP/i.test(v.lang)) ||
      voices.find(v => /^ja/i.test(v.lang)) ||
      voices.find(v => /japanese/i.test(v.name)) ||
      null;
    voicesReady = true;
    return jpVoice;
  }

  if (window.speechSynthesis) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  function supported() {
    return !!window.speechSynthesis;
  }
  function hasJP() {
    if (!voicesReady) pickVoice();
    return !!jpVoice;
  }

  function speak(text, opts) {
    if (!window.speechSynthesis || !text) return false;
    opts = opts || {};
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (!jpVoice) pickVoice();
      if (jpVoice) u.voice = jpVoice;
      u.lang = 'ja-JP';
      u.rate = opts.rate || 0.9;
      u.pitch = opts.pitch || 1;
      if (opts.onend) u.onend = opts.onend;
      speechSynthesis.speak(u);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Wire a button element: pulses while speaking.
  function button(text, el, opts) {
    if (!el) return;
    el.classList.add('playing');
    const done = () => el.classList.remove('playing');
    const ok = speak(text, Object.assign({}, opts, { onend: done }));
    if (!ok) done();
    // safety: remove pulse even if onend never fires
    setTimeout(done, 4000);
  }

  // Build a ready-to-use speaker button element.
  function makeBtn(text, cls) {
    const b = document.createElement('button');
    b.className = 'spk' + (cls ? ' ' + cls : '');
    b.type = 'button';
    b.setAttribute('aria-label', 'Hear pronunciation');
    b.textContent = '🔊';
    b.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      button(text, b);
    });
    return b;
  }

  // Wire every .say element in `root` so clicking speaks it.
  // Speaks data-jp if present, otherwise the element's text.
  function wire(root) {
    (root || document).querySelectorAll('.say').forEach(el => {
      if (el.dataset.wired) return;
      el.dataset.wired = '1';
      el.setAttribute('title', 'Click to hear');
      el.addEventListener('click', () => {
        const text = el.dataset.jp || el.textContent;
        button(text, el);
      });
    });
  }

  global.JPAudio = { speak, button, makeBtn, wire, supported, hasJP };
})(window);
