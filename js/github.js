async function getRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/ljcbaby/repos`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

function showRepos(repos) {
    const reposList = document.getElementsByClassName('main-github-inner')[0];
    innerHTML = '';
    count = 0;
    for (const repo of repos) {
        innerHTML += `<div class="main-github-item">`;
        innerHTML += `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        if (repo.description) {
            innerHTML += `<p>${repo.description}</p>`;
        }else{
            innerHTML += `<p>暂无描述</p>`;
        }
        innerHTML += `</div>`;
        count++;
        if (count >= 7) {
            break;
        }
    }
    reposList.innerHTML = innerHTML;
}

getRepos().then(repos => showRepos(repos));
