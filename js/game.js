/**
 * Created by .
 * User: Smile
 * Date: 29.12.14
 * Time: 14:31
 * To change this template use File | Settings | File Templates.
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
    render:{
        width: 10,
        heigth: 10,
        draw: function(){
            ctx.clearRect(0, 0, getClientWidth(), getClientHeight());
            ctx.fillRect(Game.hero.position.x, Game.hero.position.y, Game.render.width, Game.render.heigth);
        }
    }
};


Game.hero.position.x = getClientCenterX();
Game.hero.position.y = getClientCenterY();

function runGame(){
    Game.render.draw();
}

setInterval(function(){
    runGame();
}, 100);

function redraw() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = '5';
    ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
}

function resizeCanvas() {
    gameArea.width = window.innerWidth;
    gameArea.height = window.innerHeight;
    redraw();
}

function getClientWidth()
{
    return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

function getClientHeight()
{
    return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}

function getClientCenterX()
{
    return parseInt(getClientWidth()/2);
}

function getClientCenterY()
{
    return parseInt(getClientHeight()/2);
}

document.onkeydown = function(e){
    var key;
    if (e) {
        key = e.which;
    }
    else if (window.event) {
        key = window.event.keyCode;
    }
    switch(key){
        case 38:
            Game.hero.position.y -=1;
            break;
        case 40:
            Game.hero.position.y +=1;
            break;
        case 37:
            Game.hero.position.x -=1;
            break;
        case 39:
            Game.hero.position.x +=1;
            break;
    }
}
