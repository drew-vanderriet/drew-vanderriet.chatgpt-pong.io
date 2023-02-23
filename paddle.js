export class Paddle {
  constructor(x, y, width, height, color, canvas) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.canvas = canvas; // Store canvas as an instance variable
    this.dy = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.dy;

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
    }
  }
}
