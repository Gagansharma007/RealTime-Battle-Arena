import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const players: { [id: string]: { x: number; y: number } } = {};

io.on("connection", (socket: Socket) => {
    console.log(`Player connected: ${socket.id}`);

    players[socket.id] = { x: Math.random() * 500, y: Math.random() * 500 };

    io.emit("updatePlayers", players);

    socket.on("move", (movement: { x: number; y: number }) => {
        if (players[socket.id]) {
            players[socket.id].x += movement.x;
            players[socket.id].y += movement.y;
            io.emit("updatePlayers", players);
        }
    });

    socket.on("disconnect", () => {
        console.log(`Player disconnected: ${socket.id}`);
        delete players[socket.id];
        io.emit("updatePlayers", players);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
