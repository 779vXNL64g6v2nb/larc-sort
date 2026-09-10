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
  "死の灰", "It's the end", "Sell My Soul", "L'heure", "trick", "いばらの涙",
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

// --- ソート用状態変数 ---
let lst = [];
let mergedLst = [];
let curList1 = [];
let curList2 = [];
let rec = [];
let head1 = 0;
let head2 = 1;
let cmp1 = 0;
let cmp2 = 0;
let sortedCount = 0;
let resultRank = [];

function init() {
  const savedState = localStorage.getItem("larc_sort_state");
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      lst = state.lst;
      mergedLst = state.mergedLst;
      curList1 = state.curList1;
      curList2 = state.curList2;
      rec = state.rec;
      head1 = state.head1;
      head2 = state.head2;
      cmp1 = state.cmp1;
      cmp2 = state.cmp2;
      sortedCount = state.sortedCount;

      if (state.isFinished) {
        resultRank = state.resultRank;
        showResult();
        return;
      } else {
        showChoice();
        return;
      }
    } catch (e) {
      console.error("復元エラーのため初期化", e);
    }
  }

  // 新規初期化
  lst = songs.map((_, idx) => [idx]);
  mergedLst = [];
  head1 = 0;
  head2 = 1;
  sortedCount = 0;
  
  setupNextMerge();
}

function setupNextMerge() {
  if (lst.length <= 1) {
    resultRank = lst[0] || [];
    saveState(true);
    showResult();
    return;
  }

  if (head2 >= lst.length) {
    if (head1 < lst.length) {
      mergedLst.push(lst[head1]);
    }
    lst = mergedLst;
    mergedLst = [];
    head1 = 0;
    head2 = 1;
    if (lst.length <= 1) {
      resultRank = lst[0] || [];
      saveState(true);
      showResult();
      return;
    }
  }

  curList1 = [...lst[head1]];
  curList2 = [...lst[head2]];
  rec = [];

  cmp1 = curList1[0];
  cmp2 = curList2[0];

  saveState(false);
  showChoice();
}

function saveState(isFinished = false) {
  const state = {
    lst, mergedLst, curList1, curList2, rec, head1, head2,
    cmp1, cmp2, sortedCount, isFinished, resultRank
  };
  localStorage.setItem("larc_sort_state", JSON.stringify(state));
}

function resetState() {
  localStorage.removeItem("larc_sort_state");
  location.reload();
}

function showChoice() {
  const songLeft = songs[cmp1];
  const songRight = songs[cmp2];

  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");

  if (btnLeft && btnRight) {
    btnLeft.innerText = songLeft;
    btnRight.innerText = songRight;
  }

  const progressElem = document.getElementById("progress");
  if (progressElem) {
    progressElem.innerText = `対戦回数: ${sortedCount + 1} 回（順位確定まで進行中）`;
  }

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
  sortedCount++;

  if (val === -1 || val === 0) {
    // 左勝ち（または引き分け）
    rec.push(curList1.shift());
  } else {
    // 右勝ち（または知らない）
    rec.push(curList2.shift());
  }

  if (curList1.length > 0 && curList2.length > 0) {
    cmp1 = curList1[0];
    cmp2 = curList2[0];
    saveState(false);
    showChoice();
  } else {
    // 片方のグループが空になったら残りを全て追加
    while (curList1.length > 0) rec.push(curList1.shift());
    while (curList2.length > 0) rec.push(curList2.shift());

    mergedLst.push(rec);
    head1 += 2;
    head2 += 2;
    setupNextMerge();
  }
}

function showResult() {
  document.getElementById("battle-area").style.display = "none";
  document.getElementById("result-area").style.display = "block";
  
  let resultList = document.getElementById("result-list");
  resultList.innerHTML = "";
  
  resultRank.forEach(idx => {
    let li = document.createElement("li");
    li.innerText = songs[idx];
    resultList.appendChild(li);
  });
}

function copyResult() {
  let text = "【マイ ラルクソート 全楽曲順位】\n";
  for (let i = 0; i < resultRank.length; i++) {
    text += `${i + 1}位: ${songs[resultRank[i]]}\n`;
  }
  text += "\n#ラルクソート";

  navigator.clipboard.writeText(text).then(() => {
    let msg = document.getElementById("copy-msg");
    if (msg) {
      msg.innerText = "全順位をクリップボードにコピーしました！";
      msg.style.display = "block";
      setTimeout(() => { msg.style.display = "none"; }, 3000);
    }
  }).catch(() => {
    alert("コピーに失敗しました");
  });
}

window.onload = init;