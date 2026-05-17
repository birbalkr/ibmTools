import { useState, useEffect, useRef } from "react";

// anime.js must be installed: npm install animejs
// Tailwind CSS must be configured in your project
// Google Fonts (Clash Display, Syne, DM Sans) in your index.html or CSS

/* ─────────────────────────── DATA ─────────────────────────── */
// courseKey must match a key in your TUTORIAL object (utils/Tutorial.js)
const COURSES = [
    {
        id: 1, tag: "AI", tagStyle: "bg-violet-500/15 text-violet-400",
        icon: "🤖", title: "AI & Machine Learning Fundamentals",
        desc: "From zero to hero — neural networks, model training, and real-world deployments.",
        level: "Beginner", lessons: 42, hours: "18h", students: "12.4k",
        instructor: "Dr. Sarah Lin", rating: 4.9, progress: 65,
        accentColor: "#7C3AED",
        courseKey: "AppId",           // ← maps to TUTORIAL["AppId"]
    },
    {
        id: 2, tag: "HOT", tagStyle: "bg-red-500/15 text-red-400",
        icon: "⚡", title: "Prompt Engineering Mastery",
        desc: "Unlock the full power of large language models with advanced prompting strategies.",
        level: "Intermediate", lessons: 28, hours: "11h", students: "9.1k",
        instructor: "Alex Chen", rating: 4.8, progress: 30,
        accentColor: "#06B6D4",
        courseKey: "PromptEngineering", // ← maps to TUTORIAL["PromptEngineering"]
    },
    {
        id: 3, tag: "NEW", tagStyle: "bg-cyan-500/15 text-cyan-400",
        icon: "🧠", title: "Deep Learning with PyTorch",
        desc: "Build CNNs, transformers, and diffusion models with hands-on projects.",
        level: "Advanced", lessons: 55, hours: "24h", students: "7.3k",
        instructor: "Prof. Raj Patel", rating: 4.9, progress: 0,
        accentColor: "#F0ABFC",
        courseKey: "DeepLearning",
    },
    {
        id: 4, tag: "AI", tagStyle: "bg-violet-500/15 text-violet-400",
        icon: "🔮", title: "Building AI Agents & RAG Systems",
        desc: "Design autonomous agents, RAG pipelines, and production LLM applications.",
        level: "Advanced", lessons: 36, hours: "15h", students: "5.8k",
        instructor: "Mia Torres", rating: 4.7, progress: 0,
        accentColor: "#10B981",
        courseKey: "AIAgents",
    },
    {
        id: 5, tag: "NEW", tagStyle: "bg-cyan-500/15 text-cyan-400",
        icon: "📊", title: "Data Science with AI Tools",
        desc: "Leverage AI to accelerate data analysis, visualization, and predictive modeling.",
        level: "Beginner", lessons: 32, hours: "13h", students: "8.9k",
        instructor: "Dr. Emily Brooks", rating: 4.8, progress: 0,
        accentColor: "#F59E0B",
        courseKey: "DataScience",
    },
    {
        id: 6, tag: "HOT", tagStyle: "bg-red-500/15 text-red-400",
        icon: "🎨", title: "Generative AI for Creatives",
        desc: "Create art, music, video and design workflows using the latest GenAI tools.",
        level: "Beginner", lessons: 24, hours: "9h", students: "14.2k",
        instructor: "Jake Morales", rating: 4.9, progress: 0,
        accentColor: "#EC4899",
        courseKey: "GenAICreatives",
    },
];

const FEATURES = [
    { icon: "🎯", title: "Adaptive Learning Paths", desc: "AI tailors the curriculum to your skill level, pace, and learning style in real time." },
    { icon: "💬", title: "AI Tutor, 24/7", desc: "Get instant, context-aware answers from our embedded AI teaching assistant." },
    { icon: "🔬", title: "Hands-on Projects", desc: "Every course ships with real-world projects and auto-graded coding challenges." },
    { icon: "🏆", title: "Verified Certificates", desc: "Blockchain-verified certificates recognized by 500+ hiring partners worldwide." },
    { icon: "🌐", title: "Live Cohort Sessions", desc: "Join weekly live sessions with instructors and a global community of learners." },
    { icon: "📈", title: "Progress Analytics", desc: "Visual dashboards track your mastery, streaks, and skill gaps across all courses." },
];

