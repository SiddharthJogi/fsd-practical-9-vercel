# RealTime Chat Application

A real-time chat application built with Node.js, Express, and Socket.IO. This application supports real-time messaging with user count tracking and connection status indicators.

## Features

- Real-time messaging using WebSockets
- User count tracking
- Connection status indicators
- Responsive design with Tailwind CSS
- Auto-reconnection handling
- System messages for user join/leave events

## Tech Stack

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **Deployment**: Vercel (Frontend) + Render (Backend)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser

## Deployment

### Option 1: Deploy to Vercel (Full Stack)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the environment variable `FRONTEND_URL` to your Vercel app URL
4. Deploy!

### Option 2: Deploy Backend to Render + Frontend to Vercel

#### Backend (Render):
1. Push your code to GitHub
2. Connect your repository to Render
3. Create a new Web Service
4. Set the following environment variables:
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://your-vercel-app.vercel.app`
5. Deploy!

#### Frontend (Vercel):
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy!

## Environment Variables

- `PORT`: Server port (default: 3000)
- `FRONTEND_URL`: Frontend URL for CORS configuration
- `NODE_ENV`: Environment (development/production)

## Project Structure

```
├── index.html          # Frontend application
├── server.js           # Backend server with Socket.IO
├── package.json        # Dependencies and scripts
├── vercel.json         # Vercel deployment configuration
├── render.yaml         # Render deployment configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## API Endpoints

- `GET /` - Serves the chat application
- WebSocket connection for real-time communication

## Socket.IO Events

### Client to Server:
- `chat message` - Send a chat message

### Server to Client:
- `chat message` - Receive a chat message
- `status update` - Connection status and user count updates

## License

MIT License
