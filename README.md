# Real-time Chat Application

A simple real-time chat application built with Node.js, Express, and Socket.IO. This application allows users to join chat rooms, send messages in real-time, see who's online, and receive typing notifications.

## Features

- 💬 Real-time messaging
- 👥 User presence (join/leave notifications)
- 👀 Online users list
- ⌨️ Typing indicators
- 📜 Chat history for new users
- 📱 Mobile-responsive design
- ⌨️ Enter key to send messages
- 🕒 Message timestamps
- 🔔 System notifications
- 📜 Auto-scroll to latest messages

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (version 12.0 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd real-time-chat
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
real-time-chat/
├── server.js            # Main server file
├── package.json         # Project dependencies
├── public/             
│   └── script.js       # Client-side JavaScript
└── views/
    └── index.ejs       # Main chat interface
```

## Running the Application

1. Start the server:
```bash
node server.js
```

2. Access the application:
- Local development: Open `http://localhost:3000` in your browser
- Testing across devices: Use ngrok or similar tool:
```bash
npx ngrok http 3000
```

## Usage

1. Enter your username to join the chat
2. Type messages in the input field
3. Press Enter or click Send to send messages
4. View online users in the sidebar
5. Watch for typing indicators when others are typing

## Technical Implementation

### Backend
- **Express.js**: Web application framework
- **Socket.IO**: Real-time bidirectional event-based communication
- **EJS**: Template engine for rendering views

### Frontend
- **HTML/CSS**: Responsive layout and styling
- **JavaScript**: Client-side functionality
- **Socket.IO Client**: Real-time communication with server

### Key Components

#### Server-Side Events
- `connection`: New user connects
- `join`: User joins the chat
- `send-message`: User sends a message
- `typing`: User is typing
- `disconnect`: User leaves the chat

#### Client-Side Events
- `message`: Receive new messages
- `chat-history`: Receive chat history
- `users-update`: Update online users list
- `user-typing`: Show typing indicators

## Security Considerations

This is a basic implementation and should be enhanced with the following for production use:
- User authentication
- Message sanitization
- Rate limiting
- HTTPS
- Input validation
- Session management

## Future Improvements

Potential enhancements that could be added:
- Private messaging
- File sharing
- Message reactions
- User profiles
- Multiple chat rooms
- Message persistence (database)
- Read receipts
- Message editing/deletion
- Rich text formatting
- Emoji support

## Contributing

Feel free to fork this project and submit pull requests. For major changes:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Socket.IO team for the real-time engine
- Express.js team for the web framework
- The Node.js community

---

Made with ❤️ by [Your Name]