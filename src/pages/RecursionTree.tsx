import { useState, useMemo, useEffect, useRef } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

interface TreeNode {
  id: string;
  label: string;
  val: number;
  x: number;
  y: number;
  parentId: string | null;
  stepStart: number;
  stepEnd: number;
  children: TreeNode[];
}

interface StepState {
  activeNodeId: string | null;
  evaluations: Record<string, number>;
  callStack: string[];
}

// Generate the Fibonacci recursion tree and build traversal steps
function generateFibonacciTree(
  n: number,
  x: number,
  y: number,
  spread: number,
  depth: number,
  parentId: string | null,
  counter: { step: number; id: number },
  nodesList: TreeNode[],
  steps: StepState[]
): { node: TreeNode; val: number } {
  const nodeId = `node-${counter.id++}`;
  const stepStart = counter.step++;

  // Record active call step
  steps.push({
    activeNodeId: nodeId,
    evaluations: {}, // will backfill
    callStack: [] // will backfill
  });

  let val = 0;
  const children: TreeNode[] = [];
  const node: TreeNode = {
    id: nodeId,
    label: `F(${n})`,
    val: 0,
    x,
    y,
    parentId,
    stepStart,
    stepEnd: -1,
    children
  };
  nodesList.push(node);

  if (n <= 1) {
    val = n;
    node.val = val;
    node.stepEnd = counter.step++;
    steps.push({
      activeNodeId: nodeId,
      evaluations: {},
      callStack: []
    });
    return { node, val };
  }

  // Left child F(n-1)
  const leftX = x - spread;
  const leftY = y + 70;
  const leftRes = generateFibonacciTree(
    n - 1,
    leftX,
    leftY,
    spread * 0.55,
    depth + 1,
    nodeId,
    counter,
    nodesList,
    steps
  );
  children.push(leftRes.node);

  // Right child F(n-2)
  const rightX = x + spread;
  const rightY = y + 70;
  const rightRes = generateFibonacciTree(
    n - 2,
    rightX,
    rightY,
    spread * 0.55,
    depth + 1,
    nodeId,
    counter,
    nodesList,
    steps
  );
  children.push(rightRes.node);

  val = leftRes.val + rightRes.val;
  node.val = val;
  node.stepEnd = counter.step++;

  // Record return step
  steps.push({
    activeNodeId: nodeId,
    evaluations: {},
    callStack: []
  });

  return { node, val };
}

