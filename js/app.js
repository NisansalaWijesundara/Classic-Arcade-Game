// Enemies our player must avoid
var Enemy = function(positionX, positionY, speed) {
	this.positionX = positionX;
	this.positionY = positionY + 60;
	this.sprite = 'images/enemy-bug.png';
	this.speed = speed;
};
// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
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
class Player {
	constructor() {
		this.positionX = 102 * 2;
		this.positionY = 83 * 5 - 10;
		this.sprite = 'images/char-boy.png';
		this.complete = false;
	}
	/*collision*/
	update() {
		for (let enemy of allEnemies) {
			if (this.positionX < enemy.positionX + 50 && this.positionX + 50 > enemy.positionX && this.positionY < enemy.positionY + 60 && this.positionY + 60 > enemy.positionY) {
				this.reset();
			}
		}
		if (this.positionY === -10) {
			const winScreen = document.querySelector('#winScreen');
			winScreen.classList.add('show');
			const buttonPlayAgain = document.querySelector('#playAgain');
			buttonPlayAgain.focus();
			buttonPlayAgain.addEventListener('click', function() {
				winScreen.classList.remove('show');
				player.reset();
			});
		}
	}
	/*display the player on the game board*/
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
	}
	/*move the player through the keybard*/
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
	/*reset player back to the starting point after the collision*/
	reset() {
		this.positionX = 102 * 2;
		this.positionY = 83 * 5 - 10;
	}
}
const player = new Player();
const enemy1 = new Enemy(-102, 170, 100);
const enemy2 = new Enemy((-102 * 3), 83, 130);
const enemy3 = new Enemy(-102, 83, 130);
const enemy4 = new Enemy(-102, 0, 300);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);
// This listens for key presses and sends the keys to player
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});

function startScreen() {
	const startScreen = document.querySelector('#startScreen');
	startScreen.classList.add('show');
	const buttonPlay = document.querySelector('#playGame');
	buttonPlay.focus();
	buttonPlay.addEventListener('click', function() {
		startScreen.classList.remove('show');
	});
}
window.onload = startScreen();
