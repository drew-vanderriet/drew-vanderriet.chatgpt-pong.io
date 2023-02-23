export class Ball {
  constructor(x, y, radius, color, canvas) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.canvas = canvas; // Store canvas as an instance variable
    this.dx = 5;
    this.dy = 5;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.y < this.radius || this.y + this.radius > canvas.height) {
      this.dy = -this.dy;
    }

    if (this.x < this.radius || this.x + this.radius > canvas.width) {
      this.dx = -this.dx;
    }
  }
}
