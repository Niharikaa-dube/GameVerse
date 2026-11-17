
import { useRef } from "react";
import { ArrowLeft, Maximize2 } from "lucide-react";
import "./ExternalGame.css";

export default function ExternalGame({ game, onExit }) {
  const frameRef = useRef(null);

  const enterFullscreen = () => {
    if (frameRef.current?.requestFullscreen) {
      frameRef.current.requestFullscreen();
    }
  };

  return (
    <section className="external-game">
      <div className="external-game-header">
        <button onClick={onExit}>
          <ArrowLeft size={17} />
          Back to GameVerse
        </button>

        <h2>{game.name}</h2>

        <button onClick={enterFullscreen}>
          <Maximize2 size={17} />
          Fullscreen
        </button>
      </div>

      <iframe
        ref={frameRef}
        src={game.src}
        title={game.name}
        allow="fullscreen; gamepad"
        allowFullScreen
      />
    </section>
  );
}
