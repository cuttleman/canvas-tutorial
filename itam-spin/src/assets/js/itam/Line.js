class Line {
  constructor() {
    this.deg = 0;
  }

  update(updateX, updateY) {
    this.grad = this.ctx.createLinearGradient(
      updateX - 80,
      updateY - 80,
      updateX + 80,
      updateY + 80
    );
    this.grad.addColorStop("0", this.startColor);
    this.grad.addColorStop("1", this.endColor);
    this.draw();
  }

  pointToPoint(index, end) {
    this.ctx.lineTo(
      this.dots[index + 1 >= end ? 0 : index + 1].getPosition().x,
      this.dots[index + 1 >= end ? 0 : index + 1].getPosition().y
    );
  }

  draw() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(
        this.dots[0].getPosition().x,
        this.dots[0].getPosition().y
      );
      for (let i = 0; i < 18; i++) {
        this.pointToPoint(i, 18);
      }
      this.ctx.strokeStyle = this.grad;
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  init(ctx, dots, startColor, endColor) {
    this.ctx = ctx;
    this.dots = dots;
    this.startColor = startColor;
    this.endColor = endColor;
  }
}

export default Line;
