
import { Flame, Play, Trophy } from "lucide-react";
import "./Hero.css";

export default function Hero({ openPage }) {
  return (
    <section className="hero">
      <div className="hero-content">

        <div className="eyebrow">
          <Flame size={15} />
          THE ULTIMATE GAMING ZONE
        </div>

        <h1>
          PLAY MORE.
          <br />
          <span className="gradient-text">LIVE THE GAME.</span>
        </h1>

        <p>
          Enter a world of endless fun. Discover awesome games,
          challenge yourself and set new high scores.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => openPage("games")}
          >
            <Play size={18} fill="currentColor" />
            PLAY NOW
          </button>

          <button
            className="secondary-btn"
            onClick={() => openPage("leaderboard")}
          >
            <Trophy size={18} />
            LEADERBOARD
          </button>

        </div>

        <div className="hero-stats">
          <div>
            <strong>10</strong>
            <span>FREE GAMES</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>FREE TO PLAY</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>FUN HOURS</span>
          </div>
        </div>
      </div>

      <div className="hero-art">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="hero-controller">🎮</div>
        <div className="floating-icon icon-one">🚀</div>
        <div className="floating-icon icon-two">👾</div>
        <div className="floating-icon icon-three">⚡</div>
        <div className="hero-glow" />
      </div>
    </section>
  );
}
