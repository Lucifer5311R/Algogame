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
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px" }}>
          <BookOpen size={20} style={{ color: "var(--accent)" }} />
          <h2 style={{ margin: 0, fontFamily: "Orbitron", fontSize: "18px" }}>Asymptotic Complexity Foundations</h2>
        </div>
        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "20px" }}>
          Asymptotic analysis describes the behavior of algorithms as the input size $n$ approaches infinity. It filters out hardware variations and constant overhead factors.
        </p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          <div style={{ padding: "16px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "10px" }}>
            <h3 style={{ fontSize: "14px", color: "#fff", fontFamily: "Share Tech Mono", margin: "0 0 8px" }}>O(g(n)) - Big-O (Upper Bound)</h3>
            <code style={{ display: "block", background: "#0e0e0e", padding: "10px", borderRadius: "6px", fontSize: "12px", color: "var(--accent)", marginBottom: "8px", fontFamily: "Share Tech Mono" }}>
              f(n) &le; c &middot; g(n) for all n &ge; n₀
            </code>
            <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}>
              Describes the worst-case execution time. The algorithm is guaranteed to complete in at most this time envelope.
            </p>
          </div>

          <div style={{ padding: "16px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "10px" }}>
            <h3 style={{ fontSize: "14px", color: "#fff", fontFamily: "Share Tech Mono", margin: "0 0 8px" }}>&Omega;(g(n)) - Big-Omega (Lower Bound)</h3>
            <code style={{ display: "block", background: "#0e0e0e", padding: "10px", borderRadius: "6px", fontSize: "12px", color: "var(--accent)", marginBottom: "8px", fontFamily: "Share Tech Mono" }}>
              f(n) &ge; c &middot; g(n) for all n &ge; n₀
            </code>
            <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}>
              Describes the best-case behavior. The algorithm requires at least this amount of computational steps.
            </p>
          </div>

          <div style={{ padding: "16px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "10px" }}>
            <h3 style={{ fontSize: "14px", color: "#fff", fontFamily: "Share Tech Mono", margin: "0 0 8px" }}>&Theta;(g(n)) - Big-Theta (Tight Bound)</h3>
            <code style={{ display: "block", background: "#0e0e0e", padding: "10px", borderRadius: "6px", fontSize: "12px", color: "var(--accent)", marginBottom: "8px", fontFamily: "Share Tech Mono" }}>
              c₁ &middot; g(n) &le; f(n) &le; c₂ &middot; g(n)
            </code>
            <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}>
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
        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6", marginBottom: "20px" }}>
          The Master Theorem provides a cooking recipe solution to recurrences of the form:
        </p>

        <div style={{ background: "#0e0e0e", padding: "15px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center", marginBottom: "20px" }}>
          <code style={{ fontSize: "18px", color: "#9bffd0", fontFamily: "Share Tech Mono" }}>
            T(n) = a &middot; T(n/b) + f(n)
          </code>
          <div style={{ fontSize: "12px", color: "var(--muted-2)", marginTop: "6px" }}>
            where a &ge; 1 is the number of subproblems, b &gt; 1 is the reduction factor, and f(n) is the split/merge overhead.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "14px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", borderLeft: "3px solid var(--accent)" }}>
            <span style={{ fontSize: "11px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>CASE 1: HEAVY RECURSION LEAVES</span>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#fff" }}>
              If f(n) = O(n^(log_b(a) - &epsilon;)) for some &epsilon; &gt; 0:
            </p>
            <code style={{ fontSize: "13px", color: "var(--accent)", fontFamily: "Share Tech Mono" }}>T(n) = &Theta;(n^(log_b a))</code>
          </div>

          <div style={{ padding: "14px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", borderLeft: "3px solid var(--accent)" }}>
            <span style={{ fontSize: "11px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>CASE 2: BALANCED BOUND</span>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#fff" }}>
              If f(n) = &Theta;(n^(log_b a)):
            </p>
            <code style={{ fontSize: "13px", color: "var(--accent)", fontFamily: "Share Tech Mono" }}>T(n) = &Theta;(n^(log_b a) &middot; log n)</code>
          </div>

          <div style={{ padding: "14px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", borderLeft: "3px solid var(--accent)" }}>
            <span style={{ fontSize: "11px", fontFamily: "Share Tech Mono", color: "var(--accent)" }}>CASE 3: HEAVY MERGE OVERHEAD</span>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#fff" }}>
              If f(n) = &Omega;(n^(log_b(a) + &epsilon;)) and satisfies the regularity condition:
            </p>
            <code style={{ fontSize: "13px", color: "var(--accent)", fontFamily: "Share Tech Mono" }}>T(n) = &Theta;(f(n))</code>
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
          Why can't we sort faster than $n \log n$ using comparison-based sorting? Here is the mathematical proof using the <strong>Decision Tree Model</strong>:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.03)" }}>
          <div style={{ fontSize: "13px", color: "#fff", lineHeight: "1.6" }}>
            1. Any comparison-based sorting algorithm can be represented as a binary decision tree where each node represents a comparison $A[i] \le A[j]$, and each leaf represents a sorted permutation.
          </div>
          <div style={{ fontSize: "13px", color: "#fff", lineHeight: "1.6" }}>
            2. An array of size $n$ has $n!$ possible permutations. To sort the array correctly, the decision tree must have at least $n!$ leaves.
          </div>
          <div style={{ fontSize: "13px", color: "#fff", lineHeight: "1.6" }}>
            3. A binary tree of height $h$ can have at most $2^h$ leaves. Therefore:
            <code style={{ display: "block", background: "#0e0e0e", padding: "10px", borderRadius: "6px", fontSize: "12px", color: "var(--accent)", margin: "8px 0", fontFamily: "Share Tech Mono", width: "fit-content" }}>
              2^h &ge; n! ➔ h &ge; log₂(n!)
            </code>
          </div>
          <div style={{ fontSize: "13px", color: "#fff", lineHeight: "1.6" }}>
            4. Applying **Stirling's Approximation** ($\ln(n!) \approx n \ln n - n$):
            <code style={{ display: "block", background: "#0e0e0e", padding: "10px", borderRadius: "6px", fontSize: "12px", color: "var(--accent)", margin: "8px 0", fontFamily: "Share Tech Mono", width: "fit-content" }}>
              h &ge; n log₂ n - n log₂ e ➔ h = &Omega;(n log n)
            </code>
          </div>
          <div style={{ fontSize: "13px", color: "var(--accent)", fontWeight: "bold", marginTop: "6px" }}>
            Conclusion: Any comparison sort requires at least &Omega;(n log n) operations in the worst case.
          </div>
        </div>
      </section>
    </main>
  );
}
