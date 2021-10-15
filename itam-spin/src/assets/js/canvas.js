import Line from "./itam/Line";
import Dot from "./itam/Dot";

const canvas = document.createElement("canvas");
document.body.prepend(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const line = new Line();
const dots = [];

let animateId;
let isClick = false;

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

const radiuses = {
  inner: 80,
  outter: 100,
};

const animate = () => {
  animateId = window.requestAnimationFrame(animate);

  ctx.fillStyle = "#17072610";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  line.update(mouse.x, mouse.y);
  dots.forEach((dot) => {
    dot.update(mouse.x, mouse.y, isClick);
  });
};

const init = () => {
  ctx.fillStyle = "#170726";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 18; i++) {
    const dot = new Dot();
    if (i % 3 === 0) {
      dot.init(ctx, mouse.x, mouse.y, i, radiuses.inner, "right");
    } else {
      dot.init(ctx, mouse.x, mouse.y, i, radiuses.outter, "right");
    }
    dots[i] = dot;
  }
  line.init(ctx, dots, "#bc18be", "#1b99bd");
  animate();
};

init();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
});

canvas.addEventListener("mousedown", (e) => {
  isClick = true;
});

canvas.addEventListener("mouseup", (e) => {
  isClick = false;
});
