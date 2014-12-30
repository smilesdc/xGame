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
            speed: 1, // TODO: Speed modifier
            friction: 2.60
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
    Game.hero.position.y += Game.hero.position.velY;
    Game.hero.position.x += Game.hero.position.velX;
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

var keyboard = (function () {
    var that = {};

    var direction = {
        RIGHT: 39,
        LEFT: 37,
        UP: 38,
        DOWN: 40
    };

    var keydowns = [];
    var keyups = [];

    that.keydown = {
        right: function (callback) {
            keydowns.push({
                keycode: direction.RIGHT,
                callback: callback
            });
        },
        left: function (callback) {
            keydowns.push({
                keycode: direction.LEFT,
                callback: callback
            });
        },
        up: function (callback) {
            keydowns.push({
                keycode: direction.UP,
                callback: callback
            });
        },
        down: function (callback) {
            keydowns.push({
                keycode: direction.DOWN,
                callback: callback
            });
        }
    };

    that.keyup = {
        right: function (callback) {
            keyups.push({
                keycode: direction.RIGHT,
                callback: callback
            });
        },
        left: function (callback) {
            keyups.push({
                keycode: direction.LEFT,
                callback: callback
            });
        },
        up: function (callback) {
            keyups.push({
                keycode: direction.UP,
                callback: callback
            });
        },
        down: function (callback) {
            keyups.push({
                keycode: direction.DOWN,
                callback: callback
            });
        }
    };

    window.addEventListener('keydown', function (key) {
        for (var i = 0; i < keydowns.length; i++) {
            if (keydowns[i].keycode === key.keyCode) {
                keydowns[i].callback();
            }
        }
    });

    window.addEventListener('keyup', function (key) {
        for (var i = 0; i < keyups.length; i++) {
            if (keyups[i].keycode === key.keyCode) {
                keyups[i].callback();
            }
        }
    });

    return that;
}());

keyboard.keydown.right(function () {
    Game.hero.position.velX = Game.hero.attributes.friction;
});
keyboard.keydown.left(function () {
    Game.hero.position.velX = -Game.hero.attributes.friction;
});
keyboard.keydown.up(function () {
    Game.hero.position.velY = -Game.hero.attributes.friction;
});
keyboard.keydown.down(function () {
    Game.hero.position.velY = Game.hero.attributes.friction;
});
keyboard.keyup.down(function () {
    Game.hero.position.velY = 0;
});
keyboard.keyup.up(function () {
    Game.hero.position.velY = 0;
});
keyboard.keyup.right(function () {
    Game.hero.position.velX = 0;
});
keyboard.keyup.left(function () {
    Game.hero.position.velX = 0;
});