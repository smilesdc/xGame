/* HTML5 Based mini-game | Core
 * Source: https://github.com/smilesdc/xGame
 */

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);

var gameArea = document.getElementById("gameArea");
var ctx = gameArea.getContext('2d');

var Game = {
    lastTickTime: new Date().getTime(),
    secondsSinceLastTick: 0,

    map: {
        ground: [
            [0, 0, 0, 1],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [1, 0, 0, 0]
        ]
    },
    hero: {
        position: {
            x: 0,
            y: 0,
            velX: 0,
            velY: 0
        },
        attributes: {
            size: {
                width: 0.8,
                height: 0.8
            },
            speed: 4
        },

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

            this.position.velX = velX / velModule * this.attributes.speed;
            this.position.velY = velY / velModule * this.attributes.speed;
        },
        
        updatePosition: function () {
            this.position.x += this.position.velX * Game.secondsSinceLastTick;
            this.position.y += this.position.velY * Game.secondsSinceLastTick;
        }

    },
    render: {
        tileWidth: 64,
        tileHeight: 64,
        tilesets: [
            {
                path: "img/tileset0.png",
                state: 0,

                startId: 0,
                endId: 103,
                size: 16,
                rows: 13,
                cols: 8
            },
            {
                path: "img/sprites.png",
                state: 0,

                startId: 104,
                endId: 104,
                size: 64,
                rows: 1,
                cols: 1
            }
        ],

        camera: {
            centerTileX: 0,
            centerTileY: 0,
            centerScreenX: 0,
            centerScreenY: 0
        },
        
        updateCamera: function () {
            this.camera.centerTileX = Game.hero.position.x;
            this.camera.centerTileY = Game.hero.position.y;
            this.camera.centerScreenX = getClientCenterX();
            this.camera.centerScreenY = getClientCenterY();
        },

        drawTile: function (tileId, x, y, width, height) {
            var tileSet;
            for (var i = 0; i < this.tilesets.length; i++) {
                if (this.tilesets[i].startId <= tileId && tileId <= this.tilesets[i].endId) {
                    tileSet = this.tilesets[i];
                    break;
                }
            }

            if (tileSet) {
                switch (tileSet.state) {
                    case 0:
                        // Start loading process
                        tileSet.state = 1;

                        var imageObj = new Image();
                        imageObj.onload = function() {
                            tileSet.state = 2;
                        };

                        imageObj.src = tileSet.path;
                        tileSet['image'] = imageObj;
                        break;
                    case 1:
                        // Loading... Nothing to do.
                        break;
                    case 2:
                        // Draw
                        var index = tileId - tileSet.startId;
                        var tileSetX = (index % tileSet.rows) * tileSet.size;
                        var tileSetY = (index / tileSet.rows) * tileSet.size;
                        ctx.drawImage(tileSet['image'], tileSetX, tileSetY, tileSet.size, tileSet.size, x, y, width, height);
                        break;
                }
            } else {
                console.log("No tileSet with tile #" + tileId);
            }
        },
        drawMapTile: function (tileId, tileX, tileY, widthInTiles, heightInTiles) {
            var screenX = (tileX - this.camera.centerTileX) * this.tileWidth + this.camera.centerScreenX;
            var screenY = (tileY - this.camera.centerTileY) * this.tileHeight + this.camera.centerScreenY;
            var screenWidth = widthInTiles * this.tileWidth;
            var screenHeight = heightInTiles * this.tileHeight;

            this.drawTile(tileId, screenX, screenY, screenWidth, screenHeight);
        },

        clear: function () {
            ctx.clearRect(0, 0, getClientWidth(), getClientHeight());
        },
        
        drawWorld: function () {
            this.drawMapTile(104, 0, 0, 2, 2);
            for (var y = 0; y < Game.map.ground.length; y++) {
                for (var x = 0; x < Game.map.ground[0].length; x++) {
                    var tileId = Game.map.ground[y][x];
                    this.drawMapTile(tileId, x, y, 1, 1);
                }
            }
        },
        
        drawPlayer: function () {
            this.drawMapTile(104, Game.hero.position.x, Game.hero.position.y, Game.hero.attributes.size.width, Game.hero.attributes.size.height);
        }
    }
};

loop();

function loop() {
    requestAnimationFrame(loop);
    Game.hero.update();

    Game.render.updateCamera();
    Game.render.clear();
    Game.render.drawWorld();
    Game.render.drawPlayer();
}

function resizeCanvas() {
    gameArea.width = window.innerWidth;
    gameArea.height = window.innerHeight;
}

/*
 * Note: code below is used in Game.render.updateCamera
 * Where to move it?
 */
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