import 'p5';
import 'p5/lib/addons/p5.sound';
import { Game } from './game.js';

// Game assets loaded through p5.js media functions
const gameAssets = {
  audio: {
    jumpSound: null,      // Sound played when character jumps
    gameOverSound: null,  // Sound played on game over
    backgroundMusic: null // Background music track
  },
  visuals: {
    characterSprite: null, // Character animation sprite sheet
    backgroundImage: null, // Game background image
    platformImage: null    // Platform sprite
  },
  fonts: {
    arcadeFont: null      // Custom arcade-style font
  }
};

// Game state management
const gameState = {
  isGameActive: false,
  isFirstPlaythrough: true,
  platformGeneration: {
    movementSpeed: 5,
    platformSize: 0.5,
    minimumSize: 0.5,
    maximumSize: 0.7,
    speedIncrease: 1,
    sizeIncrease: 0.1,
    minGapSize: 200,       // Minimum gap between platforms
    maxGapSize: 300        // Maximum gap between platforms
  }
};

// Game objects
let gameManager;
let playerCharacter;
let lastPlatformEnd = 0;    // Track the last platform's right edge

// p5.js preload function: Loads all game assets before starting
window.preload = () => {
  try {
    // Load all audio files using p5.js sound loader
    gameAssets.audio.jumpSound = loadSound("/audio/jump.mp3");
    gameAssets.audio.gameOverSound = loadSound("/audio/game_over.mp3");
    gameAssets.audio.backgroundMusic = loadSound("/audio/game_theme.mp3");

    // Load all images using p5.js image loader
    gameAssets.visuals.characterSprite = loadImage("/images/DinoSprite.png");
    gameAssets.visuals.backgroundImage = loadImage("/images/background.png");
    gameAssets.visuals.platformImage = loadImage("/images/platform.png");

    // Load custom font using p5.js font loader
    gameAssets.fonts.arcadeFont = loadFont("/fonts/arcadeclassic.ttf");
  } catch (error) {
    console.error('Error loading assets:', error);
  }
};

// p5.js setup function: Called once when the game starts
window.setup = () => {
  // Create the game canvas using p5.js
  createCanvas(600, 450);
  
  // Initialize game components
  gameManager = new Game(window);
  
  // Start background music
  if (gameAssets.audio.backgroundMusic) {
    gameAssets.audio.backgroundMusic.setVolume(0.2);
    gameAssets.audio.backgroundMusic.loop();
  }
};

// p5.js keyPressed function: Handles keyboard input
window.keyPressed = () => {
  // Space bar controls
  if (key === " ") {
    if (gameState.isGameActive) {
      handleJumpAction();
    } else {
      startNewGame();
    }
  }
};

const handleJumpAction = () => {
  if (gameAssets.audio.jumpSound) {
    gameAssets.audio.jumpSound.setVolume(0.1);
    gameAssets.audio.jumpSound.play();
  }
  playerCharacter.jump(gameManager.platforms);
};

const startNewGame = () => {
  gameState.isGameActive = true;
  gameManager.score = 0;
  
  // Create new character and reset game state
  const { character } = gameManager.newGame();
  playerCharacter = character;
  
  gameState.isFirstPlaythrough = false;
  resetPlatformGeneration();
  lastPlatformEnd = width;  // Reset last platform position
  
  // Start p5.js animation loop
  loop();
};

const resetPlatformGeneration = () => {
  gameState.platformGeneration = {
    movementSpeed: 5,
    platformSize: 0.5,
    minimumSize: 0.5,
    maximumSize: 0.7,
    speedIncrease: 1,
    sizeIncrease: 0.1,
    minGapSize: 200,
    maxGapSize: 300
  };
};

// p5.js draw function: Game's main update loop
window.draw = () => {
  // Clear previous frame and draw background
  clear();
  if (gameAssets.visuals.backgroundImage) {
    image(
      gameAssets.visuals.backgroundImage,
      0,
      0,
      width,
      height
    );
  }

  if (!gameState.isGameActive && gameState.isFirstPlaythrough) {
    gameManager.startScreen(gameAssets.fonts.arcadeFont);
  } else {
    updateGameplay();
  }
};

const updateGameplay = () => {
  // Update character
  if (gameAssets.visuals.characterSprite) {
    playerCharacter.show(gameAssets.visuals.characterSprite);
    playerCharacter.move();
  }
  
  // Show score
  gameManager.showCurrentScore(gameAssets.fonts.arcadeFont);

  // Handle platform collision
  if (playerCharacter.intersect(gameManager.platforms)) {
    const platformHeight = gameManager.platforms[0].height;
    playerCharacter.y = constrain(
      playerCharacter.y,
      0,
      height - (platformHeight + playerCharacter.size)
    );
  }

  // Check for game over
  if (playerCharacter.collide()) {
    handleGameOver();
  }

  // Update platforms and check if we need new ones
  if (gameAssets.visuals.platformImage) {
    gameManager.updatePlatforms(gameAssets.visuals.platformImage);
    
    // Update last platform end position based on platform movement
    lastPlatformEnd -= gameState.platformGeneration.movementSpeed;
    
    // Check if we need to generate a new platform
    if (lastPlatformEnd <= width) {
      updateDifficulty();
      generatePlatform();
    }
  }
};

const updateDifficulty = () => {
  const { platformGeneration } = gameState;
  if (gameManager.score % 10 === 0 && gameManager.score > 0) {
    platformGeneration.movementSpeed += platformGeneration.speedIncrease;

    if (platformGeneration.platformSize < platformGeneration.maximumSize) {
      platformGeneration.platformSize += platformGeneration.sizeIncrease;
    }

    // Keep gaps challenging but possible
    platformGeneration.minGapSize = Math.min(300, platformGeneration.minGapSize + 10);
    platformGeneration.maxGapSize = Math.min(400, platformGeneration.maxGapSize + 10);
  }
};

const generatePlatform = () => {
  const { platformGeneration } = gameState;
  const platformHeight = Math.floor(
    random(100, height / 2 - 50)
  );
  
  // Calculate platform width
  const platformWidth = width * platformGeneration.platformSize;
  
  // Add random gap before the platform
  const gapSize = random(platformGeneration.minGapSize, platformGeneration.maxGapSize);
  lastPlatformEnd = width + platformWidth + gapSize;
  
  gameManager.addPlatform(
    platformHeight,
    width + gapSize,  // Start platform after the gap
    platformGeneration.platformSize,
    platformGeneration.movementSpeed
  );
};

const handleGameOver = () => {
  if (gameAssets.audio.gameOverSound) {
    gameAssets.audio.gameOverSound.setVolume(0.05);
    gameAssets.audio.gameOverSound.play();
  }
  gameManager.platforms = [];
  gameState.isGameActive = false;
  gameManager.restartScreen(gameAssets.fonts.arcadeFont);
  noLoop();
};
