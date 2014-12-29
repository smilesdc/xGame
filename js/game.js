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
            y: 0
        },
        attributes: {
            speed: 0
        }
    },
    render: {
        width: 64,
        heigth: 64,
        draw: function () {
            ctx.clearRect(0, 0, getClientWidth(), getClientHeight());
            var playerSprites = new Image();
            playerSprites.src = 'img/sprites.png';
            var spriteWidth = 64,
                spriteHeight = 64,
                paddingLeft = 0,
                paddingTop = 0;
            ctx.drawImage(playerSprites, paddingLeft, paddingTop, spriteWidth, spriteHeight, Game.hero.position.x, Game.hero.position.y, Game.render.width, Game.render.heigth);
        }
    }
};


Game.hero.position.x = getClientCenterX();
Game.hero.position.y = getClientCenterY();

function runGame() {
    Game.render.draw();
}

setInterval(function () {
    runGame();
}, 100);

function resizeCanvas() {
    gameArea = document.getElementById("gameArea");
    if (gameArea.width < window.innerWidth) {
        gameArea.width = window.innerWidth;
    }

    if (gameArea.height < window.innerHeight) {
        gameArea.height = window.innerHeight;
    }
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

document.onkeydown = function (e) {
    var key;
    if (e) {
        key = e.which;
    } else if (window.event) {
        key = window.event.keyCode;
    }
    switch (key) {
        case 38:
            Game.hero.position.y -= 1;
            break;
        case 40:
            Game.hero.position.y += 1;
            break;
        case 37:
            Game.hero.position.x -= 1;
            break;
        case 39:
            Game.hero.position.x += 1;
            break;
    }
    e.preventDefault(); // Фокусировка на фрейме с Canvas.
}