async function getBilibili() {
  try {
    const response = await fetch(`https://ljcbaby.top/workers/bilifav`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

function showBilibili(data) {
  const bilibiliList = document.getElementsByClassName('main-bilibili-inner')[0];
  innerHTML = '';
  data['data']['medias'].forEach(el => {
    innerHTML += `<div class="main-bilibili-item">`;
    innerHTML += `<a href="https://www.bilibili.com/video/${el.bv_id}" target="_blank">`;
    innerHTML += `<img src="${el.cover}" alt="${el.title}">`;
    innerHTML += `</a>`;
    innerHTML += `<h3 class="main-bilibili-item-title">`;
    innerHTML += `<a href="https://www.bilibili.com/video/${el.bv_id}" target="_blank">${el.title}</a>`;
    innerHTML += `</h3>`;
    if (el.intro) {
      innerHTML += `<p>${String(el.intro).slice(0,20)}......</p>`;
    } else {
      innerHTML += `<p>暂无描述</p>`;
    }
    innerHTML += `</div>`;
  });
  bilibiliList.innerHTML = innerHTML;
}

getBilibili().then(data => showBilibili(data));
