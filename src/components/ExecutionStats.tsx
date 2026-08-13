import {
  Activity,
  BarChart3,
  GitCompareArrows,
  ListOrdered,
} from "lucide-react";

interface ExecutionStatsProps {
  comparisons: number;
  swaps: number;
  accesses: number;
  steps: number;
  currentStep: number;
}

export default function ExecutionStats({
  comparisons,
  swaps,
  accesses,
  steps,
  currentStep,
}: ExecutionStatsProps) {
  const statistics = [
    {
      icon: <GitCompareArrows />,
      label: "Comparisons",
      value: comparisons,
    },
    {
      icon: <Activity />,
      label: "Swaps",
      value: swaps,
    },
    {
      icon: <BarChart3 />,
      label: "Array Accesses",
      value: accesses,
    },
    {
      icon: <ListOrdered />,
      label: "Current Step",
      value:
        steps === 0
          ? "—"
          : `${currentStep} / ${steps}`,
    },
  ];

  return (
    <div className="execution-stats">

      {statistics.map((stat) => (
        <div
          className="execution-stat"
          key={stat.label}
        >
          <div className="stat-icon">
            {stat.icon}
          </div>

          <div>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        </div>
      ))}

    </div>
  );
}