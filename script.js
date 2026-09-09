// ★曲名リスト（全148曲）
const songs = [
  "Floods of tears", "夜想花", "Blurry Eyes", "Vivid Colors", "夏の憂鬱 [time to say good-bye]",
  "風にきえないで", "flower", "Lies and Truth", "虹", "winter fall", "DIVE TO BLUE",
  "HONEY", "花葬", "浸食 -lose control-", "snow drop", "forbidden lover", "HEAVEN'S DRIVE",
  "Pieces", "Driver's High", "LOVE FLIES", "NEO UNIVERSE", "finale", "STAY AWAY",
  "Spirit dreams inside -another dream-", "READY STEADY GO", "瞳の住人", "自由への招待",
  "Killing Me", "New World", "叙情詩", "Link", "the Fourth Avenue Café", "SEVENTH HEAVEN",
  "MY HEART DRAWS A DREAM", "DAYBREAK'S BELL", "Hurry Xmas", "DRINK IT DOWN", "NEXUS 4",
  "SHINE", "BLESS", "GOOD LUCK MY WAY", "X X X", "CHASE", "EVERLASTING", "Wings Flap",
  "Don't be Afraid", "ミライ", "FOREVER", "YOU GOTTA RUN", "Shutting from the sky", "Voice",
  "Taste of love", "Entichers", "DUNE", "Be destined", "追憶の情景", "As if in a dream",
  "失われた眺め", "予感", "In the Air", "All Dead", "Blame", "Wind of Gold", "Inner Core",
  "風の行方", "瞳に映るもの", "White Feathers", "Still I'm With You", "and She Said",
  "ガラス玉", "Secret Signs", "C'est La Vie", "夏の憂鬱", "Cureless", "静かの海で",
  "The Rain Leaves a Scar", "Fare Well", "Caress of Venus", "Round and Round",
  "\"good-morning Hide\"", "I Wish", "Dearest Love", "LORELEY", "Singin' in the Rain",
  "Shout at the Devil", "birth", "Promised land", "fate", "milky way", "あなた",
  "Cradle", "Larva", "Butterfly's Sleep", "Perfect Blue", "真実と幻想と", "What is love",
  "死の灰", "It's the end", "Sell my Soul", "L'heure", "trick", "いばらの涙",
  "the silver shining", "get out from the shell -asian version-", "THE NEPENTHES",
  "bravery", "ROUTE 666", "TIME SLIP", "a silent letter", "ALL YEAR AROUND FALLING IN LOVE",
  "接吻", "Lover Boy", "Feeling Fine", "Time goes on", "Coming Closer", "永遠",
  "REVELATION", "Spirit dreams inside", "LOST HEAVEN", "TRUST", "AS ONE", "My Dear",
  "EXISTENCE", "Ophelia", "星空", "twinkle, twinkle", "Pretty girl", "砂時計", "spiral",
  "ALONE EN LA VIDA", "海辺", "THE BLACK ROSE", "雪の足跡", "Bye Bye", "shade of season",
  "wild flower", "未来世界", "Anemone", "Brilliant Years", "あなたのために", "I'm so happy",
  "さようなら", "賽は投げられた", "THE GHOST IN MY ROOM", "metropolis", "Peeping Tom",
  "a swell in the sun", "hole"
];

let songList = [...songs];
let n = songList.length;
let cmp1, cmp2;
let sortedCount = 0;
// ★最大対戦回数を 300 回に設定！（お好みで 200 や 500 に変更可能）
const MAX_ROUNDS = 300; 
let scoreMap = {};

function init() {
  songs.forEach((_, idx) => scoreMap[idx] = 0);
  showChoice();
}

function showChoice() {
  // 指定の対戦回数を超えたら結果画面へ
  if (sortedCount >= MAX_ROUNDS) {
    showResult();
    return;
  }

  // 残り・現在の対戦回数を画面に表示
  const progressElem = document.getElementById("progress");
  if (progressElem) {
    progressElem.innerText = `対戦中: ${sortedCount + 1} / ${MAX_ROUNDS} 回`;
  }

  // ランダムに2曲選ぶ
  cmp1 = Math.floor(Math.random() * n);
  cmp2 = Math.floor(Math.random() * n);
  while (cmp1 === cmp2) {
    cmp2 = Math.floor(Math.random() * n);
  }

  const songLeft = songList[cmp1];
  const songRight = songList[cmp2];

  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");

  if (btnLeft && btnRight) {
    btnLeft.innerText = songLeft;
    btnRight.innerText = songRight;
  }

  // 検索リンクを更新
  const leftQuery = encodeURIComponent(`ラルク ${songLeft}`);
  const rightQuery = encodeURIComponent(`ラルク ${songRight}`);

  const linkLL = document.getElementById("link-left-lyric");
  const linkLY = document.getElementById("link-left-yt");
  const linkRL = document.getElementById("link-right-lyric");
  const linkRY = document.getElementById("link-right-yt");

  if (linkLL) linkLL.href = `https://www.google.com/search?q=${leftQuery}+歌詞`;
  if (linkLY) linkLY.href = `https://www.youtube.com/results?search_query=${leftQuery}`;
  if (linkRL) linkRL.href = `https://www.google.com/search?q=${rightQuery}+歌詞`;
  if (linkRY) linkRY.href = `https://www.youtube.com/results?search_query=${rightQuery}`;
}

function selectChoice(val) {
  if (val === -1) {
    scoreMap[cmp1] += 2;
  } else if (val === 1) {
    scoreMap[cmp2] += 2;
  } else if (val === 0) {
    scoreMap[cmp1] += 1;
    scoreMap[cmp2] += 1;
  } else if (val === 2) {
    scoreMap[cmp1] -= 1;
    scoreMap[cmp2] -= 1;
  }
  
  sortedCount++;
  showChoice();
}

function showResult() {
  document.getElementById("battle-area").style.display = "none";
  document.getElementById("result-area").style.display = "block";
  
  let sortedIndices = Object.keys(scoreMap).sort((a, b) => scoreMap[b] - scoreMap[a]);
  let resultList = document.getElementById("result-list");
  resultList.innerHTML = "";
  
  // 画面上に全順位を表示
  sortedIndices.forEach(idx => {
    let li = document.createElement("li");
    li.innerText = songList[idx];
    resultList.appendChild(li);
  });
}

// ★全順位（11位〜148位まで全て）をコピーする機能
function copyResult() {
  let sortedIndices = Object.keys(scoreMap).sort((a, b) => scoreMap[b] - scoreMap[a]);
  
  let text = "【マイ ラルクソート 全楽曲順位】\n";
  
  // 1位から最後の曲まで全てループでテキスト化
  for (let i = 0; i < sortedIndices.length; i++) {
    let rank = i + 1;
    let songName = songList[sortedIndices[i]];
    text += `${rank}位: ${songName}\n`;
  }
  
  text += "\n#ラルクソート";

  navigator.clipboard.writeText(text).then(() => {
    let msg = document.getElementById("copy-msg");
    if (msg) {
      msg.innerText = "全順位をクリップボードにコピーしました！";
      msg.style.display = "block";
      setTimeout(() => { msg.style.display = "none"; }, 3000);
    }
  }).catch(err => {
    alert("コピーに失敗しました");
  });
}

window.onload = init;