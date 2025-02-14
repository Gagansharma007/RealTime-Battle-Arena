import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:3001";

let socket: Socket | null = null;

export const getSocket = () => {
    if (!socket) {
        socket = io(SOCKET_SERVER_URL, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        socket.on("connect", () => {
            console.log("✅ Connected to WebSocket Server", socket?.id);
        });

        socket.on("disconnect", (reason) => {
            console.warn("⚠️ Disconnected from server:", reason);
        });

        socket.on("connect_error", (error) => {
            console.error("❌ Connection error:", error.message);
        });
    }
    return socket;
};
