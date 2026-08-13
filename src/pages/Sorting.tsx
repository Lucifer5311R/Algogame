import { useEffect, useRef, useState } from "react";

import {
  runSortingAlgorithm,
  type SortAlgorithm,
  type SortStep,
} from "../algorithms/sorting";

import SortingVisualizer from "../components/SortingVisualizer";
import SortingControls from "../components/SortingControls";
import ExecutionStats from "../components/ExecutionStats";
import AlgorithmAnalysis from "../components/AlgorithmAnalysis";
import PseudocodeViewer from "../components/PseudocodeViewer";

const ALGORITHMS: SortAlgorithm[] = [
  "bubble",
  "selection",
  "insertion",
  "merge",
  "quick",
  "heap",
];

const ALGORITHM_NAMES: Record<SortAlgorithm, string> = {
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
  heap: "Heap Sort",
};

function generateArray(): number[] {
  return Array.from(
    { length: 35 },
    () => Math.floor(Math.random() * 90) + 10
  );
}

export default function Sorting() {
  const [algorithm, setAlgorithm] =
    useState<SortAlgorithm>("bubble");

  const [array, setArray] = useState<number[]>(
    generateArray()
  );

  const [steps, setSteps] = useState<SortStep[]>([]);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [running, setRunning] =
    useState(false);

  const [speed, setSpeed] =
    useState(70);

  const [stats, setStats] = useState({
    comparisons: 0,
    swaps: 0,
    accesses: 0,
  });

  const [customInput, setCustomInput] = useState("");
  const [inputError, setInputError] = useState("");

  const timerRef = useRef<number | null>(null);

  function handleCustomInputSubmit(e: React.FormEvent) {
    e.preventDefault();
    setInputError("");
    const parsed = customInput
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));

    if (parsed.length === 0) {
      setInputError("Please enter valid comma-separated numbers");
      return;
    }

    if (parsed.some((x) => x < 5 || x > 100)) {
      setInputError("Numbers must be between 5 and 100");
      return;
    }

    if (parsed.length < 5 || parsed.length > 50) {
      setInputError("Please enter between 5 and 50 numbers");
      return;
    }

    stop();
    setArray(parsed);
    setSteps([]);
    setCurrentStep(0);
    setStats({
      comparisons: 0,
      swaps: 0,
      accesses: 0,
    });
  }

  /*
   * Maximum value used by the visualizer
   */
  const maxValue = Math.max(...array, 100);

  /*
   * Current visualization state
   */
  const activeStep: SortStep =
    steps.length > 0
      ? steps[currentStep]
      : {
          array,
          comparing: [],
          swapping: [],
          sorted: [],
        };

  /*
   * Stop animation and clear timer
   */
  function stop() {
    setRunning(false);

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  /*
   * Generate a completely new array
   */
  function generate() {
    stop();

    const newArray = generateArray();

    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);

    setStats({
      comparisons: 0,
      swaps: 0,
      accesses: 0,
    });
  }

  /*
   * Run selected algorithm and generate
   * all visualization steps.
   */
  function prepareAlgorithm() {
    const result = runSortingAlgorithm(
      algorithm,
      array
    );

    setSteps(result.steps);

    setStats({
      comparisons: result.comparisons,
      swaps: result.swaps,
      accesses: result.accesses,
    });

    setCurrentStep(0);

    return result;
  }

  /*
   * Start visualization
   */
  function play() {
    if (steps.length === 0) {
      prepareAlgorithm();
    }

    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setRunning(false);
      return;
    }

    setRunning(true);
  }

  /*
   * Go to next step manually
   */
  function nextStep() {
    if (steps.length === 0) {
      prepareAlgorithm();
      return;
    }

    setCurrentStep((value) =>
      Math.min(
        value + 1,
        steps.length - 1
      )
    );
  }

  /*
   * Go to previous step manually
   */
  function previousStep() {
    if (steps.length === 0) {
      return;
    }

    setCurrentStep((value) =>
      Math.max(value - 1, 0)
    );
  }

  /*
   * Reset current algorithm
   */
  function reset() {
    stop();

    setSteps([]);
    setCurrentStep(0);

    setStats({
      comparisons: 0,
      swaps: 0,
      accesses: 0,
    });
  }

  /*
   * Change sorting algorithm
   */
  function changeAlgorithm(
    value: SortAlgorithm
  ) {
    stop();

    setAlgorithm(value);

    setSteps([]);
    setCurrentStep(0);

    setStats({
      comparisons: 0,
      swaps: 0,
      accesses: 0,
    });
  }

  /*
   * Automatic animation
   */
  useEffect(() => {
    if (!running) {
      return;
    }

    if (steps.length === 0) {
      return;
    }

    if (currentStep >= steps.length - 1) {
      return;
    }

    /*
     * Higher speed = lower delay
     */
    const delay = Math.max(
      10,
      500 - speed * 4.8
    );

    timerRef.current =
      window.setTimeout(() => {
        setCurrentStep((value) => {
          const nextValue = Math.min(
            value + 1,
            steps.length - 1
          );

          if (nextValue >= steps.length - 1) {
            setRunning(false);
          }

          return nextValue;
        });
      }, delay);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(
          timerRef.current
        );
      }
    };
  }, [
    running,
    currentStep,
    steps.length,
    speed,
  ]);

  /*
   * Cleanup timer when page is removed
   */
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(
          timerRef.current
        );
      }
    };
  }, []);

  return (
    <main className="sorting-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="sorting-header">

        <div>

          <div className="section-kicker">
            MODULE 02 • DESIGN & ANALYSIS
            OF ALGORITHMS
          </div>

          <h1>
            Sorting
            <br />
            <span>Visualizer</span>
          </h1>

          <p>
            Don't just memorize sorting
            algorithms.
            <br />
            <strong>
              See how they actually work.
            </strong>
          </p>

        </div>

      </section>

      {/* =================================================
          ALGORITHM ANALYSIS
      ================================================= */}

      <AlgorithmAnalysis
        algorithm={algorithm}
      />

      {/* =================================================
          SORTING WORKSPACE
      ================================================= */}

      <section className="sorting-workspace compact-workspace">

        {/* ALGORITHM SELECTOR */}

        <div className="algorithm-tabs">

          {ALGORITHMS.map((item) => (
            <button
              key={item}
              className={
                algorithm === item
                  ? "algorithm-tab active"
                  : "algorithm-tab"
              }
              onClick={() =>
                changeAlgorithm(item)
              }
              disabled={running}
            >
              {ALGORITHM_NAMES[item]}
            </button>
          ))}
        </div>

        <form onSubmit={handleCustomInputSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "20px 24px", padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
          <label style={{ fontSize: "11px", fontFamily: "Share Tech Mono", color: "var(--muted-2)" }}>CUSTOM DATASET INPUT (COMMA-SEPARATED)</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="e.g., 45, 12, 85, 32, 90, 64, 5, 23"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              disabled={running}
              style={{
                flex: 1,
                padding: "10px 14px",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px"
              }}
            />
            <button type="submit" disabled={running} className="button primary-button" style={{ minHeight: "auto", padding: "0 20px" }}>
              Apply
            </button>
          </div>
          {inputError && <span style={{ fontSize: "11px", color: "var(--danger)", fontFamily: "Share Tech Mono" }}>{inputError}</span>}
        </form>

        {/* CONTROLS */}

        <SortingControls
          running={running}
          canPrevious={
            steps.length > 0 &&
            currentStep > 0
          }
          canNext={
            steps.length > 0 &&
            currentStep <
              steps.length - 1
          }
          speed={speed}
          onPlay={play}
          onPause={stop}
          onPrevious={previousStep}
          onNext={nextStep}
          onReset={reset}
          onGenerate={generate}
          onSpeedChange={setSpeed}
        />

        {/* VISUALIZER */}

        <SortingVisualizer
          step={activeStep}
          maxValue={maxValue}
        />

        {/* EXECUTION STATISTICS */}

        <ExecutionStats
          comparisons={
            stats.comparisons
          }
          swaps={stats.swaps}
          accesses={stats.accesses}
          steps={steps.length}
          currentStep={
            steps.length > 0
              ? currentStep + 1
              : 0
          }
        />

      </section>

      {/* =================================================
          PSEUDOCODE
      ================================================= */}

      <PseudocodeViewer
        algorithm={algorithm}
        step={activeStep}
      />

      {/* =================================================
          REAL-LIFE USE CASE FLASHCARDS
      ================================================= */}
      <section className="flashcards-section" style={{ marginTop: "40px", borderTop: "1px solid var(--border)", paddingTop: "30px", marginBottom: "40px" }}>
        <div className="section-kicker">DAA AUDIT • USE CASES</div>
        <h2>Real-Life Flashcards</h2>
        <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "20px" }}>
          How this sorting algorithm is used by computer scientists in actual industry systems.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {algorithm === "bubble" && (
            <>
              <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>SCENARIO 01</span>
                <h3 style={{ margin: "4px 0", fontSize: "16px", color: "#fff", fontFamily: "Orbitron" }}>Graphics Sorting</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>Sorting polygons or transparent vertices in early 3D graphics hardware.</p>
                <div style={{ fontSize: "12px", padding: "8px", background: "rgba(66,255,152,0.06)", borderLeft: "3px solid var(--accent)", borderRadius: "4px" }}>
                  <strong>DAA Value:</strong> Simplicity makes it easy to implement in hardware. Linear time ($O(N)$) on mostly sorted lists.
                </div>
              </div>
              <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>SCENARIO 02</span>
                <h3 style={{ margin: "4px 0", fontSize: "16px", color: "#fff", fontFamily: "Orbitron" }}>Presorted Check</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>Checking if a small list of data remains fully sorted after a minor record swap.</p>
                <div style={{ fontSize: "12px", padding: "8px", background: "rgba(66,255,152,0.06)", borderLeft: "3px solid var(--accent)", borderRadius: "4px" }}>
                  <strong>DAA Value:</strong> Bubble Sort checks array sortedness in exactly 1 pass ($O(N)$ best case).
                </div>
              </div>
            </>
          )}
          {algorithm === "selection" && (
            <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>SCENARIO 01</span>
              <h3 style={{ margin: "4px 0", fontSize: "16px", color: "#fff", fontFamily: "Orbitron" }}>EEPROM & Flash Memory</h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>Sorting data directly on hardware where write cycles damage the physical substrate.</p>
              <div style={{ fontSize: "12px", padding: "8px", background: "rgba(66,255,152,0.06)", borderLeft: "3px solid var(--accent)", borderRadius: "4px" }}>
                <strong>DAA Value:</strong> Minimizes write wear. Guarantees exactly $O(N)$ swaps, which is lower than any other sorting algorithm.
              </div>
            </div>
          )}
          {algorithm === "insertion" && (
            <>
              <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>SCENARIO 01</span>
                <h3 style={{ margin: "4px 0", fontSize: "16px", color: "#fff", fontFamily: "Orbitron" }}>Online Live Stream</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>Real-time updates to sensor measurements receiving one value at a time.</p>
                <div style={{ fontSize: "12px", padding: "8px", background: "rgba(66,255,152,0.06)", borderLeft: "3px solid var(--accent)", borderRadius: "4px" }}>
                  <strong>DAA Value:</strong> Inserts incoming items directly into their sorted position in $O(1)$ best-case time.
                </div>
              </div>
              <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>SCENARIO 02</span>
                <h3 style={{ margin: "4px 0", fontSize: "16px", color: "#fff", fontFamily: "Orbitron" }}>Hybrid Sorts (Timsort)</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>Sorting small datasets (N &lt; 30) inside language engines (Python/Java).</p>
                <div style={{ fontSize: "12px", padding: "8px", background: "rgba(66,255,152,0.06)", borderLeft: "3px solid var(--accent)", borderRadius: "4px" }}>
                  <strong>DAA Value:</strong> Extremely fast on small inputs due to low stack call overhead.
                </div>
              </div>
            </>
          )}
          {algorithm === "merge" && (
            <>
              <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>SCENARIO 01</span>
                <h3 style={{ margin: "4px 0", fontSize: "16px", color: "#fff", fontFamily: "Orbitron" }}>External Log Sorting</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>Sorting multi-gigabyte log datasets too large to fit in physical RAM.</p>
                <div style={{ fontSize: "12px", padding: "8px", background: "rgba(66,255,152,0.06)", borderLeft: "3px solid var(--accent)", borderRadius: "4px" }}>
                  <strong>DAA Value:</strong> Divide-and-conquer splits logs into files, sorts them, and merges them externally.
                </div>
              </div>
              <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>SCENARIO 02</span>
                <h3 style={{ margin: "4px 0", fontSize: "16px", color: "#fff", fontFamily: "Orbitron" }}>Spreadsheet Multi-Key Sort</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>Sorting database entries by first name without breaking existing age sorting.</p>
                <div style={{ fontSize: "12px", padding: "8px", background: "rgba(66,255,152,0.06)", borderLeft: "3px solid var(--accent)", borderRadius: "4px" }}>
                  <strong>DAA Value:</strong> Stable sort guarantees relative position of equal keys remains unchanged.
                </div>
              </div>
            </>
          )}
          {algorithm === "quick" && (
            <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>SCENARIO 01</span>
              <h3 style={{ margin: "4px 0", fontSize: "16px", color: "#fff", fontFamily: "Orbitron" }}>Standard Libraries</h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>Powering fast libraries like C++ `std::sort` or basic runtime array sorts.</p>
              <div style={{ fontSize: "12px", padding: "8px", background: "rgba(66,255,152,0.06)", borderLeft: "3px solid var(--accent)", borderRadius: "4px" }}>
                <strong>DAA Value:</strong> Average case of $O(N \log N)$ with excellent cache locality because swaps are done in-place.
              </div>
            </div>
          )}
          {algorithm === "heap" && (
            <div style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>SCENARIO 01</span>
              <h3 style={{ margin: "4px 0", fontSize: "16px", color: "#fff", fontFamily: "Orbitron" }}>Embedded Kernels</h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>Task scheduling inside real-time operating systems (RTOS) in avionics/cars.</p>
              <div style={{ fontSize: "12px", padding: "8px", background: "rgba(66,255,152,0.06)", borderLeft: "3px solid var(--accent)", borderRadius: "4px" }}>
                <strong>DAA Value:</strong> Guarantees a hard $O(N \log N)$ worst-case execution time with zero extra stack frames.
              </div>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}