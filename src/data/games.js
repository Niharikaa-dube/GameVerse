
export const gameList = [
  // Existing GameVerse games
  {
    id: "snake",
    name: "Neon Snake",
    category: "Arcade",
    emoji: "🐍",
    color: "#a3e635",
    rating: "4.9",
    players: "12K",
    description: "Grow your snake and beat your high score."
  },
  {
    id: "blocks",
    name: "Block Puzzle",
    category: "Puzzle",
    emoji: "🧩",
    color: "#a78bfa",
    rating: "4.8",
    players: "8K",
    description: "Combine number tiles to reach 2048."
  },
  {
    id: "tic",
    name: "Tic Tac Toe",
    category: "Casual",
    emoji: "⭕",
    color: "#38bdf8",
    rating: "4.7",
    players: "15K",
    description: "Challenge yourself in a classic game."
  },
  {
    id: "memory",
    name: "Memory Match",
    category: "Puzzle",
    emoji: "🧠",
    color: "#f472b6",
    rating: "4.9",
    players: "6K",
    description: "Find matching pairs of cards."
  },
  {
    id: "space",
    name: "Space Shooter",
    category: "Action",
    emoji: "🚀",
    color: "#fb923c",
    rating: "4.9",
    players: "20K",
    description: "Hit the moving targets in space."
  },
  {
    id: "breaker",
    name: "Brick Breaker",
    category: "Arcade",
    emoji: "🧱",
    color: "#facc15",
    rating: "4.8",
    players: "9K",
    description: "Break all the bricks with your ball."
  },

  // External games
  {
    id: "tetris",
    type: "external",
    name: "Tetris",
    category: "Arcade",
    emoji: "🟪",
    color: "#a78bfa",
    rating: "4.9",
    players: "New",
    description: "Arrange falling blocks and clear the lines.",
    src: "/external-games/tetris/index.html"
  },
  {
    id: "minesweeper",
    type: "external",
    name: "Minesweeper",
    category: "Puzzle",
    emoji: "💣",
    color: "#38bdf8",
    rating: "4.8",
    players: "New",
    description: "Find the mines without triggering them.",
    src: "/external-games/minesweeper/index.html"
  },
  {
    id: "pong",
    type: "external",
    name: "Pong",
    category: "Arcade",
    emoji: "🏓",
    color: "#22D3EE",
    rating: "4.7",
    players: "New",
    description: "Challenge the computer in classic Pong.",
    src: "/external-games/pong/index.html"
  },
  {
    id: "sudoku",
    type: "external",
    name: "Sudoku",
    category: "Puzzle",
    emoji: "🔢",
    color: "#f472b6",
    rating: "4.9",
    players: "New",
    description: "Test your logic with a number puzzle.",
    src: "/external-games/sudoku/index.html"
  }
];

export const categories = [
  "All Games",
  "Arcade",
  "Puzzle",
  "Action",
  "Casual"
];
