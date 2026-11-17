
import {
  Gamepad2,
  Home,
  Grid3X3,
  Trophy,
  Menu,
  X
} from "lucide-react";

import "./Navbar.css";

export default function Navbar({
  page,
  mobileMenu,
  setMobileMenu,
  openPage
}) {

  const navigate = (target) => {
    openPage(target);
    setMobileMenu(false);
  };

  return (
    <header className="navbar">

      {/* BRAND */}
      <div
        className="brand"
        onClick={() => navigate("home")}
      >
        <div className="brand-icon">
          <Gamepad2 size={25} />
        </div>

        <span>
          GAME<span className="purple">VERSE</span>
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className={mobileMenu ? "nav-links show" : "nav-links"}>

        <button
          className={`nav-btn nav-home ${page === "home" ? "nav-active" : ""}`}
          onClick={() => navigate("home")}
        >
          <Home size={18} />
          <span>Home</span>
        </button>

        <button
          className={`nav-btn nav-games ${page === "games" ? "nav-active" : ""}`}
          onClick={() => navigate("games")}
        >
          <Grid3X3 size={18} />
          <span>Games</span>
        </button>

        <button
          className={`nav-btn nav-leaderboard ${page === "leaderboard" ? "nav-active" : ""}`}
          onClick={() => navigate("leaderboard")}
        >
          <Trophy size={18} />
          <span>Leaderboard</span>
        </button>

        <button
          className="mobile-close"
          onClick={() => setMobileMenu(false)}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

      </nav>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        <div className="online">
          <span className="online-dot" />
          ONLINE
        </div>

        <button
          className="menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenu}
        >
          {mobileMenu ? <X size={23} /> : <Menu size={23} />}
        </button>

      </div>

    </header>
  );
}
