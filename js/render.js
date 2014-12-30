/**
 * Render game.
 */
var Render = {
    gameArea: document.getElementById("gameArea"),
    ctx: this.gameArea.getContext('2d'),
    camera: {
        centerTileX: 0,
        centerTileY: 0,
        centerScreenX: 0,
        centerScreenY: 0
    },

    updateCamera: function () {
        this.camera.centerTileX = Hero.position.x;
        this.camera.centerTileY = Hero.position.y;
        this.camera.centerScreenX = Utils.getClientCenterX();
        this.camera.centerScreenY = Utils.getClientCenterY();
    },

    drawTile: function (tileId, x, y, width, height) {
        var tileSet;
        for (var i = 0; i < Tiles.tilesets.length; i++) {
            if (Tiles.tilesets[i].startId <= tileId && tileId <= Tiles.tilesets[i].endId) {
                tileSet = Tiles.tilesets[i];
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
                    this.ctx.drawImage(tileSet['image'], tileSetX, tileSetY, tileSet.size, tileSet.size, x, y, width, height);
                    break;
            }
        } else {
            console.log("No tileSet with tile #" + tileId);
        }
    },
    drawMapTile: function (tileId, tileX, tileY, widthInTiles, heightInTiles) {
        var screenX = (tileX - this.camera.centerTileX) * Tiles.tileWidth + this.camera.centerScreenX;
        var screenY = (tileY - this.camera.centerTileY) * Tiles.tileHeight + this.camera.centerScreenY;
        var screenWidth = widthInTiles * Tiles.tileWidth;
        var screenHeight = heightInTiles * Tiles.tileHeight;

        this.drawTile(tileId, screenX, screenY, screenWidth, screenHeight);
    },

    clear: function () {
        this.ctx.clearRect(0, 0, Utils.getClientWidth(), Utils.getClientHeight());
    },

    drawWorld: function () {
        this.drawMapTile(104, 0, 0, 2, 2);
        for (var y = 0; y < Map.ground.length; y++) {
            for (var x = 0; x < Map.ground[0].length; x++) {
                var tileId = Map.ground[y][x];
                this.drawMapTile(tileId, x, y, 1, 1);
            }
        }
    },

    drawPlayer: function () {
        this.drawMapTile(104, Hero.position.x, Hero.position.y, Hero.attributes.size.width, Hero.attributes.size.height);
    }
}