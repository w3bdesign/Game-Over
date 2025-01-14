import { Character } from './character.js';
import { Platform } from './platform.js';

export class Game {
  constructor() {
    this.score = 0;
    this.platforms = [];
  }

  newGame() {
    const character = new Character();
    this.platforms = [new Platform(200, 150, width, 5)];
    return { character, platforms: this.platforms };
  }

  startScreen(fontRegular) {
    textSize(62);
    fill("#bc4d4f");
    textFont(fontRegular);
    text("Dino  Sky  Jumper", 75, 125);
    textSize(32);
    fill(255);
    textFont(fontRegular);
    text("Press  space  to  start  game", 110, 225);
    stroke("#222222");
    strokeWeight(2);
    textSize(24);
    fill(255);
    text("Press  SPACE  to  jump", 185, 270);
  }

  restartScreen(fontRegular) {
    textSize(32);
    fill(255);
    textFont(fontRegular);
    text("Game Over", 230, 165);
    stroke("#222222");
    textSize(24);
    fill(255);
    text(`Score   ${this.score} `, 265, 200);
    text("Press  SPACE  to  restart game", 140, 320);
    textSize(24);
    fill(255);
    text(this.score, 560, 40);
  }

  showCurrentScore(fontRegular) {
    textSize(18);
    fill(255);
    textFont(fontRegular);
    text("Score", 506, 39);
    textSize(22);
    fill(255);
    text(this.score, 560, 40);
  }

  addPlatform(height, width, platformWidth, speed) {
    this.platforms.push(
      new Platform(height, width, width * platformWidth, speed)
    );
  }

  updatePlatforms(platformImg) {
    for (let i = this.platforms.length - 1; i >= 0; i--) {
      this.platforms[i].show(platformImg);
      this.platforms[i].update();

      if (this.platforms[i].offCanvas()) {
        this.platforms.splice(i, 1);
        this.score++;
      }
    }
  }
}
