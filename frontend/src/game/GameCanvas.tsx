import { useEffect, useRef } from "react";
import { Projectile } from "./Projectile";

const GameCanvas = ({ players, bullets }: { players: Record<string, { x: number; y: number; health: number; score : number; }>, bullets: Projectile[] }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const renderGame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw players
            Object.values(players).forEach((player) => {
                ctx.fillStyle = "blue";
                ctx.fillRect(player.x, player.y, 20, 20);
                // ✅ Draw health bar
                ctx.fillStyle = "red";
                ctx.fillRect(player.x, player.y - 10, (player.health / 100) * 20, 5); 

                ctx.fillStyle = "green";
                ctx.font = "10px Arial";
                ctx.fillText(`Score: ${player.score}`, player.x - 10, player.y - 15);
            });

            

            // Draw bullets
            bullets.forEach((bullet) => {
                ctx.fillStyle = "red";
                ctx.fillRect(bullet.x, bullet.y, 5, 5);
            });

            requestAnimationFrame(renderGame);
        };

        renderGame();
    }, [players, bullets]);

    return <canvas ref={canvasRef} width={800} height={600} />;
};

export default GameCanvas;
