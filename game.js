import { Paddle } from './paddle.js';
import { Ball } from './ball.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const leftPaddle = new Paddle(20, canvas.height / 2 - 50, 10, 100, 'black', canvas);
const rightPaddle = new Paddle(canvas.width - 30, canvas.height / 2 - 50, 10, 100, 'black', canvas);
const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 'black', canvas);
const MAX_BOUNCE_ANGLE = Math.PI / 4;

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame() {
  leftPaddle.move();
  rightPaddle.move();
  ball.move();


  // Check collision with left paddle
  if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
      ball.y + ball.radius > leftPaddle.y &&
      ball.y - ball.radius < leftPaddle.y + leftPaddle.height) {
    const relativeIntersectY = leftPaddle.y + leftPaddle.height / 2 - ball.y;
    const normalizedRelativeIntersectionY = relativeIntersectY / (leftPaddle.height / 2);
    const bounceAngle = normalizedRelativeIntersectionY * MAX_BOUNCE_ANGLE;
    ball.dx = Math.cos(bounceAngle) * ball.speed;
    ball.dy = -Math.sin(bounceAngle) * ball.speed;
  }
  // Check collision with right paddle
  else if (ball.x + ball.radius > rightPaddle.x &&
           ball.y + ball.radius > rightPaddle.y &&
           ball.y - ball.radius < rightPaddle.y + rightPaddle.height) {
    const relativeIntersectY = rightPaddle.y + rightPaddle.height / 2 - ball.y;
    const normalizedRelativeIntersectionY = relativeIntersectY / (rightPaddle.height / 2);
    const bounceAngle = normalizedRelativeIntersectionY * MAX_BOUNCE_ANGLE;
    ball.dx = -Math.cos(bounceAngle) * ball.speed;
    ball.dy = -Math.sin(bounceAngle) * ball.speed;
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
  
  // move the AI paddle
  aiMove();
}

function aiMove() {
  // calculate the center of the ball and the paddle
  const ballY = ball.y;
  const paddleY = rightPaddle.y + rightPaddle.height / 2;

  // move the paddle toward the ball
  if (ballY < paddleY - 35) {
    rightPaddle.dy = -5;
  } else if (ballY > paddleY + 35) {
    rightPaddle.dy = 5;
  } else {
    rightPaddle.dy = 0;
  }
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

// Add touch event listeners to the canvas
canvas.addEventListener('touchstart', touchStartHandler);
canvas.addEventListener('touchmove', touchMoveHandler);
canvas.addEventListener('touchend', touchEndHandler);

// Define touch event handlers
function touchStartHandler(event) {
  event.preventDefault();
  let touch = event.changedTouches[0];
  if (touch.clientX < canvas.width / 2) {
    // Player one touched the left side of the screen, move left paddle
    leftPaddle.dragging = true;
    leftPaddle.lastDragY = touch.clientY;
  }
}

function touchMoveHandler(event) {
  event.preventDefault();
  let touch = event.changedTouches[0];
  if (leftPaddle.dragging) {
    // Move the left paddle based on the touch drag distance
    let dy = touch.clientY - leftPaddle.lastDragY;
    leftPaddle.y += dy;
    leftPaddle.lastDragY = touch.clientY;
  }
}

function touchEndHandler(event) {
  event.preventDefault();
  leftPaddle.dragging = false;
}

function resizeWindow() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
  
  // Update the position of the right paddle
  rightPaddle.x = canvas.width - 30;
}

window.addEventListener('resize', function() {
  // Update the canvas size to fit the screen
  resizeWindow();
});

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

resizeWindow();

setInterval(updateGame, 10);
