const { Server } = require("socket.io");
const chatService = require('../services/chatService');

let io;

const initSocket = (server, db) => {
    io = new Server(server, {
        cors: {
            origin: ["*"],
            methods: ["GET", "POST"],
        },
    });

    io.use((socket, next) => {
        socket.request.res.setHeader('Access-Control-Allow-Origin', '*');
        socket.request.res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        //socket.request.res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
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
