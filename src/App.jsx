
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GameLibrary from "./components/GameLibrary";
import Leaderboard from "./components/Leaderboard";
import Footer from "./components/Footer";
import ExternalGame from "./components/ExternalGame";

import Games from "./games/Games";
import { gameList, categories } from "./data/games";

import "./App.css";
import "./styles.css";

export default function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [category, setCategory] = useState("All Games");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);

  // Existing scores
  const [scores, setScores] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("gameverse-scores")
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  // New recently played history
  const [playHistory, setPlayHistory] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("gameverse-history")
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  // Save scores
  useEffect(() => {
    localStorage.setItem(
      "gameverse-scores",
      JSON.stringify(scores)
    );
  }, [scores]);

  // Save play history
  useEffect(() => {
    localStorage.setItem(
      "gameverse-history",
      JSON.stringify(playHistory)
    );
  }, [playHistory]);

  // Save a completed game score
  const saveScore = (game, score) => {
    setScores((old) => [
      ...old,
      {
        game,
        score,
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  // Record every game launch
  const handlePlay = (game) => {
    const playedAt = new Date();

    setPlayHistory((old) => [
      {
        id: `${playedAt.getTime()}-${Math.random()}`,
        game: game.name,
        date: playedAt.toLocaleDateString(),
        timestamp: playedAt.getTime(),
      },
      ...old,
    ]);

    setActiveGame(game);
  };

  const filteredGames = gameList.filter(
    (game) =>
      (category === "All Games" || game.category === category) &&
      game.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalScore = scores.reduce(
    (sum, item) => sum + item.score,
    0
  );

  const openPage = (name) => {
    setPage(name);
    setActiveGame(null);
    setMobileMenu(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      <Navbar
        page={page}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        openPage={openPage}
      />

      <main>
        {activeGame ? (
          activeGame.type === "external" ? (
            <ExternalGame
              game={activeGame}
              onExit={() => setActiveGame(null)}
            />
          ) : (
            <Games
              game={activeGame}
              onExit={() => setActiveGame(null)}
              onSaveScore={saveScore}
            />
          )
        ) : page === "leaderboard" ? (
          <Leaderboard
            scores={scores}
            totalScore={totalScore}
            playHistory={playHistory}
          />
        ) : (
          <>
            {page === "home" && (
              <Hero openPage={openPage} />
            )}

            <GameLibrary
              page={page}
              categories={categories}
              category={category}
              setCategory={setCategory}
              search={search}
              setSearch={setSearch}
              games={filteredGames}
              onPlay={handlePlay}
              openPage={openPage}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
