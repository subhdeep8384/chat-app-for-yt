import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv"

dotenv.config(); ;

const app = express();

const server = http.createServer(app);
console.log(process.env.FPORT)

const io = new Server(server, {
	cors: {
		origin: [String(process.env.FPORT)],
		methods: ["GET", "POST"]
	}
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; 

io.on("connection", (socket) => {

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	
	socket.on("disconnect", () => {
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };