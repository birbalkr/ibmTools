
import { useState, useRef, useEffect } from "react";
import ChatGpt from "./ChatGpt";
import TUTORIAL from "../utils/Tutorial";



const COURSE_KEYS = Object.keys(TUTORIAL);




// ─── Main Component ───────────────────────────────────────────────────────────
export default function CourseDetails({ initialCourse = null }) {
  const [activeCourse, setActiveCourse] = useState(initialCourse ?? "AppId");
  const [activeStep, setActiveStep] = useState(null);   // null = show description
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const courseListRef = useRef(null);
  const stepsListRef = useRef(null);
  const contentRef = useRef(null);
  const course = TUTORIAL[activeCourse];
  const stepContent = activeStep !== null ? course.steps[activeStep] : null;
  const stepImage = activeStep !== null ? (course.images?.[activeStep] ?? course.image?.[activeStep]) : null;

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (initialCourse) {
      setActiveCourse(initialCourse);
      setActiveStep(null);
      setMessages([]);
      setChatOpen(false);
      setInput("");
    }
  }, [initialCourse]);

  const switchCourse = (key) => {
    setActiveCourse(key);
    setActiveStep(null);
    setMessages([]);
    setChatOpen(false);
    setInput("");
  };



  return (
    <div style={{ display: "flex", height: "100vh", background: "#06080f",
      color: "#e8eaf6", fontFamily: "'Inter', 'Segoe UI', sans-serif", overflow: "hidden" }}>

      {/* ══════════ LEFT SIDEBAR — Course List ══════════ */}
      <aside style={{
        width: 220, flexShrink: 0, display: "flex", flexDirection: "column",
        background: "#08091a", borderRight: "1px solid rgba(255,255,255,0.06)",
        overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ padding: "1.2rem 1rem 0.8rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#00e5ff,#7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11,
              fontWeight: 700, color: "#050810", fontFamily: "monospace" }}>AI</div>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.02em" }}>
              Thought<span style={{ color: "#00e5ff" }}>Learn</span>
            </span>
          </div>
        </div>

        {/* Section label */}
        <div style={{ padding: "1rem 1rem 0.4rem", fontSize: "0.68rem", color: "#4a5568",
          fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          // COURSES
        </div>

        {/* Course items */}
        <div ref={courseListRef} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {COURSE_KEYS.map((key, index) => {
            const c = TUTORIAL[key];
            const active = activeCourse === key;
            return (
              <div key={key} className="course-item" style={{
                margin: "2px 8px", padding: "0.62rem 0.75rem", borderRadius: 10,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                background: active ? `rgba(${hexToRgb(c.color)},0.12)` : "transparent",
                border: active ? `1px solid ${c.color}33` : "1px solid transparent",
                transition: "all 0.2s",
                animation: `slideInLeft 0.5s ease-out ${index * 0.08}s backwards`,
              }}
              onClick={() => switchCourse(key)}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
              <span style={{ fontSize: 16 }}>{c.icon}</span>
              <span style={{ fontSize: "0.82rem", fontWeight: active ? 600 : 400,
                color: active ? c.color : "#9aa3b5", lineHeight: 1.3 }}>{c.title}</span>
              {active && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%",
                background: c.color, animation: "pulse 2s infinite" }} />}
              </div>
            );
          })}
        </div>

        {/* Bottom padding */}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.04)",
          fontSize: "0.72rem", color: "#3d4455", fontFamily: "monospace", textAlign: "center" }}>
          v1.0.0 · Learn with AI
        </div>
      </aside>

      {/* ══════════ CENTER — Main Content ══════════ */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden",
        minWidth: 0, padding: "1rem 0.75rem 1rem 1rem", position: "relative" }}>

        {/* ── Course Title Bar ── */}
        <div style={{
          border: `2px solid ${course.color}55`,
          borderRadius: 14, padding: "0.75rem 1.25rem", marginBottom: "0.75rem",
          background: `rgba(${hexToRgb(course.color)},0.05)`,
          display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
        }}>
          <span style={{ fontSize: 22 }}>{course.icon}</span>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.025em",
              margin: 0, color: "#e8eaf6" }}>{course.title}</h1>
            <p style={{ margin: 0, fontSize: "0.73rem", color: course.color,
              fontFamily: "monospace", marginTop: 2, letterSpacing: "0.04em" }}>
              {course.steps.length} steps · AI-powered tutor active
            </p>
          </div>
          
          {activeStep !== null && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "0.78rem", color: "#6b7a99" }}>Viewing:</span>
              <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: "0.78rem",
                fontWeight: 600, background: `rgba(${hexToRgb(course.color)},0.15)`,
                color: course.color, border: `1px solid ${course.color}40` }}>
                Step {activeStep + 1}
              </span>
              <button onClick={() => setActiveStep(null)}
                style={{ background: "transparent", border: "none", color: "#4a5568",
                  cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "0 4px" }}>×</button>
            </div>
          )}
        </div>

        {/* ── Course Description / Step Content ── */}
        <div ref={contentRef} style={{
          background: "#0a0d1f", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: "1.1rem 1.3rem",
          marginBottom: "0.75rem", flexShrink: 0,
          maxHeight: activeStep !== null ? "calc(100vh - 250px)" : chatOpen ? "120px" : "220px",
          overflowY: "auto",
          transition: "max-height 0.4s ease, opacity 0.4s ease",
          animation: "scaleIn 0.4s ease-out",
        }}>
          {activeStep === null ? (
            <>
              <p style={{ fontSize: "0.75rem", color: "#4a5568", fontFamily: "monospace",
                letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                // DESCRIPTION
              </p>
              <p style={{ fontSize: "0.9rem", color: "#9aa3b5", lineHeight: 1.75, margin: 0 }}>
                {course.description}
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: "0.75rem", color: course.color, fontFamily: "monospace",
                letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                // STEP {activeStep + 1} OF {course.steps.length}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#c8d0e8", lineHeight: 1.75, margin: 0 }}>
                {stepContent}
              </p>
              <div style={{ marginTop: "1rem", width: "100%" }}>
                <img
                  src={stepImage}
                  alt={`Step ${activeStep + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "calc(100vh - 390px)",
                    objectFit: "contain",
                    borderRadius: 14,
                    display: "block",
                    background: "#050810",
                  }}
                />
              </div>
            </>
          )}
        </div>


        {/* ── AI Chat Input Bar (always visible at bottom) ── */}
        <div style={{
          border: `2px solid ${course.color}44`, borderRadius: 14, flexShrink: 0,
          background: "#08091a", display: "flex", gap: 0,
          height: chatOpen ? "70%" : "auto",
          overflowY: chatOpen ? "auto" : "hidden",
          minHeight: 0,
          bottom: 0, left: 0, right: 0, marginTop: "auto",
          padding: "0.5rem 0.75rem", position: "sticky",
        }}>
        <ChatGpt chatOpen={chatOpen} setChatOpen={setChatOpen} />
        </div>
      </main>

      {/* ══════════ RIGHT SIDEBAR — Steps ══════════ */}
      <aside style={{
        width: 210, flexShrink: 0, display: "flex", flexDirection: "column",
        background: "#08091a", borderLeft: "1px solid rgba(255,255,255,0.06)",
        overflowY: "auto", padding: "0.75rem 0",
      }}>
        {/* Header */}
        <div style={{ padding: "0.5rem 1rem 0.8rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ margin: 0, fontSize: "0.68rem", color: "#4a5568", fontFamily: "monospace",
            letterSpacing: "0.12em", textTransform: "uppercase" }}>// STEPS</p>
          <p style={{ margin: "4px 0 0", fontSize: "0.78rem", color: "#6b7a99" }}>
            {course.steps.length} lessons · {course.title}
          </p>
        </div>

        {/* Step list */}
        <div ref={stepsListRef} style={{ flex: 1, padding: "0.5rem 0.5rem" }}>
          {course.steps.map((step, i) => {
            const isActive = activeStep === i;
            const stepLabel = `Step ${i + 1}`;
            const shortTitle = step.split(":")[0].replace(/^\d+\.\s*/, "").trim().slice(0, 26);
            return (
              <div key={i} className="step-item" onClick={() => setActiveStep(isActive ? null : i)}
                style={{
                  padding: "0.6rem 0.75rem", marginBottom: 3, borderRadius: 9, cursor: "pointer",
                  background: isActive ? `rgba(${hexToRgb(course.color)},0.1)` : "transparent",
                  border: isActive ? `1px solid ${course.color}35` : "1px solid transparent",
                  transition: "all 0.18s",
                  animation: `slideInRight 0.5s ease-out ${i * 0.06}s backwards`,
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* Step number badge */}
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: isActive ? course.color : "rgba(255,255,255,0.06)",
                    color: isActive ? "#050810" : "#4a5568",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.68rem", fontWeight: 700, fontFamily: "monospace",
                  }}>{i + 1}</div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: "0.7rem", color: isActive ? course.color : "#4a5568",
                      fontFamily: "monospace", letterSpacing: "0.05em" }}>{stepLabel}</p>
                    <p style={{ margin: 0, fontSize: "0.78rem", color: isActive ? "#c8d0e8" : "#6b7a99",
                      fontWeight: isActive ? 500 : 400, lineHeight: 1.3, overflow: "hidden",
                      textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{shortTitle}</p>
                  </div>
                </div>

               
              </div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: "0.7rem", color: "#4a5568", fontFamily: "monospace" }}>PROGRESS</span>
            <span style={{ fontSize: "0.7rem", color: course.color, fontFamily: "monospace" }}>
              {activeStep !== null ? activeStep + 1 : 0}/{course.steps.length}
            </span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
            <div style={{
              height: "100%", borderRadius: 2, transition: "width 0.4s ease",
              background: `linear-gradient(90deg, ${course.color}, #7c3aed)`,
              width: `${activeStep !== null ? ((activeStep + 1) / course.steps.length) * 100 : 0}%`,
            }} />
          </div>
        </div>
      </aside>
    </div>
  );
}

// ─── Helper: hex → "r,g,b" string for rgba() ─────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}