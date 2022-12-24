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
    innerHTML += `<img src="${el.cover}" alt="${el.title}" referrerpolicy="no-referrer">`;
    innerHTML += `<h3 class="main-bilibili-item-title">${el.title}</h3>`;
    innerHTML += `</a>`;
    if (el.intro) {
        if (el.intro.length > 55) {
            innerHTML += `<p>${String(el.intro).slice(0,55)}......</p>`;
        } else {
            innerHTML += `<p>${el.intro}</p>`;
        }
    } else {
      innerHTML += `<p>暂无描述</p>`;
    }
    innerHTML += `</div>`;
  });
  bilibiliList.innerHTML = innerHTML;
}

getBilibili().then(data => showBilibili(data));
