import { useEffect, useState } from "react";
import { getSocket } from "./socket";
import GameCanvas from "./game/GameCanvas";

function App() {
    const [players, setPlayers] = useState<Record<string, { x: number; y: number }>>({});
    const [isConnected, setIsConnected] = useState(false);
    const socket = getSocket();

    useEffect(() => {
        const handleUpdatePlayers = (updatedPlayers: Record<string, { x: number; y: number }>) => {
            setPlayers({ ...updatedPlayers });
        };

        const handleConnect = () => setIsConnected(true);
        const handleDisconnect = () => setIsConnected(false);

        socket.on("updatePlayers", handleUpdatePlayers);
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        return () => {
            socket.off("updatePlayers", handleUpdatePlayers);
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
        };
    }, []);

    return (
        <div>
            <h1>Real-Time Battle Arena</h1>
            <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
            <p>Connected Players: {Object.keys(players).length}</p>
            <GameCanvas players={players} />
        </div>
    );
}

export default App;