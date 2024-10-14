const { Server } = require("socket.io");
const chatService = require('../services/chatService');

let io;

const initSocket = (server, db) => {
    io = new Server(server, {
        cors: {
            origin: ['https://babel-forge.vercel.app', 'http://localhost:3000', "https://babel-forge-project.vercel.app"],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id);

        // Send previous messages to newly connected client
        chatService.getAllMessages(db).then((messages) => {
            socket.emit('previousMessages', messages);
        });

        // Listen for new chat messages
        socket.on("chat message", async (data) => {
            const savedMessage = await chatService.saveMessage(db, data);
            io.emit("chat message", savedMessage); // Broadcast to all clients
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = { initSocket };