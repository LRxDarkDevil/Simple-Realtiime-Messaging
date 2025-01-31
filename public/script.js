const socket = io();
let typingTimeout;

function joinChat() {
    const username = document.getElementById('username').value.trim();
    if (username) {
        socket.emit('join', username);
        document.getElementById('login-area').style.display = 'none';
        document.getElementById('chat-area').style.display = 'block';
        
        // Setup message input events
        const messageInput = document.getElementById('message-input');
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        messageInput.addEventListener('input', () => {
            socket.emit('typing', true);
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                socket.emit('typing', false);
            }, 1000);
        });
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('send-message', message);
        messageInput.value = '';
        // Clear typing status
        socket.emit('typing', false);
    }
}

function formatTimestamp(date) {
    const d = new Date(date);
    return d.toLocaleTimeString();
}

socket.on('message', message => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = message.type === 'system' ? 'message system-message' : 'message';
    
    if (message.type === 'system') {
        messageElement.innerHTML = `
            <span class="timestamp">${formatTimestamp(message.timestamp)}</span>
            <span class="content">${message.content}</span>
        `;
    } else {
        messageElement.innerHTML = `
            <span class="timestamp">${formatTimestamp(message.timestamp)}</span>
            <span class="username">${message.username}:</span>
            <span class="content">${message.content}</span>
        `;
    }
    
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on('chat-history', history => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    history.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = message.type === 'system' ? 'message system-message' : 'message';
        
        if (message.type === 'system') {
            messageElement.innerHTML = `
                <span class="timestamp">${formatTimestamp(message.timestamp)}</span>
                <span class="content">${message.content}</span>
            `;
        } else {
            messageElement.innerHTML = `
                <span class="timestamp">${formatTimestamp(message.timestamp)}</span>
                <span class="username">${message.username}:</span>
                <span class="content">${message.content}</span>
            `;
        }
        
        messagesDiv.appendChild(messageElement);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on('users-update', users => {
    const usersDiv = document.getElementById('users');
    usersDiv.innerHTML = users.map(user => `<div>${user}</div>`).join('');
});

socket.on('user-typing', ({ username, isTyping }) => {
    const typingStatus = document.getElementById('typing-status');
    if (isTyping) {
        typingStatus.textContent = `${username} is typing...`;
    } else {
        typingStatus.textContent = '';
    }
});