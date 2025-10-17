// JavaScript source code
< !DOCTYPE html >
    <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>�����������</title>
                    <style>
        /* ������ʽ */
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

                        /* ��ʽ����Ϣ��ʽ */
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

                        /* ��ɫģʽ */
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

                        /* �����˵� */
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
                            <h2>��������</h2>
                            <div class="dropdown">
                                <button onclick="toggleDropdown(event)">�˵�</button>
                                <div id="dropdownMenu" class="dropdown-content">
                                    <a href="#" onclick="toggleTheme()">�л�����</a>
                                    <a href="#" onclick="clearMessages()">�����Ϣ</a>
                                </div>
                            </div>
                            <button class="theme-toggle" onclick="toggleTheme()">�л���ɫģʽ</button>
                        </div>

                        <div id="messages" class="messages"></div>
                        <div id="loading">����˼����...</div>

                        <div class="input-area">
                            <input type="text" id="chat-input" placeholder="������Ϣ����Enter����...">
                                <button class="send-btn" onclick="sendMessage()">����</button>
                        </div>
                    </div>

                    <script>
        // ��ʽ����Ϣ�ı�
                        function formatMessage(text) {
            if (!text) return '';

                        // �������ͻ���
                        let lines = text.split('\n');
            let formattedLines = lines.map(line => {
                            // ������⣨**�ı�**��
                            line = line.replace(/\*\*(.*?)\*\*/g, '<span class="bold-text">$1</span>');
                        return line;
            });

                        // �� ### �滻Ϊ���У���ȷ��ÿ�����ֶ���һ������
                        let processedText = formattedLines.join('\n');
                        let sections = processedText
                        .split('###')
                .filter(section => section.trim())
                .map(section => {
                            // �Ƴ�����Ļ��кͿո�
                            let lines = section.split('\n').filter(line => line.trim());

                        if (lines.length === 0) return '';

                        // ����ÿ������
                        let result = '';
                        let currentIndex = 0;

                        while (currentIndex < lines.length) {
                            let line = lines[currentIndex].trim();

                        // ��������ֿ�ͷ���� "1.")
                        if (/^\d+\./.test(line)) {
                            result += `<p class="section-title">${line}</p>`;
                        }
                        // �����С���⣨�����ۺſ�ͷ��
                        else if (line.startsWith('-')) {
                            result += `<p class="subsection"><span class="bold-text">${line.replace(/^-/, '').trim()}</span></p>`;
                        }
                        // ��������ģ�����ð�ŵ��У�
                        else if (line.includes(':')) {
                            let[subtitle, content] = line.split(':').map(part => part.trim());
                        result += `<p><span class="subtitle">${subtitle}</span>: ${content}</p>`;
                        }
                        // ��ͨ�ı�
                        else {
                            result += `<p>${line}</p>`;
                        }
                        currentIndex++;
                    }
                        return result;
                });

                        return sections.join('');
        }

                        // ��ʾ��Ϣ
                        function displayMessage(role, message) {
            const messagesContainer = document.getElementById('messages');
                        const messageElement = document.createElement('div');
                        messageElement.className = `message ${role}`;

                        const avatar = document.createElement('img');
                        // ʹ��Ĭ��ͷ�����ӣ����滻Ϊ����ͼƬ
                        avatar.src = role === 'user'
                        ? 'https://api.dicebear.com/6.x/identicon/svg?seed=user'
                        : 'https://api.dicebear.com/6.x/identicon/svg?seed=bot';
                        avatar.alt = role === 'user' ? '�û�' : '����';

                        const messageContent = document.createElement('div');
                        messageContent.className = 'message-content';

                        // �û���Ϣֱ����ʾ����������Ϣ��Ҫ��ʽ��
                        messageContent.innerHTML = role === 'user' ? message : formatMessage(message);

                        messageElement.appendChild(avatar);
                        messageElement.appendChild(messageContent);
                        messagesContainer.appendChild(messageElement);

                        // ƽ���������ײ�
                        messageElement.scrollIntoView({behavior: 'smooth' });
        }

                        // �����Ϣ
                        function clearMessages() {
                            document.getElementById('messages').innerHTML = '';
        }

                        function sendMessage() {
            const inputElement = document.getElementById('chat-input');
                        const message = inputElement.value;
                        if (!message.trim()) return;

                        displayMessage('user', message);
                        inputElement.value = '';

                        // ��ʾ���ض���
                        const loadingElement = document.getElementById('loading');
                        loadingElement.style.display = 'block';

                        // ע�⣺������Ҫ�滻Ϊ���API����
                        // ʾ��ʹ��ģ�����ݣ�ʵ����Ŀ�����滻Ϊ��ʵAPI����
                        const mockResponse = "����һ��ģ��ظ�����ʵ��ʹ��ʱ���뽫�����滻Ϊ��ʵ��API�����߼���";

            // ģ��API�����ӳ�
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
            displayMessage('bot', 'δ��ȡ����Ч�ظ��������ԡ�');
        }
    })
    .catch(error => {
        loadingElement.style.display = 'none';
        displayMessage('bot', '���������������� API ���ú����ԡ�');
        console.error('API �������:', error);
    });
}

                        // �����л�����
                        function toggleTheme() {
                            document.body.classList.toggle('dark-mode');
                        const chatContainer = document.querySelector('.chat-container');
                        const messages = document.querySelector('.messages');

                        chatContainer.classList.toggle('dark-mode');
                        messages.classList.toggle('dark-mode');

                        // ������������
                        const isDarkMode = document.body.classList.contains('dark-mode');
                        localStorage.setItem('darkMode', isDarkMode);
        }

        // ҳ�����ʱ�����������
        document.addEventListener('DOMContentLoaded', () => {
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
                        if (isDarkMode) {
                            document.body.classList.add('dark-mode');
                        document.querySelector('.chat-container').classList.add('dark-mode');
                        document.querySelector('.messages').classList.add('dark-mode');
            }
        });

                        // �����˵�����
                        function toggleDropdown(event) {
                            event.preventDefault();
                        document.getElementById('dropdownMenu').classList.toggle('show');
        }

                        // ��������ط��ر������˵�
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

                        // �س����͹���
                        document.getElementById('chat-input').addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault();
                        sendMessage();
            }
        });
                    </script>
                </body>
            </html>