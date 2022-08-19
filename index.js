const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
  constructor({ postion, velocity, color = 'red', offset }) {
    this.postion = postion;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      postion: {
        x: this.postion.x,
        y: this.postion.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.postion.x, this.postion.y, this.width, this.height);

    // attack box
     if (this.isAttacking) {
    ctx.fillStyle = 'white';
    ctx.fillRect(
      this.attackBox.postion.x,
      this.attackBox.postion.y,
      this.attackBox.width,
      this.attackBox.height
    );
     }
  }

  update() {
    this.draw();
    this.attackBox.postion.x = this.postion.x + this.attackBox.offset.x;
    this.attackBox.postion.y = this.postion.y;
    this.postion.x += this.velocity.x;
    this.postion.y += this.velocity.y;

    if (this.postion.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Sprite({
  postion: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
});

const enemy = new Sprite({
  postion: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: 'blue',
  offset: { x: -50, y: 0 },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.postion.x + rectangle1.attackBox.width >=
      rectangle2.postion.x &&
    rectangle1.attackBox.postion.x <= rectangle2.postion.x + rectangle2.width &&
    rectangle1.attackBox.postion.y + rectangle1.attackBox.height >=
      rectangle2.postion.y &&
    rectangle1.attackBox.postion.y <= rectangle2.postion.y + rectangle2.height
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  // player movement
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -2.5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 2.5;
  }

  //enemy movement
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -2.5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 2.5;
  }

  //detect for collision
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
  }
  if (
    rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    //player keys
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      if (player.velocity.y === 0) {
        player.velocity.y = -20;
      }
      break;
    case ' ':
      player.attack();
      break;

    //enemy keys
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      if (enemy.velocity.y === 0) {
        enemy.velocity.y = -20;
      }
    case 'ArrowDown':
      enemy.isAttacking = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  //player keys
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
  }

  //enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
});