const TESTIMONIALS = [
    { name: "Priya Sharma", role: "ML Engineer @ Google", text: "The AI tutor feature is incredible. It felt like having a personal mentor available around the clock. Landed my dream job 3 months after completing the ML course.", initials: "PS", color: "#7C3AED" },
    { name: "Marcus Johnson", role: "Founder, AIStartup.io", text: "Went from zero coding to shipping my first AI product in 60 days. The curriculum is dense, practical, and actually fun.", initials: "MJ", color: "#06B6D4" },
    { name: "Aisha Okonkwo", role: "Data Scientist @ Meta", text: "Best investment I've made in my career. The community alone is worth it — collaborators from 40+ countries.", initials: "AO", color: "#F0ABFC" },
];

const STATS = [
    { val: 200, suffix: "K+", label: "Active Learners" },
    { val: 120, suffix: "+", label: "Expert Courses" },
    { val: 500, suffix: "+", label: "Hiring Partners" },
    { val: 98, suffix: "%", label: "Satisfaction Rate" },
];

const AVATAR_COLORS = ["#7C3AED", "#06B6D4", "#F0ABFC", "#10B981", "#F59E0B"];
const AVATAR_LETTERS = ["P", "M", "A", "R", "E"];

/* ─────────────────── CUSTOM STYLES (injected once) ─────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');

  .lwa-root { font-family: 'DM Sans', sans-serif; background: #05050A; color: #E2E8F0; }
  .lwa-root * { box-sizing: border-box; }

  .font-display  { font-family: 'Clash Display', sans-serif !important; }
  .font-syne     { font-family: 'Syne', sans-serif !important; }

  .grad-text {
    background: linear-gradient(135deg, #A78BFA 0%, #67E8F9 55%, #F0ABFC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .grid-bg {
    background-image:
      linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .orb { position: absolute; border-radius: 50%; pointer-events: none; }
  .orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%); top: -100px; left: -200px; }
  .orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(6,182,212,0.16) 0%, transparent 70%); top: 100px; right: -150px; }
  .orb-3 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%); bottom: -50px; right: 200px; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 32px; border-radius: 12px;
    background: linear-gradient(135deg, #7C3AED, #06B6D4);
    color: #fff; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 15px;
    border: none; cursor: pointer; position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 24px rgba(124,58,237,0.4);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 40px rgba(124,58,237,0.55); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 32px; border-radius: 12px; background: transparent;
    color: #A78BFA; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 15px;
    border: 1px solid rgba(167,139,250,0.35); cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .btn-ghost:hover { background: rgba(124,58,237,0.1); border-color: #7C3AED; }

  .course-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px; padding: 28px;
    position: relative; overflow: hidden;
    transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }
  .course-card:hover { transform: translateY(-6px); border-color: rgba(124,58,237,0.4); box-shadow: 0 20px 60px rgba(124,58,237,0.2); }

  .feature-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 18px; padding: 32px 28px;
    transition: transform 0.3s, border-color 0.3s;
  }
  .feature-card:hover { transform: translateY(-4px); border-color: rgba(124,58,237,0.3); }

  .testi-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px; padding: 28px;
  }

  .prog-bar { height: 4px; border-radius: 999px; background: rgba(255,255,255,0.08); overflow: hidden; }
  .prog-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #7C3AED, #06B6D4); }

  .section-tag {
    font-family: 'Syne', sans-serif; font-size: 11px; letter-spacing: 0.15em;
    text-transform: uppercase; color: #7C3AED; font-weight: 700; margin-bottom: 12px;
  }

  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; border-radius: 999px;
    border: 1px solid rgba(124,58,237,0.35); background: rgba(124,58,237,0.1);
    font-size: 13px; font-weight: 500; color: #A78BFA;
    font-family: 'Syne', sans-serif; letter-spacing: 0.04em;
  }

  .nav-link {
    font-size: 14px; font-weight: 500; color: #94A3B8; cursor: pointer;
    transition: color 0.2s; font-family: 'Syne', sans-serif; text-decoration: none;
  }
  .nav-link:hover { color: #E2E8F0; }

  @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes float3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
  .float1 { animation: float1 5s ease-in-out infinite; }
  .float2 { animation: float2 7s ease-in-out infinite; }
  .float3 { animation: float3 4s ease-in-out infinite; }

  #lwa-cursor-glow {
    position: fixed; width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%);
    pointer-events: none; z-index: 0; transform: translate(-50%, -50%);
    transition: left 0.08s, top 0.08s;
  }
`;

/* ─────────────────── UTILS ─────────────────── */
function useScrollReveal(selector, options = {}) {
    useEffect(() => {
        const import_ = async () => {
            const anime = (await import("animejs/lib/anime.es.js")).default;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            anime({
                                targets: selector,
                                opacity: [0, 1],
                                translateY: [30, 0],
                                delay: anime.stagger(90),
                                duration: 700,
                                easing: "easeOutExpo",
                            });
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.1, ...options }
            );
            document.querySelectorAll(selector).forEach((el) => {
                el.style.opacity = "0";
                observer.observe(el);
            });
            return () => observer.disconnect();
        };
        import_();
    }, [selector]);
}

