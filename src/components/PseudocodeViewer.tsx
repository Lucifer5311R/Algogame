import type { SortAlgorithm, SortStep } from "../algorithms/sorting";

interface PseudocodeViewerProps {
  algorithm: SortAlgorithm;
  step: SortStep;
}

const pseudocode: Record<SortAlgorithm, string[]> = {
  bubble: [
    "BUBBLE-SORT(A)",
    "for i = 0 to n - 1",
    "    for j = 0 to n - i - 2",
    "        if A[j] > A[j + 1]",
    "            swap(A[j], A[j + 1])"
  ],
  selection: [
    "SELECTION-SORT(A)",
    "for i = 0 to n - 2",
    "    min = i",
    "    for j = i + 1 to n - 1",
    "        if A[j] < A[min]",
    "            min = j",
    "    swap(A[i], A[min])"
  ],
  insertion: [
    "INSERTION-SORT(A)",
    "for i = 1 to n - 1",
    "    key = A[i]",
    "    j = i - 1",
    "    while j >= 0 and A[j] > key",
    "        A[j + 1] = A[j]",
    "        j = j - 1",
    "    A[j + 1] = key"
  ],
  merge: [
    "MERGE-SORT(A, left, right)",
    "if left < right",
    "    middle = (left + right) / 2",
    "    MERGE-SORT(left, middle)",
    "    MERGE-SORT(middle + 1, right)",
    "    MERGE(left, middle, right)"
  ],
  quick: [
    "QUICK-SORT(A, low, high)",
    "if low < high",
    "    pivot = PARTITION(A)",
    "    QUICK-SORT(low, pivot - 1)",
    "    QUICK-SORT(pivot + 1, high)"
  ],
  heap: [
    "HEAP-SORT(A)",
    "BUILD-MAX-HEAP(A)",
    "for i = n - 1 down to 1",
    "    swap(A[0], A[i])",
    "    HEAPIFY(A, i, 0)"
  ]
};

function getHighlightedLine(algorithm: SortAlgorithm, step: SortStep): number {
  const isComparing = step.comparing.length > 0;
  const isSwapping = step.swapping.length > 0;

  if (algorithm === "bubble") {
    if (isSwapping) return 4;
    if (isComparing) return 3;
    return 1;
  }
  if (algorithm === "selection") {
    if (isSwapping) return 6;
    if (isComparing) return 4;
    return 1;
  }
  if (algorithm === "insertion") {
    if (isSwapping) return 5;
    if (isComparing) return 4;
    return 1;
  }
  if (algorithm === "merge") {
    if (isSwapping) return 5;
    if (isComparing) return 5;
    return 1;
  }
  if (algorithm === "quick") {
    if (isSwapping) return 2;
    if (isComparing) return 2;
    return 1;
  }
  if (algorithm === "heap") {
    if (isSwapping) return 3;
    if (isComparing) return 4;
    return 1;
  }
  return -1;
}

export default function PseudocodeViewer({
  algorithm,
  step,
}: PseudocodeViewerProps) {
  const lines = pseudocode[algorithm];
  const highlightedIdx = getHighlightedLine(algorithm, step);

  return (
    <section className="pseudocode-section">
      <div className="section-kicker">PSEUDOCODE PLAYBACK</div>
      <h2>How the algorithm works</h2>

      <div className="code-block" style={{ padding: "8px 0", borderRadius: "12px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.3)" }}>
        <div className="code-header" style={{ padding: "0 18px 8px", borderBottom: "1px solid var(--border)", marginBottom: "8px" }}>
          <span>{algorithm.toUpperCase()}_SORT</span>
          <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>ACTIVE TRACE</span>
        </div>

        <pre style={{ margin: 0, padding: "0 18px", background: "transparent" }}>
          <code style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {lines.map((line, idx) => {
              const isCurrent = idx === highlightedIdx;
              return (
                <span
                  key={idx}
                  style={{
                    display: "block",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background: isCurrent ? "rgba(66, 255, 152, 0.15)" : "transparent",
                    color: isCurrent ? "#fff" : "var(--muted)",
                    borderLeft: isCurrent ? "3px solid var(--accent)" : "3px solid transparent",
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "13px",
                    textShadow: isCurrent ? "0 0 8px rgba(66, 255, 152, 0.3)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  {line}
                </span>
              );
            })}
          </code>
        </pre>
      </div>
    </section>
  );
}