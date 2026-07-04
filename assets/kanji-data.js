/* kanji-data.js — JLPT N5 core kanji (~90), built around READINGS.
   Each: k=kanji, mean=English, on=on'yomi[], kun=kun'yomi[],
   ex={w:word, r:reading(hiragana), m:meaning}.  cat=group.
   The reading `r` is what gets spoken aloud (guaranteed-correct sound). */
(function (global) {
  const K = [
    // ---- Numbers & money ----
    {k:'一',mean:'one',on:['イチ'],kun:['ひと'],ex:{w:'一つ',r:'ひとつ',m:'one thing'},cat:'Numbers'},
    {k:'二',mean:'two',on:['ニ'],kun:['ふた'],ex:{w:'二つ',r:'ふたつ',m:'two things'},cat:'Numbers'},
    {k:'三',mean:'three',on:['サン'],kun:['みっ'],ex:{w:'三つ',r:'みっつ',m:'three things'},cat:'Numbers'},
    {k:'四',mean:'four',on:['シ'],kun:['よん','よ'],ex:{w:'四つ',r:'よっつ',m:'four things'},cat:'Numbers'},
    {k:'五',mean:'five',on:['ゴ'],kun:['いつ'],ex:{w:'五つ',r:'いつつ',m:'five things'},cat:'Numbers'},
    {k:'六',mean:'six',on:['ロク'],kun:['むっ'],ex:{w:'六つ',r:'むっつ',m:'six things'},cat:'Numbers'},
    {k:'七',mean:'seven',on:['シチ'],kun:['なな'],ex:{w:'七つ',r:'ななつ',m:'seven things'},cat:'Numbers'},
    {k:'八',mean:'eight',on:['ハチ'],kun:['やっ'],ex:{w:'八つ',r:'やっつ',m:'eight things'},cat:'Numbers'},
    {k:'九',mean:'nine',on:['キュウ','ク'],kun:['ここの'],ex:{w:'九つ',r:'ここのつ',m:'nine things'},cat:'Numbers'},
    {k:'十',mean:'ten',on:['ジュウ'],kun:['とお'],ex:{w:'十',r:'じゅう',m:'ten'},cat:'Numbers'},
    {k:'百',mean:'hundred',on:['ヒャク'],kun:[],ex:{w:'百',r:'ひゃく',m:'hundred'},cat:'Numbers'},
    {k:'千',mean:'thousand',on:['セン'],kun:['ち'],ex:{w:'千',r:'せん',m:'thousand'},cat:'Numbers'},
    {k:'万',mean:'ten thousand',on:['マン','バン'],kun:[],ex:{w:'一万',r:'いちまん',m:'ten thousand'},cat:'Numbers'},
    {k:'円',mean:'yen / circle',on:['エン'],kun:['まる'],ex:{w:'円',r:'えん',m:'yen'},cat:'Numbers'},

    // ---- Days, time, elements ----
    {k:'日',mean:'sun / day',on:['ニチ','ジツ'],kun:['ひ','か'],ex:{w:'日曜日',r:'にちようび',m:'Sunday'},cat:'Days & Time'},
    {k:'月',mean:'moon / month',on:['ゲツ','ガツ'],kun:['つき'],ex:{w:'月曜日',r:'げつようび',m:'Monday'},cat:'Days & Time'},
    {k:'火',mean:'fire',on:['カ'],kun:['ひ'],ex:{w:'火曜日',r:'かようび',m:'Tuesday'},cat:'Days & Time'},
    {k:'水',mean:'water',on:['スイ'],kun:['みず'],ex:{w:'水',r:'みず',m:'water'},cat:'Days & Time'},
    {k:'木',mean:'tree / wood',on:['モク','ボク'],kun:['き'],ex:{w:'木',r:'き',m:'tree'},cat:'Days & Time'},
    {k:'金',mean:'gold / money',on:['キン','コン'],kun:['かね'],ex:{w:'お金',r:'おかね',m:'money'},cat:'Days & Time'},
    {k:'土',mean:'earth / soil',on:['ド','ト'],kun:['つち'],ex:{w:'土曜日',r:'どようび',m:'Saturday'},cat:'Days & Time'},
    {k:'年',mean:'year',on:['ネン'],kun:['とし'],ex:{w:'去年',r:'きょねん',m:'last year'},cat:'Days & Time'},
    {k:'時',mean:'time / hour',on:['ジ'],kun:['とき'],ex:{w:'時間',r:'じかん',m:'time'},cat:'Days & Time'},
    {k:'間',mean:'interval / space',on:['カン','ケン'],kun:['あいだ','ま'],ex:{w:'時間',r:'じかん',m:'time'},cat:'Days & Time'},
    {k:'分',mean:'minute / part',on:['ブン','フン'],kun:['わ'],ex:{w:'分かる',r:'わかる',m:'to understand'},cat:'Days & Time'},
    {k:'今',mean:'now',on:['コン','キン'],kun:['いま'],ex:{w:'今',r:'いま',m:'now'},cat:'Days & Time'},
    {k:'半',mean:'half',on:['ハン'],kun:[],ex:{w:'半分',r:'はんぶん',m:'half'},cat:'Days & Time'},
    {k:'毎',mean:'every',on:['マイ'],kun:[],ex:{w:'毎日',r:'まいにち',m:'every day'},cat:'Days & Time'},
    {k:'週',mean:'week',on:['シュウ'],kun:[],ex:{w:'毎週',r:'まいしゅう',m:'every week'},cat:'Days & Time'},
    {k:'午',mean:'noon',on:['ゴ'],kun:[],ex:{w:'午後',r:'ごご',m:'afternoon (p.m.)'},cat:'Days & Time'},

    // ---- Nature & position ----
    {k:'山',mean:'mountain',on:['サン'],kun:['やま'],ex:{w:'山',r:'やま',m:'mountain'},cat:'Nature & Place'},
    {k:'川',mean:'river',on:['セン'],kun:['かわ'],ex:{w:'川',r:'かわ',m:'river'},cat:'Nature & Place'},
    {k:'田',mean:'rice field',on:['デン'],kun:['た'],ex:{w:'田んぼ',r:'たんぼ',m:'rice paddy'},cat:'Nature & Place'},
    {k:'天',mean:'heaven / sky',on:['テン'],kun:['あま'],ex:{w:'天気',r:'てんき',m:'weather'},cat:'Nature & Place'},
    {k:'空',mean:'sky / empty',on:['クウ'],kun:['そら','あ'],ex:{w:'空',r:'そら',m:'sky'},cat:'Nature & Place'},
    {k:'雨',mean:'rain',on:['ウ'],kun:['あめ'],ex:{w:'雨',r:'あめ',m:'rain'},cat:'Nature & Place'},
    {k:'上',mean:'up / above',on:['ジョウ'],kun:['うえ','あ','のぼ'],ex:{w:'上',r:'うえ',m:'above / up'},cat:'Nature & Place'},
    {k:'下',mean:'down / below',on:['カ','ゲ'],kun:['した','さ','くだ'],ex:{w:'下',r:'した',m:'below / down'},cat:'Nature & Place'},
    {k:'中',mean:'middle / inside',on:['チュウ'],kun:['なか'],ex:{w:'中',r:'なか',m:'inside'},cat:'Nature & Place'},
    {k:'大',mean:'big',on:['ダイ','タイ'],kun:['おお'],ex:{w:'大きい',r:'おおきい',m:'big'},cat:'Nature & Place'},
    {k:'小',mean:'small',on:['ショウ'],kun:['ちい','こ'],ex:{w:'小さい',r:'ちいさい',m:'small'},cat:'Nature & Place'},
    {k:'左',mean:'left',on:['サ'],kun:['ひだり'],ex:{w:'左',r:'ひだり',m:'left'},cat:'Nature & Place'},
    {k:'右',mean:'right',on:['ウ','ユウ'],kun:['みぎ'],ex:{w:'右',r:'みぎ',m:'right'},cat:'Nature & Place'},
    {k:'前',mean:'before / front',on:['ゼン'],kun:['まえ'],ex:{w:'前',r:'まえ',m:'front / before'},cat:'Nature & Place'},
    {k:'後',mean:'after / behind',on:['ゴ','コウ'],kun:['あと','うし','のち'],ex:{w:'午後',r:'ごご',m:'afternoon'},cat:'Nature & Place'},
    {k:'東',mean:'east',on:['トウ'],kun:['ひがし'],ex:{w:'東京',r:'とうきょう',m:'Tokyo'},cat:'Nature & Place'},
    {k:'西',mean:'west',on:['セイ','サイ'],kun:['にし'],ex:{w:'西',r:'にし',m:'west'},cat:'Nature & Place'},
    {k:'南',mean:'south',on:['ナン'],kun:['みなみ'],ex:{w:'南',r:'みなみ',m:'south'},cat:'Nature & Place'},
    {k:'北',mean:'north',on:['ホク'],kun:['きた'],ex:{w:'北',r:'きた',m:'north'},cat:'Nature & Place'},
    {k:'国',mean:'country',on:['コク'],kun:['くに'],ex:{w:'国',r:'くに',m:'country'},cat:'Nature & Place'},

    // ---- Body ----
    {k:'口',mean:'mouth',on:['コウ','ク'],kun:['くち'],ex:{w:'口',r:'くち',m:'mouth'},cat:'Body'},
    {k:'目',mean:'eye',on:['モク'],kun:['め'],ex:{w:'目',r:'め',m:'eye'},cat:'Body'},
    {k:'耳',mean:'ear',on:['ジ'],kun:['みみ'],ex:{w:'耳',r:'みみ',m:'ear'},cat:'Body'},
    {k:'手',mean:'hand',on:['シュ'],kun:['て'],ex:{w:'手',r:'て',m:'hand'},cat:'Body'},
    {k:'足',mean:'foot / leg',on:['ソク'],kun:['あし'],ex:{w:'足',r:'あし',m:'foot / leg'},cat:'Body'},

    // ---- People & family ----
    {k:'人',mean:'person',on:['ジン','ニン'],kun:['ひと'],ex:{w:'人',r:'ひと',m:'person'},cat:'People'},
    {k:'名',mean:'name',on:['メイ','ミョウ'],kun:['な'],ex:{w:'名前',r:'なまえ',m:'name'},cat:'People'},
    {k:'父',mean:'father',on:['フ'],kun:['ちち','とう'],ex:{w:'お父さん',r:'おとうさん',m:'father'},cat:'People'},
    {k:'母',mean:'mother',on:['ボ'],kun:['はは','かあ'],ex:{w:'お母さん',r:'おかあさん',m:'mother'},cat:'People'},
    {k:'子',mean:'child',on:['シ','ス'],kun:['こ'],ex:{w:'子供',r:'こども',m:'child'},cat:'People'},
    {k:'女',mean:'woman',on:['ジョ','ニョ'],kun:['おんな','め'],ex:{w:'女',r:'おんな',m:'woman'},cat:'People'},
    {k:'男',mean:'man',on:['ダン','ナン'],kun:['おとこ'],ex:{w:'男',r:'おとこ',m:'man'},cat:'People'},
    {k:'友',mean:'friend',on:['ユウ'],kun:['とも'],ex:{w:'友達',r:'ともだち',m:'friend'},cat:'People'},

    // ---- School ----
    {k:'先',mean:'previous / ahead',on:['セン'],kun:['さき'],ex:{w:'先生',r:'せんせい',m:'teacher'},cat:'School'},
    {k:'生',mean:'life / birth',on:['セイ','ショウ'],kun:['い','う','なま'],ex:{w:'学生',r:'がくせい',m:'student'},cat:'School'},
    {k:'学',mean:'study / learning',on:['ガク'],kun:['まな'],ex:{w:'学校',r:'がっこう',m:'school'},cat:'School'},
    {k:'校',mean:'school',on:['コウ'],kun:[],ex:{w:'学校',r:'がっこう',m:'school'},cat:'School'},
    {k:'本',mean:'book / origin',on:['ホン'],kun:['もと'],ex:{w:'本',r:'ほん',m:'book'},cat:'School'},
    {k:'語',mean:'language / word',on:['ゴ'],kun:['かた'],ex:{w:'日本語',r:'にほんご',m:'Japanese language'},cat:'School'},
    {k:'何',mean:'what',on:['カ'],kun:['なに','なん'],ex:{w:'何',r:'なに',m:'what'},cat:'School'},

    // ---- Verbs ----
    {k:'行',mean:'go',on:['コウ','ギョウ'],kun:['い','おこな'],ex:{w:'行く',r:'いく',m:'to go'},cat:'Verbs'},
    {k:'来',mean:'come',on:['ライ'],kun:['く','き','こ'],ex:{w:'来る',r:'くる',m:'to come'},cat:'Verbs'},
    {k:'帰',mean:'return home',on:['キ'],kun:['かえ'],ex:{w:'帰る',r:'かえる',m:'to return home'},cat:'Verbs'},
    {k:'食',mean:'eat / food',on:['ショク'],kun:['た','く'],ex:{w:'食べる',r:'たべる',m:'to eat'},cat:'Verbs'},
    {k:'飲',mean:'drink',on:['イン'],kun:['の'],ex:{w:'飲む',r:'のむ',m:'to drink'},cat:'Verbs'},
    {k:'見',mean:'see / look',on:['ケン'],kun:['み'],ex:{w:'見る',r:'みる',m:'to see / watch'},cat:'Verbs'},
    {k:'聞',mean:'hear / ask',on:['ブン','モン'],kun:['き'],ex:{w:'聞く',r:'きく',m:'to listen / ask'},cat:'Verbs'},
    {k:'言',mean:'say',on:['ゲン','ゴン'],kun:['い','こと'],ex:{w:'言う',r:'いう',m:'to say'},cat:'Verbs'},
    {k:'話',mean:'speak / story',on:['ワ'],kun:['はな','はなし'],ex:{w:'話す',r:'はなす',m:'to speak'},cat:'Verbs'},
    {k:'読',mean:'read',on:['ドク'],kun:['よ'],ex:{w:'読む',r:'よむ',m:'to read'},cat:'Verbs'},
    {k:'書',mean:'write',on:['ショ'],kun:['か'],ex:{w:'書く',r:'かく',m:'to write'},cat:'Verbs'},
    {k:'立',mean:'stand',on:['リツ'],kun:['た'],ex:{w:'立つ',r:'たつ',m:'to stand'},cat:'Verbs'},
    {k:'出',mean:'exit / leave',on:['シュツ'],kun:['で','だ'],ex:{w:'出る',r:'でる',m:'to exit / leave'},cat:'Verbs'},
    {k:'入',mean:'enter',on:['ニュウ'],kun:['はい','い'],ex:{w:'入る',r:'はいる',m:'to enter'},cat:'Verbs'},
    {k:'休',mean:'rest',on:['キュウ'],kun:['やす'],ex:{w:'休む',r:'やすむ',m:'to rest'},cat:'Verbs'},
    {k:'買',mean:'buy',on:['バイ'],kun:['か'],ex:{w:'買う',r:'かう',m:'to buy'},cat:'Verbs'},

    // ---- Descriptors & misc ----
    {k:'高',mean:'tall / expensive',on:['コウ'],kun:['たか'],ex:{w:'高い',r:'たかい',m:'expensive / tall'},cat:'Descriptors'},
    {k:'安',mean:'cheap / calm',on:['アン'],kun:['やす'],ex:{w:'安い',r:'やすい',m:'cheap'},cat:'Descriptors'},
    {k:'新',mean:'new',on:['シン'],kun:['あたら','あら'],ex:{w:'新しい',r:'あたらしい',m:'new'},cat:'Descriptors'},
    {k:'古',mean:'old',on:['コ'],kun:['ふる'],ex:{w:'古い',r:'ふるい',m:'old'},cat:'Descriptors'},
    {k:'長',mean:'long / chief',on:['チョウ'],kun:['なが'],ex:{w:'長い',r:'ながい',m:'long'},cat:'Descriptors'},
    {k:'白',mean:'white',on:['ハク','ビャク'],kun:['しろ'],ex:{w:'白い',r:'しろい',m:'white'},cat:'Descriptors'},
    {k:'車',mean:'car / vehicle',on:['シャ'],kun:['くるま'],ex:{w:'車',r:'くるま',m:'car'},cat:'Descriptors'},
    {k:'電',mean:'electricity',on:['デン'],kun:[],ex:{w:'電車',r:'でんしゃ',m:'train'},cat:'Descriptors'},
    {k:'気',mean:'spirit / energy',on:['キ','ケ'],kun:[],ex:{w:'元気',r:'げんき',m:'healthy / energetic'},cat:'Descriptors'},
    {k:'駅',mean:'station',on:['エキ'],kun:[],ex:{w:'駅',r:'えき',m:'(train) station'},cat:'Descriptors'},
    {k:'店',mean:'shop',on:['テン'],kun:['みせ'],ex:{w:'お店',r:'おみせ',m:'shop / store'},cat:'Descriptors'}
  ];

  const CATS = ['Numbers','Days & Time','Nature & Place','Body','People','School','Verbs','Descriptors'];
  global.KANJI = { list: K, cats: CATS };
})(window);
