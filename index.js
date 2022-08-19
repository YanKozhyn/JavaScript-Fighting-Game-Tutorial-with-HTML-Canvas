const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
  constructor({ postion, velocity }) {
    this.postion = postion;
    this.velocity = velocity;
    this.height = 150;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.postion.x, this.postion.y, 50, this.height);
  }

  update() {
    this.draw();
    this.postion.y += this.velocity.y;

    if (this.postion.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
}

const player = new Sprite({
  postion: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
});

const enemy = new Sprite({
  postion: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
});

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

animate();
