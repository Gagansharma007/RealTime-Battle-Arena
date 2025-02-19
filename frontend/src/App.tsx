import { useEffect, useState, useRef } from "react";
import { getSocket } from "./socket";
import GameCanvas from "./game/GameCanvas";
import { handleMovement } from "./game/handleMovement";
import { handleShooting } from "./game/handleShooting";
import { Projectile } from "./game/Projectile";

function App() {
    const [players, setPlayers] = useState<Record<string, { x: number; y: number; health : number ; score : number; }>>({});
    const [bullets, setBullets] = useState<Projectile[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [playerId, setPlayerId] = useState<string>("");
    const socket = getSocket();

    // ✅ Track latest player position to prevent stale state issues
    const playerPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        if (playerId && players[playerId]) {
            playerPositionRef.current = players[playerId]; // ✅ Always updated
        }
    }, [playerId, players]);

    const getPlayerPosition = () => playerPositionRef.current; // ✅ Always up-to-date

    useEffect(() => {
        const handleUpdatePlayers = (updatedPlayers: Record<string, { x: number; y: number; health: number ; score : number }>) => {
            setPlayers({ ...updatedPlayers });
        };

        const handleNewBullet = (bullet: any) => {
            setBullets((prev) => [...prev, new Projectile(bullet.id, bullet.x, bullet.y, bullet.direction)]);
        };

        const handleUpdateBullets = (updatedBullets: any[]) => {
            setBullets(updatedBullets.map((b) => new Projectile(b.id, b.x, b.y, b.direction)));
        };

        const handleConnect = () => {
            setIsConnected(true);
            setPlayerId(socket.id || ""); 
        };

        const handleDisconnect = () => {
            setIsConnected(false);
            setPlayerId("");
        };
        const handlePlayerHit = ( data : { playerId : string ; shooterId : string ; newHealth: number }) => {
            const { playerId , shooterId } = data;
            console.log(playerId);
            console.log(`Player ${playerId} was hit by ${shooterId}!`);
        };
        const handlePlayerEliminated = (data: { playerId: string }) => {
            console.log(`Player ${data.playerId} has been eliminated!`);
        };
        const handleUpdateScores = (updatedPlayers: Record<string, { x: number; y: number; health: number; score: number }>) => {
            setPlayers(updatedPlayers);
        };
        socket.on("updatePlayers", handleUpdatePlayers);
        socket.on("newBullet", handleNewBullet);
        socket.on("updateBullets", handleUpdateBullets);
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("playerHit", handlePlayerHit );
        socket.on("updateScores", handleUpdateScores);
        socket.on("playerEliminated", handlePlayerEliminated );
        handleMovement(socket, getPlayerPosition);

        return () => {
            socket.off("updatePlayers", handleUpdatePlayers);
            socket.off("newBullet", handleNewBullet);
            socket.off("updateBullets", handleUpdateBullets);
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("playerHit" , handlePlayerHit );
            socket.off("playerEliminated", handlePlayerEliminated);
            socket.off("updateScores", handleUpdateScores );
        };
    }, []); // ✅ Removed players dependency to prevent unnecessary re-renders

    useEffect(() => {
        if (playerId) {
            const cleanupShooting = handleShooting(socket, playerId, getPlayerPosition);
            return cleanupShooting; // ✅ Removes shooting event listeners when playerId changes
        }
    }, [playerId]); // ✅ Ensures shooting always has the correct playerId

    return (
        <div>
            <h1>Real-Time Battle Arena</h1>
            <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
            <p>Connected Players: {Object.keys(players).length}</p>
            <p>Your Player ID: {playerId || "Not Assigned"}</p>
            <GameCanvas players={players} bullets={bullets} />
        </div>
    );
}

export default App;
