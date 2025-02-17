import { useEffect, useState, useRef } from "react";
import { getSocket } from "./socket";
import GameCanvas from "./game/GameCanvas";
import { handleMovement } from "./game/handleMovement";
import { handleShooting } from "./game/handleShooting";
import { Projectile } from "./game/Projectile";

function App() {
    const [players, setPlayers] = useState<Record<string, { x: number; y: number }>>({});
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
        const handleUpdatePlayers = (updatedPlayers: Record<string, { x: number; y: number }>) => {
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
        const handlePlayerHit = ( data : { playerId : string ; shooterId : string }) => {
            const { playerId , shooterId } = data;
            console.log(playerId);
            console.log(`Player ${playerId} was hit by ${shooterId}!`);
        };
        
        socket.on("updatePlayers", handleUpdatePlayers);
        socket.on("newBullet", handleNewBullet);
        socket.on("updateBullets", handleUpdateBullets);
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("playerHit", handlePlayerHit );
        handleMovement(socket, getPlayerPosition);

        return () => {
            socket.off("updatePlayers", handleUpdatePlayers);
            socket.off("newBullet", handleNewBullet);
            socket.off("updateBullets", handleUpdateBullets);
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("playerHit" , handlePlayerHit );
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
