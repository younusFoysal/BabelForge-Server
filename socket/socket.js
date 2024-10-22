const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        'https://babel-forge.vercel.app', 
        'http://localhost:3000', 
        "https://babel-forge-project.vercel.app"
      ],
      methods: ["GET", "POST"],
      credentials: true,
    }
  });

  console.log("testttt");
  

  io.on("connection", (socket) => {
    console.log('connected:', socket.id);

    // Listening for the 'send-changes' event from the client
    socket.on("send-changes", (delta) => {
      console.log('Received delta:', delta);
      // Broadcast the changes to all other clients
      socket.broadcast.emit("receive-changes", delta);
    });

    // Handling disconnection
    socket.on("disconnect", () => {
      console.log('disconnected:', socket.id);
    });
  });
};

module.exports = { initSocket, io };