export default function RecursionTree() {
  const [n, setN] = useState<number>(4);
  const [currentStep, setCurrentStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(50);

  const timerRef = useRef<number | null>(null);

  // Generate tree layout and steps list
  const { nodes, steps, connections } = useMemo(() => {
    const nodesList: TreeNode[] = [];
    const stepsList: StepState[] = [];
    const counter = { step: 0, id: 0 };
    
    const rootX = 400;
    const rootY = 40;
    const initialSpread = 160;

    generateFibonacciTree(n, rootX, rootY, initialSpread, 0, null, counter, nodesList, stepsList);

    // Build evaluations state and callStack for each step
    const computedSteps: StepState[] = [];
    const activeEvaluations: Record<string, number> = {};
    const callStack: string[] = [];

    stepsList.forEach((rawStep, index) => {
      const activeId = rawStep.activeNodeId;
      const targetNode = nodesList.find(node => node.id === activeId);

      if (targetNode) {
        // If it's the start step, push to stack
        if (targetNode.stepStart === index) {
          callStack.push(targetNode.label);
        } 
        // If it's the end step, pop from stack and assign value
        else if (targetNode.stepEnd === index) {
          activeEvaluations[targetNode.id] = targetNode.val;
          callStack.pop();
        }
      }

      computedSteps.push({
        activeNodeId: activeId,
        evaluations: { ...activeEvaluations },
        callStack: [...callStack]
      });
    });

    // Extract connections/lines
    const lines: { from: TreeNode; to: TreeNode }[] = [];
    nodesList.forEach(node => {
      node.children.forEach(child => {
        lines.push({ from: node, to: child });
      });
    });

    return { nodes: nodesList, steps: computedSteps, connections: lines };
  }, [n]);

  const activeStepState = steps[currentStep] ?? { activeNodeId: null, evaluations: {}, callStack: [] };

  useEffect(() => {
    if (!running) return;
    if (currentStep >= steps.length - 1) {
      setRunning(false);
      return;
    }

    const delay = Math.max(50, 1000 - speed * 9.5);
    timerRef.current = window.setTimeout(() => {
      setCurrentStep((prev) => {
        const nextVal = prev + 1;
        if (nextVal >= steps.length - 1) {
          setRunning(false);
        }
        return nextVal;
      });
    }, delay);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [running, currentStep, steps, speed]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function handleReset() {
    setRunning(false);
    setCurrentStep(0);
  }

  function stepNext() {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  }

  function stepPrev() {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }

  return (
    <main className="game-page">
      <section className="game-hero">
        <div>
          <div className="section-kicker">DAA COMPILER LAB • MODULE 05</div>
          <h1>
            Recursion Tree
            <br />
            <span>Stack Frame Explorer</span>
          </h1>
          <p>
            Understand recurrence relations and call stacks. Watch how Fibonacci recursion branches evaluate, push to the runtime stack, and combine leaf results.
          </p>
        </div>

        <div className="game-hero-panel">
          <span>RUN STATE</span>
          <strong>Step {currentStep + 1} / {steps.length}</strong>
          <p>Active call: {activeStepState.callStack[activeStepState.callStack.length - 1] ?? "Done"}</p>
          <button className="button secondary-button" style={{ width: "100%", marginTop: "10px" }} onClick={handleReset}>Reset Explorer</button>
        </div>
      </section>

      {/* Control Actions Dashboard */}
      <section className="games-page-actions" style={{ background: "var(--panel)", padding: "16px 20px", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <label style={{ display: "block", fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--muted)", marginBottom: "6px" }}>TREE SETTINGS</label>
            <div style={{ display: "flex", gap: "6px" }}>
              {[3, 4, 5].map((val) => (
                <button
                  key={val}
                  className={`button ${n === val ? "primary-button" : "secondary-button"}`}
                  style={{ minHeight: "36px" }}
                  onClick={() => { setN(val); setCurrentStep(0); setRunning(false); }}
                >
                  Fibonacci({val})
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--muted)", marginBottom: "6px" }}>PLAYBACK</label>
            <div style={{ display: "flex", gap: "6px" }}>
              {!running ? (
                <button className="button primary-button" style={{ minHeight: "36px" }} onClick={() => setRunning(true)}>
                  <Play size={14} fill="currentColor" /> Play Call
                </button>
              ) : (
                <button className="button primary-button" style={{ minHeight: "36px" }} onClick={() => setRunning(false)}>
                  <Pause size={14} /> Pause
                </button>
              )}
              <button className="button secondary-button" style={{ minHeight: "36px" }} disabled={running || currentStep === 0} onClick={stepPrev}>
                <ChevronLeft size={14} /> Back
              </button>
              <button className="button secondary-button" style={{ minHeight: "36px" }} disabled={running || currentStep === steps.length - 1} onClick={stepNext}>
                Next <ChevronRight size={14} />
              </button>
              <button className="button secondary-button" style={{ minHeight: "36px" }} onClick={handleReset}>
                <RefreshCw size={14} /> Restart
              </button>
            </div>
          </div>

          <div style={{ flexGrow: 1, maxWidth: "200px" }}>
            <label style={{ display: "block", fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--muted)", marginBottom: "6px" }}>SPEED</label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent)" }}
            />
          </div>
        </div>
      </section>

      {/* Main Visualizer Area */}
      <section className="tictactoe-layout" style={{ gridTemplateColumns: "1fr 280px" }}>
        {/* SVG Tree Board */}
        <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "12px", display: "flex", justifyContent: "center", overflowX: "auto" }}>
          <svg width="800" height="380" style={{ minWidth: "800px" }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(66,255,152,0.4)" />
              </marker>
            </defs>

            {/* Tree connections/edges */}
            {connections.map((conn, index) => {
              const isActiveEdge = activeStepState.activeNodeId === conn.to.id || activeStepState.activeNodeId === conn.from.id;
              return (
                <line
                  key={index}
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke={isActiveEdge ? "var(--accent)" : "rgba(66, 255, 152, 0.12)"}
                  strokeWidth={isActiveEdge ? 2.5 : 1.5}
                  markerEnd="url(#arrow)"
                />
              );
            })}

            {/* Tree nodes */}
            {nodes.map((node) => {
              const isActive = activeStepState.activeNodeId === node.id;
              const hasValue = activeStepState.evaluations[node.id] !== undefined;
              const value = activeStepState.evaluations[node.id];

              return (
                <g key={node.id} style={{ cursor: "pointer" }}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill={isActive ? "rgba(66, 255, 152, 0.25)" : "var(--panel-3)"}
                    stroke={isActive ? "var(--accent)" : hasValue ? "rgba(66,255,152,0.4)" : "var(--border)"}
                    strokeWidth={isActive ? 3 : 1.5}
                    style={{ filter: isActive ? "drop-shadow(0 0 8px var(--accent))" : "none", transition: "all 0.3s ease" }}
                  />
                  <text
                    x={node.x}
                    y={node.y - 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isActive ? "#fff" : "#eaffef"}
                    style={{ fontSize: "11px", fontWeight: "600" }}
                  >
                    {node.label}
                  </text>
                  {hasValue && (
                    <g>
                      <rect
                        x={node.x - 14}
                        y={node.y + 11}
                        width="28"
                        height="12"
                        rx="4"
                        fill="rgba(66, 255, 152, 0.15)"
                        stroke="var(--accent)"
                        strokeWidth="0.8"
                      />
                      <text
                        x={node.x}
                        y={node.y + 17}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#fff"
                        style={{ fontSize: "9px", fontFamily: "Share Tech Mono" }}
                      >
                        ={value}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Stack Frame details panel */}
        <aside className="game-sidecard" style={{ position: "static", maxHeight: "none" }}>
          <div className="section-kicker">CALL STACK FRAME</div>
          <h2>Recursion trace</h2>
          <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px" }}>
            The call stack tracks active execution frames. Functions are pushed on invocation and popped on return.
          </p>

          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "10px", padding: "14px", border: "1px solid var(--border)", minHeight: "180px", display: "flex", flexDirection: "column-reverse", gap: "6px" }}>
            {activeStepState.callStack.length === 0 ? (
              <span style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "Share Tech Mono", textAlign: "center", margin: "auto" }}>Stack Empty</span>
            ) : (
              activeStepState.callStack.map((label, index) => (
                <div
                  key={index}
                  style={{
                    padding: "8px 12px",
                    background: index === activeStepState.callStack.length - 1 ? "rgba(66, 255, 152, 0.12)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${index === activeStepState.callStack.length - 1 ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontFamily: "Share Tech Mono",
                    color: index === activeStepState.callStack.length - 1 ? "#fff" : "var(--muted)",
                    display: "flex",
                    justifyContent: "between"
                  }}
                >
                  <span>Frame #{index + 1}: {label}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </section>

      {/* Recurrence Relations details */}
      <section className="game-learning" style={{ marginTop: "24px" }}>
        <div className="learning-header">
          <div className="section-kicker">RECURRENCE THEORY</div>
          <h2>Fibonacci Recurrence Analysis</h2>
        </div>

        <div className="learning-grid">
          <div className="learning-code">
            <pre>{`T(n) = T(n-1) + T(n-2) + O(1)

Solving via Recursion Tree:
- Tree Depth: O(n)
- Leaves: 2^n
- Time Complexity: O(2^n)
- Space Complexity (Stack): O(n)`}</pre>
          </div>

          <div className="learning-steps">
            <h3>Key Concepts</h3>
            <ol>
              <li>**Depth-First Traversal**: The stack tracks the left branch completely to the bottom before exploring the right branch.</li>
              <li>**Leaf Base Cases**: Notice how F(1) and F(0) return values instantly without further recursive expansions.</li>
              <li>**Complexity**: An un-memoized tree grows exponentially. Check how F(5) generates a much larger tree than F(3).</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
