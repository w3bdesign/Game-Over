# Dino Sky Jumper

A fun platformer game where you control a dinosaur jumping between platforms. Test your timing and reflexes as you try to achieve the highest score!

## Technologies

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [p5.js](https://p5js.org/) - Creative coding library for graphics and interactivity
- Modern JavaScript with ES modules

## Installation

Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed, then:

```bash
# Clone the repository
git clone https://github.com/yourusername/dino-sky-jumper.git

# Navigate to project directory
cd dino-sky-jumper

# Install dependencies
pnpm install
```

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## How to Play

- Press SPACE to start the game
- Press SPACE to make the dinosaur jump
- Time your jumps to land on platforms
- Avoid falling into the gaps
- Score points by surviving longer
- Game gets progressively harder with increased speed and larger gaps

## Game Features

- Smooth character animation
- Progressive difficulty
- Sound effects and background music
- Score tracking
- Retro arcade-style graphics
- Responsive controls

## Project Structure

```
dino-sky-jumper/
├── src/               # Source files
│   ├── character.js   # Character class and movement logic
│   ├── game.js       # Game state management
│   ├── platform.js   # Platform generation and physics
│   ├── index.js      # Main game initialization
│   └── style.css     # Game styles
├── public/           # Static assets
│   ├── audio/        # Sound effects and music
│   ├── fonts/        # Custom fonts
│   └── images/       # Game sprites and backgrounds
└── index.html        # Entry point