/* ─────────────────── NAVBAR ─────────────────── */
function Navbar({ onNavigate }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <nav
            style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                padding: scrolled ? "14px 0" : "20px 0",
                background: scrolled ? "rgba(5,5,10,0.85)" : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
                transition: "all 0.4s ease",
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Logo — click to stay on home */}
                <div
                    onClick={() => onNavigate(null)}
                    style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
                >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✦</div>
                    <span className="font-syne" style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>
                        <span style={{ color: "#fff" }}>Learn</span>
                        <span className="grad-text"> with AI</span>
                    </span>
                </div>
                {/* Nav Links */}
                <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                    {["Courses", "Projects", "Community", "Pricing"].map((l) => (
                        <a
                            key={l} className="nav-link" href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                // "Courses" opens the first course details page; others are placeholders
                                if (l === "Courses") {
                                    onNavigate(COURSES[0].courseKey);
                                }
                            }}
                        >{l}</a>
                    ))}
                </div>
                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <a className="nav-link" href="#" style={{ color: "#94A3B8" }}>Log in</a>
                    <button
                        className="btn-primary"
                        style={{ padding: "10px 24px", fontSize: 14, borderRadius: 10 }}
                        onClick={() => onNavigate(COURSES[0].courseKey)}
                    >
                        Get Started Free
                    </button>
                </div>
            </div>
        </nav>
    );
}

