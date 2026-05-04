import { useState, useEffect } from "react";

const slides = [
  {
    tag: "Limited time offer",
    title: "Festive Sale 🎉",
    desc: "Up to 20% off on Ladies Wear",
    btn: "Shop Now",
    badge: "20%",
    theme: "purple",
  },
  {
    tag: "New arrivals",
    title: "Summer Edit ☀️",
    desc: "Fresh styles for the season",
    btn: "Explore",
    badge: "NEW",
    theme: "blue",
  },
  {
    tag: "Exclusive deal",
    title: "Flash Sale 🔥",
    desc: "Up to 40% off — today only",
    btn: "Grab Now",
    badge: "40%",
    theme: "red",
  },
];

const themes = {
  purple: { bg: "#ffec46", title: "#8e24aa", btn: "#8e24aa" },
  blue:   { bg: "#ffdba6", title: "#1565c0", btn: "#1565c0" },
  red:    { bg: "#ffc3c3", title: "#2de96b", btn: "#22d86e" },
};

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const goTo = (n) => setCurrent((n + slides.length) % slides.length);

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>

      {/* Slides track */}
      <div style={{ display: "flex", transition: "transform 0.55s cubic-bezier(0.77,0,0.18,1)", transform: `translateX(-${current * 100}%)` }}>
        {slides.map((s, i) => {
          const t = themes[s.theme];
          return (
            <div
              key={i}
              style={{
                minWidth: "100%",
                background: t.bg,
                padding: "36px 60px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "180px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background circle */}
              <div style={{
                position: "absolute", right: "-30px", top: "50%", transform: "translateY(-50%)",
                width: "220px", height: "220px", borderRadius: "50%",
                background: t.title, opacity: 0.12, pointerEvents: "none",
              }} />

              {/* Text content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", margin: "0 0 6px" }}>
                  {s.tag}
                </p>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 900, color: t.title, margin: "0 0 6px", lineHeight: 1.1 }}>
                  {s.title}
                </h2>
                <p style={{ fontSize: "14px", color: "#5d4037", margin: "0 0 16px" }}>{s.desc}</p>
                <button style={{ background: t.btn, color: "white", padding: "10px 22px", fontSize: "14px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: 600 }}>
                  {s.btn}
                </button>
              </div>

              {/* Badge */}
              <span style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 8vw, 64px)", fontWeight: 900, color: t.title, opacity: 0.12, position: "absolute", right: "5%", bottom: "10px", pointerEvents: "none" }}>
                {s.badge}
              </span>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      {[["left", "10px", () => goTo(current - 1), "←"], ["right", "10px", () => goTo(current + 1), "→"]].map(([side, pos, fn, label]) => (
        <button key={side} onClick={fn} style={{
          position: "absolute", top: "50%", [side]: pos, transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.75)", border: "none", borderRadius: "50%",
          width: "34px", height: "34px", cursor: "pointer", fontSize: "16px", zIndex: 10,
        }}>
          {label}
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "7px", zIndex: 10 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: "8px", height: "8px", borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
            background: i === current ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.2)",
            transform: i === current ? "scale(1.3)" : "scale(1)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}