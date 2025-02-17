let lastShotTime = 0; 

export const handleShooting = (socket: any, playerId: string, getPlayerPosition: () => { x: number; y: number }) => {
    if (!playerId) return;

    const shootBullet = () => {
        const now = Date.now();
        if (now - lastShotTime < 300) return; 
        lastShotTime = now;

        const { x, y } = getPlayerPosition(); 
        socket.emit("shoot", {
            playerId,
            x: x + 10, 
            y: y + 10,
            direction: "right",
            timestamp: now,
        });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            shootBullet();
        }
    };

    const handleClick = () => {
        shootBullet();
    };

    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("click", handleClick);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("click", handleClick);
    };
};
