/* HTML5 Based mini-game | Core
 * Source: https://github.com/smilesdc/xGame
 */

var Game = {
    lastTickTime: new Date().getTime(),
    secondsSinceLastTick: 0
};

loop();//Start game.

function loop() {
    requestAnimationFrame(loop);
    Logic.update();
    Render.updateCamera();
    Render.clear();
    Render.drawWorld();
    Render.drawPlayer();
}

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);