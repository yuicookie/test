let table_height;
let TotalXP = 0;

function calc(Level, Rate, Xp, Target) {
  //Cookie保存
  setCookie("Level_I", encodeURIComponent(Level), 365); // 1年間有効なCookie
  setCookie("Rate_I", encodeURIComponent(Rate), 365); // 1年間有効なCookie
  setCookie("Xp_I", encodeURIComponent(Xp), 365); // 1年間有効なCookie
  setCookie("Target_I", encodeURIComponent(Target), 365); // 1年間有効なCookie

  Rate = Rate.replace(/,/g, ''); // カンマを削除
  document.querySelector('.xp_form').style.height = '500px';
  document.getElementById('level').style.border = '';
  document.getElementById('rate').style.border = '';
  const messageNext = document.getElementById('message-next');
  const messageRun = document.getElementById('message-run');
  const targetNext = document.getElementById('target-next');
  const targetRun = document.getElementById('target-run');
  const toggleButton = document.getElementById('toggle-button');
  const tableContainer = document.getElementById('table-container');
  const messageNext100 = document.getElementById('message-next100');
  const messageRun100 = document.getElementById('message-run100');
  messageNext.textContent = '';
  messageRun.textContent = '';
  targetNext.textContent = '';
  targetRun.textContent = '';
  targetNext.style.display ="none";
  targetRun.style.display ="none";
  toggleButton.style.display ="none";
  tableContainer.textContent = '';
  messageNext100.textContent = '';
  messageRun100.textContent = '';
  messageNext100.style.display ="none";
  messageRun100.style.display ="none";

  NextXP = "Lv"+Level;
  NextXP = XP[NextXP];

  //現在のレベル
  if (Level === '') {
      document.getElementById('level').style.border = '2px solid red';
      messageNext.style.color = 'red';
      messageNext.textContent = '現在のレベルを入力してください。';
      return;
  }
  else if (Level == 0){
      document.getElementById('level').style.border = '2px solid red';
      messageNext.style.color = 'red';
      messageNext.textContent = '現在のレベルに1以上を入力してください。';
      return;
  }
  //現在の割合
  if (Rate === '' || Rate == 0) {
      Rate = 0;
  }
  else if (NextXP <= Rate) {
      document.getElementById('rate').style.border = '2px solid red';
      messageNext.style.color = 'red';
      messageNext.textContent = '正しい経験値量を入力してください。';
      return;
  }
  else {
      NextXP = NextXP - Rate;
  }
  //100レベルまでの経験値
  SumXP = 0;
  for (i = +Level + 1; i < 50; i++) {
      TempXP = "Lv"+i;
      SumXP += XP[TempXP];
  }
  SumXP += NextXP;
  //1回の獲得経験値
  if (Xp === '' || Xp == 0) {
  }
  else {
      NextRun = Math.ceil(NextXP / Xp);
      messageRun.innerHTML = 'あと <span style="color: red; font-weight: bold;">'+NextRun+'</span> 回走るとレベルアップ！';
      NextRun100 = Math.ceil(SumXP / Xp);
      messageRun100.innerHTML = 'あと <span style="color: red; font-weight: bold;">'+NextRun100+'</span> 回走るとレベルマックス！';
      if (Level == 49) {
      }
      else if(Target === '' || Target == 0) {
      }
      else {
        if (Level < Target - 1) {
          generateTable(Level, Xp, Target); //テーブル生成
          toggleButton.style.display ="block";
          tableContainer.style.display ="block";
          TotalXP += NextXP;
          targetNext.innerHTML = '目標のレベルまで <span style="color: red; font-weight: bold;">'+formatIndianNumber(Number(TotalXP))+'</span> 経験値！';
          TotalXP = Math.ceil(TotalXP / Xp);
          targetRun.innerHTML = 'あと <span style="color: red; font-weight: bold;">'+TotalXP+'</span> 回走ると目標達成！';
          targetNext.style.display ="block";
          targetRun.style.display ="block";
          messageNext100.style.display ="block";
          messageRun100.style.display ="block";
          TotalXP = 0;
        }
      }
  }
  messageNext.style.color = 'black';
  messageNext.innerHTML = '次のレベルまで <span style="color: red; font-weight: bold;">'+formatIndianNumber(Number(NextXP))+'</span> 経験値！';
  messageNext100.innerHTML = 'レベル50まで <span style="color: red; font-weight: bold;">'+formatIndianNumber(Number(SumXP))+'</span> 経験値！';
  if (Level == 49) {
      messageNext.textContent = '';
      messageRun.textContent = '';
      messageNext100.style.display ="block";
      messageRun100.style.display ="block";
  }
}

