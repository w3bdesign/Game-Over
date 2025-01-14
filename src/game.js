"use strict";

class Game {
  constructor() {
    this.score = 0;
  }

  newGame() {
    character = new Character();
    platforms.push(new Platform(200, 150, width, 5));
  }

  startScreen() {
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

  restartScreen() {
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

  showCurrentScore() {
    textSize(18);
    fill(255);
    textFont(fontRegular);
    text("Score", 506, 39);
    textSize(22);
    fill(255);
    text(this.score, 560, 40);
  }
}
