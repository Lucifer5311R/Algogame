import type { SortStep } from "../algorithms/sorting";

interface SortingVisualizerProps {
  step: SortStep;
  maxValue: number;
}

export default function SortingVisualizer({
  step,
  maxValue,
}: SortingVisualizerProps) {
  return (
    <div className="sorting-visualizer">
      <div className="visualizer-grid">

        {step.array.map((value, index) => {
          const comparing =
            step.comparing.includes(index);

          const swapping =
            step.swapping.includes(index);

          const sorted =
            step.sorted.includes(index);

          const height =
            (value / maxValue) * 100;

          let className = "visual-bar";

          if (comparing) {
            className += " comparing";
          }

          if (swapping) {
            className += " swapping";
          }

          if (sorted) {
            className += " sorted";
          }

          return (
            <div
              key={index}
              className="bar-wrapper"
            >
              <div
                className={className}
                style={{
                  height: `${height}%`,
                }}
              >
                {step.array.length <= 25 && (
                  <span className="bar-value">
                    {value}
                  </span>
                )}
              </div>
            </div>
          );
        })}

      </div>

      <div className="visualizer-legend">
        <div>
          <span className="legend comparing" />
          Comparing
        </div>

        <div>
          <span className="legend swapping" />
          Swapping
        </div>

        <div>
          <span className="legend sorted" />
          Sorted
        </div>
      </div>
    </div>
  );
}