/* HTML5 Based mini-game | Core
 * Source: https://github.com/smilesdc/xGame
 */

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);

var gameArea = document.getElementById("gameArea");
var ctx = gameArea.getContext('2d');

var Game = {
    hero: {
        position: {
            x: 0,
            y: 0,
            velX: 0,
            velY: 0
        },
        attributes: {
            speed: 2.6
        },

        update: function () {
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

            this.position.velX = velX / velModule * this.attributes.speed;
            this.position.velY = velY / velModule * this.attributes.speed;
        },
        
        updatePosition: function () {
            this.position.x += this.position.velX;
            this.position.y += this.position.velY;
        }

    },
    render: {
        width: 64,
        heigth: 64,
        drawPlayer: function () {
            ctx.clearRect(0, 0, getClientWidth(), getClientHeight());
            var playerSprites = new Image();
            playerSprites.src = 'img/sprites.png';
            var spriteWidth = 64,
                spriteHeight = 64,
                paddingLeft = 0,
                paddingTop = 0;
            ctx.drawImage(playerSprites, paddingLeft, paddingTop, spriteWidth, spriteHeight, Game.hero.position.x, Game.hero.position.y, Game.render.width, Game.render.heigth);
        },
        drawBox: function () {
            ctx.beginPath();
            ctx.rect(256, 254, 120, 15);
            ctx.closePath();
            ctx.stroke(); // Стиль выделения считается глобальным, его следует либо обнулять, либо переназначать (В данном рендере цвет будет Blue, см функцию redraw)
        }

    }
};


Game.hero.position.x = getClientCenterX();
Game.hero.position.y = getClientCenterY();

loop();

function loop() {
    requestAnimationFrame(loop);
    Game.hero.update();

    Game.render.drawPlayer();
    Game.render.drawBox();
}

function resizeCanvas() {
    gameArea.width = window.innerWidth;
    gameArea.height = window.innerHeight;
}

function getClientWidth() {
    return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
}

function getClientHeight() {
    return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
}

function getClientCenterX() {
    return parseInt(getClientWidth() / 2, 0);
}

function getClientCenterY() {
    return parseInt(getClientHeight() / 2, 0);
}