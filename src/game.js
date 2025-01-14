import { Character } from './character.js';
import { Platform } from './platform.js';

export class Game {
  constructor(p5Instance) {
    this.p = p5Instance;
    this.score = 0;
    this.platforms = [];
  }

  newGame() {
    const character = new Character(this.p);
    this.platforms = [new Platform(200, 150, this.p.width, 5)];
    return { character, platforms: this.platforms };
  }

  startScreen(fontRegular) {
    this.p.textSize(62);
    this.p.fill("#bc4d4f");
    this.p.textFont(fontRegular);
    this.p.text("Dino  Sky  Jumper", 75, 125);
    this.p.textSize(32);
    this.p.fill(255);
    this.p.textFont(fontRegular);
    this.p.text("Press  space  to  start  game", 110, 225);
    this.p.stroke("#222222");
    this.p.strokeWeight(2);
    this.p.textSize(24);
    this.p.fill(255);
    this.p.text("Press  SPACE  to  jump", 185, 270);
  }

  restartScreen(fontRegular) {
    this.p.textSize(32);
    this.p.fill(255);
    this.p.textFont(fontRegular);
    this.p.text("Game Over", 230, 165);
    this.p.stroke("#222222");
    this.p.textSize(24);
    this.p.fill(255);
    this.p.text(`Score   ${this.score} `, 265, 200);
    this.p.text("Press  SPACE  to  restart game", 140, 320);
    this.p.textSize(24);
    this.p.fill(255);
    this.p.text(this.score, 560, 40);
  }

  showCurrentScore(fontRegular) {
    this.p.textSize(18);
    this.p.fill(255);
    this.p.textFont(fontRegular);
    this.p.text("Score", 506, 39);
    this.p.textSize(22);
    this.p.fill(255);
    this.p.text(this.score, 560, 40);
  }

  addPlatform(height, width, platformWidth, speed) {
    this.platforms.push(
      new Platform(height, width, width * platformWidth, speed)
    );
  }

  updatePlatforms(platformImg) {
    for (let i = this.platforms.length - 1; i >= 0; i--) {
      this.platforms[i].show(platformImg, this.p);
      this.platforms[i].update();

      if (this.platforms[i].offCanvas()) {
        this.platforms.splice(i, 1);
        this.score++;
      }
    }
  }
}
