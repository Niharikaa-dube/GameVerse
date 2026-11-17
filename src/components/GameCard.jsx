
import { Flame, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import "./GameCard.css";

export default function GameCard({ game, index, onPlay }) {
  return (
    <motion.article
      className="game-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <div
        className="game-art"
        style={{ "--game-color": game.color }}
      >
        <div className="game-category">
          {game.category}
        </div>

        <span className="game-emoji">
          {game.emoji}
        </span>

        <div className="art-glow" />
      </div>

      <div className="game-info">

        <div className="game-title-row">
          <h3>{game.name}</h3>

          <span className="rating">
            <Star size={13} fill="currentColor" />
            {game.rating}
          </span>
        </div>

        <p>{game.description}</p>

        <div className="game-footer">

          <span className="player-count">
            <Flame size={14} />
            {game.players} players
          </span>

          <button
            className="game-play-btn"
            style={{ "--game-color": game.color }}
            onClick={() => onPlay(game)}
          >
            <Play size={15} fill="currentColor" />
            PLAY NOW
          </button>

        </div>
      </div>
    </motion.article>
  );
}
