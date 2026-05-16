import { useState, useEffect } from "react";

const COLORS = {
  primary: "#4F46E5",
  primaryDark: "#3730A3",
  primaryLight: "#818CF8",
  accent: "#F59E0B",
  accentGreen: "#10B981",
  dark: "#0F0F1A",
  surface: "#1A1A2E",
  surfaceLight: "#252540",
  text: "#E2E8F0",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
};

const styles = {
  "@import":
    "url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap')",
};

const courseData = [
  { id: 1, title: "Full-Stack Web Dev", category: "Coding", lessons: 48, progress: 72, color: "#4F46E5", emoji: "💻" },
  { id: 2, title: "UI/UX Design Mastery", category: "Design", lessons: 32, progress: 45, color: "#EC4899", emoji: "🎨" },
  { id: 3, title: "Python for Data Science", category: "Data", lessons: 60, progress: 20, color: "#10B981", emoji: "📊" },
  { id: 4, title: "Business Strategy", category: "Business", lessons: 24, progress: 90, color: "#F59E0B", emoji: "📈" },
];

const stats = [
  { label: "Courses Enrolled", value: "4", icon: "📚" },
  { label: "Hours Learned", value: "128", icon: "⏱️" },
  { label: "Certificates", value: "2", icon: "🏆" },
  { label: "Current Streak", value: "14d", icon: "🔥" },
];

const navLinks = ["Courses", "Features", "Pricing", "Contact"];

