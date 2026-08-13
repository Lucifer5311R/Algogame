import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RefreshCw,
  Shuffle,
} from "lucide-react";

interface SortingControlsProps {
  running: boolean;
  canPrevious: boolean;
  canNext: boolean;
  speed: number;

  onPlay: () => void;
  onPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  onGenerate: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function SortingControls({
  running,
  canPrevious,
  canNext,
  speed,
  onPlay,
  onPause,
  onPrevious,
  onNext,
  onReset,
  onGenerate,
  onSpeedChange,
}: SortingControlsProps) {
  return (
    <div className="sorting-controls">

      <div className="control-buttons">

        <button
          className="control-button"
          onClick={onGenerate}
          disabled={running}
        >
          <Shuffle size={15} />
          Generate
        </button>

        {!running ? (
          <button
            className="control-button primary"
            onClick={onPlay}
          >
            <Play size={15} fill="currentColor" />
            Play
          </button>
        ) : (
          <button
            className="control-button primary"
            onClick={onPause}
          >
            <Pause size={15} />
            Pause
          </button>
        )}

        <button
          className="control-button"
          onClick={onPrevious}
          disabled={!canPrevious || running}
          title="Previous step"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          className="control-button"
          onClick={onNext}
          disabled={!canNext || running}
          title="Next step"
        >
          <ChevronRight size={16} />
        </button>

        <button
          className="control-button"
          onClick={onReset}
        >
          <RefreshCw size={15} />
          Reset
        </button>

      </div>

      <label className="speed-control">
        <span>Speed</span>

        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(event) =>
            onSpeedChange(
              Number(event.target.value)
            )
          }
        />
      </label>

    </div>
  );
}