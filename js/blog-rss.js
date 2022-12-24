async function Rss() {
    const response = await fetch('https://cdn.jsdelivr.net/gh/ljcbaby/ljcbaby.github.io@latest/atom.xml');
    const xmlString = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'text/xml');

    const items = xml.querySelectorAll('entry');
    const List = document.getElementsByClassName('main-blog-item-inner')[0];
    innerHTML = '';
    count = 0;
    for (const item of items) {
        innerHTML += `<div class="main-blog-item">`;
        innerHTML += `<div class="main-blog-item-header">`;
        innerHTML += `<h3 class="main-blog-item-title">`;
        innerHTML += `<a href="${item.querySelector('link').getAttribute('href')}"`;
        innerHTML += `title="${item.querySelector('title').textContent}">${item.querySelector('title').textContent}</a>`;
        innerHTML += `</h3>`;
        innerHTML += `<div class="main-blog-item-meta">`;
        innerHTML += `<time datetime="${item.querySelector('published').textContent}"`;
        innerHTML += `itemprop="datePublished">${item.querySelector('published').textContent.split('T')[0]}</time>`;
        innerHTML += `</div>`;
        innerHTML += `</div>`;
        innerHTML += `<div class="main-blog-item-content">`;
        innerHTML += `<p>${item.querySelector('summary').textContent}</p>`;
        innerHTML += `</div>`;
        innerHTML += `</div>`;
        count++;
        if (count >= 10) {
            break;
        }
    }
    List.innerHTML = innerHTML;
}

Rss();
