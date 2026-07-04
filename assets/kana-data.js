/* kana-data.js — hiragana & katakana, organized for charts + drills */
(function (global) {
  // base gojūon (5 columns: a i u e o). null = no kana in that slot.
  const HIRA_BASE = [
    ['あ','い','う','え','お'],
    ['か','き','く','け','こ'],
    ['さ','し','す','せ','そ'],
    ['た','ち','つ','て','と'],
    ['な','に','ぬ','ね','の'],
    ['は','ひ','ふ','へ','ほ'],
    ['ま','み','む','め','も'],
    ['や',null,'ゆ',null,'よ'],
    ['ら','り','る','れ','ろ'],
    ['わ',null,null,null,'を'],
    ['ん',null,null,null,null]
  ];
  const KATA_BASE = [
    ['ア','イ','ウ','エ','オ'],
    ['カ','キ','ク','ケ','コ'],
    ['サ','シ','ス','セ','ソ'],
    ['タ','チ','ツ','テ','ト'],
    ['ナ','ニ','ヌ','ネ','ノ'],
    ['ハ','ヒ','フ','ヘ','ホ'],
    ['マ','ミ','ム','メ','モ'],
    ['ヤ',null,'ユ',null,'ヨ'],
    ['ラ','リ','ル','レ','ロ'],
    ['ワ',null,null,null,'ヲ'],
    ['ン',null,null,null,null]
  ];
  // romaji aligned to the base grids above
  const ROMAJI_BASE = [
    ['a','i','u','e','o'],
    ['ka','ki','ku','ke','ko'],
    ['sa','shi','su','se','so'],
    ['ta','chi','tsu','te','to'],
    ['na','ni','nu','ne','no'],
    ['ha','hi','fu','he','ho'],
    ['ma','mi','mu','me','mo'],
    ['ya',null,'yu',null,'yo'],
    ['ra','ri','ru','re','ro'],
    ['wa',null,null,null,'wo'],
    ['n',null,null,null,null]
  ];

  // dakuten / handakuten
  const HIRA_DAKU = [
    ['が','ぎ','ぐ','げ','ご'],
    ['ざ','じ','ず','ぜ','ぞ'],
    ['だ','ぢ','づ','で','ど'],
    ['ば','び','ぶ','べ','ぼ'],
    ['ぱ','ぴ','ぷ','ぺ','ぽ']
  ];
  const KATA_DAKU = [
    ['ガ','ギ','グ','ゲ','ゴ'],
    ['ザ','ジ','ズ','ゼ','ゾ'],
    ['ダ','ヂ','ヅ','デ','ド'],
    ['バ','ビ','ブ','ベ','ボ'],
    ['パ','ピ','プ','ペ','ポ']
  ];
  const ROMAJI_DAKU = [
    ['ga','gi','gu','ge','go'],
    ['za','ji','zu','ze','zo'],
    ['da','ji','zu','de','do'],
    ['ba','bi','bu','be','bo'],
    ['pa','pi','pu','pe','po']
  ];

  // combos (yōon)
  const HIRA_COMBO = [
    ['きゃ','きゅ','きょ'],['しゃ','しゅ','しょ'],['ちゃ','ちゅ','ちょ'],
    ['にゃ','にゅ','にょ'],['ひゃ','ひゅ','ひょ'],['みゃ','みゅ','みょ'],
    ['りゃ','りゅ','りょ'],['ぎゃ','ぎゅ','ぎょ'],['じゃ','じゅ','じょ'],
    ['びゃ','びゅ','びょ'],['ぴゃ','ぴゅ','ぴょ']
  ];
  const KATA_COMBO = [
    ['キャ','キュ','キョ'],['シャ','シュ','ショ'],['チャ','チュ','チョ'],
    ['ニャ','ニュ','ニョ'],['ヒャ','ヒュ','ヒョ'],['ミャ','ミュ','ミョ'],
    ['リャ','リュ','リョ'],['ギャ','ギュ','ギョ'],['ジャ','ジュ','ジョ'],
    ['ビャ','ビュ','ビョ'],['ピャ','ピュ','ピョ']
  ];
  const ROMAJI_COMBO = [
    ['kya','kyu','kyo'],['sha','shu','sho'],['cha','chu','cho'],
    ['nya','nyu','nyo'],['hya','hyu','hyo'],['mya','myu','myo'],
    ['rya','ryu','ryo'],['gya','gyu','gyo'],['ja','ju','jo'],
    ['bya','byu','byo'],['pya','pyu','pyo']
  ];

  // flat list of {kana, romaji} for drilling (both scripts, base set)
  function flat(grid, romaji) {
    const out = [];
    grid.forEach((row, r) => row.forEach((k, c) => {
      if (k && romaji[r] && romaji[r][c]) out.push({ kana: k, romaji: romaji[r][c] });
    }));
    return out;
  }
  const DRILL = {
    hiragana: flat(HIRA_BASE, ROMAJI_BASE),
    katakana: flat(KATA_BASE, ROMAJI_BASE),
    hiraDaku: flat(HIRA_DAKU, ROMAJI_DAKU),
    kataDaku: flat(KATA_DAKU, ROMAJI_DAKU)
  };

  global.KANA = {
    hira: { base: HIRA_BASE, daku: HIRA_DAKU, combo: HIRA_COMBO },
    kata: { base: KATA_BASE, daku: KATA_DAKU, combo: KATA_COMBO },
    romaji: { base: ROMAJI_BASE, daku: ROMAJI_DAKU, combo: ROMAJI_COMBO },
    drill: DRILL
  };
})(window);
