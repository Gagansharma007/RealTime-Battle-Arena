export const checkCollision = (
    bullet : { x:number , y:number},
    player : { x:number , y:number}
) : boolean => {
    const bulletSize = 5;
    const playerSize = 20;
    return ( 
        bullet.x < player.x + playerSize && bullet.x + bulletSize > player.x &&
        bullet.y < player.y + playerSize && bullet.y + bulletSize > player.y
    );
};