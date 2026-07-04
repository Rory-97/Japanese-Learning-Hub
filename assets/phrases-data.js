/* phrases-data.js — high-frequency spoken phrases for the speaking page.
   jp = what's spoken aloud, romaji = pronunciation aid, en = meaning. */
(function (global) {
  const PHRASES = [
    { cat:'Greetings', items:[
      {jp:'おはようございます', romaji:'ohayō gozaimasu', en:'Good morning (polite)'},
      {jp:'こんにちは', romaji:'konnichiwa', en:'Hello / good afternoon'},
      {jp:'こんばんは', romaji:'konbanwa', en:'Good evening'},
      {jp:'おやすみなさい', romaji:'oyasuminasai', en:'Good night'},
      {jp:'さようなら', romaji:'sayōnara', en:'Goodbye'},
      {jp:'またね', romaji:'mata ne', en:'See you (casual)'},
      {jp:'はじめまして', romaji:'hajimemashite', en:'Nice to meet you'},
      {jp:'おひさしぶりです', romaji:'o-hisashiburi desu', en:"It's been a while"}
    ]},
    { cat:'Courtesy', items:[
      {jp:'ありがとうございます', romaji:'arigatō gozaimasu', en:'Thank you (polite)'},
      {jp:'どういたしまして', romaji:'dō itashimashite', en:"You're welcome"},
      {jp:'すみません', romaji:'sumimasen', en:'Excuse me / sorry'},
      {jp:'ごめんなさい', romaji:'gomen nasai', en:"I'm sorry"},
      {jp:'おねがいします', romaji:'onegai shimasu', en:'Please (I ask of you)'},
      {jp:'だいじょうぶです', romaji:'daijōbu desu', en:"It's fine / I'm okay"},
      {jp:'しつれいします', romaji:'shitsurei shimasu', en:'Excuse me (entering/leaving)'}
    ]},
    { cat:'Getting by in conversation', items:[
      {jp:'はい', romaji:'hai', en:'Yes'},
      {jp:'いいえ', romaji:'iie', en:'No'},
      {jp:'わかりました', romaji:'wakarimashita', en:'I understand / got it'},
      {jp:'わかりません', romaji:'wakarimasen', en:"I don't understand"},
      {jp:'もういちど おねがいします', romaji:'mō ichido onegai shimasu', en:'Once more, please'},
      {jp:'ゆっくり おねがいします', romaji:'yukkuri onegai shimasu', en:'Slowly, please'},
      {jp:'えいごが はなせますか', romaji:'eigo ga hanasemasu ka', en:'Do you speak English?'},
      {jp:'これは にほんごで なんですか', romaji:'kore wa nihongo de nan desu ka', en:'What is this in Japanese?'}
    ]},
    { cat:'Introducing yourself', items:[
      {jp:'わたしは ロリーです', romaji:'watashi wa Rory desu', en:'I am Rory'},
      {jp:'アメリカから きました', romaji:'amerika kara kimashita', en:'I came from America'},
      {jp:'にほんごを べんきょうしています', romaji:'nihongo o benkyō shite imasu', en:"I'm studying Japanese"},
      {jp:'よろしく おねがいします', romaji:'yoroshiku onegai shimasu', en:'Pleased to meet you / treat me well'}
    ]},
    { cat:'Out & about', items:[
      {jp:'これを ください', romaji:'kore o kudasai', en:'This one, please'},
      {jp:'いくらですか', romaji:'ikura desu ka', en:'How much is it?'},
      {jp:'えきは どこですか', romaji:'eki wa doko desu ka', en:'Where is the station?'},
      {jp:'メニューを おねがいします', romaji:'menyū o onegai shimasu', en:'Menu, please'},
      {jp:'おいしいです', romaji:'oishii desu', en:"It's delicious"},
      {jp:'おかいけい おねがいします', romaji:'o-kaikei onegai shimasu', en:'The check, please'},
      {jp:'トイレは どこですか', romaji:'toire wa doko desu ka', en:'Where is the bathroom?'},
      {jp:'たすけて ください', romaji:'tasukete kudasai', en:'Please help me'}
    ]}
  ];
  global.PHRASES = PHRASES;
})(window);
