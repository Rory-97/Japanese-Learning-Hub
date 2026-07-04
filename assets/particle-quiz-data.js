/* particle-quiz-data.js — fill-in-the-blank particle questions.
   ＿ marks the gap; full = completed sentence (spoken aloud). */
(function (global) {
  const Q = [
    {jp:'私＿学生です。', full:'私は学生です。', answer:'は', options:['は','が','を','に'], en:'As for me, I am a student.', why:'は marks the topic — "as for me."'},
    {jp:'パン＿食べる。', full:'パンを食べる。', answer:'を', options:['を','が','に','で'], en:'I eat bread.', why:'を marks the direct object — the thing the verb acts on.'},
    {jp:'誰＿来た？', full:'誰が来た？', answer:'が', options:['が','は','を','も'], en:'Who came?', why:'Question words like 誰 always take が.'},
    {jp:'東京＿行く。', full:'東京へ行く。', answer:'へ', options:['へ','を','が','の'], en:'I head toward Tokyo.', why:'へ marks direction — "toward."'},
    {jp:'7時＿東京＿着く。', full:'7時に東京に着く。', answer:'に', options:['に','で','を','へ'], en:'I arrive in Tokyo at 7.', why:'に marks a point in time and a destination/arrival point.'},
    {jp:'図書館＿勉強する。', full:'図書館で勉強する。', answer:'で', options:['で','に','を','へ'], en:'I study at the library.', why:'で marks where an action happens.'},
    {jp:'公園＿いる。', full:'公園にいる。', answer:'に', options:['に','で','を','へ'], en:'I am at the park.', why:'For simple existence (いる/ある), the location takes に — not で.'},
    {jp:'私＿本', full:'私の本', answer:'の', options:['の','が','を','と'], en:'my book', why:'の links nouns — possession, "me-’s book."'},
    {jp:'犬＿猫', full:'犬と猫', answer:'と', options:['と','や','の','も'], en:'a dog and a cat (just those two)', why:'と joins a complete list — exactly these.'},
    {jp:'りんご＿バナナ', full:'りんごやバナナ', answer:'や', options:['や','と','の','で'], en:'apples, bananas, etc.', why:'や joins a partial list — these among others.'},
    {jp:'私＿行く。', full:'私も行く。', answer:'も', options:['も','は','が','を'], en:'I will go too.', why:'も means "also / too" and replaces は/が.'},
    {jp:'水＿ない。', full:'水しかない。', answer:'しか', options:['しか','だけ','も','は'], en:'There is nothing but water.', why:'しか pairs with a negative (ない) — "nothing but."'},
    {jp:'高い＿、買う。', full:'高いけど、買う。', answer:'けど', options:['けど','のに','から','ので'], en:"It's pricey, but I'll buy it.", why:'けど is neutral "but" (casual).'},
    {jp:'勉強した＿、落ちた。', full:'勉強したのに、落ちた。', answer:'のに', options:['のに','けど','から','し'], en:'Even though I studied, I failed.', why:'のに = "even though…!" — surprise or complaint.'},
    {jp:'寒い＿、閉めて。', full:'寒いから、閉めて。', answer:'から', options:['から','ので','のに','けど'], en:"It's cold, so close it.", why:'から = "because" (personal, direct).'},
    {jp:'行きます＿？', full:'行きますか？', answer:'か', options:['か','ね','よ','の'], en:'Are you going?', why:'か turns a sentence into a question.'},
    {jp:'いいです＿。', full:'いいですね。', answer:'ね', options:['ね','よ','か','な'], en:"It's nice, isn't it?", why:'ね seeks agreement — "right?"'},
    {jp:'もう始まる＿。', full:'もう始まるよ。', answer:'よ', options:['よ','ね','か','の'], en:"It's starting, you know.", why:'よ asserts new info the listener doesn’t have yet.'},
    {jp:'9時＿5時＿', full:'9時から5時まで', answer:'から', options:['から','まで','に','で'], en:'from 9 until 5 (first gap)', why:'から marks the start point; まで marks the end.'},
    {jp:'駅＿歩く。', full:'駅まで歩く。', answer:'まで', options:['まで','から','に','を'], en:'I walk as far as the station.', why:'まで = "up to / as far as."'}
  ];
  global.PARTICLE_Q = Q;
})(window);
