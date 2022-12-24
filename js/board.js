// 获取表单、留言板和清空按钮的 DOM 元素
const form = document.getElementById('message-form');
const messageBoard = document.getElementsByClassName('main-message-board-inner')[0];
const clearButton = document.getElementById('clear-button');

// 监听留言板的单击事件
messageBoard.addEventListener('click', e => {
    // 判断单击的是否是删除按钮
    if (e.target.className === 'delete-button') {
        // 获取要删除的留言的下标
        const index = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);

        // 从本地存储中读取数据
        const messages = JSON.parse(localStorage.getItem('messages'));

        // 删除数据中对应的留言
        messages.splice(index, 1);

        // 将更新后的数据重新存储到本地存储中
        localStorage.setItem('messages', JSON.stringify(messages));

        // 重新渲染留言板
        renderMessages();
    }

    // 判断单击的是否是编辑按钮
    if (e.target.className === 'edit-button') {
        // 获取要编辑的留言的下标
        const index = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);

        // 从本地存储中读取数据
        const messages = JSON.parse(localStorage.getItem('messages'));

        // 获取要编辑的留言的数据
        const { nick, email, type, message } = messages[index];

        // 将数据填充到表单中
        form.elements.nick.value = nick;
        form.elements.email.value = email;
        form.elements.type.value = type;
        form.elements.message.value = message;

        // 将更新后的数据重新存储到本地存储中
        messages.splice(index, 1);
        localStorage.setItem('messages', JSON.stringify(messages));

        // 重新渲染留言板
        renderMessages();
    }
});

// 监听表单的提交事件
form.addEventListener('submit', e => {
    // 阻止表单默认的提交行为
    e.preventDefault();

    // 获取表单中的数据
    const nick = form.elements.nick.value;
    const email = form.elements.email.value;
    const message = form.elements.message.value;
    const type = form.elements.type.value;

    // 将数据存储到本地存储中
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ nick, email, type, message });
    localStorage.setItem('messages', JSON.stringify(messages));

    // 清空表单
    form.reset();

    // 重新渲染留言板
    renderMessages();
});

// 监听清空按钮的单击事件
clearButton.addEventListener('click', () => {
    // 清空本地存储
    localStorage.clear();

    // 重新渲染留言板
    renderMessages();
});

// 渲染留言板
function renderMessages() {
    // 从本地存储中读取数据
    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    // 清空留言板中的内容
    const messagesDiv = document.getElementsByClassName('main-message-board-inner')[0];
    messagesDiv.innerHTML = '';

    // 循环遍历所有留言，并将它们添加到留言板中
    for (const { nick, email, type, message } of messages) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'main-message-board-item';
        messageDiv.innerHTML = `
        <p><strong>${nick}</strong> <em>${email}</em></p>
        <p>${type}</p>
        <p>${message}</p>
        <button class="delete-button">删除</button>
        <button class="edit-button">编辑</button>
      `;
        messagesDiv.appendChild(messageDiv);
    }
}

renderMessages();
