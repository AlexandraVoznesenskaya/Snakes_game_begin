
const begin = document.querySelector('#begin')
const screens = document.querySelectorAll('.screen')

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d")

const foods = ['img/apples.png','img/banans.png','img/strawbers.png'];
//Snake
let snakeImgHead = new Image();
snakeImgHead.src = "img/snake/head_45.png";

let snakeImgTors = new Image();
snakeImgTors.src = "img/snake/torso_45.png";

//Доска
const board = new Image();
board.src = "board_3.jpg";

let box = 45;

//Еда
let food = {
	x: Math.floor((Math.random() * 12)) * box,
	y: Math.floor((Math.random() * 12 + 1)) * box,
};

let foodImg = new Image();
foodImg.src = randomFood();

function randomFood() {
	let index = Math.floor(Math.random() * foods.length);
	return foods[index];
}

function drawGame() {
	ctx.drawImage(board, 0, 0);
	ctx.drawImage(foodImg,food.x,food.y);

	for (let i = 0; i < snake.length; i++) {
		if (i == 0) {
			ctx.drawImage(snakeImgHead, snake[0].x, snake[0].y)
		} else {
			ctx.drawImage(snakeImgTors, snake[i].x, snake[i].y)
			}
		}

document.addEventListener("keydown" , keyValue);

let direction;

function keyValue(event) {
	if (event.keyCode == 38 && direction != "down") {
		direction = "up";
	} else if (event.keyCode == 40 && direction != "up") {
		direction = "down";
	} else if (event.keyCode == 37 && direction!= "right" ) {
		direction = "left";
	} else if (event.keyCode == 39 && direction != "left") {
		direction = "right";
	}
}

	if (direction == "up") {
		snakeY += box;
	} else if(direction == "down"){
		snakeY -= box;
	} else if (direction == "left") {
		snakeX -= box ;
	} else if (direction == "right") {
		snakeX += box;
	}


let snake = [];
snake[0] = {
	x: 6 * box,
	y: 8 * box
}
let snakeX = snake[0].x;
let snakeY = snake[0].y;


let newHead = {
	x:snakeX,
	y:snakeY,
}

snake.unshift(newHead)
}

let game = setInterval(drawGame, 100);