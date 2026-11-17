
import { Search, Flame, ArrowUpRight } from "lucide-react";
import GameCard from "./GameCard";
import "./GameLibrary.css";

export default function GameLibrary({
  page,
  categories,
  category,
  setCategory,
  search,
  setSearch,
  games,
  onPlay,
  openPage,
}) {
  return (
    <section className="content-section" id="games">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <Flame size={15} /> EXPLORE OUR COLLECTION
          </div>

          <h2>
            {page === "home" ? (
              <>
                FEATURED <span className="purple">GAMES</span>
              </>
            ) : (
              <>
                ALL <span className="purple">GAMES</span>
              </>
            )}
          </h2>

          <p className="muted">
            Pick your game. Make your move. Beat your score.
          </p>
        </div>

        {page === "home" && (
          <button
            className="view-all"
            onClick={() => openPage("games")}
          >
            VIEW ALL <ArrowUpRight size={17} />
          </button>
        )}
      </div>

      <div className="filter-bar">
        <div className="categories">
          {categories.map((c) => (
            <button
              key={c}
              className={
                category === c ? "category active" : "category"
              }
              onClick={() => {
                setCategory(c);

                if (page === "home") {
                  openPage("games");
                }
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="search-box">
          <Search size={17} />

          <input
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="game-grid">
        {games.map((game, i) => (
          <GameCard
            key={game.id}
            game={game}
            index={i}
            onPlay={onPlay}
          />
        ))}

        {games.length === 0 && (
          <p className="empty">
            No games found. Try another search.
          </p>
        )}
      </div>
    </section>
  );
}
