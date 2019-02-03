// Enemies our player must avoid

var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.positionX = 0;
  this.positionY = 0;
  this.sprite = 'images/enemy-bug.png';
  this.speed = Math.floor((Math.random() * 100) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.positionX <= 405) {
    this.positionX += this.speed * dt;
  } else {
    this.positionX = -2;
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

  constructor() {
    this.positionX = 102 * 2;
    this.positionY = 83 * 5 - 10;
    this.sprite = 'images/char-boy.png';
  }
  update() {

  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
  }
  handleInput(keyPress) {
    if (keyPress == 'left' && this.positionX > 0) {
      this.positionX -= 102;
    };

    if (keyPress == 'right' && this.positionX < 405) {
      this.positionX += 102;
    };

    if (keyPress == 'up' && this.positionY > 0) {
      this.positionY -= 83;
    };

    if (keyPress == 'down' && this.positionY < 405) {
      this.positionY += 83;
    };
  }
}
const player = new Player();
const enemy = new Enemy();
const allEnemies = [];
allEnemies.push(enemy);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
