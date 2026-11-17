# GameVerse – Modular React Project

## Run locally
1. Open this folder in VS Code.
2. Run `npm install` (if dependencies are not installed).
3. Run `npm run dev`.
4. Open the localhost URL shown by Vite.

## Source structure
- `src/App.jsx`: app state and page composition
- `src/components/`: Navbar, Hero, GameCard, GameLibrary, Leaderboard, Footer (each has JSX and CSS files)
- `src/data/games.js`: game catalogue and categories
- `src/games/Games.jsx`: existing six-game engine
- `src/styles.css`: existing shared visual styles preserved from the original project
- `src/index.css`: global reset and base styles

The existing game logic and visual theme have been retained while the main interface has been split into reusable components.
