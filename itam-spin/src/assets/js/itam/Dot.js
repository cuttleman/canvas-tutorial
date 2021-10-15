class Dot {
  constructor() {
    this.deg = 0;
    this.shrink = 0;
  }

  update(updateX, updateY, isClick) {
    this.deg += this.direction === "right" ? 0.005 : -0.005;
    // this.draw();
    this.x = updateX;
    this.y = updateY;
    this.radius += this.shrink;
    if (isClick) {
      if (this.radius > this.initRadius - 50) {
        this.shrink = -2;
      } else {
        this.shrink = 0;
      }
    } else {
      this.shrink = 0;
      if (this.radius < this.initRadius) {
        this.radius += 1;
      }
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.x + Math.cos(Math.PI * (this.position / 9)) * this.radius,
      this.y + Math.sin(Math.PI * (this.position / 9)) * this.radius,
      2,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
  }

  getPosition() {
    return {
      x:
        this.x +
        Math.cos(Math.PI * (this.position / 9 + this.deg)) * this.radius,
      y:
        this.y +
        Math.sin(Math.PI * (this.position / 9 + this.deg)) * this.radius,
    };
  }

  init(ctx, x, y, position, radius, direction) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.position = position;
    this.radius = radius;
    this.initRadius = radius;
    this.direction = direction;
  }
}

export default Dot;
