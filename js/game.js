/**
 * Created by .
 * User: Smile
 * Date: 29.12.14
 * Time: 14:31
 * To change this template use File | Settings | File Templates.
 */
    (function(){if(typeof ({}.__defineGetter__) != "function" && typeof (Object.defineProperty) != "function")
            alert("Your browser doesn't support latest JavaScript version.");})()

var gameArea = document.getElementById("gameArea");
var ctx = gameArea.getContext('2d');
gameArea.width = 480;
gameArea.height = 640;

var x = getClientCenterX()/2, y = getClientCenterY()/2;

var posX = 0, posY = 0;

drawMove(x, y, gameArea, ctx);

function drawMove(x, y, canvas, ctx){
    posX = x;
    posY = y;
    ctx.fillRect(posX, posY, 10, 10);
}

function drawCleared(x, y, canvas, ctx){
    ctx.clearRect(posX, posY, 11, 11);
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
            drawCleared(posX, posY+1, gameArea, ctx);
            drawMove(posX, posY-=1, gameArea, ctx);
            break;
        case 40:
            drawCleared(posX, posY-1, gameArea, ctx);
            drawMove(posX, posY+=1, gameArea, ctx);
            break;
        case 37:
            drawCleared(posX-1, posY, gameArea, ctx);
            drawMove(posX-=1, posY, gameArea, ctx);
            break;
        case 39:
            drawCleared(posX+1, posY, gameArea, ctx);
            drawMove(posX+=1, posY, gameArea, ctx);
            break;
    }

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