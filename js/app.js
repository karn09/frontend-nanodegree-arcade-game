// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = randStep(-200, -40, 40)
    this.y = randStep(65, 325, 80); 
    this.speed = 80;

};
//http://stackoverflow.com/questions/6136634/js-generatring-a-random-number-going-up-in-20s 
var randStep = function(min, max, step) {
    return min + (step * Math.floor(Math.random()*(max-min)/step) );
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x = this.x + (this.speed * dt);
    }
    else if (this.x > 500) {
        this.x = -200;
        //this.cleanupPositions(allEnemies);
    }
};

//1253
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() { // changing from 101, 75
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// building out method to handle creation of new monsters
// need to build a collision checker
// make sure they do not overlap
// make sure infinite amount are not created.
Enemy.prototype.new = function(num, array) {
    this.cleanupPositions()
    if (num && array) {
        for (var i = 0; i < num; i++) {
            //array.push(new Enemy());
        }
    }
};

Enemy.prototype.cleanupPositions = function(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].x >= 5) {
            array.splice(i, 1);
        }
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.lives = 4;
};
Player.prototype.update = function() {
    //this.render();
    if (reset()) {
        console.log("test")
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keycode) {
    if (keycode === 'up' && this.y > 0) {
        this.y -= 80;
    }
    if (keycode === 'down' && this.y < 380) {
        this.y += 80;
    }
    if (keycode === 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (keycode === 'right' && this.x < 400) {
        this.x += 100;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy()];
var player = new Player(200, 390);

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
