const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Store connected users
const users = new Map();
// Store chat history
const chatHistory = [];

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', socket => {
  // When user joins
  socket.on('join', username => {
    users.set(socket.id, username);
    // Send current users and chat history to new user
    socket.emit('chat-history', chatHistory);
    io.emit('users-update', Array.from(users.values()));
    
    // Announce new user
    const joinMessage = {
      type: 'system',
      content: `${username} joined the chat`,
      timestamp: new Date()
    };
    chatHistory.push(joinMessage);
    io.emit('message', joinMessage);
  });

  // Handle new messages
  socket.on('send-message', message => {
    const username = users.get(socket.id);
    const messageData = {
      type: 'message',
      username: username,
      content: message,
      timestamp: new Date()
    };
    chatHistory.push(messageData);
    io.emit('message', messageData);
  });

  // Handle typing status
  socket.on('typing', isTyping => {
    const username = users.get(socket.id);
    socket.broadcast.emit('user-typing', { username, isTyping });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    if (username) {
      const leaveMessage = {
        type: 'system',
        content: `${username} left the chat`,
        timestamp: new Date()
      };
      chatHistory.push(leaveMessage);
      io.emit('message', leaveMessage);
      users.delete(socket.id);
      io.emit('users-update', Array.from(users.values()));
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
