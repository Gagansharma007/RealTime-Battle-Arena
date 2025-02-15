export const handleMovement = (socket: any) => {
    let moving = { x: 0, y: 0 };

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowUp":
            case "w":
                moving.y = -5;
                break;
            case "ArrowDown":
            case "s":
                moving.y = 5;
                break;
            case "ArrowLeft":
            case "a":
                moving.x = -5;
                break;
            case "ArrowRight":
            case "d":
                moving.x = 5;
                break;
        }
        socket.emit("move", moving);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (["ArrowUp", "w", "ArrowDown", "s"].includes(event.key)) {
            moving.y = 0;
        }
        if (["ArrowLeft", "a", "ArrowRight", "d"].includes(event.key)) {
            moving.x = 0;
        }
        socket.emit("move", moving);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
    };
};
