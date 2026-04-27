// Shared components

const { useState, useEffect, useRef } = React;

function Lightbox({ photo, onClose, onPrev, onNext, theme }) {
  useEffect(() => {
    if (!photo) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo, onClose, onPrev, onNext]);

  if (!photo) return null;
  const dark = theme === "dark";
  return (
    <div
      onClick={onClose}
      className="lightbox-inner"
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: dark ? "rgba(8,9,12,0.95)" : "rgba(20,18,15,0.92)",
        display: "grid", gridTemplateRows: "1fr auto",
        cursor: "zoom-out",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto" }}>
        <img
          src={photo.url}
          alt={photo.title}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
        />
      </div>
      <div style={{ color: "#e9e6df", display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 16, fontFamily: "Inter, sans-serif", fontSize: 13 }}>
        <div>
          <div style={{ fontSize: 17, letterSpacing: "-0.01em" }}>{photo.title}</div>
          <div style={{ opacity: 0.6, marginTop: 2 }}>{photo.place} · {photo.year}</div>
        </div>
        <div className="lightbox-btns">
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={lbBtn}>← prev</button>
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={lbBtn}>next →</button>
          <button onClick={onClose} style={lbBtn}>close (esc)</button>
        </div>
      </div>
    </div>
  );
}
const lbBtn = {
  background: "transparent", border: "none", color: "#e9e6df",
  fontFamily: "inherit", fontSize: 13, cursor: "pointer",
  letterSpacing: "0.04em", textTransform: "uppercase",
};

function CursorDot({ scope, color }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
      }
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onHover = (e) => {
      const t = e.target.closest("[data-cursor-label]");
      setHover(t ? t.getAttribute("data-cursor-label") : null);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseover", onHover);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseover", onHover);
    };
  }, [scope]);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute", top: 0, left: 0, pointerEvents: "none",
        opacity: visible ? 1 : 0, transition: "opacity 200ms",
        zIndex: 50,
      }}
    >
      <div style={{
        position: "absolute", top: -4, left: -4,
        width: 8, height: 8, borderRadius: 99,
        background: color, mixBlendMode: "difference",
      }} />
      {hover && (
        <div style={{
          position: "absolute", top: 14, left: 14,
          padding: "4px 8px", background: color, color: "#fff",
          fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
          fontFamily: "monospace", whiteSpace: "nowrap",
        }}>{hover}</div>
      )}
    </div>
  );
}

window.Lightbox = Lightbox;
window.CursorDot = CursorDot;
