import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initializeDatabase } from './db/db.connection.js';
import cors from 'cors';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';
import cookieParser from 'cookie-parser';

const app = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: [
    'https://the-sportos-v1-frontend.vercel.app',
    'https://the-sportos-admin.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const io = new Server(httpServer, {
  cors: {
    origin: corsOptions.origin,
    credentials: corsOptions.credentials,
  },
});

app.set('io', io);

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

initializeDatabase();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('dataUpdated', () => {
    console.log('Data updated event received');
    io.emit('dataUpdated');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
