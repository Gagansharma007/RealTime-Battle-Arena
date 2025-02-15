let lastShotTime = 0;

export const handleShooting = (socket: any, playerId: string, playerPosition: { x: number; y: number }) => {
    const shootBullet = () => {
        const now = Date.now();
        if (now - lastShotTime < 300) return; 
        lastShotTime = now;

        socket.emit("shoot", {
            playerId,
            x: playerPosition.x,
            y: playerPosition.y,
            direction: "right", 
            timestamp: now,
        });
    };

    window.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            shootBullet();
        }
    });

    window.addEventListener("click", () => {
        shootBullet();
    });

    return () => {
        window.removeEventListener("keydown", shootBullet);
        window.removeEventListener("click", shootBullet);
    };
};
