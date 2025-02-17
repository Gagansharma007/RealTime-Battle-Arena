export class Projectile {
    id: string;
    x: number;
    y: number;
    speed: number;
    direction: "left" | "right" | "up" | "down";
    range: number; 

    constructor(id: string, x: number, y: number, direction: "left" | "right" | "up" | "down") {
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = 7;
        this.direction = direction;
        this.range = 500;
    }

    move() {
        switch (this.direction) {
            case "up": this.y -= this.speed; break;
            case "down": this.y += this.speed; break;
            case "left": this.x -= this.speed; break;
            case "right": this.x += this.speed; break;
        }
        this.range -= this.speed;
        return this.range > 0;
    }
}