//Cookieに値を設定する関数
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 365 * 24 * 60 * 60 * 1000)); // 1年間のミリ秒数
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
  
//読み込み時に実行する
window.onload = loadFormData;
function loadFormData() {
  var cookies = document.cookie.split(';');
  var formData = {};

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim().split('=');
    formData[cookie[0]] = decodeURIComponent(cookie[1]);
  }

  //フォームにデータをセットする
  if (formData.Level_I) {
    document.getElementById('level').value = formData.Level_I;
  }
  if (formData.Rate_I) {
    document.getElementById('rate').value = formData.Rate_I;
  }
  if (formData.Xp_I) {
    document.getElementById('xp').value = formData.Xp_I;
  }
  if (formData.Target_I) {
    document.getElementById('target').value = formData.Target_I;
  }
}

function generateTable(Level, Xp, Target) {
  if (Target > 50) {
    Target = 50;
  }
  const rows = +Target - Level;
  const cols = 3;
  const titles = ["レベル", "必要経験値", "周回数"]; // タイトルを設定

  const table = document.createElement('table');
  table.border = "1"; // テーブルに枠線を追加

  for (let i = 0; i < rows; i++) {
      const row = document.createElement('tr'); // 行を作成

      for (let j = 0; j < cols; j++) {
          const cell = document.createElement(i === 0 ? 'th' : 'td'); // 先頭行は<th>、他は<td>

          if (i === 0) {
              cell.textContent = titles[j]; // 先頭行にはタイトルを設定
              cell.style.backgroundColor = 'lightgray';
              cell.style.fontWeight = 'bold';
          } else if (j === 0) {
            //   cell.textContent = `Row ${i}, Col ${j+1}`; // データ行には行と列の番号を設定
            cell.textContent = +Level + 1;
            Level++;
          } else if (j === 1) {
            NextNextXP = "Lv"+Level;
            TotalXP = TotalXP + XP[NextNextXP];
            // console.log(TotalXP)
            cell.textContent = formatIndianNumber(Number(XP[NextNextXP]));
          } else if (j === 2) {
            cell.textContent = Math.ceil(XP[NextNextXP] / Xp);
          }

          row.appendChild(cell); // 行にセルを追加
      }

      if (Level == 50) {
        break;
      }

      table.appendChild(row); // テーブルに行を追加
  }

  const container = document.getElementById('table-container');
  container.innerHTML = ''; // 以前の内容をクリア
  container.appendChild(table); // 新しいテーブルを追加
  table_height = 630 + rows * 31;
  document.querySelector('.xp_form').style.height = table_height + 'px';
}

// アコーディオン実装
function toggle() {
  const toggleWindow = document.querySelector('.toggle-window');

  if (toggleWindow.style.display === 'none' || toggleWindow.style.display === '') {
      toggleWindow.style.display = 'block'; // ウィンドウを表示
      document.querySelector('.xp_form').style.height = table_height + 'px';
      document.getElementById('toggle-button').value = '閉じる';
  } else {
      toggleWindow.style.display = 'none'; // ウィンドウを非表示
      document.querySelector('.xp_form').style.height = '610px';
      document.getElementById('toggle-button').value = '開く';
  }
};

//インド式カンマ区切り
function formatIndianNumber(num) {
  const str = num.toString();
  const lastThree = str.slice(-3); // 最後の3桁
  const otherDigits = str.slice(0, -3); // 残りの部分
  if (otherDigits !== '') {
    return otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  } else {
    return lastThree;
  }
}
