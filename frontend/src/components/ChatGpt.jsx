import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { chatGpt }  from "../api/ChatGpt";
import { deepSeek } from "../api/DeepSeek";

// ─── AI options config ────────────────────────────────────────────────────────
const AI_OPTIONS = [
  { value: "chatgpt",  label: "ChatGPT",  icon: "⚡", color: "#10b981" },
  { value: "deepseek", label: "DeepSeek", icon: "🌊", color: "#0ea5e9" },
];

// ─── Small shared pieces ──────────────────────────────────────────────────────

function AIAvatar({ color = "#00e5ff" }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
      background: "linear-gradient(135deg,#00e5ff,#7c3aed)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 700, color: "#050810",
      animation: "courseOrbitGlow 3s ease-in-out infinite",
    }}>AI</div>
  );
}

function ThinkingDots({ color }) {
  return (
    <div style={{
      display: "flex", gap: 5, alignItems: "center",
      padding: "10px 14px",
      background: `rgba(0,229,255,.05)`,
      border: "1px solid rgba(0,229,255,.13)",
      borderRadius: "12px 12px 12px 3px",
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: color,
          animation: `courseBounceDot 1.2s ${i * 0.2}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

function Bubble({ msg, accentColor, streaming = false }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
      alignItems: "flex-start", marginBottom: ".72rem",
      animation: "courseFadeUp .3s ease-out",
    }}>
      {!isUser && (
        <div style={{ marginRight: 8, marginTop: 2 }}>
          <AIAvatar color={accentColor} />
        </div>
      )}

      <div style={{
        maxWidth: "78%", padding: "10px 14px",
        fontSize: ".875rem", lineHeight: 1.65, whiteSpace: "pre-wrap",
        borderRadius: isUser ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
        background: isUser
          ? `linear-gradient(135deg, ${accentColor}, #7c3aed)`
          : "rgba(255,255,255,.04)",
        color: isUser ? "#050810" : "#d4daf7",
        border: isUser ? "none" : "1px solid rgba(0,229,255,.12)",
        fontWeight: isUser ? 500 : 400,
        boxShadow: streaming ? `0 0 14px rgba(0,229,255,.2)` : "none",
        transition: "box-shadow .3s",
      }}>
        {msg.content}
        {streaming && (
          <span style={{
            display: "inline-block", marginLeft: 2, color: accentColor,
            animation: "courseBreathe .7s ease-in-out infinite",
          }}>▋</span>
        )}
      </div>
    </div>
  );
}

const ScanLine = ({ color }) => (
  <div style={{
    position: "absolute", left: 0, right: 0, height: 1, top: 0,
    pointerEvents: "none", zIndex: 3,
    background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
    animation: "courseScanLine 4s ease-in-out infinite",
  }} />
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function ChatGpt({ chatOpen, setChatOpen }) {

  const [selectedAI, setSelectedAI]             = useState("");
  const [input, setInput]                       = useState("");
  const [messages, setMessages]                 = useState([
    { role: "assistant", content: "👋 Hi! I'm your AI assistant. Ask me anything." },
  ]);
  const [loading, setLoading]                   = useState(false);
  const [streamingContent, setStreamingContent] = useState("");

  const streamingContentRef = useRef("");
  const chatEndRef          = useRef(null);

  useEffect(() => {
    streamingContentRef.current = streamingContent;
  }, [streamingContent]);

  // ── SCROLL FIX: useLayoutEffect runs after DOM mutations, before browser paint
  // ── Using "instant" during streaming keeps up with rapid content updates
  useLayoutEffect(() => {
    if (!chatOpen) return;
    const el = chatEndRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: loading ? "instant" : "smooth" });
  }, [messages, streamingContent, chatOpen, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    if (!selectedAI) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Please choose ChatGPT or DeepSeek first." },
      ]);
      return;
    }

    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setStreamingContent("");
    streamingContentRef.current = "";

    try {
      const apiFn = selectedAI === "chatgpt" ? chatGpt : deepSeek;
      await apiFn(text, (chunk) => {
        setStreamingContent(chunk);
        streamingContentRef.current = chunk;
      });
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: streamingContentRef.current },
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: " + (err?.message || String(err)) },
      ]);
    } finally {
      setLoading(false);
      setStreamingContent("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const aiOption    = AI_OPTIONS.find(a => a.value === selectedAI);
  const accentColor = aiOption?.color ?? "#00e5ff";
  const canSend     = input.trim() && !loading && selectedAI;

  // ── CLOSED STATE ─────────────────────────────────────────────────────────────
  if (!chatOpen) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1.1rem", height: "100%",
        background: "#07091b",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: 0, right: 0, top: 0, height: 1,
          background: `linear-gradient(90deg,transparent,${accentColor}33,transparent)`,
          animation: "courseGradShift 3s ease-in-out infinite",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "4px 10px",
            background: "rgba(0,229,255,.07)",
            border: "1px solid rgba(0,229,255,.18)",
            borderRadius: 8,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%", background: "#00e5ff",
              animation: "courseCornerPulse 1.5s infinite",
            }} />
            <span style={{
              fontSize: ".68rem", color: "#00e5ff",
              fontFamily: "monospace", letterSpacing: ".06em",
              animation: "courseNeonFlicker 8s infinite",
            }}>AI CHAT</span>
          </div>

          <div style={{ position: "relative" }}>
            <select
              value={selectedAI}
              onChange={e => setSelectedAI(e.target.value)}
              style={{
                appearance: "none", WebkitAppearance: "none",
                background: "rgba(255,255,255,.04)",
                border: `1px solid ${selectedAI ? accentColor + "55" : "rgba(255,255,255,.1)"}`,
                color: selectedAI ? accentColor : "#6b7a99",
                borderRadius: 8, padding: "4px 28px 4px 10px",
                fontSize: ".75rem", fontFamily: "monospace",
                outline: "none", cursor: "pointer",
                transition: "border-color .2s",
              }}
            >
              <option value="" disabled style={{ background: "#08091a", color: "#6b7a99" }}>
                Select AI
              </option>
              {AI_OPTIONS.map(a => (
                <option key={a.value} value={a.value}
                  style={{ background: "#08091a", color: "#e8eaf6" }}>
                  {a.icon}  {a.label}
                </option>
              ))}
            </select>
            <span style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              color: "#4a5568", fontSize: 10, pointerEvents: "none",
            }}>▾</span>
          </div>
        </div>

        <button
          onClick={() => setChatOpen(true)}
          style={{
            padding: "5px 16px", borderRadius: 9, fontSize: ".78rem", fontWeight: 600,
            background: "rgba(0,229,255,.08)", border: "1px solid rgba(0,229,255,.28)",
            color: "#00e5ff", cursor: "pointer", fontFamily: "inherit",
            transition: "all .22s", letterSpacing: ".02em",
            animation: "courseBreathe 2.5s ease-in-out infinite",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(0,229,255,.18)";
            e.currentTarget.style.boxShadow  = "0 0 14px rgba(0,229,255,.3)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,229,255,.08)";
            e.currentTarget.style.boxShadow  = "none";
          }}
        >
          Open Chat ↗
        </button>
      </div>
    );
  }

  // ── OPEN STATE ───────────────────────────────────────────────────────────────
  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%", width: "100%",
      background: "#06091a",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: ".55rem 1rem", flexShrink: 0,
        background: "rgba(8,10,28,.98)",
        borderBottom: "1px solid rgba(0,229,255,.1)",
        position: "relative",
      }}>
        <ScanLine color={accentColor} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%", background: accentColor,
              animation: "courseCornerPulse 1.3s infinite",
            }} />
            <span style={{
              fontSize: ".7rem", color: accentColor,
              fontFamily: "monospace", letterSpacing: ".07em", fontWeight: 700,
              animation: "courseNeonFlicker 7s infinite",
            }}>AI TUTOR</span>
          </div>

          <div style={{ position: "relative" }}>
            <select
              value={selectedAI}
              onChange={e => setSelectedAI(e.target.value)}
              style={{
                appearance: "none", WebkitAppearance: "none",
                background: "rgba(255,255,255,.04)",
                border: `1px solid ${selectedAI ? accentColor + "55" : "rgba(255,255,255,.1)"}`,
                color: selectedAI ? accentColor : "#6b7a99",
                borderRadius: 8, padding: "4px 28px 4px 10px",
                fontSize: ".73rem", fontFamily: "monospace",
                outline: "none", cursor: "pointer",
                transition: "border-color .2s, box-shadow .2s",
              }}
              onFocus={e => { e.target.style.boxShadow = `0 0 8px ${accentColor}33`; }}
              onBlur={e  => { e.target.style.boxShadow = "none"; }}
            >
              <option value="" disabled style={{ background: "#08091a", color: "#6b7a99" }}>
                Select AI
              </option>
              {AI_OPTIONS.map(a => (
                <option key={a.value} value={a.value}
                  style={{ background: "#08091a", color: "#e8eaf6" }}>
                  {a.icon}  {a.label}
                </option>
              ))}
            </select>
            <span style={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              color: "#4a5568", fontSize: 10, pointerEvents: "none",
            }}>▾</span>
          </div>

          {selectedAI && (
            <div style={{
              display: "flex", alignItems: "center", gap: 5, padding: "3px 9px",
              background: `rgba(${selectedAI === "chatgpt" ? "16,185,129" : "14,165,233"},.1)`,
              border: `1px solid ${accentColor}44`, borderRadius: 7,
            }}>
              <span style={{ fontSize: 12 }}>{aiOption?.icon}</span>
              <span style={{ fontSize: ".68rem", color: accentColor, fontFamily: "monospace" }}>
                {aiOption?.label}
              </span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 6, zIndex: 1 }}>
          <button
            onClick={() => setMessages([{ role: "assistant", content: "👋 Hi! I'm your AI assistant. Ask me anything." }])}
            style={{
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
              color: "#6b7a99", borderRadius: 7, padding: "3px 10px",
              fontSize: ".68rem", cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.color = "#e8eaf6"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.color = "#6b7a99"; }}
          >
            Clear
          </button>
          <button
            onClick={() => setChatOpen(false)}
            style={{
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
              color: "#6b7a99", borderRadius: 7, padding: "3px 10px",
              fontSize: ".68rem", cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,.1)"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.color = "#6b7a99"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; }}
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* ── Messages area ──────────────────────────────────────────────────── */}
      <div style={{
        flex: 1, overflowY: "scroll", padding: ".9rem 1rem",
        background: "#06091a",
        backgroundImage: `radial-gradient(rgba(0,229,255,.035) 1px, transparent 1px)`,
        backgroundSize: "26px 26px",
        scrollBehavior: "smooth",
        overflowAnchor: "none", // ← prevents browser fighting manual scroll
      }}>

        {messages.length === 1 && !loading && (
          <div style={{
            textAlign: "center", padding: "1.2rem 0 .5rem",
            fontSize: ".75rem", color: "#3d4455", fontFamily: "monospace",
            letterSpacing: ".06em", animation: "courseBreathe 3s infinite",
          }}>
            {selectedAI
              ? `// ${aiOption?.label?.toUpperCase()} ready — ask anything`
              : "// select an AI model above to begin"}
          </div>
        )}

        {messages.map((m, i) => (
          <Bubble key={i} msg={m} accentColor={accentColor} />
        ))}

        {loading && streamingContent && (
          <Bubble
            msg={{ role: "assistant", content: streamingContent }}
            accentColor={accentColor}
            streaming
          />
        )}

        {loading && !streamingContent && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            marginBottom: ".72rem", animation: "courseFadeUp .3s ease-out",
          }}>
            <AIAvatar color={accentColor} />
            <ThinkingDots color={accentColor} />
          </div>
        )}

        {/* Scroll anchor — always at the bottom */}
        <div ref={chatEndRef} style={{ height: 1 }} />
      </div>

      {/* ── Input bar ──────────────────────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "flex-end", gap: 8,
        padding: ".65rem .9rem", flexShrink: 0,
        background: "#08091a",
        borderTop: "1px solid rgba(0,229,255,.09)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", left: 0, right: 0, top: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${accentColor}28, transparent)`,
          animation: "courseGradShift 3s ease-in-out infinite",
        }} />

        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!selectedAI}
          placeholder={
            !selectedAI
              ? "Select an AI model first…"
              : loading
              ? `${aiOption?.label} is thinking…`
              : `Ask ${aiOption?.label} anything…`
          }
          style={{
            flex: 1,
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 10, color: "#e8eaf6",
            padding: ".6rem 1rem", fontSize: ".875rem",
            fontFamily: "inherit", outline: "none",
            transition: "border-color .2s, box-shadow .2s",
            opacity: selectedAI ? 1 : 0.5,
          }}
          onFocus={e => {
            e.target.style.borderColor = `${accentColor}55`;
            e.target.style.boxShadow  = `0 0 12px ${accentColor}20`;
          }}
          onBlur={e => {
            e.target.style.borderColor = "rgba(255,255,255,.08)";
            e.target.style.boxShadow  = "none";
          }}
        />

        <button
          onClick={sendMessage}
          disabled={!canSend}
          style={{
            width: 38, height: 38, borderRadius: 10, border: "none", flexShrink: 0,
            background: canSend
              ? `linear-gradient(135deg, ${accentColor}, #7c3aed)`
              : "rgba(255,255,255,.05)",
            color:  canSend ? "#050810" : "#3d4455",
            cursor: canSend ? "pointer"  : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 700, transition: "all .25s",
            boxShadow: canSend ? `0 0 16px ${accentColor}55` : "none",
          }}
          onMouseEnter={e => { if (canSend) e.currentTarget.style.transform = "scale(1.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {loading
            ? (
              <div style={{
                width: 14, height: 14, borderRadius: "50%",
                border: "2px solid #3d4455", borderTopColor: accentColor,
                animation: "courseSpin 1s linear infinite",
              }} />
            )
            : "➤"}
        </button>
      </div>
    </div>
  );
}