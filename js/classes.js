class Sprite {
  constructor({ postion, imageSrc, scale = 1, maxFrame = 1 }) {
    this.postion = postion;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.maxFrame = maxFrame;
    this.frameX = 0;
    this.frameY = 0;
    this.framesElapsed = 0;
    this.framesHold = 15;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frameX * (this.image.width / this.maxFrame),
      this.frameY,
      this.image.width / this.maxFrame - 1,
      this.image.height,
      this.postion.x,
      this.postion.y,
      (this.image.width / this.maxFrame) * this.scale,
      this.image.height * this.scale
    );
  }
  update() {
    this.draw();
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.frameX < this.maxFrame - 1) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }
  }
}

class Fighter {
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
    this.health = 100;
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

    if (this.postion.y + this.height + this.velocity.y >= canvas.height - 96) {
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
