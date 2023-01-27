const begin = document.querySelector('#begin')
const screen = document.querySelector('.screen')

begin.addEventListener('click', run);

function run(){
	screen.classList.add('up');
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const heads = ['img/snake/head_45.png', 'img/snake/head_451.png', 'img/snake/head_452.png','img/snake/head_453.png'];

const foods = ['img/apples.png','img/banans.png','img/strawbers.png'];
const ground = new Image();
ground.src = "board_3.jpg";

let foodImg = new Image();
foodImg.src = randomFood();

function randomFood() {
	let index = Math.floor(Math.random() * foods.length);
	return foods[index];
}

let snakeImgHead = new Image();
snakeImgHead.src = 'img/snake/head_45.png'

let snakeImgTors = new Image();
snakeImgTors.src = "img/snake/torso_45.png";

let box = 45;

let score = 0;

let food = {
	x: Math.floor((Math.random() * 12)) * box,
	y: Math.floor((Math.random() * 12 + 1)) * box,
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);

	for(let i = 0; i < snake.length; i++) {
		if (i == 0) {
			ctx.drawImage(snakeImgHead, snake[0].x, snake[0].y)
		} else {
			ctx.drawImage(snakeImgTors, snake[i].x, snake[i].y)
			}
	}

	ctx.fillStyle = "white";
	ctx.font = "40px Arial";
	ctx.fillText(score, box, box);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y) {
		score++;
		foodImg.src = randomFood();
		food = {
			x: Math.floor((Math.random() * 12)) * box,
			y: Math.floor((Math.random() * 12 + 1)) * box,
		};

	} else
		snake.pop();

	if(snakeX < -box || snakeX > box * 11
		|| snakeY < box || snakeY > box * 12)
		clearInterval(game);

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	if(dir == "left") snakeImgHead.src = 'img/snake/head_451.png';
	if(dir == "right") snakeImgHead.src = 'img/snake/head_452.png';
	if(dir == "up")  snakeImgHead.src = 'img/snake/head_45.png';
	if(dir == "down") snakeImgHead.src = 'img/snake/head_453.png';


	let newHead = {
		x: snakeX,
		y: snakeY
	};
	


	eatTail(newHead, snake);

	snake.unshift(newHead);
}

let game = setInterval(drawGame, 200);

const updateBut =  document.createElement('button');
updateBut.innerHTML = "Start over";
updateBut.style.width = '200px';
updateBut.style.height = '40px';
updateBut.style.fontSize = '20px';
updateBut.style.marginTop = '8px';
updateBut.style.backgroundColor= '#1e546b';
updateBut.style.color= 'white';
updateBut.style.borderRadius= '50%';

canvas.before(updateBut);




