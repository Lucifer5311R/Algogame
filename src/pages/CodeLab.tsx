import { useState } from "react";
import Editor from "@monaco-editor/react";

type CodeSample = {
  id: string;
  label: string;
  description: string;
  code: string;
};

type LabEntry = {
  code: string;
  explanation: string;
};

const STORAGE_KEY = "algogame-student-lab";

const samples: CodeSample[] = [
  {
    id: "binary-search",
    label: "Binary Search",
    description:
      "A classic divide-and-conquer search routine that cuts the search space in half each step.",
    code: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid

        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
  },
  {
    id: "merge-sort",
    label: "Merge Sort",
    description:
      "Recursively split an array, sort each half, and merge the results into a single ordered list.",
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  },
  {
    id: "backtracking",
    label: "Backtracking",
    description:
      "A recursive search pattern that tries a choice, explores deeper, and then rewinds if it fails.",
    code: `def solve(board, row, col):
    if row == len(board):
        return True

    next_row = row + (col + 1) // len(board)
    next_col = (col + 1) % len(board)

    if board[row][col] != 0:
        return solve(board, next_row, next_col)

    for value in range(1, len(board) + 1):
        if is_safe(board, row, col, value):
            board[row][col] = value

            if solve(board, next_row, next_col):
                return True

            board[row][col] = 0

    return False`,
  },
];

function loadLabState(sampleId: string): LabEntry {
  if (typeof window === "undefined") {
    return { code: "", explanation: "" };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { code: "", explanation: "" };
    }

    const parsed = JSON.parse(raw) as Record<string, LabEntry>;
    return parsed[sampleId] ?? { code: "", explanation: "" };
  } catch {
    return { code: "", explanation: "" };
  }
}

