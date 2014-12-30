/**
 * Some useful functions.
 */
var Utils = {
    getClientWidth: function() {
        return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
    },

    getClientHeight: function() {
        return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
    },

    getClientCenterX: function() {
        return parseInt(Utils.getClientWidth() / 2, 0);
    },

    getClientCenterY: function() {
        return parseInt(Utils.getClientHeight() / 2, 0);
    }
}