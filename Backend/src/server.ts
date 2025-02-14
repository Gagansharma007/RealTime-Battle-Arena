import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
// Load Environment Variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server( server , {
    cors : {
        origin: "*",
        methods: ["GET" , "POST"]
    }
});

const players : { [id: string] : { x: number , y : number }} = {};

io.on("connection" , (socket: Socket) => {
    console.log(`Player Connected: ${socket.id}`);
    players[socket.id] = {x: Math.random() * 500 , y : Math.random() * 500 };
    io.emit("updatePlayers" , players );
    socket.on( "move" , (data: { x: number , y : number })=>{
        if( players[socket.id] ){
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
            io.emit("updatePlayers" , players ); 
        }
    });
    socket.on("disconnect" , ()=>{
        console.log(`Player Disconnected: ${socket.id}`);
        delete players[socket.id];
        io.emit("updatePlayers" , players );
    });
});

server.listen( PORT , ()=> {
    console.log(`Server listening on port: ${PORT}`);
});