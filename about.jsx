// Kyle Hinkson — About page

const { useState, useEffect, useRef } = React;
const DA = window.SITE_DATA;

function AboutPage({ theme, setTheme }) {
  const scopeRef = useRef(null);
  const dark = theme === "dark";
  const bg = dark ? "#1a1612" : "#f0e9dc";
  const fg = dark ? "#f0e9dc" : "#231d16";
  const rule = dark ? "rgba(240,233,220,0.18)" : "rgba(35,29,22,0.18)";
  const accent = dark ? "#d9a679" : "#7a4a1f";

  return (
    <div ref={scopeRef} style={{ width: "100%", minHeight: "100vh", background: bg, color: fg, fontFamily: "'Inter', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
      <CursorDot scope={scopeRef} color={accent} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(${dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)"} 1px, transparent 1px)`,
        backgroundSize: "3px 3px", zIndex: 1,
      }} />
      <div style={{ position: "relative", zIndex: 2 }}>

        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 48px", borderBottom: `1px dashed ${rule}` }}>
          <a href="index.html" data-cursor-label="back" style={{ color: "inherit", textDecoration: "none", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: accent }}>←</span>
            back to home
          </a>
          <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em" }}>Kyle Hinkson · about</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href={`mailto:${DA.email}`} style={{ color: "inherit", textDecoration: "none", fontSize: 13, borderBottom: `1px dashed ${accent}` }}>
              say hello
            </a>
            <button
              onClick={() => setTheme(dark ? "light" : "dark")}
              title="Toggle theme"
              data-cursor-label="theme"
              style={{
                padding: "4px 10px", fontSize: 12, letterSpacing: "0.04em",
                background: "transparent", color: "inherit",
                border: `1px solid ${rule}`,
                cursor: "pointer", fontFamily: "inherit", borderRadius: 0,
              }}
            >
              {dark ? "◐ light" : "◑ dark"}
            </button>
          </div>
        </header>

        {/* Hero */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 48px 48px" }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: accent, marginBottom: 12 }}>
            a longer answer —
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 64, lineHeight: 1.04, letterSpacing: "-0.035em", margin: 0, maxWidth: 880 }}>
            More about{" "}
            <em style={{ fontWeight: 300, color: accent, fontStyle: "normal", fontFamily: "'Caveat', cursive", fontSize: 76 }}>me</em>
            , in the order I&apos;d actually tell you.
          </h1>
          <p style={{ marginTop: 32, fontSize: 18, lineHeight: 1.6, maxWidth: 720, opacity: 0.9 }}>
            {DA.about.long_intro}
          </p>
        </section>

        {/* Portrait + fact sheet */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 48px 64px", display: "grid", gridTemplateColumns: "320px 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <div style={{
              background: dark ? "#231d16" : "#fff",
              padding: "10px 10px 12px",
              boxShadow: dark ? "0 12px 28px rgba(0,0,0,0.4)" : "0 12px 28px rgba(35,29,22,0.14)",
              transform: "rotate(-1deg)",
            }}>
              <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#000" }}>
                <img src={DA.portrait} alt="Kyle" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
              </div>
              <div style={{ marginTop: 8, fontFamily: "'Caveat', cursive", fontSize: 18, color: dark ? "#f0e9dc" : "#231d16", textAlign: "center" }}>
                Kyle, on a good day.
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: accent, margin: "0 0 14px" }}>fact sheet</h3>
            <dl style={{ margin: 0 }}>
              {DA.about.fact_sheet.map(([k, v], i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, padding: "12px 0", borderTop: `1px dashed ${rule}` }}>
                  <dt style={{ fontSize: 12, opacity: 0.6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{k}</dt>
                  <dd style={{ margin: 0, fontSize: 15, letterSpacing: "-0.005em" }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Operating principles */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 48px 64px" }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 36, letterSpacing: "-0.025em", margin: "0 0 12px" }}>
            how I work
            <span style={{ display: "inline-block", width: 40, height: 1, background: accent, verticalAlign: "middle", marginLeft: 14 }} />
          </h2>
          <p style={{ fontSize: 14, opacity: 0.7, maxWidth: 540, marginTop: 0, marginBottom: 28 }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: accent }}>opinions, slowly held</span>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {DA.about.operating_principles.map((p, i) => (
              <div key={i} style={{
                padding: "24px 28px 24px 0",
                borderTop: `1px solid ${rule}`,
                borderRight: i % 2 === 0 ? `1px solid ${rule}` : "none",
                paddingLeft: i % 2 === 1 ? 28 : 0,
              }}>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: accent, marginBottom: 6 }}>
                  {String(i + 1).padStart(2, "0")}.
                </div>
                <h4 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 22, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
                  {p.t}
                </h4>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, opacity: 0.85 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Full timeline */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 48px 64px" }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 36, letterSpacing: "-0.025em", margin: "0 0 12px" }}>
            full timeline
            <span style={{ display: "inline-block", width: 40, height: 1, background: accent, verticalAlign: "middle", marginLeft: 14 }} />
          </h2>
          <p style={{ fontSize: 14, opacity: 0.7, maxWidth: 540, marginTop: 0, marginBottom: 28 }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: accent }}>the whole résumé, in one place</span>
          </p>
          {DA.timeline.map((r, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "140px 220px 1fr", gap: 24,
              padding: "20px 0", borderTop: `1px solid ${rule}`,
              alignItems: "baseline",
            }}>
              <div style={{ fontSize: 12, opacity: 0.6 }}>{r.y}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.015em" }}>{r.t}</div>
                <div style={{ fontSize: 13, opacity: 0.65, marginTop: 2 }}>{r.o}</div>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.55, opacity: 0.85 }}>{r.d}</div>
            </div>
          ))}
        </section>

        {/* Off the clock + speaking */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 48px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 32, letterSpacing: "-0.025em", margin: "0 0 14px" }}>
              off the clock
              <span style={{ display: "inline-block", width: 40, height: 1, background: accent, verticalAlign: "middle", marginLeft: 14 }} />
            </h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {DA.about.interests.map((it, i) => (
                <li key={i} style={{ padding: "10px 0", fontSize: 15, borderTop: i ? `1px dashed ${rule}` : "none" }}>
                  <span style={{ fontFamily: "'Caveat', cursive", color: accent, marginRight: 10 }}>—</span>
                  {it}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24, fontSize: 14, opacity: 0.8, lineHeight: 1.6 }}>
              {DA.about.background}
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 32, letterSpacing: "-0.025em", margin: "0 0 14px" }}>
              speaking &amp; advisory
              <span style={{ display: "inline-block", width: 40, height: 1, background: accent, verticalAlign: "middle", marginLeft: 14 }} />
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.9, marginTop: 0 }}>
              {DA.about.speaking}
            </p>
            <div style={{ marginTop: 18, padding: "20px 22px", border: `1px dashed ${accent}` }}>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: accent, marginBottom: 6 }}>good for —</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 13.5, lineHeight: 1.7, opacity: 0.9 }}>
                <li>— Executive coaching on AI/ML strategy</li>
                <li>— Board observer or advisory roles</li>
                <li>— Conference panels (fraud, applied ML, leadership)</li>
                <li>— Quietly reviewing your model architecture</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: "60px 48px 80px", maxWidth: 1100, margin: "0 auto", textAlign: "center", borderTop: `1px dashed ${rule}` }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: accent }}>get in touch —</div>
          <a href={`mailto:${DA.email}`} style={{ display: "inline-block", marginTop: 12, fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em", color: fg, textDecoration: "none", borderBottom: `1px solid ${accent}`, paddingBottom: 3 }}>
            {DA.email}
          </a>
          <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 22, fontSize: 13, opacity: 0.8, flexWrap: "wrap" }}>
            <a href={DA.linkedin} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>linkedin ↗</a>
            <a href={DA.github} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>github ↗</a>
            <a href={DA.unsplash} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>unsplash ↗</a>
            <a href={DA.projects[0].url} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>human leverage group ↗</a>
            <a href="index.html" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>← home</a>
          </div>
          <div style={{ marginTop: 40, fontSize: 11, opacity: 0.4, letterSpacing: "0.06em" }}>
            © 2026 · toronto · written by hand, mostly
          </div>
        </footer>
      </div>
    </div>
  );
}

window.AboutPage = AboutPage;
