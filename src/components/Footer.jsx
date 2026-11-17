
import { Gamepad2 } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="gameverse-footer">
      <div className="footer-brand">
        <div className="brand-icon">
          <Gamepad2 size={22} />
        </div>

        <span>
          GAME<span className="footer-purple">VERSE</span>
        </span>
      </div>

      <p>
        © {new Date().getFullYear()} GAMEVERSE. Made for gamers.
      </p>

      <span className="footer-tag">
        PRESS START TO PLAY <span>●</span>
      </span>
    </footer>
  );
}
