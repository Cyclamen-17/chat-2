// JavaScript source code
< !DOCTYPE html >
    <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>简易聊天界面</title>
                    <style>
        /* 基础样式 */
                        * {
                            margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

                        body {
                            background - color: #f5f5f5;
                        color: #333;
                        transition: background-color 0.3s, color 0.3s;
        }

                        .chat-container {
                            max - width: 800px;
                        margin: 20px auto;
                        background-color: white;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        overflow: hidden;
                        transition: background-color 0.3s;
        }

                        .header {
                            padding: 15px;
                        background-color: #4a90e2;
                        color: white;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
        }

                        .theme-toggle {
                            background: none;
                        border: 1px solid white;
                        color: white;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
        }

                        .messages {
                            height: 500px;
                        overflow-y: auto;
                        padding: 20px;
                        transition: background-color 0.3s;
        }

                        .message {
                            display: flex;
                        margin-bottom: 15px;
                        max-width: 80%;
        }

                        .message.user {
                            margin - left: auto;
                        flex-direction: row-reverse;
        }

                        .message img {
                            width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        margin: 0 10px;
        }

                        .message-content {
                            padding: 10px 15px;
                        border-radius: 18px;
                        line-height: 1.5;
        }

                        .user .message-content {
                            background - color: #4a90e2;
                        color: white;
        }

                        .bot .message-content {
                            background - color: #e9e9eb;
                        color: #333;
        }

                        .input-area {
                            display: flex;
                        padding: 15px;
                        border-top: 1px solid #eee;
        }

                        #chat-input {
                            flex: 1;
                        padding: 10px 15px;
                        border: 1px solid #ddd;
                        border-radius: 20px;
                        outline: none;
                        font-size: 14px;
        }

                        #chat-input:focus {
                            border - color: #4a90e2;
        }

                        .send-btn {
                            margin - left: 10px;
                        padding: 10px 20px;
                        background-color: #4a90e2;
                        color: white;
                        border: none;
                        border-radius: 20px;
                        cursor: pointer;
                        transition: background-color 0.2s;
        }

                        .send-btn:hover {
                            background - color: #3a80d2;
        }

                        #loading {
                            text - align: center;
                        padding: 10px;
                        color: #666;
                        display: none;
        }

                        /* 格式化消息样式 */
                        .bold-text {
                            font - weight: bold;
        }

                        .section-title {
                            margin: 8px 0;
                        color: #2c3e50;
        }

                        .subsection {
                            margin: 6px 0;
                        color: #34495e;
        }

                        .subtitle {
                            font - weight: 600;
                        color: #2c3e50;
        }

                        /* 深色模式 */
                        .dark-mode {
                            background - color: #1e1e1e;
                        color: #f0f0f0;
        }

                        .dark-mode .chat-container {
                            background - color: #2d2d2d;
        }

                        .dark-mode .messages {
                            background - color: #2d2d2d;
        }

                        .dark-mode .bot .message-content {
                            background - color: #3d3d3d;
                        color: #f0f0f0;
        }

                        .dark-mode .section-title {
                            color: #bdc3c7;
        }

                        .dark-mode .subsection {
                            color: #ecf0f1;
        }

                        .dark-mode .subtitle {
                            color: #bdc3c7;
        }

                        /* 下拉菜单 */
                        .dropdown {
                            position: relative;
                        display: inline-block;
        }

                        .dropdown button {
                            background - color: #4a90e2;
                        color: white;
                        border: none;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
        }

                        .dropdown-content {
                            display: none;
                        position: absolute;
                        background-color: white;
                        min-width: 120px;
                        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                        z-index: 1;
                        border-radius: 4px;
        }

                        .dropdown-content a {
                            color: black;
                        padding: 8px 12px;
                        text-decoration: none;
                        display: block;
        }

                        .dropdown-content a:hover {
                            background - color: #f1f1f1;
        }

                        .dropdown-content.show {
                            display: block;
        }

                        .dark-mode .dropdown-content {
                            background - color: #3d3d3d;
        }

                        .dark-mode .dropdown-content a {
                            color: white;
        }

                        .dark-mode .dropdown-content a:hover {
                            background - color: #4d4d4d;
        }
                    </style>
                </head>
                <body>
                    <div class="chat-container">
                        <div class="header">
                            <h2>聊天助手</h2>
                            <div class="dropdown">
                                <button onclick="toggleDropdown(event)">菜单</button>
                                <div id="dropdownMenu" class="dropdown-content">
                                    <a href="#" onclick="toggleTheme()">切换主题</a>
                                    <a href="#" onclick="clearMessages()">清空消息</a>
                                </div>
                            </div>
                            <button class="theme-toggle" onclick="toggleTheme()">切换深色模式</button>
                        </div>

                        <div id="messages" class="messages"></div>
                        <div id="loading">正在思考中...</div>

                        <div class="input-area">
                            <input type="text" id="chat-input" placeholder="输入消息，按Enter发送...">
                                <button class="send-btn" onclick="sendMessage()">发送</button>
                        </div>
                    </div>

                    <script>
        // 格式化消息文本
                        function formatMessage(text) {
            if (!text) return '';

                        // 处理标题和换行
                        let lines = text.split('\n');
            let formattedLines = lines.map(line => {
                            // 处理标题（**文本**）
                            line = line.replace(/\*\*(.*?)\*\*/g, '<span class="bold-text">$1</span>');
                        return line;
            });

                        // 将 ### 替换为换行，并确保每个部分都是一个段落
                        let processedText = formattedLines.join('\n');
                        let sections = processedText
                        .split('###')
                .filter(section => section.trim())
                .map(section => {
                            // 移除多余的换行和空格
                            let lines = section.split('\n').filter(line => line.trim());

                        if (lines.length === 0) return '';

                        // 处理每个部分
                        let result = '';
                        let currentIndex = 0;

                        while (currentIndex < lines.length) {
                            let line = lines[currentIndex].trim();

                        // 如果是数字开头（如 "1.")
                        if (/^\d+\./.test(line)) {
                            result += `<p class="section-title">${line}</p>`;
                        }
                        // 如果是小标题（以破折号开头）
                        else if (line.startsWith('-')) {
                            result += `<p class="subsection"><span class="bold-text">${line.replace(/^-/, '').trim()}</span></p>`;
                        }
                        // 如果是正文（包含冒号的行）
                        else if (line.includes(':')) {
                            let[subtitle, content] = line.split(':').map(part => part.trim());
                        result += `<p><span class="subtitle">${subtitle}</span>: ${content}</p>`;
                        }
                        // 普通文本
                        else {
                            result += `<p>${line}</p>`;
                        }
                        currentIndex++;
                    }
                        return result;
                });

                        return sections.join('');
        }

                        // 显示消息
                        function displayMessage(role, message) {
            const messagesContainer = document.getElementById('messages');
                        const messageElement = document.createElement('div');
                        messageElement.className = `message ${role}`;

                        const avatar = document.createElement('img');
                        // 使用默认头像链接，可替换为本地图片
                        avatar.src = role === 'user'
                        ? 'https://api.dicebear.com/6.x/identicon/svg?seed=user'
                        : 'https://api.dicebear.com/6.x/identicon/svg?seed=bot';
                        avatar.alt = role === 'user' ? '用户' : '助手';

                        const messageContent = document.createElement('div');
                        messageContent.className = 'message-content';

                        // 用户消息直接显示，机器人消息需要格式化
                        messageContent.innerHTML = role === 'user' ? message : formatMessage(message);

                        messageElement.appendChild(avatar);
                        messageElement.appendChild(messageContent);
                        messagesContainer.appendChild(messageElement);

                        // 平滑滚动到底部
                        messageElement.scrollIntoView({behavior: 'smooth' });
        }

                        // 清空消息
                        function clearMessages() {
                            document.getElementById('messages').innerHTML = '';
        }

                        function sendMessage() {
            const inputElement = document.getElementById('chat-input');
                        const message = inputElement.value;
                        if (!message.trim()) return;

                        displayMessage('user', message);
                        inputElement.value = '';

                        // 显示加载动画
                        const loadingElement = document.getElementById('loading');
                        loadingElement.style.display = 'block';

                        // 注意：这里需要替换为你的API配置
                        // 示例使用模拟数据，实际项目中需替换为真实API调用
                        const mockResponse = "这是一条模拟回复。在实际使用时，请将这里替换为真实的API请求逻辑。";

            // 模拟API请求延迟
            setTimeout(() => {
                            loadingElement.style.display = 'none';
                        displayMessage('bot', mockResponse);
            }, 1000);

                        function sendMessage() {
    const inputElement = document.getElementById('chat-input');
                        const message = inputElement.value;
                        if (!message.trim()) return;

                        displayMessage('user', message);
                        inputElement.value = '';

                        const loadingElement = document.getElementById('loading');
                        loadingElement.style.display = 'block';

                        const apiKey = '7fda40fb0172b0a4df1c81a85ed782b6';
                        const endpoint = 'https://spark-api-open.xf-yun.com/v1/chat/completions';

                        const payload = {
                            model: "Spark Max",
                        messages: [
                        {role: "user", content: message }
                        ]
    };

                        fetch(endpoint, {
                            method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        loadingElement.style.display = 'none';
        if (data.choices && data.choices.length > 0) {
            displayMessage('bot', data.choices[0].message.content);
        } else {
            displayMessage('bot', '未获取到有效回复，请重试。');
        }
    })
    .catch(error => {
        loadingElement.style.display = 'none';
        displayMessage('bot', '请求出错，请检查网络或 API 配置后重试。');
        console.error('API 请求错误:', error);
    });
}

                        // 主题切换功能
                        function toggleTheme() {
                            document.body.classList.toggle('dark-mode');
                        const chatContainer = document.querySelector('.chat-container');
                        const messages = document.querySelector('.messages');

                        chatContainer.classList.toggle('dark-mode');
                        messages.classList.toggle('dark-mode');

                        // 保存主题设置
                        const isDarkMode = document.body.classList.contains('dark-mode');
                        localStorage.setItem('darkMode', isDarkMode);
        }

        // 页面加载时检查主题设置
        document.addEventListener('DOMContentLoaded', () => {
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
                        if (isDarkMode) {
                            document.body.classList.add('dark-mode');
                        document.querySelector('.chat-container').classList.add('dark-mode');
                        document.querySelector('.messages').classList.add('dark-mode');
            }
        });

                        // 下拉菜单功能
                        function toggleDropdown(event) {
                            event.preventDefault();
                        document.getElementById('dropdownMenu').classList.toggle('show');
        }

                        // 点击其他地方关闭下拉菜单
                        window.onclick = function(event) {
            if (!event.target.matches('.dropdown button')) {
                const dropdowns = document.getElementsByClassName('dropdown-content');
                        for (let dropdown of dropdowns) {
                    if (dropdown.classList.contains('show')) {
                            dropdown.classList.remove('show');
                    }
                }
            }
        }

                        // 回车发送功能
                        document.getElementById('chat-input').addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault();
                        sendMessage();
            }
        });
                    </script>
                </body>
            </html>