import { useEffect, useState } from "react";
import { getSocket } from "./socket";
import GameCanvas from "./game/GameCanvas";
import { handleMovement } from "./game/handleMovement";
import { handleShooting } from "./game/handleShooting";

function App() {
    const [players, setPlayers] = useState<Record<string, { x: number; y: number }>>({});
    const [isConnected, setIsConnected] = useState(false);
    const [playerId, setPlayerId] = useState<string | null>(null);
    const socket = getSocket();

    useEffect(() => {
        const handleUpdatePlayers = (updatedPlayers: Record<string, { x: number; y: number }>) => {
            setPlayers({ ...updatedPlayers });
        };

        const handleConnect = () => {
            setIsConnected(true);
            setPlayerId(socket.id || null); 
        };        

        const handleDisconnect = () => {
            setIsConnected(false);
            setPlayerId(null);
        };

        socket.on("updatePlayers", handleUpdatePlayers);
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        handleMovement(socket);

        return () => {
            socket.off("updatePlayers", handleUpdatePlayers);
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
        };
    }, []);

    useEffect(() => {
        if (playerId && players[playerId]) {
            handleShooting(socket, playerId, players[playerId]);
        }
    }, [playerId, players]);

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
