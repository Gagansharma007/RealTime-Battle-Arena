import { useEffect, useState } from "react";
import { getSocket } from "./socket";

function App() {
    const [players, setPlayers] = useState<Record<string, { x: number; y: number }>>({});
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = getSocket();

        const updatePlayers = (players: Record<string, { x: number; y: number }>) => {
            setPlayers(players);
        };

        const handleConnect = () => setIsConnected(true);
        const handleDisconnect = () => setIsConnected(false);

        socket.on("updatePlayers", updatePlayers);
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        return () => {
            socket.off("updatePlayers", updatePlayers);
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
        };
    }, []);

    return (
        <div>
            <h1>Real-Time Battle Arena</h1>
            <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
            <p>Connected Players: {Object.keys(players).length}</p>
        </div>
    );
}

export default App;
