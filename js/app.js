// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x; //randStep(-200, -40, 40)
    this.y = y; //randStep(65, 225, 80); 
    this.initial = x;
    this.speed = 80;

};
//http://stackoverflow.com/questions/6136634/js-generatring-a-random-number-going-up-in-20s 
var randStep = function(min, max, step) {
    return min + (step * Math.floor(Math.random() * (max - min) / step));
};

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
        this.x = this.initial;
    }
};

//1253
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() { // changing from 101, 75
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, lives, gameState) {
    this.sprite = 'images/char-boy.png'; // changing to selected char 
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.score = 0;
    this.gameState = gameState; // 1, enable game with player controls, 0, disable player control
};
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 390;
    this.update()
};
Player.prototype.update = function() {

    if (this.lives <= 0) {
        this.gameState = 0;
        this.lives = 4;
    }


};

Player.prototype.render = function() {
    ctx.fillText("Life: ", 5, 75, 100);
    ctx.fillText(this.lives.toString(), 55, 75);
    ctx.fillText("Score: ", 75, 75, 100);
    ctx.fillText(this.score.toString(), 150, 75);
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
}

Select.prototype.render = function() {
    var characters = this.selectImages.length;

    if (player.gameState === 0) {
        ctx.font = "20px arial";
        ctx.fillText("Select a character and hit Enter to start game!", 50, 100);
    }
    
    ctx.clearRect(0, 585, 550, 140)
    for (var i = 0; i < characters; i++) {
        ctx.drawImage(Resources.get(this.selectImages[i]), i * 101, 550);
    }
}

Select.prototype.update = function() {
    player.sprite = select.selectImages[this.chosen];
    player.gameState = 1;
    
}
Select.prototype.renderSelect = function() {
    ctx.drawImage(Resources.get(this.selector), this.x, 525);
}
Select.prototype.handleInput = function(keycode) {
    if (keycode === 'left' && this.x > 50) {
        this.x -= 100;
        this.chosen = this.chosen - 1;
    }
    if (keycode === 'right' && this.x < 400) {
        this.x += 100;
        this.chosen = this.chosen + 1;
    }
    if (keycode === 'enter') {
        this.update();
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(-200, 65), new Enemy(-300, 65), new Enemy(-400, 65),
    new Enemy(-100, 145), new Enemy(-200, 145), new Enemy(-300, 145),
    new Enemy(-400, 225), new Enemy(-500, 225), new Enemy(-600, 225)
];
var player = new Player(200, 390, 4, 0);
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
    if (player.gameState === 1) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
    else if (player.gameState === 0) {
        select.handleInput(allowedKeys[e.keyCode]);
    }
});
