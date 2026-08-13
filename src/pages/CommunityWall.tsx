import { useEffect, useState } from "react";
import { MessageSquare, Code, Calendar, RefreshCw, Filter } from "lucide-react";

type Submission = {
  id: number;
  algorithm: string;
  code: string;
  explanation: string;
  created_at: string;
};

const algorithmLabels: Record<string, string> = {
  "binary-search": "Binary Search",
  "merge-sort": "Merge Sort",
  "backtracking": "Backtracking Solver",
};

export default function CommunityWall() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchSubmissions() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/.netlify/functions/get-submissions");
      if (!res.ok) {
        throw new Error("Could not load submissions from the cloud.");
      }
      const data = await res.json();
      setSubmissions(data);
    } catch (err: any) {
      setError(err.message || "Failed to load database entries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const filtered = filter === "all" 
    ? submissions 
    : submissions.filter((s) => s.algorithm === filter);

  return (
    <main className="community-page" style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div className="section-kicker">COMMUNITY REFLECTIONS</div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "2.8rem", margin: "0 0 10px", letterSpacing: "-1.5px", fontFamily: "Orbitron" }}>
            The DAA <span style={{ color: "var(--accent)" }}>Shared Feed</span>
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "600px", margin: 0, fontSize: "14px" }}>
            Peer-to-peer learning workspace. Compare custom Python logic, read algorithmic explanations, and review structural adaptations uploaded by other students.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button 
            className="button secondary-button" 
            onClick={fetchSubmissions} 
            style={{ display: "flex", gap: "8px", alignItems: "center", minHeight: "auto", padding: "10px 16px" }}
            title="Refresh Feed"
          >
            <RefreshCw size={14} className={loading ? "spin" : ""} />
            Refresh
          </button>
          
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "4px 10px" }}>
            <Filter size={14} style={{ color: "var(--muted)" }} />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)} 
              style={{ background: "transparent", border: 0, color: "#fff", outline: "none", fontSize: "13px", cursor: "pointer" }}
            >
              <option value="all" style={{ background: "var(--bg)" }}>All Algorithms</option>
              <option value="binary-search" style={{ background: "var(--bg)" }}>Binary Search</option>
              <option value="merge-sort" style={{ background: "var(--bg)" }}>Merge Sort</option>
              <option value="backtracking" style={{ background: "var(--bg)" }}>Backtracking Solver</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: "var(--muted)" }}>
          <RefreshCw size={24} className="spin" style={{ marginBottom: "10px", color: "var(--accent)" }} />
          <p style={{ margin: 0, fontFamily: "Share Tech Mono", fontSize: "13px" }}>Loading shared submissions from Netlify DB...</p>
        </div>
      ) : error ? (
        <div style={{ padding: "40px", border: "1px dashed var(--danger)", borderRadius: "12px", background: "rgba(255, 107, 107, 0.03)", textAlign: "center" }}>
          <p style={{ color: "var(--danger)", margin: "0 0 10px" }}>{error}</p>
          <button className="button primary-button" onClick={fetchSubmissions} style={{ minHeight: "auto", padding: "8px 16px" }}>Retry Connection</button>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: "60px", border: "1px dashed var(--border)", borderRadius: "12px", textAlign: "center", color: "var(--muted-2)", fontSize: "14px" }}>
          No submissions found in this category. Be the first to save your idea in the Code Lab!
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "25px" }}>
          {filtered.map((sub) => (
            <div 
              key={sub.id} 
              style={{ 
                background: "var(--panel)", 
                border: "1px solid var(--border)", 
                borderRadius: "16px", 
                padding: "24px", 
                display: "flex", 
                flexDirection: "column", 
                gap: "16px", 
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(12px)",
                transition: "transform 0.2s ease, border-color 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-soft)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ 
                  fontSize: "11px", 
                  fontFamily: "Orbitron", 
                  color: "var(--accent)", 
                  fontWeight: "700", 
                  background: "rgba(66,255,152,0.08)",
                  padding: "4px 10px",
                  borderRadius: "20px"
                }}>
                  {algorithmLabels[sub.algorithm] || sub.algorithm}
                </span>
                <span style={{ fontSize: "11px", color: "var(--muted-2)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Calendar size={12} />
                  {new Date(sub.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              <div>
                <label style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--muted-2)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                  <MessageSquare size={10} /> PEER LOGIC EXPLANATION
                </label>
                <p style={{ 
                  fontSize: "13px", 
                  color: "#fff", 
                  background: "rgba(0,0,0,0.2)", 
                  padding: "12px 14px", 
                  borderRadius: "8px", 
                  margin: 0, 
                  minHeight: "70px", 
                  border: "1px solid rgba(255,255,255,0.03)",
                  lineHeight: "1.5"
                }}>
                  {sub.explanation}
                </p>
              </div>

              <div>
                <label style={{ fontSize: "9px", fontFamily: "Share Tech Mono", color: "var(--muted-2)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                  <Code size={10} /> CUSTOM PYTHON IMPLEMENTATION
                </label>
                <pre style={{ margin: 0, padding: "12px", background: "#080808", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", maxHeight: "180px", overflowY: "auto" }}>
                  <code style={{ fontSize: "11px", fontFamily: "'Share Tech Mono', monospace", color: "#9bffd0", whiteSpace: "pre" }}>
                    {sub.code}
                  </code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
