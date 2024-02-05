// 初期化 
const baseApi = 'https://ihatov08.github.io',
      tbody = document.getElementById('tbody')
      load = document.getElementById('load');

// ロード画面の切り替え
const toggleLoad = () => {
  load.style.display = (load.style.display === 'flex') ? 'none' : 'flex';
};

// データ取得
const fetchApi = async (option = 'all') => {
  toggleLoad()
  const response = (await fetch(`${baseApi}/kimetsu_api/api/${option}.json`));
  const data = await response.json();
  // データ取得が早すぎてロード画面が見えないため、確認用
  setTimeout(toggleLoad, 200);

  return data;
};

// 画面側から呼び出す関数
const showTable = async (option) => {
  tbody.innerHTML = '';
  const data = await fetchApi(option);

  data.forEach(char => {
    const tr = tbody.insertRow();
    for (let key in char) {
      const td = tr.insertCell();
      if (key === 'image'){
        const img = document.createElement('img');
        img.src = `${baseApi}${char[key]}`
        img.style = "width: 50%;"
        td.appendChild(img)
      } else {
        td.textContent = char[key];
      }      
    }
  });
};

showTable();
