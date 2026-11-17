
import { Trophy, Star, Crown, Clock } from "lucide-react";
import "./Leaderboard.css";

export default function Leaderboard({
  scores,
  totalScore,
  playHistory = [],
}) {
  const bestScore = scores.length
    ? Math.max(...scores.map((s) => s.score))
    : 0;

  const recentGames = [...playHistory]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);

  const recentScores = [...scores].reverse().slice(0, 10);

  return (
    <section className="content-section leaderboard-page">
      <div className="eyebrow">
        <Trophy size={15} /> YOUR ACHIEVEMENTS
      </div>

      <h1>
        LEADER<span className="purple">BOARD</span>
      </h1>

      <p className="muted">
        Your gaming journey, all in one place.
      </p>

      <div className="stats-row">
        <div className="stat-card">
          <Trophy />
          <strong>{playHistory.length}</strong>
          <span>Games played</span>
        </div>

        <div className="stat-card">
          <Star />
          <strong>{totalScore}</strong>
          <span>Total score</span>
        </div>

        <div className="stat-card">
          <Crown />
          <strong>{bestScore}</strong>
          <span>Best score</span>
        </div>
      </div>

      {/* Recently Played */}
      <div className="score-table">
        <h3>
          <Clock size={16} /> RECENTLY PLAYED
        </h3>

        {recentGames.length === 0 ? (
          <p className="empty">
            No games played yet. Start playing to see your activity!
          </p>
        ) : (
          recentGames.map((item, index) => (
            <div className="score-row" key={item.id}>
              <span className="rank">
                #{index + 1}
              </span>

              <strong>{item.game}</strong>

              <span>{item.date}</span>

              <b>Played</b>
            </div>
          ))
        )}
      </div>

      {/* Actual Scores */}
      <div className="score-table">
        <h3>
          <Star size={16} /> RECENT SCORES
        </h3>

        {recentScores.length === 0 ? (
          <p className="empty">
            No scores yet. Complete a game to see your achievements!
          </p>
        ) : (
          recentScores.map((item, index) => (
            <div className="score-row" key={index}>
              <span className="rank">
                #{index + 1}
              </span>

              <strong>{item.game}</strong>

              <span>{item.date}</span>

              <b>{item.score} pts</b>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
