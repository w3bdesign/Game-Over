"use strict";

class Character {
  constructor() {
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

  // Enables the character to jump on a block
  jump() {
    if (
      this.y == height - this.size ||
      height - (this.y + this.size) == platforms[0].height
    ) {
      this.velocity = -20;
    }
  }

  // Gravity of the characters jump
  move() {
    this.y += this.velocity;
    this.velocity += this.gravity;
  }

  // Animates the character sprite
  show(characterSprite) {
    this.frames++;
    if (this.frames >= this.frameLimit) {
      this.frames = 0;
      this.currentLoopIndex++;
      if (this.currentLoopIndex >= this.run.length) {
        this.currentLoopIndex = 0;
      }
    }
    image(
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

  // Checking if the character is on a platform
  intersect() {
    for (let i = 0; i < platforms.length; i++) {
      if (
        this.y > platforms[i].height &&
        this.x + this.size / 2 > platforms[i].x &&
        this.x < platforms[i].x + platforms[i].w
      ) {
        return true;
      }
    }
  }

  // Checking if the character collide with the ground
  collide() {
    if (this.y - this.size >= height) {
      return true;
    }
  }
}
