// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
    this.initial = x;
    this.speed = 80;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = this.initial;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() { // changing from 101, 75
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



/**
 * Player object, holds current state of player character
 * @param {int} x         store x horizontal value
 * @param {int} y         store y vertical value
 * @param {int} lives     store amount of lives of player character
 * @param {int} gameState on/off flag for new game screen
 */
var Player = function(x, y, lives, gameState) {
    this.sprite = 'images/char-boy.png'; // changing to selected char 
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.score = 0;
    this.gameState = gameState; // 1, enable game with player controls, 0, disable player control
};
/**
 * reset player character to default game board location
 * @return {fn} call update on Player object
 */
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 390;
    if (this.lives <= 0) {
        this.gameState = 0;
        this.lives = 4;
    }
};

// render to screen lives, score, and current player location
Player.prototype.render = function() {
    ctx.fillText('Life: ', 5, 75, 100);
    ctx.fillText(this.lives.toString(), 55, 75);
    ctx.fillText('Score: ', 75, 75, 100);
    ctx.fillText(this.score.toString(), 150, 75);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// handle directional input from keyboard, controls player movement
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

/**
 * Create Select class, hold image locations, x horizontal value,
 * and set default 'chosen' array location as represented on screen
 */
var Select = function() {
    this.selectImages = [
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-horn-girl.png',
        'images/char-cat-girl.png',
        'images/char-princess-girl.png'
    ];
    this.selector = 'images/Selector.png';
    this.x = 101;
    this.chosen = 1;
};

Select.prototype.render = function() {
    var characters = this.selectImages.length;
    // if in select/new screen, display instructions
    if (player.gameState === 0) {
        ctx.font = '20px arial';
        ctx.fillText('Select a character and hit Enter to start game!', 50, 100);
        ctx.clearRect(0, 585, 550, 142); // hack to keep cursor from ghosting on screen
        ctx.drawImage(Resources.get(this.selector), this.x, 525); //render cursor
        // render each available character sprite
        for (var i = 0; i < characters; i++) {
            ctx.drawImage(Resources.get(this.selectImages[i]), i * 101, 550);
        }
    }
    // hide rendered select screen if gameState === 1
    if (player.gameState === 1) {
        ctx.clearRect(0, 585, 550, 140);
    }
};
// Set player sprite to selected character
// Set gameState to 1 to allow player movement
Select.prototype.update = function() {
    player.sprite = select.selectImages[this.chosen];
    player.gameState = 1;

};

// Handle input for player select screen, accepts left/right/enter
Select.prototype.handleInput = function(keycode) {
    if (keycode === 'left' && this.x > 50) {
        this.x -= 100; // move select cursor left
        this.chosen = this.chosen - 1; // move array position left
    }
    if (keycode === 'right' && this.x < 400) {
        this.x += 100; // move select cursor right
        this.chosen = this.chosen + 1; // move array position right
    }
    if (keycode === 'enter') {
        this.update(); // call update to set gameState and player chosen
    }

};

// Instantiate allEnemies array, holding initial Enemy objects with pre-defined X, Y values
var allEnemies = [new Enemy(-200, 65), new Enemy(-300, 65), new Enemy(-400, 65),
    new Enemy(-100, 145), new Enemy(-200, 145), new Enemy(-300, 145),
    new Enemy(-400, 225), new Enemy(-500, 225), new Enemy(-600, 225)
];
// Instantiate Player object with default (x, y, lives, gameState) args
var player = new Player(200, 390, 4, 0);
// Instantiate Player select screen
var select = new Select();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };
    // check gameState, if 1, allow for player movement
    if (player.gameState === 1) {
        player.handleInput(allowedKeys[e.keyCode]);
        // check gameState, if 0, allow player selection
    } else if (player.gameState === 0) {
        select.handleInput(allowedKeys[e.keyCode]);
    }
});