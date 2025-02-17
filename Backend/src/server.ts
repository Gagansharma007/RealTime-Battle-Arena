import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { checkCollision } from "./collision";

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
const bullets: { id: string; playerId: string; x: number; y: number; direction: string; range: number }[] = [];

io.on("connection", (socket: Socket) => {
    console.log(`Player connected: ${socket.id}`);
    players[socket.id] = { x: Math.random() * 500, y: Math.random() * 500 };

    io.emit("updatePlayers", players);
    
    socket.on("move", (movement) => {
        if (players[socket.id]) {
            players[socket.id].x += movement.x;
            players[socket.id].y += movement.y;
            io.emit("updatePlayers", players);
        }
    });

    socket.on("shoot", (data) => {
        const bulletId = `${socket.id}-${Date.now()}`;
        const newBullet = {
            id: bulletId,
            playerId : socket.id,
            x: data.x,
            y: data.y,
            direction: data.direction,
            range: 500
        };
        bullets.push(newBullet);
        io.emit("newBullet", newBullet);
    });

    setInterval(() => {
        bullets.forEach((bullet, index) => {
            switch (bullet.direction) {
                case "up": bullet.y -= 7; break;
                case "down": bullet.y += 7; break;
                case "left": bullet.x -= 7; break;
                case "right": bullet.x += 7; break;
            }
            bullet.range -= 7;
            Object.keys(players).forEach((playerId)=>{
                if( bullet.playerId !== playerId && checkCollision( bullet , players[playerId])){
                    console.log(`Player ${playerId} was hit by ${bullet.playerId}`);
                    bullets.splice(index, 1);
                    io.emit("playerHit" , { playerId , shooterId : bullet.playerId });
                }
            })
            if (bullet.range <= 0) bullets.splice(index, 1);
        });

        io.emit("updateBullets", bullets);
    }, 50);

    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("updatePlayers", players);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
