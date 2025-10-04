// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// --- Server Setup ---
const app = express();
const server = http.createServer(app);

// 1. Define the Vercel Frontend URL for CORS
// !!! IMPORTANT: Replace 'https://YOUR_VERCEL_FRONTEND_URL_HERE' with the URL Vercel gives you.
// Example: 'https://my-chat-app.vercel.app'
const VERCEL_FRONTEND_URL = 'https://YOUR_VERCEL_FRONTEND_URL_HERE';

// Initialize Socket.IO and configure specific CORS origin
const io = new Server(server, {
  cors: {
    // Only allow connections from the specific Vercel frontend URL for security
    origin: VERCEL_FRONTEND_URL, 
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000; // Use environment variable for hosting platforms
let userCount = 0; // Simple counter to assign a generic ID to clients

// NOTE: The static file serving (app.get('/')) has been removed. 
// Vercel will serve index.html, and this server only handles Socket.IO.


// --- Socket.IO Real-Time Logic ---
io.on('connection', (socket) => {
  userCount++;
  // Using io.engine.clientsCount is a more robust way to get current active users
  const currentUsers = io.engine.clientsCount; 
  const userId = `User-${currentUsers}`; 
  
  console.log(`[CONNECTED] ${userId} (${socket.id})`);
  
  // 1. Notify the connecting client of their ID and current user count
  socket.emit('status update', { 
    status: 'Connected', 
    userId: userId, 
    userCount: currentUsers
  });

  // 2. Broadcast connection event to all others
  socket.broadcast.emit('chat message', {
    id: 'System', 
    message: `${userId} has joined the chat.`, 
    timestamp: new Date().toLocaleTimeString() 
  });
  
  // 3. Update count for all existing users
  io.emit('status update', { 
    status: 'Updated', 
    userCount: currentUsers
  });

  // 4. Handle incoming chat messages
  socket.on('chat message', (msg) => {
    const messageData = {
      id: msg.id || userId,
      message: msg.text,
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Broadcast the message to ALL connected clients, including the sender (self-echo)
    io.emit('chat message', messageData);
    console.log(`[MESSAGE] ${messageData.id}: ${messageData.message}`);
  });

  // 5. Handle client disconnection
  socket.on('disconnect', () => {
    // Recalculate users after disconnection
    const remainingUsers = io.engine.clientsCount;
    
    console.log(`[DISCONNECTED] ${userId} (${socket.id})`);
    
    // Broadcast disconnection event to all others
    socket.broadcast.emit('chat message', { // Use broadcast since the disconnecting client won't receive it
      id: 'System', 
      message: `${userId} has left the chat.`, 
      timestamp: new Date().toLocaleTimeString()
    });
    
    // Send updated user count to everyone
    io.emit('status update', { 
        status: 'Updated', 
        userCount: remainingUsers
    });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running and listening on port ${PORT}`);
  console.log(`Ready for real-time WebSocket communication. Set CORS origin to: ${VERCEL_FRONTEND_URL}`);
});

// Global error handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)});