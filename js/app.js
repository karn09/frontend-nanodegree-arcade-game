// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random() * (-1 - -5 + 1)) + -5;
    this.y = Math.floor(Math.random() * 3) + 1;
    this.speed = 1;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var randSpawn = Math.random() * 5 + 1;
    if (this.x > 5) {
        this.new(randSpawn, allEnemies);
    }
    else if (this.x <= 5) {
        this.x = this.x + this.speed * dt;
    }

    this.render()
}

//1253 wells
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 75);
}

Enemy.prototype.new = function(num, array) {
    var rand = Math.floor(Math.random() * 10) + 1;
    for (var i = 0; i < array.length; i++) {
        if (array[i].x > 5) {
            array.splice(i, 1);
        }
    };
    if (num && array) {
        for (var i = 0; i < num; i++) {
            array.push(new Enemy());
        }
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // body...
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}
Player.prototype.update = function(dt) {
    // body...
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 73);
}
Player.prototype.handleInput = function(keycode) {
        if (keycode == 38) {
            this.y--;
            this.render();
        }
    }
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
var allEnemies = [new Enemy()];
var player = new Player(2, 5);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
