import { BookOpen, HelpCircle, ShieldAlert, Cpu } from "lucide-react";

export default function DaaAnalysis() {
  return (
    <main className="analysis-page" style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <div className="section-kicker">HARDCORE DAA AUDIT</div>
        <h1 style={{ fontSize: "2.8rem", margin: "0 0 10px", letterSpacing: "-1.5px", fontFamily: "Orbitron" }}>
          Algorithm <span style={{ color: "var(--accent)" }}>Mathematical Analysis</span>
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "700px", margin: 0, fontSize: "14px" }}>
          Advanced theoretical resources covering recurrence relations, asymptotic proofs, complexity metrics, and lower bounds of computation.
        </p>
      </div>

      {/* SECTION 1: ASYMPTOTIC NOTATIONS */}
      <section style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 30px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
          <BookOpen size={20} style={{ color: "var(--accent)" }} />
          <h2 style={{ margin: 0, fontFamily: "Orbitron", fontSize: "18px" }}>Asymptotic Complexity Foundations</h2>
        </div>
        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "30px" }}>
          Asymptotic analysis describes the behavior of algorithms as the input size <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var> approaches infinity. It filters out hardware variations and constant overhead factors.
        </p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px" }}>
          {/* Big O */}
          <div style={{ padding: "20px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ fontSize: "15px", color: "#fff", fontFamily: "Share Tech Mono", margin: 0 }}>O(g(n)) - Big-O (Upper Bound)</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#080808", padding: "15px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "var(--accent)" }}>
                <var style={{ fontStyle: "italic" }}>f</var>(<var style={{ fontStyle: "italic" }}>n</var>) &le; <var style={{ fontStyle: "italic" }}>c</var> &middot; <var style={{ fontStyle: "italic" }}>g</var>(<var style={{ fontStyle: "italic" }}>n</var>) 
                <span style={{ fontSize: "12px", color: "var(--muted-2)", marginLeft: "8px" }}>for n &ge; n₀</span>
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0, lineHeight: "1.5" }}>
              Describes the worst-case execution time. The algorithm is guaranteed to complete in at most this time envelope.
            </p>
          </div>

          {/* Big Omega */}
          <div style={{ padding: "20px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ fontSize: "15px", color: "#fff", fontFamily: "Share Tech Mono", margin: 0 }}>&Omega;(g(n)) - Big-Omega (Lower Bound)</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#080808", padding: "15px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "var(--accent)" }}>
                <var style={{ fontStyle: "italic" }}>f</var>(<var style={{ fontStyle: "italic" }}>n</var>) &ge; <var style={{ fontStyle: "italic" }}>c</var> &middot; <var style={{ fontStyle: "italic" }}>g</var>(<var style={{ fontStyle: "italic" }}>n</var>)
                <span style={{ fontSize: "12px", color: "var(--muted-2)", marginLeft: "8px" }}>for n &ge; n₀</span>
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0, lineHeight: "1.5" }}>
              Describes the best-case behavior. The algorithm requires at least this amount of computational steps.
            </p>
          </div>

          {/* Big Theta */}
          <div style={{ padding: "20px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ fontSize: "15px", color: "#fff", fontFamily: "Share Tech Mono", margin: 0 }}>&Theta;(g(n)) - Big-Theta (Tight Bound)</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#080808", padding: "15px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "var(--accent)" }}>
                <var style={{ fontStyle: "italic" }}>c</var>₁&middot;<var style={{ fontStyle: "italic" }}>g</var>(<var style={{ fontStyle: "italic" }}>n</var>) &le; <var style={{ fontStyle: "italic" }}>f</var>(<var style={{ fontStyle: "italic" }}>n</var>) &le; <var style={{ fontStyle: "italic" }}>c</var>₂&middot;<var style={{ fontStyle: "italic" }}>g</var>(<var style={{ fontStyle: "italic" }}>n</var>)
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0, lineHeight: "1.5" }}>
              Provides a tight bound. The running time is asymptotically equivalent to the bounding function.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MASTER THEOREM */}
      <section style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 30px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px" }}>
          <Cpu size={20} style={{ color: "var(--accent)" }} />
          <h2 style={{ margin: 0, fontFamily: "Orbitron", fontSize: "18px" }}>The Master Theorem for Divide-and-Conquer</h2>
        </div>
        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "25px" }}>
          The Master Theorem provides a direct solution to recurrences of the form:
        </p>

        {/* Master Theorem Equation Card */}
        <div style={{ background: "#060606", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "22px", fontFamily: "Georgia, serif", color: "#9bffd0", letterSpacing: "1px" }}>
            <var style={{ fontStyle: "italic" }}>T</var>(<var style={{ fontStyle: "italic" }}>n</var>) = 
            <var style={{ fontStyle: "italic" }}>a</var> &middot; <var style={{ fontStyle: "italic" }}>T</var>
            <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", fontSize: "18px", padding: "0 6px", borderLeft: "1px solid", borderRight: "1px solid", borderRadius: "4px", margin: "0 2px" }}>
              <span style={{ borderBottom: "1px solid", paddingBottom: "2px" }}><var style={{ fontStyle: "italic" }}>n</var></span>
              <span><var style={{ fontStyle: "italic" }}>b</var></span>
            </span>
            + <var style={{ fontStyle: "italic" }}>f</var>(<var style={{ fontStyle: "italic" }}>n</var>)
          </div>
          <div style={{ fontSize: "12px", color: "var(--muted-2)", fontFamily: "Share Tech Mono", textAlign: "center" }}>
            where <var style={{ fontStyle: "italic" }}>a</var> &ge; 1 (subproblems), <var style={{ fontStyle: "italic" }}>b</var> &gt; 1 (division ratio), and <var style={{ fontStyle: "italic" }}>f</var>(<var style={{ fontStyle: "italic" }}>n</var>) is the merge overhead.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Case 1 */}
          <div style={{ padding: "16px", background: "rgba(0,0,0,0.2)", borderRadius: "10px", borderLeft: "4px solid var(--accent)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>CASE 1: LEAF DOMINANT</span>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--muted)" }}>
                If <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>f</var>(<var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var>) = <var style={{ fontFamily: "Georgia, serif" }}>O</var>(<var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var><sup>log<sub><var style={{ fontStyle: "italic" }}>b</var></sub><var style={{ fontStyle: "italic" }}>a</var> - &epsilon;</sup>) for some &epsilon; &gt; 0
              </p>
            </div>
            <div style={{ background: "#0c0c0c", padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <code style={{ fontSize: "14px", color: "#fff", fontFamily: "Georgia, serif" }}>
                &Theta;(<var style={{ fontStyle: "italic" }}>n</var><sup>log<sub><var style={{ fontStyle: "italic" }}>b</var></sub><var style={{ fontStyle: "italic" }}>a</var></sup>)
              </code>
            </div>
          </div>

          {/* Case 2 */}
          <div style={{ padding: "16px", background: "rgba(0,0,0,0.2)", borderRadius: "10px", borderLeft: "4px solid var(--accent)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>CASE 2: BALANCED BOUND</span>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--muted)" }}>
                If <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>f</var>(<var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var>) = &Theta;(<var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var><sup>log<sub><var style={{ fontStyle: "italic" }}>b</var></sub><var style={{ fontStyle: "italic" }}>a</var></sup>)
              </p>
            </div>
            <div style={{ background: "#0c0c0c", padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <code style={{ fontSize: "14px", color: "#fff", fontFamily: "Georgia, serif" }}>
                &Theta;(<var style={{ fontStyle: "italic" }}>n</var><sup>log<sub><var style={{ fontStyle: "italic" }}>b</var></sub><var style={{ fontStyle: "italic" }}>a</var></sup> &middot; log <var style={{ fontStyle: "italic" }}>n</var>)
              </code>
            </div>
          </div>

          {/* Case 3 */}
          <div style={{ padding: "16px", background: "rgba(0,0,0,0.2)", borderRadius: "10px", borderLeft: "4px solid var(--accent)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "10px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>CASE 3: ROOT DOMINANT</span>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--muted)" }}>
                If <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>f</var>(<var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var>) = &Omega;(<var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var><sup>log<sub><var style={{ fontStyle: "italic" }}>b</var></sub><var style={{ fontStyle: "italic" }}>a</var> + &epsilon;</sup>) and satisfies regularity conditions
              </p>
            </div>
            <div style={{ background: "#0c0c0c", padding: "8px 16px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <code style={{ fontSize: "14px", color: "#fff", fontFamily: "Georgia, serif" }}>
                &Theta;(<var style={{ fontStyle: "italic" }}>f</var>(<var style={{ fontStyle: "italic" }}>n</var>))
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMPREHENSIVE COMPLEXITY CHART */}
      <section style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 30px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px" }}>
          <HelpCircle size={20} style={{ color: "var(--accent)" }} />
          <h2 style={{ margin: 0, fontFamily: "Orbitron", fontSize: "18px" }}>Asymptotic Complexity Comparison</h2>
        </div>
        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "20px" }}>
          A direct comparison of DAA algorithms across time, auxiliary space, stability, and sorting paradigms:
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", color: "#fff", fontFamily: "Share Tech Mono" }}>
                <th style={{ padding: "12px" }}>Algorithm</th>
                <th style={{ padding: "12px" }}>Best Time</th>
                <th style={{ padding: "12px" }}>Average Time</th>
                <th style={{ padding: "12px" }}>Worst Time</th>
                <th style={{ padding: "12px" }}>Space Complexity</th>
                <th style={{ padding: "12px" }}>Stability</th>
                <th style={{ padding: "12px" }}>Paradigm</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", fontWeight: "700" }}>Bubble Sort</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n)</td>
                <td style={{ padding: "12px" }}>O(n²)</td>
                <td style={{ padding: "12px" }}>O(n²)</td>
                <td style={{ padding: "12px" }}>O(1)</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>Stable</td>
                <td style={{ padding: "12px" }}>Brute Force</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", fontWeight: "700" }}>Selection Sort</td>
                <td style={{ padding: "12px" }}>O(n²)</td>
                <td style={{ padding: "12px" }}>O(n²)</td>
                <td style={{ padding: "12px" }}>O(n²)</td>
                <td style={{ padding: "12px" }}>O(1)</td>
                <td style={{ padding: "12px", color: "var(--danger)" }}>Unstable</td>
                <td style={{ padding: "12px" }}>Brute Force</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", fontWeight: "700" }}>Insertion Sort</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n)</td>
                <td style={{ padding: "12px" }}>O(n²)</td>
                <td style={{ padding: "12px" }}>O(n²)</td>
                <td style={{ padding: "12px" }}>O(1)</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>Stable</td>
                <td style={{ padding: "12px" }}>Incremental</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", fontWeight: "700" }}>Merge Sort</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n log n)</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n log n)</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n log n)</td>
                <td style={{ padding: "12px", color: "var(--danger)" }}>O(n)</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>Stable</td>
                <td style={{ padding: "12px" }}>Divide & Conquer</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", fontWeight: "700" }}>Quick Sort</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n log n)</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n log n)</td>
                <td style={{ padding: "12px", color: "var(--danger)" }}>O(n²)</td>
                <td style={{ padding: "12px" }}>O(log n)</td>
                <td style={{ padding: "12px", color: "var(--danger)" }}>Unstable</td>
                <td style={{ padding: "12px" }}>Divide & Conquer</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding: "12px", fontWeight: "700" }}>Heap Sort</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n log n)</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n log n)</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(n log n)</td>
                <td style={{ padding: "12px", color: "var(--accent)" }}>O(1)</td>
                <td style={{ padding: "12px", color: "var(--danger)" }}>Unstable</td>
                <td style={{ padding: "12px" }}>Selection-based</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: LOWER BOUND THEOREM */}
      <section style={{ background: "var(--panel)", border: "1px solid var(--border)", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 30px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px" }}>
          <ShieldAlert size={20} style={{ color: "var(--danger)" }} />
          <h2 style={{ margin: 0, fontFamily: "Orbitron", fontSize: "18px" }}>The &Omega;(n log n) Lower Bound Proof</h2>
        </div>
        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "20px" }}>
          Why can't we sort faster than <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var> log <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var> using comparison-based sorting? Here is the mathematical proof using the <strong>Decision Tree Model</strong>:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", background: "rgba(0,0,0,0.2)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
          <div style={{ fontSize: "13px", color: "#fff", lineHeight: "1.6" }}>
            1. Any comparison-based sorting algorithm can be represented as a binary decision tree where each node represents a comparison <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>A</var>[<var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>i</var>] &le; <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>A</var>[<var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>j</var>], and each leaf represents a sorted permutation.
          </div>
          <div style={{ fontSize: "13px", color: "#fff", lineHeight: "1.6" }}>
            2. An array of size <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var> has <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var>! possible permutations. To sort the array correctly, the decision tree must have at least <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var>! leaves.
          </div>
          <div style={{ fontSize: "13px", color: "#fff", lineHeight: "1.6" }}>
            3. A binary tree of height <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>h</var> can have at most 2<sup><var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>h</var></sup> leaves. Therefore:
            
            <div style={{ display: "flex", justifyContent: "center", padding: "12px", margin: "8px 0", background: "#080808", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <span style={{ fontSize: "16px", fontFamily: "Georgia, serif", color: "var(--accent)" }}>
                2<sup><var style={{ fontStyle: "italic" }}>h</var></sup> &ge; <var style={{ fontStyle: "italic" }}>n</var>! 
                &nbsp;&rArr;&nbsp; 
                <var style={{ fontStyle: "italic" }}>h</var> &ge; log₂(<var style={{ fontStyle: "italic" }}>n</var>!)
              </span>
            </div>
          </div>
          <div style={{ fontSize: "13px", color: "#fff", lineHeight: "1.6" }}>
            4. Applying **Stirling's Approximation** (ln(<var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var>!) &approx; <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var> ln <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var> - <var style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>n</var>):
            
            <div style={{ display: "flex", justifyContent: "center", padding: "12px", margin: "8px 0", background: "#080808", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <span style={{ fontSize: "16px", fontFamily: "Georgia, serif", color: "var(--accent)" }}>
                <var style={{ fontStyle: "italic" }}>h</var> &ge; <var style={{ fontStyle: "italic" }}>n</var> log₂ <var style={{ fontStyle: "italic" }}>n</var> - <var style={{ fontStyle: "italic" }}>n</var> log₂ <var style={{ fontStyle: "italic" }}>e</var> 
                &nbsp;&rArr;&nbsp; 
                <var style={{ fontStyle: "italic" }}>h</var> = &Omega;(<var style={{ fontStyle: "italic" }}>n</var> log <var style={{ fontStyle: "italic" }}>n</var>)
              </span>
            </div>
          </div>
          <div style={{ fontSize: "14px", color: "#9bffd0", fontWeight: "bold", marginTop: "8px", fontFamily: "Georgia, serif", textAlign: "center" }}>
            Conclusion: Any comparison sort requires at least &Omega;(<var style={{ fontStyle: "italic" }}>n</var> log <var style={{ fontStyle: "italic" }}>n</var>) operations in the worst case.
          </div>
        </div>
      </section>
    </main>
  );
}