// ─── HOMEPAGE ────────────────────────────────────────────────────────────────
function HomePage({ onLogin }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.getElementById("lh-scroll");
    const handler = () => setScrolled(el?.scrollTop > 60);
    el?.addEventListener("scroll", handler);
    return () => el?.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      id="lh-scroll"
      style={{
        height: "100vh",
        overflowY: "auto",
        fontFamily: "'DM Sans', sans-serif",
        background: "#0F0F1A",
        color: COLORS.text,
      }}
    >
      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: 72,
          background: scrolled ? "rgba(15,15,26,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            background: "linear-gradient(135deg, #818CF8, #4F46E5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          LearnHub
        </span>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {navLinks.map((l) => (
            <span
              key={l}
              style={{
                color: COLORS.textMuted,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = COLORS.white)}
              onMouseLeave={(e) => (e.target.style.color = COLORS.textMuted)}
            >
              {l}
            </span>
          ))}
          <button
            onClick={onLogin}
            style={{
              padding: "10px 24px",
              borderRadius: 100,
              border: "1px solid rgba(129,140,248,0.4)",
              background: "transparent",
              color: COLORS.primaryLight,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = COLORS.primary;
              e.target.style.color = COLORS.white;
              e.target.style.borderColor = COLORS.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = COLORS.primaryLight;
              e.target.style.borderColor = "rgba(129,140,248,0.4)";
            }}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)",
            top: "10%",
            left: "20%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
            bottom: "10%",
            right: "15%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 100,
            border: "1px solid rgba(129,140,248,0.3)",
            background: "rgba(79,70,229,0.1)",
            color: COLORS.primaryLight,
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 32,
            animation: "fadeUp 0.6s ease forwards",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#10B981",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          New: Python for AI course now live →
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(48px, 8vw, 88px)",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            color: COLORS.white,
            maxWidth: 800,
            marginBottom: 24,
            animation: "fadeUp 0.6s 0.1s ease both",
          }}
        >
          Learn Skills Online
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #818CF8 0%, #4F46E5 40%, #EC4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Anytime, Anywhere
          </span>
        </h1>

        <p
          style={{
            color: COLORS.textMuted,
            fontSize: 18,
            lineHeight: 1.7,
            maxWidth: 520,
            marginBottom: 44,
            fontWeight: 300,
            animation: "fadeUp 0.6s 0.2s ease both",
          }}
        >
          Join thousands of students learning coding, design, and business
          skills with interactive lessons and expert instructors.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            animation: "fadeUp 0.6s 0.3s ease both",
          }}
        >
          <button
            onClick={onLogin}
            style={{
              padding: "16px 40px",
              borderRadius: 100,
              border: "none",
              background: "linear-gradient(135deg, #4F46E5, #818CF8)",
              color: COLORS.white,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(79,70,229,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 40px rgba(79,70,229,0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 32px rgba(79,70,229,0.4)";
            }}
          >
            Start Learning Free
          </button>
          <button
            style={{
              padding: "16px 40px",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: COLORS.text,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            Browse Courses
          </button>
        </div>

        {/* Social proof */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            gap: 16,
            animation: "fadeUp 0.6s 0.4s ease both",
          }}
        >
          <div style={{ display: "flex" }}>
            {["🧑‍💻", "👩‍🎨", "👨‍💼", "👩‍🔬"].map((e, i) => (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `hsl(${i * 60 + 200}, 70%, 50%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  marginLeft: i > 0 ? -10 : 0,
                  border: "2px solid #0F0F1A",
                }}
              >
                {e}
              </div>
            ))}
          </div>
          <span style={{ color: COLORS.textMuted, fontSize: 14 }}>
            <span style={{ color: COLORS.white, fontWeight: 600 }}>12,000+</span> students
            already learning
          </span>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section
        style={{
          padding: "100px 48px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              color: COLORS.primaryLight,
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Why Us
          </p>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 52px)",
              color: COLORS.white,
              letterSpacing: "-1px",
            }}
          >
            Why Choose LearnHub?
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {[
            {
              icon: "🎓",
              title: "Expert Teachers",
              desc: "Learn from experienced instructors with industry backgrounds and proven teaching methods.",
              color: "#4F46E5",
            },
            {
              icon: "⚡",
              title: "Flexible Learning",
              desc: "Study at your own pace with lifetime access, mobile support, and offline downloads.",
              color: "#EC4899",
            },
            {
              icon: "🏆",
              title: "Certificates",
              desc: "Earn certificates after course completion that are recognized by top companies worldwide.",
              color: "#F59E0B",
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                padding: 36,
                borderRadius: 20,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = f.color + "50";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: f.color + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: COLORS.white,
                  marginBottom: 12,
                }}
              >
                {f.title}
              </h3>
              <p style={{ color: COLORS.textMuted, lineHeight: 1.7, fontSize: 15 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "0 48px 100px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            borderRadius: 28,
            background:
              "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)",
            padding: "72px 64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              right: -80,
              top: -80,
            }}
          />
          <div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 40,
                color: COLORS.white,
                marginBottom: 12,
                letterSpacing: "-1px",
              }}
            >
              Ready to start learning?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>
              Join 12,000+ learners and transform your career today.
            </p>
          </div>
          <button
            onClick={onLogin}
            style={{
              padding: "18px 48px",
              borderRadius: 100,
              border: "none",
              background: COLORS.white,
              color: COLORS.primary,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            Get Started Free →
          </button>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ name: "Alex Johnson", email });
    }, 1400);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: COLORS.white,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'DM Sans', sans-serif",
        background: COLORS.dark,
        color: COLORS.text,
      }}
    >
      {/* Left panel */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg, #3730A3 0%, #4F46E5 50%, #7C3AED 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            bottom: -200,
            right: -200,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            top: -100,
            left: -80,
          }}
        />
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 28,
            color: COLORS.white,
            marginBottom: 64,
          }}
        >
          LearnHub
        </span>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 44,
            color: COLORS.white,
            lineHeight: 1.15,
            letterSpacing: "-1px",
            marginBottom: 20,
          }}
        >
          Your learning
          <br />
          journey starts
          <br />
          here.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.7, maxWidth: 320 }}>
          Access 500+ courses across coding, design, data, and business. Learn
          from the best, at your pace.
        </p>

        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 16 }}>
          {["✅ Lifetime course access", "✅ Industry-recognized certificates", "✅ Expert instructors"].map((t) => (
            <span key={t} style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          width: 520,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 56px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            alignSelf: "flex-start",
            background: "none",
            border: "none",
            color: COLORS.textMuted,
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 48,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ← Back to home
        </button>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 36,
            color: COLORS.white,
            marginBottom: 8,
            letterSpacing: "-0.5px",
          }}
        >
          Welcome back
        </h1>
        <p style={{ color: COLORS.textMuted, marginBottom: 40, fontSize: 15 }}>
          Sign in to continue your learning journey.
        </p>

        {/* Social logins */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {[
            { icon: "G", label: "Google" },
            { icon: "𝕏", label: "Twitter" },
          ].map((s) => (
            <button
              key={s.label}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: COLORS.text,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
            >
              <span style={{ fontWeight: 700 }}>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ color: COLORS.textMuted, fontSize: 13 }}>or email</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 8 }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, color: COLORS.textMuted, display: "block", marginBottom: 8 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: 48 }}
                onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: COLORS.textMuted,
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right", marginBottom: 28 }}>
          <span style={{ color: COLORS.primaryLight, fontSize: 13, cursor: "pointer" }}>
            Forgot password?
          </span>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#FCA5A5",
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 12,
            border: "none",
            background: loading
              ? "rgba(79,70,229,0.5)"
              : "linear-gradient(135deg, #4F46E5, #818CF8)",
            color: COLORS.white,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 8px 24px rgba(79,70,229,0.35)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {loading ? (
            <>
              <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
              Signing in…
            </>
          ) : (
            "Sign In →"
          )}
        </button>

        <p style={{ textAlign: "center", marginTop: 28, color: COLORS.textMuted, fontSize: 14 }}>
          Don't have an account?{" "}
          <span style={{ color: COLORS.primaryLight, cursor: "pointer" }}>
            Create one free
          </span>
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = [
    { id: "overview", icon: "⊞", label: "Overview" },
    { id: "courses", icon: "📚", label: "My Courses" },
    { id: "explore", icon: "🔍", label: "Explore" },
    { id: "certificates", icon: "🏆", label: "Certificates" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        background: COLORS.dark,
        color: COLORS.text,
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: COLORS.surface,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "28px 16px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            background: "linear-gradient(135deg, #818CF8, #4F46E5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            padding: "0 12px",
            marginBottom: 36,
          }}
        >
          LearnHub
        </span>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 10,
                border: "none",
                background:
                  activeTab === item.id
                    ? "rgba(79,70,229,0.15)"
                    : "transparent",
                color:
                  activeTab === item.id ? COLORS.primaryLight : COLORS.textMuted,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: activeTab === item.id ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                borderLeft: activeTab === item.id
                  ? `2px solid ${COLORS.primaryLight}`
                  : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id)
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* User info */}
        <div
          style={{
            padding: "16px 14px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.04)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4F46E5, #EC4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 15,
              color: COLORS.white,
              flexShrink: 0,
            }}
          >
            {user.name.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 600, fontSize: 13, color: COLORS.white, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.name}
            </p>
            <p style={{ fontSize: 11, color: COLORS.textMuted, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.email}
            </p>
          </div>
          <button
            onClick={onLogout}
            title="Logout"
            style={{
              background: "none",
              border: "none",
              color: COLORS.textMuted,
              cursor: "pointer",
              fontSize: 16,
              padding: 4,
            }}
          >
            ⏻
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 40,
          }}
        >
          <div>
            <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 4 }}>
              👋 Good morning,
            </p>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 32,
                color: COLORS.white,
                letterSpacing: "-0.5px",
              }}
            >
              {user.name}
            </h1>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <span>🔔</span>
              <span style={{ fontSize: 14, color: COLORS.textMuted }}>3 new</span>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4F46E5, #EC4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 18,
                color: COLORS.white,
                cursor: "pointer",
              }}
            >
              {user.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "24px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 32,
                  color: COLORS.white,
                  margin: "8px 0 4px",
                  letterSpacing: "-1px",
                }}
              >
                {s.value}
              </p>
              <p style={{ color: COLORS.textMuted, fontSize: 13 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: COLORS.white,
            marginBottom: 20,
          }}
        >
          Continue Learning
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {courseData.map((c) => (
            <div
              key={c.id}
              style={{
                padding: 28,
                borderRadius: 20,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = c.color + "40";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: c.color + "25",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    }}
                  >
                    {c.emoji}
                  </div>
                  <div>
                    <p style={{ color: COLORS.textMuted, fontSize: 12, marginBottom: 4, textTransform: "uppercase", letterSpacing: "1px" }}>
                      {c.category}
                    </p>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.white }}>
                      {c.title}
                    </h3>
                  </div>
                </div>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: 100,
                    background: c.color + "20",
                    color: c.color,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {c.progress}%
                </span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div
                  style={{
                    height: 6,
                    borderRadius: 100,
                    background: "rgba(255,255,255,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${c.progress}%`,
                      borderRadius: 100,
                      background: `linear-gradient(90deg, ${c.color}, ${c.color}aa)`,
                      transition: "width 1s ease",
                    }}
                  />
                </div>
              </div>
              <p style={{ color: COLORS.textMuted, fontSize: 13 }}>{c.lessons} lessons</p>
            </div>
          ))}
        </div>

        {/* Activity heatmap row */}
        <div
          style={{
            padding: 28,
            borderRadius: 20,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: COLORS.white, fontSize: 18 }}>
              Learning Activity
            </h3>
            <span style={{ color: COLORS.textMuted, fontSize: 13 }}>Last 12 weeks</span>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {Array.from({ length: 84 }).map((_, i) => {
              const intensity = Math.random();
              const alpha = intensity < 0.4 ? 0.07 : intensity < 0.65 ? 0.3 : intensity < 0.85 ? 0.6 : 1;
              return (
                <div
                  key={i}
                  title={`${Math.floor(intensity * 120)} mins`}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    background: `rgba(79,70,229,${alpha})`,
                    cursor: "pointer",
                    transition: "transform 0.1s",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.3)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function Demo() {
  const [page, setPage] = useState("home"); // "home" | "login" | "dashboard"
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (u) => {
    setUser(u);
    setPage("dashboard");
  };

  if (page === "dashboard" && user) {
    return (
      <DashboardPage
        user={user}
        onLogout={() => {
          setUser(null);
          setPage("home");
        }}
      />
    );
  }

  if (page === "login") {
    return (
      <LoginPage
        onSuccess={handleLoginSuccess}
        onBack={() => setPage("home")}
      />
    );
  }

  return <HomePage onLogin={() => setPage("login")} />;
}