import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', ({ roomId, user }) => {
    socket.join(roomId);
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, { users: new Map(), messages: [] });
    }
    
    const room = rooms.get(roomId);
    room.users.set(socket.id, user);
    
    io.to(roomId).emit('user_joined', {
      user,
      users: Array.from(room.users.values()),
      messages: room.messages
    });
  });

  socket.on('send_message', ({ roomId, message }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.messages.push(message);
      io.to(roomId).emit('new_message', message);
    }
  });

  socket.on('typing', ({ roomId, user, isTyping }) => {
    socket.to(roomId).emit('user_typing', { userId: user.id, isTyping });
  });

  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      if (roomId !== socket.id) {
        const room = rooms.get(roomId);
        if (room) {
          const user = room.users.get(socket.id);
          room.users.delete(socket.id);
          io.to(roomId).emit('user_left', {
            user,
            users: Array.from(room.users.values())
          });
        }
      }
    }
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});