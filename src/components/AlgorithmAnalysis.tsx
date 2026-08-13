import type { SortAlgorithm } from "../algorithms/sorting";

interface AlgorithmAnalysisProps {
  algorithm: SortAlgorithm;
}

interface Analysis {
  name: string;
  idea: string;
  bestFor: string;
  watchOutFor: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  stable: string;
  inPlace: string;
  adaptive: string;
}

const analysis: Record<
  SortAlgorithm,
  Analysis
> = {
  bubble: {
    name: "Bubble Sort",

    idea:
      "Repeatedly compare adjacent elements and swap them when they are in the wrong order.",

    bestFor: "Tiny arrays and nearly sorted inputs where simplicity matters more than speed.",
    watchOutFor: "Large unsorted datasets, where its quadratic behavior becomes expensive.",

    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",

    stable: "Yes",
    inPlace: "Yes",
    adaptive: "Yes",
  },

  selection: {
    name: "Selection Sort",

    idea:
      "Find the minimum element from the unsorted portion and place it at the beginning.",

    bestFor: "When swaps are expensive and you want a predictable number of writes.",
    watchOutFor: "Large inputs, because it still scans the remaining array on every pass.",

    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",

    stable: "No",
    inPlace: "Yes",
    adaptive: "No",
  },

  insertion: {
    name: "Insertion Sort",

    idea:
      "Build the sorted portion one element at a time by inserting each element into its correct position.",

    bestFor: "Small or nearly sorted arrays, especially in adaptive teaching examples.",
    watchOutFor: "Random large arrays, where repeated shifting dominates runtime.",

    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",

    stable: "Yes",
    inPlace: "Yes",
    adaptive: "Yes",
  },

  merge: {
    name: "Merge Sort",

    idea:
      "Divide the array into smaller subarrays, recursively sort them, and merge the sorted parts.",

    bestFor: "Consistently fast sorting when you want a guaranteed O(n log n) result.",
    watchOutFor: "Memory-constrained situations, because it needs extra space for merging.",

    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",

    stable: "Yes",
    inPlace: "No",
    adaptive: "No",
  },

  quick: {
    name: "Quick Sort",

    idea:
      "Choose a pivot, partition the array around it, and recursively sort the resulting subarrays.",

    bestFor: "Average-case performance on general-purpose data with good pivot choices.",
    watchOutFor: "Already sorted or adversarial inputs if pivot selection is poor.",

    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",

    stable: "No",
    inPlace: "Yes",
    adaptive: "No",
  },

  heap: {
    name: "Heap Sort",

    idea:
      "Build a binary heap and repeatedly extract the maximum element to produce the sorted array.",

    bestFor: "When you need guaranteed O(n log n) sorting with constant extra space.",
    watchOutFor: "Cases where stability matters or where simpler cache-friendly algorithms perform better.",

    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",

    stable: "No",
    inPlace: "Yes",
    adaptive: "No",
  },
};

export default function AlgorithmAnalysis({
  algorithm,
}: AlgorithmAnalysisProps) {
  const data = analysis[algorithm];

  return (
    <section className="algorithm-analysis">

      <div className="analysis-heading">
        <div>
          <div className="section-kicker">
            ALGORITHM ANALYSIS
          </div>

          <h2>{data.name}</h2>
        </div>
      </div>

      <div className="analysis-idea">
        <span>CORE IDEA</span>

        <p>{data.idea}</p>
      </div>

      <div className="analysis-idea" style={{ marginTop: 12 }}>
        <span>WHEN TO USE IT</span>

        <p>{data.bestFor}</p>
      </div>

      <div className="analysis-idea" style={{ marginTop: 12 }}>
        <span>TRADEOFF</span>

        <p>{data.watchOutFor}</p>
      </div>

      <div className="complexity-grid">

        <Complexity
          label="BEST CASE"
          value={data.best}
        />

        <Complexity
          label="AVERAGE CASE"
          value={data.average}
        />

        <Complexity
          label="WORST CASE"
          value={data.worst}
        />

        <Complexity
          label="SPACE"
          value={data.space}
        />

      </div>

      <div className="properties">

        <Property
          label="Stable"
          value={data.stable}
        />

        <Property
          label="In-place"
          value={data.inPlace}
        />

        <Property
          label="Adaptive"
          value={data.adaptive}
        />

      </div>

    </section>
  );
}

function Complexity({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="complexity-card">

      <span>{label}</span>

      <strong>{value}</strong>

    </div>
  );
}

function Property({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="property">

      <span>{label}</span>

      <strong
        className={
          value === "Yes"
            ? "yes"
            : "no"
        }
      >
        {value === "Yes" ? "✓" : "—"}{" "}
        {value}
      </strong>

    </div>
  );
}