import { useEffect, useRef } from "react";
import { Projectile } from "./Projectile";

const GameCanvas = ({ players, bullets }: { players: Record<string, { x: number; y: number }>, bullets: Projectile[] }) => {
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
