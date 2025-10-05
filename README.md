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

### Recommended: Split Deployment (Backend on Render + Frontend on Vercel)

**Why this setup?** Vercel's serverless architecture has limitations with WebSocket connections, causing frequent disconnections. Render provides better WebSocket support.

#### Step 1: Deploy Backend to Render
1. Push your code to GitHub
2. Connect your repository to Render
3. Create a new Web Service
4. Set the following environment variables:
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://your-vercel-app.vercel.app` (update after frontend deployment)
5. Deploy and note your Render URL (e.g., `https://your-app.onrender.com`)

#### Step 2: Update Frontend Configuration
1. In `index.html`, replace `https://your-render-backend-url.onrender.com` with your actual Render URL
2. Commit and push the changes

#### Step 3: Deploy Frontend to Vercel
1. Connect your repository to Vercel
2. Deploy (no environment variables needed for frontend)
3. Note your Vercel URL (e.g., `https://your-app.vercel.app`)

#### Step 4: Update Backend CORS
1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable to your Vercel URL
3. Redeploy the backend

### Alternative: Full Stack on Vercel (Limited WebSocket Support)
⚠️ **Not recommended** due to WebSocket connection instability on Vercel's serverless platform.

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
