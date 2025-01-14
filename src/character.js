export class Character {
  constructor(p5Instance) {
    this.p = p5Instance;
    this.size = 60;
    this.x = this.size;
    this.y = 0;
    this.velocity = 0;
    this.gravity = 1;
    this.run = [17, 18, 19, 20, 21, 22];
    this.frameLimit = 6;
    this.frames = 0;
    this.currentLoopIndex = 0;
  }

  jump(platforms) {
    if (
      this.y === this.p.height - this.size ||
      this.p.height - (this.y + this.size) === platforms[0]?.height
    ) {
      this.velocity = -20;
    }
  }

  move() {
    this.y += this.velocity;
    this.velocity += this.gravity;
  }

  show(characterSprite) {
    this.frames++;
    if (this.frames >= this.frameLimit) {
      this.frames = 0;
      this.currentLoopIndex++;
      if (this.currentLoopIndex >= this.run.length) {
        this.currentLoopIndex = 0;
      }
    }
    this.p.image(
      characterSprite,
      this.x,
      this.y,
      this.size,
      this.size + 10,
      24 * this.run[this.currentLoopIndex] + 1,
      0,
      24
    );
  }

  intersect(platforms) {
    return platforms.some(platform => 
      this.y > platform.height &&
      this.x + this.size / 2 > platform.x &&
      this.x < platform.x + platform.w
    );
  }

  collide() {
    return this.y - this.size >= this.p.height;
  }
}
