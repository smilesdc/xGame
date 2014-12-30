var Keyboard = {
    keys: {
        left_arrow: 37,
        up_arrow: 38,
        right_arrow: 39,
        down_arrow: 40,

        w: 87,
        a: 65,
        s: 83,
        d: 68
    },

    keysDown: new Array(256), // private

    handleKeyDown: function (key) {
        var keyCode = key.keyCode;
        if (keyCode >= 0 && keyCode < this.keysDown.length)
            this.keysDown[keyCode] = true;
    },

    handleKeyUp: function (key) {
        var keyCode = key.keyCode;
        if (keyCode >= 0 && keyCode < this.keysDown.length)
            this.keysDown[keyCode] = false;
    },

    isKeyDown: function (keyCode) {
        return this.keysDown[keyCode];
    }
};


window.addEventListener('keydown', function (e) {
    Keyboard.handleKeyDown(e);
});
window.addEventListener('keyup', function (e) {
    Keyboard.handleKeyUp(e);
});