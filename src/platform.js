export class Platform {
  constructor(h, x, w, speed) {
    this.height = h;
    this.x = x;
    this.w = w;
    this.speed = speed;
  }

  show(platform, p) {
    p.image(platform, this.x, p.height - this.height, this.w, this.height / 2);
  }

  update() {
    this.x -= this.speed;
  }

  offCanvas() {
    return this.x < -this.w;
  }
}
