/**
 * Logic.
 */
var Logic = {
    update: function () {
        var newTime = new Date().getTime();
        Game.secondsSinceLastTick = (newTime - Game.lastTickTime) / 1000.0;
        Game.lastTickTime = newTime;

        this.updateVelocity();
        this.updatePosition();
    },

    updateVelocity: function () {
        var velX = 0;
        var velY = 0;
        if (Keyboard.isKeyDown(Keyboard.keys.left_arrow) || Keyboard.isKeyDown(Keyboard.keys.a))
            velX -= 1;
        if (Keyboard.isKeyDown(Keyboard.keys.right_arrow) || Keyboard.isKeyDown(Keyboard.keys.d))
            velX += 1;
        if (Keyboard.isKeyDown(Keyboard.keys.up_arrow) || Keyboard.isKeyDown(Keyboard.keys.w))
            velY -= 1;
        if (Keyboard.isKeyDown(Keyboard.keys.down_arrow) || Keyboard.isKeyDown(Keyboard.keys.s))
            velY += 1;

        var velModule = Math.sqrt(velX * velX + velY * velY);
        if (velModule == 0) {
            // To avoid 0/0 division
            velModule = 1;
        }

        Hero.position.velX = velX / velModule * Hero.attributes.speed;
        Hero.position.velY = velY / velModule * Hero.attributes.speed;
    },

    updatePosition: function () {
        Hero.position.x += Hero.position.velX * Game.secondsSinceLastTick;
        Hero.position.y += Hero.position.velY * Game.secondsSinceLastTick;
    }
}