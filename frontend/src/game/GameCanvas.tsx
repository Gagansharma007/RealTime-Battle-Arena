import { useEffect, useRef } from "react";

const GameCanvas = ({ players }: { players: Record<string, { x: number; y: number }> }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const renderGame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            Object.values(players).forEach((player) => {
                ctx.fillStyle = "blue";
                ctx.fillRect(player.x, player.y, 20, 20);
            });
        };

        renderGame(); // Draw initial frame

    }, [players]); // ✅ Only re-render when `players` change

    return <canvas ref={canvasRef} width={800} height={600} />;
};

export default GameCanvas;
