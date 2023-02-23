import { Paddle } from './paddle.js';
import { Ball } from './ball.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const leftPaddle = new Paddle(20, canvas.height / 2 - 50, 10, 100, 'black', canvas);
const rightPaddle = new Paddle(canvas.width - 30, canvas.height / 2 - 50, 10, 100, 'black', canvas);
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 'black', canvas);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame() {
  leftPaddle.move();
  rightPaddle.move();
  ball.move();

  // Check for ball colliding with left paddle
  if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
      ball.y + ball.radius > leftPaddle.y &&
      ball.y - ball.radius < leftPaddle.y + leftPaddle.height) {
    ball.dx = -ball.dx;
  } 
  // Check for ball colliding with right paddle
  else if (ball.x + ball.radius > rightPaddle.x &&
             ball.y + ball.radius > rightPaddle.y &&
             ball.y - ball.radius < rightPaddle.y + rightPaddle.height) {
    ball.dx = -ball.dx;
  }
  // Check for ball going past left paddle
  else if (ball.x - ball.radius < 0) {
    ball.rightScore++; // Increment right paddle score
    ball.x = canvas.width / 2; // Reset ball position
    ball.y = canvas.height / 2;
  }
  // Check for ball going past right paddle
  else if (ball.x + ball.radius > canvas.width) {
    ball.leftScore++; // Increment left paddle score
    ball.x = canvas.width / 2; // Reset ball position
    ball.y = canvas.height / 2;
  }

  clearCanvas();
  leftPaddle.draw(ctx);
  rightPaddle.draw(ctx);
  ball.draw(ctx);

  // Display scores on screen
  ctx.fillStyle = 'black';
  ctx.font = '32px Arial';
  ctx.fillText(`Player 1: ${ball.leftScore}`, 32, 32);
  ctx.fillText(`Player 2: ${ball.rightScore}`, canvas.width - 200, 32);
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
