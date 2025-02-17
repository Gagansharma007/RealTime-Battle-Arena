export const handleMovement = (socket: any, getPlayerPosition: () => { x: number; y: number }) => {
    window.addEventListener("keydown", (event) => {
        let movement = { x: 0, y: 0 };
        const playerPos = getPlayerPosition(); // ✅ Get real-time position
        const speed = 2; // 🔹 Reduce speed for better control

        switch (event.key) {
            case "ArrowUp":
            case "w":
                if (playerPos.y - speed >= 0) movement.y = -speed; // 🔹 Prevent moving above the screen
                break;
            case "ArrowDown":
            case "s":
                if (playerPos.y + speed <= 580) movement.y = speed; // 🔹 Prevent moving below the screen
                break;
            case "ArrowLeft":
            case "a":
                if (playerPos.x - speed >= 0) movement.x = -speed; // 🔹 Prevent moving off the left side
                break;
            case "ArrowRight":
            case "d":
                if (playerPos.x + speed <= 780) movement.x = speed; // 🔹 Prevent moving off the right side
                break;
        }

        if (movement.x !== 0 || movement.y !== 0) {
            socket.emit("move", movement);
        }
    });
};