export default function CodeLab() {
  const [selected, setSelected] = useState(samples[0].id);
  const [studentCode, setStudentCode] = useState(samples[0].code);
  const [studentExplanation, setStudentExplanation] = useState(
    "Explain what the algorithm is doing in your own words."
  );

  // Read saved state to update DOM reactively
  const [savedSubmissions, setSavedSubmissions] = useState<Record<string, LabEntry>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const sample = samples.find((entry) => entry.id === selected) ?? samples[0];

  function selectSample(sampleId: string) {
    const nextSample = samples.find((entry) => entry.id === sampleId) ?? samples[0];
    const saved = loadLabState(sampleId);

    setSelected(sampleId);
    setStudentCode(saved.code || nextSample.code);
    setStudentExplanation(saved.explanation || "Explain what the algorithm is doing in your own words.");
  }

  function handleSave() {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const payload = raw ? (JSON.parse(raw) as Record<string, LabEntry>) : {};
      payload[selected] = {
        code: studentCode,
        explanation: studentExplanation,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSavedSubmissions(payload); // Update DOM state reactively
    } catch {
      const payload = { [selected]: { code: studentCode, explanation: studentExplanation } };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSavedSubmissions(payload);
    }
  }

  function handleReset() {
    setStudentCode(sample.code);
    setStudentExplanation("Explain what the algorithm is doing in your own words.");
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const payload = raw ? (JSON.parse(raw) as Record<string, LabEntry>) : {};
      delete payload[selected];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSavedSubmissions(payload); // Update DOM state reactively
    }
  }

  return (
    <main className="code-lab">
      <div className="section-kicker">CODE LAB</div>

      <div className="code-lab-header">
        <div>
          <h1>
            Read the implementation.
            <br />
            <span>Then change it.</span>
          </h1>

          <p>
            This workspace pairs the visual algorithms with Python examples so you can
            inspect the logic, compare patterns, and reuse the code in your own
            experiments.
          </p>
        </div>

        <div className="code-lab-meta">
          <span>PYTHON</span>
          <strong>Student workspace</strong>
          <p>Try your own version, explain the logic, and save your reflection.</p>
        </div>
      </div>

      <section className="code-lab-layout">
        <div className="code-lab-sidebar">
          {samples.map((entry) => (
            <button
              key={entry.id}
              className={entry.id === selected ? "code-sample active" : "code-sample"}
              onClick={() => selectSample(entry.id)}
            >
              <span>{entry.label}</span>
              <small>{entry.description}</small>
            </button>
          ))}
        </div>

        <div className="code-lab-main">
          <div className="code-window code-lab-window">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <label>{sample.label.toLowerCase().replace(/\s+/g, "_")}.py</label>
            </div>

            <div className="code-lab-body">
              <div className="code-lab-summary">
                <h2>{sample.label}</h2>
                <p>{sample.description}</p>
              </div>

              <pre>
                <code>{sample.code}</code>
              </pre>
            </div>
          </div>

          <div className="student-lab">
            <div className="student-lab-header">
              <div>
                <div className="section-kicker">YOUR NOTES</div>
                <h2>Write your own version</h2>
              </div>

              <div className="lab-actions">
                <button className="button secondary-button" onClick={handleReset}>Reset</button>
                <button className="button primary-button" onClick={handleSave}>Save idea</button>
              </div>
            </div>

            <div className="student-editor-wrap" style={{ border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", background: "#1e1e1e", padding: "10px 0" }}>
              <label className="student-label" style={{ paddingLeft: "14px", display: "block", marginBottom: "6px" }}>Code Editor (Python)</label>
              <Editor
                height="320px"
                defaultLanguage="python"
                theme="vs-dark"
                value={studentCode}
                onChange={(value) => setStudentCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "'Share Tech Mono', monospace",
                  lineNumbers: "on",
                  scrollbar: {
                    vertical: "auto",
                    horizontal: "auto"
                  },
                  automaticLayout: true
                }}
              />
            </div>

            <div className="student-editor-wrap">
              <label className="student-label">Logic explanation</label>
              <textarea
                className="student-notes"
                value={studentExplanation}
                onChange={(event) => setStudentExplanation(event.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DOM-rendered Saved submissions section */}
      <section style={{ marginTop: "40px", borderTop: "1px solid var(--border)", paddingTop: "30px" }}>
        <div className="section-kicker">PORTFOLIO</div>
        <h2>Your Saved Ideas & Notes</h2>
        <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "20px" }}>
          These are the custom versions and analyses you have stored locally in your browser's DOM.
        </p>

        {Object.keys(savedSubmissions).length === 0 ? (
          <div style={{ padding: "30px", border: "1px dashed var(--border)", borderRadius: "12px", textAlign: "center", color: "var(--muted-2)", fontSize: "14px" }}>
            No saved submissions found. Click "Save idea" above to write to your local portfolio.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
            {Object.entries(savedSubmissions).map(([key, entry]) => {
              const info = samples.find(s => s.id === key);
              return (
                <div key={key} style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "Orbitron", color: "var(--accent)" }}>{info?.label ?? key}</span>
                    <span style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--muted-2)" }}>LOCAL DOM</span>
                  </div>
                  <div>
                    <label style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--muted-2)", display: "block", marginBottom: "4px" }}>LOGIC REFLECTION</label>
                    <p style={{ fontSize: "12px", color: "#fff", background: "rgba(0,0,0,0.2)", padding: "10px", borderRadius: "6px", margin: 0, minHeight: "60px", border: "1px solid rgba(255,255,255,0.03)" }}>
                      {entry.explanation}
                    </p>
                  </div>
                  <div>
                    <label style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--muted-2)", display: "block", marginBottom: "4px" }}>CUSTOM CODE</label>
                    <pre style={{ margin: 0, padding: "10px", background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", maxHeight: "150px", overflowY: "auto" }}>
                      <code style={{ fontSize: "11px", fontFamily: "Share Tech Mono", color: "#9bffd0", whiteSpace: "pre-wrap" }}>
                        {entry.code}
                      </code>
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}