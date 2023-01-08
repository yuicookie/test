// 右クリック禁止
$("body").bind
  ("contextmenu", function(e)
  {return false;}
  );
$("body").mousedown
  (function(e)
  {return false;}
  );

// Audioオブジェクトを作成
let ad = new Audio("audio/xmas.m4a");

// 同意ボタン押す
const agree_btn = document.getElementById('agree');
agree_btn.addEventListener('mousedown', e => {
  document.getElementById("agree").style.display ="none";
  document.getElementById("agree_black").style.display ="block";
})
// 同意ボタン離す
const agree_black = document.getElementById('agree_black');
agree_black.addEventListener('mouseup', e => {
  document.getElementById("agree_black").style.display ="none";
  document.getElementById("agree_check").style.display ="block";
  document.getElementById("ok_btn_black").style.display ="none";
  document.getElementById("ok_btn").style.display ="block";
});

// 同意外すクリック離す
const agree_check = document.getElementById('agree_check');
agree_check.addEventListener('mouseup', e => {
  document.getElementById("agree_check").style.display ="none";
  document.getElementById("agree").style.display ="block";
  document.getElementById("ok_btn").style.display ="none";
  document.getElementById("ok_btn_black").style.display ="block";
});

// OKボタン押す
const ok_btn = document.getElementById('ok_btn');
ok_btn.addEventListener('mousedown', e => {
  document.getElementById("ok_btn").style.display ="none";
  document.getElementById("ok_btn_black").style.display ="block";
})
// OKボタン離す
const ok_btn_black = document.getElementById('ok_btn_black');
ok_btn_black.addEventListener('mouseup', e => {
  if(document.getElementById("agree_check").style.display == "block"){
    document.getElementById("title_area").style.display ="none";
    document.getElementById("lobby_area").style.display ="block";
    // 連続再生
let elem_loop = document.getElementById("bgm");
	ad.play();
	ad.loop = true;  // ループ再生
 false;
}});


// リーグランキングボタン押す
const friend_rank_btn2 = document.getElementById('friend_rank_btn2');
friend_rank_btn2.addEventListener('mousedown', e => {
  document.getElementById("friend_rank_btn2").style.display ="none";
  document.getElementById("league_rank_btn2").style.display ="block";
})
// リーグランキングボタン離す
const league_rank_btn2 = document.getElementById('league_rank_btn2');
league_rank_btn2.addEventListener('mouseup', e => {
  document.getElementById("combi_bonus").style.display ="none";
  document.getElementById("friend_rank_btn1").style.display ="none";
  document.getElementById("friend_rank").style.display ="none";
  document.getElementById("league_rank_btn1").style.display ="block";
  document.getElementById("league_rank").style.display ="block";
  document.getElementById("medal").style.display ="block";
});

// 友達ランキングボタン押す
const league_rank_btn1 = document.getElementById('league_rank_btn1');
league_rank_btn1.addEventListener('mousedown', e => {
  document.getElementById("league_rank_btn1").style.display ="none";
  document.getElementById("friend_rank_btn1").style.display ="block";
});

// 友達ランキングボタン離す
const friend_rank_btn1 = document.getElementById('friend_rank_btn1');
friend_rank_btn1.addEventListener('mouseup', e => {
  document.getElementById("league_rank_btn2").style.display ="none";
  document.getElementById("medal").style.display ="none";
  document.getElementById("league_rank").style.display ="none";
  document.getElementById("friend_rank").style.display ="block";
  document.getElementById("friend_rank_btn2").style.display ="block";
  document.getElementById("combi_bonus").style.display ="block";
});