/* ─────────────────── HERO ─────────────────── */
function Hero({ onNavigate }) {
    const titleWords = ["Master", "AI.", "Shape", "Tomorrow."];
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const run = async () => {
            const anime = (await import("animejs/lib/anime.es.js")).default;

            // Hero words stagger
            anime({
                targets: ".hero-word",
                opacity: [0, 1],
                translateY: [40, 0],
                delay: anime.stagger(80, { start: 300 }),
                duration: 800,
                easing: "easeOutExpo",
            });

            // Subtitle
            anime({ targets: subtitleRef.current, opacity: [0, 1], translateY: [20, 0], delay: 900, duration: 700, easing: "easeOutExpo" });

            // CTA
            anime({ targets: ctaRef.current, opacity: [0, 1], translateY: [20, 0], delay: 1100, duration: 700, easing: "easeOutExpo" });

            // Floating cards entrance
            anime({
                targets: ".hero-float-card",
                opacity: [0, 1],
                scale: [0.85, 1],
                delay: anime.stagger(120, { start: 1200 }),
                duration: 800,
                easing: "easeOutBack",
            });

            // Pill
            anime({ targets: ".hero-pill", opacity: [0, 1], scale: [0.8, 1], delay: 150, duration: 600, easing: "easeOutBack" });

            // Stats counters
            anime({
                targets: ".stat-counter",
                innerHTML: (el) => [0, parseInt(el.getAttribute("data-val"), 10)],
                delay: anime.stagger(100, { start: 1400 }),
                duration: 1800,
                round: 1,
                easing: "easeOutExpo",
            });
        };
        run();
    }, []);

    return (
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
            <div className="grid-bg" style={{ position: "absolute", inset: 0 }} />
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 32px 80px", width: "100%", position: "relative", zIndex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

                    {/* ── Left copy ── */}
                    <div>
                        <div className="hero-pill pill" style={{ marginBottom: 28, opacity: 0 }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#A78BFA", display: "inline-block" }} />
                            ✦ AI-powered learning platform
                        </div>

                        <h1 className="font-display" style={{ fontSize: "clamp(48px,5vw,76px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 28 }}>
                            {titleWords.map((w, i) => (
                                <span
                                    key={i}
                                    className="hero-word"
                                    style={{ opacity: 0, display: "inline-block", marginRight: "0.22em" }}
                                >
                                    {i >= 2 ? <span className="grad-text">{w}</span> : w}
                                    {i === 1 && <br />}
                                </span>
                            ))}
                        </h1>

                        <p
                            ref={subtitleRef}
                            style={{ fontSize: 18, lineHeight: 1.7, color: "#94A3B8", maxWidth: 440, marginBottom: 40, opacity: 0 }}
                        >
                            Build real AI skills with personalised learning paths, an AI tutor that never sleeps, and a community of 200,000+ builders.
                        </p>

                        <div ref={ctaRef} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", opacity: 0 }}>
                            <button className="btn-primary" onClick={() => onNavigate(COURSES[0].courseKey)}>
                                Start Learning Free <span style={{ fontSize: 18 }}>→</span>
                            </button>
                            <button
                                className="btn-ghost"
                                onClick={() => document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                <span style={{ fontSize: 16 }}>▶</span> Browse Courses
                            </button>
                        </div>

                        {/* Social proof */}
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 36 }}>
                            <div style={{ display: "flex" }}>
                                {AVATAR_COLORS.map((c, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: 34, height: 34, borderRadius: "50%", background: c,
                                            border: "2px solid #05050A", display: "flex", alignItems: "center",
                                            justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff",
                                            marginLeft: i === 0 ? 0 : -10, zIndex: 5 - i, position: "relative",
                                        }}
                                    >
                                        {AVATAR_LETTERS[i]}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div style={{ display: "flex", gap: 2 }}>
                                    {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#FBBF24", fontSize: 14 }}>{s}</span>)}
                                </div>
                                <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
                                    Trusted by <strong style={{ color: "#94A3B8" }}>200,000+</strong> learners
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Right floating UI ── */}
                    <div style={{ position: "relative", height: 520 }}>
                        {/* Course card */}
                        <div className="hero-float-card float1" style={{ opacity: 0, position: "absolute", top: 40, left: 40, right: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: 28, backdropFilter: "blur(16px)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#7C3AED,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🤖</div>
                                <div>
                                    <p className="font-syne" style={{ fontWeight: 700, fontSize: 15, color: "#E2E8F0" }}>AI & ML Fundamentals</p>
                                    <p style={{ fontSize: 12, color: "#64748B" }}>Dr. Sarah Lin</p>
                                </div>
                                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 999, background: "rgba(124,58,237,0.15)", color: "#A78BFA", fontFamily: "Syne, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>AI</span>
                            </div>
                            <div className="prog-bar" style={{ marginBottom: 8 }}>
                                <div className="prog-fill" style={{ width: "65%" }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B" }}>
                                <span>65% complete</span><span>18h · 42 lessons</span>
                            </div>
                        </div>

                        {/* AI chat bubble */}
                        <div className="hero-float-card float2" style={{ opacity: 0, position: "absolute", top: 210, right: -20, width: 240, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 18, padding: 16, backdropFilter: "blur(16px)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>✦</div>
                                <span className="font-syne" style={{ fontSize: 12, fontWeight: 700, color: "#A78BFA" }}>AI Tutor</span>
                            </div>
                            <p style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.5 }}>Great question! Backpropagation computes the gradient of the loss function using the chain rule...</p>
                        </div>

                        {/* Badge */}
                        <div className="hero-float-card float3" style={{ opacity: 0, position: "absolute", bottom: 90, left: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(12px)" }}>
                            <span style={{ fontSize: 28 }}>🏆</span>
                            <div>
                                <p style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0" }}>Badge Earned!</p>
                                <p style={{ fontSize: 11, color: "#64748B" }}>Neural Networks Pro</p>
                            </div>
                        </div>

                        {/* Streak */}
                        <div className="hero-float-card float1" style={{ opacity: 0, position: "absolute", bottom: 60, right: 20, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 20 }}>🔥</span>
                            <div>
                                <p style={{ fontSize: 13, fontWeight: 700, color: "#FBBF24" }}>28-Day Streak</p>
                                <p style={{ fontSize: 11, color: "#92400E" }}>Keep it going!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 72, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 48 }}>
                    {STATS.map((s, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <div className="font-display" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>
                                <span className="stat-counter grad-text" data-val={s.val}>0</span>
                                <span className="grad-text">{s.suffix}</span>
                            </div>
                            <p className="font-syne" style={{ fontSize: 14, color: "#64748B", marginTop: 6 }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── COURSES ─────────────────── */
function Courses({ onNavigate }) {
    const [filter, setFilter] = useState("All");
    const FILTERS = ["All", "Beginner", "Intermediate", "Advanced"];
    const filtered = filter === "All" ? COURSES : COURSES.filter((c) => c.level === filter);
    const sectionRef = useRef(null);
    const didAnimate = useRef(false);

    useEffect(() => {
        const run = async () => {
            const anime = (await import("animejs/lib/anime.es.js")).default;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting && !didAnimate.current) {
                            didAnimate.current = true;
                            anime({
                                targets: ".course-card-anim",
                                opacity: [0, 1],
                                translateY: [40, 0],
                                delay: anime.stagger(90),
                                duration: 700,
                                easing: "easeOutExpo",
                            });
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.1 }
            );
            if (sectionRef.current) observer.observe(sectionRef.current);
            return () => observer.disconnect();
        };
        run();
    }, []);

    return (
        <section id="courses-section" ref={sectionRef} style={{ padding: "100px 0", position: "relative" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p className="section-tag">📚 Curriculum</p>
                    <h2 className="font-display" style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16 }}>
                        Top-Rated <span className="grad-text">AI Courses</span>
                    </h2>
                    <p style={{ fontSize: 17, color: "#64748B", maxWidth: 500, margin: "0 auto" }}>
                        Curated by industry experts. Continuously updated with the latest AI breakthroughs.
                    </p>
                </div>

                {/* Filter tabs */}
                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 48, flexWrap: "wrap" }}>
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: "8px 22px", borderRadius: 999,
                                border: `1px solid ${filter === f ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
                                background: filter === f ? "rgba(124,58,237,0.15)" : "transparent",
                                color: filter === f ? "#A78BFA" : "#64748B",
                                fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14,
                                cursor: "pointer", transition: "all 0.2s",
                            }}
                        >{f}</button>
                    ))}
                </div>

                {/* Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
                    {filtered.map((c) => (
                        <div
                            key={c.id}
                            className="course-card course-card-anim"
                            style={{ opacity: 0 }}
                            onClick={() => onNavigate(c.courseKey)}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${c.accentColor}22`, border: `1px solid ${c.accentColor}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{c.icon}</div>
                                <span className={`${c.tagStyle}`} style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 999, fontFamily: "Syne, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.tag}</span>
                            </div>
                            <h3 className="font-syne" style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#E2E8F0", lineHeight: 1.35 }}>{c.title}</h3>
                            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, marginBottom: 20 }}>{c.desc}</p>
                            <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#64748B", marginBottom: 20 }}>
                                <span>📖 {c.lessons} lessons</span>
                                <span>⏱ {c.hours}</span>
                                <span>👤 {c.students}</span>
                            </div>
                            {c.progress > 0 && (
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B", marginBottom: 6 }}>
                                        <span>Your progress</span><span>{c.progress}%</span>
                                    </div>
                                    <div className="prog-bar"><div className="prog-fill" style={{ width: `${c.progress}%` }} /></div>
                                </div>
                            )}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>
                                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                                    <span style={{ color: "#FBBF24" }}>★</span>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: "#E2E8F0" }}>{c.rating}</span>
                                    <span style={{ fontSize: 13, color: "#64748B" }}>· {c.instructor}</span>
                                </div>
                                <span
                                    className="font-syne"
                                    onClick={(e) => { e.stopPropagation(); onNavigate(c.courseKey); }}
                                    style={{ fontSize: 13, fontWeight: 700, padding: "6px 16px", borderRadius: 8, background: `${c.accentColor}18`, color: c.accentColor, border: `1px solid ${c.accentColor}33`, cursor: "pointer" }}
                                >
                                    {c.progress > 0 ? "Continue →" : "Enroll Free →"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: "center", marginTop: 48 }}>
                    <button className="btn-ghost">View All 120+ Courses →</button>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── FEATURES ─────────────────── */
function Features() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const run = async () => {
            const anime = (await import("animejs/lib/anime.es.js")).default;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            anime({ targets: ".feat-anim", opacity: [0, 1], translateY: [30, 0], delay: anime.stagger(80), duration: 600, easing: "easeOutExpo" });
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.1 }
            );
            if (sectionRef.current) observer.observe(sectionRef.current);
        };
        run();
    }, []);

    return (
        <section ref={sectionRef} style={{ padding: "100px 0", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
                    <div>
                        <p className="section-tag">⚡ Why Learn with AI</p>
                        <h2 className="font-display" style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 20 }}>
                            Learning that <span className="grad-text">adapts to you,</span> not the other way around.
                        </h2>
                        <p style={{ fontSize: 17, color: "#64748B", lineHeight: 1.7, marginBottom: 36 }}>
                            We've rebuilt education from the ground up with AI at its core — smarter feedback, faster progress, and a completely personalised experience.
                        </p>
                        <button className="btn-primary">Explore the Platform →</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                        {FEATURES.map((f, i) => (
                            <div key={i} className="feature-card feat-anim" style={{ opacity: 0 }}>
                                <div style={{ fontSize: 30, marginBottom: 14 }}>{f.icon}</div>
                                <h4 className="font-syne" style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: "#E2E8F0" }}>{f.title}</h4>
                                <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── TESTIMONIALS ─────────────────── */
function Testimonials() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const run = async () => {
            const anime = (await import("animejs/lib/anime.es.js")).default;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            anime({ targets: ".testi-anim", opacity: [0, 1], translateX: [-30, 0], delay: anime.stagger(120), duration: 700, easing: "easeOutExpo" });
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.1 }
            );
            if (sectionRef.current) observer.observe(sectionRef.current);
        };
        run();
    }, []);

    return (
        <section ref={sectionRef} style={{ padding: "100px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p className="section-tag">💬 Stories</p>
                    <h2 className="font-display" style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, letterSpacing: "-0.03em" }}>
                        What our <span className="grad-text">learners say</span>
                    </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="testi-card testi-anim" style={{ opacity: 0 }}>
                            <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
                                {"★★★★★".split("").map((s, j) => <span key={j} style={{ color: "#FBBF24", fontSize: 14 }}>{s}</span>)}
                            </div>
                            <p style={{ fontSize: 15, color: "#CBD5E1", lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 18 }}>
                                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${t.color}33`, border: `2px solid ${t.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: t.color }}>
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-syne" style={{ fontWeight: 700, fontSize: 14, color: "#E2E8F0" }}>{t.name}</p>
                                    <p style={{ fontSize: 12, color: "#64748B" }}>{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── CTA BANNER ─────────────────── */
function CTABanner({ onNavigate }) {
    const ref = useRef(null);

    useEffect(() => {
        const run = async () => {
            const anime = (await import("animejs/lib/anime.es.js")).default;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            anime({ targets: ref.current, opacity: [0, 1], scale: [0.96, 1], duration: 800, easing: "easeOutExpo" });
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.2 }
            );
            if (ref.current) { ref.current.style.opacity = "0"; observer.observe(ref.current); }
        };
        run();
    }, []);

    return (
        <section style={{ padding: "0 0 100px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
                <div ref={ref} style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 100%)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 28, padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: -60, left: -60, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
                    <span style={{ fontSize: 48, display: "block", marginBottom: 20 }}>✦</span>
                    <h2 className="font-display" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16 }}>
                        Ready to build your <span className="grad-text">AI future?</span>
                    </h2>
                    <p style={{ fontSize: 17, color: "#94A3B8", maxWidth: 480, margin: "0 auto 36px" }}>
                        Join 200,000+ learners already transforming their careers. Start free — no credit card needed.
                    </p>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }} onClick={() => onNavigate(COURSES[0].courseKey)}>Start Learning Free →</button>
                        <button className="btn-ghost" style={{ fontSize: 16, padding: "16px 40px" }} onClick={() => document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" })}>Explore Courses</button>
                    </div>
                    <p style={{ fontSize: 13, color: "#475569", marginTop: 20 }}>Free plan · No credit card · Cancel anytime</p>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── FOOTER ─────────────────── */
function Footer() {
    const FOOTER_COLS = [
        { title: "Product", links: ["Courses", "Projects", "AI Tutor", "Certificates", "Community"] },
        { title: "Company", links: ["About", "Blog", "Careers", "Press", "Partners"] },
        { title: "Support", links: ["Help Center", "Privacy", "Terms", "Contact", "Accessibility"] },
    ];

    return (
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 0 32px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#7C3AED,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✦</div>
                            <span className="font-syne" style={{ fontSize: 17, fontWeight: 800 }}>
                                <span style={{ color: "#fff" }}>Learn</span><span className="grad-text"> with AI</span>
                            </span>
                        </div>
                        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, maxWidth: 280 }}>
                            The smartest way to build AI skills. Personalised, project-based, and powered by AI.
                        </p>
                    </div>
                    {FOOTER_COLS.map((col, i) => (
                        <div key={i}>
                            <p className="font-syne" style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0", marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>{col.title}</p>
                            {col.links.map((l) => (
                                <a key={l} href="#" style={{ display: "block", fontSize: 14, color: "#475569", marginBottom: 10, textDecoration: "none", transition: "color 0.2s" }}
                                    onMouseEnter={(e) => (e.target.style.color = "#94A3B8")}
                                    onMouseLeave={(e) => (e.target.style.color = "#475569")}>{l}</a>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 13, color: "#334155" }}>© 2025 Learn with AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

/* ─────────────────── HOME (default export) ─────────────────── */
export default function Home({ onNavigate = () => { } }) {
    // Inject global styles once
    useEffect(() => {
        const id = "lwa-global-styles";
        if (!document.getElementById(id)) {
            const style = document.createElement("style");
            style.id = id;
            style.textContent = globalStyles;
            document.head.appendChild(style);
        }

        // Cursor glow
        const glow = document.createElement("div");
        glow.id = "lwa-cursor-glow";
        document.body.appendChild(glow);

        const move = (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        };
        window.addEventListener("mousemove", move);

        return () => {
            window.removeEventListener("mousemove", move);
            glow.remove();
        };
    }, []);

    return (
        <div className="lwa-root">
            <Navbar onNavigate={onNavigate} />
            <Hero onNavigate={onNavigate} />

            <Features />
            <Testimonials />
            <CTABanner onNavigate={onNavigate} />
            <Footer />
        </div>
    );
}