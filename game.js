import { Paddle } from './paddle.js';
import { Ball } from './ball.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const leftPaddle = new Paddle(20, canvas.height / 2 - 50, 10, 100, 'white', canvas);
const rightPaddle = new Paddle(canvas.width - 30, canvas.height / 2 - 50, 10, 100, 'white', canvas);
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 'white', canvas);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame() {
  leftPaddle.move();
  rightPaddle.move();
  ball.move();

  if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
      ball.y + ball.radius > leftPaddle.y &&
      ball.y - ball.radius < leftPaddle.y + leftPaddle.height) {
    ball.dx = -ball.dx;
  } else if (ball.x + ball.radius > rightPaddle.x &&
             ball.y + ball.radius > rightPaddle.y &&
             ball.y - ball.radius < rightPaddle.y + rightPaddle.height) {
    ball.dx = -ball.dx;
  }

  clearCanvas();
  leftPaddle.draw(ctx);
  rightPaddle.draw(ctx);
  ball.draw(ctx);
}

function keyDownHandler(event) {
  if (event.key === 'w') {
    leftPaddle.dy = -5;
  } else if (event.key === 's') {
    leftPaddle.dy = 5;
  } else if (event.key === 'ArrowUp') {
    rightPaddle.dy = -5;
  } else if (event.key === 'ArrowDown') {
    rightPaddle.dy = 5;
  }
}

function keyUpHandler(event) {
  if (event.key === 'w' || event.key === 's') {
    leftPaddle.dy = 0;
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    rightPaddle.dy = 0;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

setInterval(updateGame, 10);
