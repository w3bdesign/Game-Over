import { Game } from "./game.js";

let gameOverSound,
  jumpSound,
  themeSong,
  fontRegular,
  characterSprite,
  backgroundImg,
  platformImg,
  character,
  start = false,
  firstGame = true,
  spawnFrequency = 80,
  platformSpeed = 5,
  platformWidth = 0.5;

const game = new Game();

export const preload = () => {
  jumpSound = loadSound("/audio/jump.mp3");
  gameOverSound = loadSound("/audio/game_over.mp3");
  themeSong = loadSound("/audio/game_theme.mp3");
  fontRegular = loadFont("/fonts/arcadeclassic.ttf");
  characterSprite = loadImage("/images/DinoSprite.png");
  backgroundImg = loadImage("/images/background.png");
  platformImg = loadImage("/images/platform.png");
};

export const setup = () => {
  createCanvas(600, 450);
  themeSong.setVolume(0.2);
  themeSong.loop();
};

export const keyPressed = () => {
  if (key === " " && start) {
    jumpSound.play();
    jumpSound.setVolume(0.1);
    character.jump(game.platforms);
  }

  if (key === " " && !start) {
    start = true;
    game.score = 0;
    const { character: newCharacter, platforms } = game.newGame();
    character = newCharacter;
    firstGame = false;
    spawnFrequency = 80;
    platformSpeed = 5;
    platformWidth = 0.5;
    loop();
  }
};

export const draw = () => {
  clear();
  image(backgroundImg, 0, 0, width, height);

  if (!start && firstGame) {
    game.startScreen(fontRegular);
  } else {
    character.show(characterSprite);
    character.move();
    game.showCurrentScore(fontRegular);

    if (character.intersect(game.platforms)) {
      character.y = constrain(
        character.y,
        0,
        height - (game.platforms[0].height + character.size)
      );
    }

    if (character.collide()) {
      gameOverSound.play();
      gameOverSound.setVolume(0.05);
      game.platforms = [];
      start = false;
      game.restartScreen(fontRegular);
      noLoop();
    }
  }

  if (frameCount % spawnFrequency === 0) {
    if (game.score % 10 === 0 && game.score > 0) {
      platformSpeed++;
      spawnFrequency -= 10;

      if (platformWidth < 0.7) {
        platformWidth += 0.1;
      }
    }

    game.addPlatform(
      Math.floor(random(100, height / 2 - 50)),
      width,
      platformWidth,
      platformSpeed
    );
  }

  game.updatePlatforms(platformImg);
};
