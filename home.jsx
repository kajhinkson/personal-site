// Kyle Hinkson — Home page

const { useState, useEffect, useRef } = React;
const D = window.SITE_DATA;

function Rotator({ words, accent, fontSize, fontFamily, fontStyle, fontWeight, interval }) {
  interval = interval || 2400;
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState("in");
  useEffect(() => {
    const t = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setI(prev => (prev + 1) % words.length);
        setPhase("in");
      }, 320);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  const longest = words.reduce((a, b) => a.length > b.length ? a : b, "");
  return (
    <span style={{ position: "relative", display: "inline-block", verticalAlign: "baseline" }}>
      <span style={{ visibility: "hidden", whiteSpace: "pre", fontFamily, fontStyle, fontWeight, fontSize, color: accent }}>{longest}</span>
      <span
        key={i}
        style={{
          position: "absolute", left: 0, top: 0,
          fontFamily, fontStyle, fontWeight, fontSize, color: accent,
          whiteSpace: "pre",
          opacity: phase === "in" ? 1 : 0,
          transform: phase === "in" ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 320ms ease, transform 320ms ease",
        }}
      >
        {words[i]}
      </span>
    </span>
  );
}

const PORTRAITS = [
  { src: "images/portrait-formal.jpg", label: "formal", caption: "Kyle, on a good day." },
  { src: "images/portrait-running.jpg", label: "running", caption: "Kyle, on a better day." },
];

function HeroHeadshot({ dark, accent }) {
  const [idx, setIdx] = useState(0);
  const portrait = PORTRAITS[idx];
  const flip = () => setIdx(i => (i + 1) % PORTRAITS.length);
  return (
    <div
      onClick={flip}
      data-cursor-label={idx === 0 ? "→ running" : "→ formal"}
      onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(0deg) scale(1.02)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(1.2deg)"}
      style={{
        background: dark ? "#231d16" : "#fff",
        padding: "10px 10px 12px",
        boxShadow: dark ? "0 12px 28px rgba(0,0,0,0.4)" : "0 12px 28px rgba(35,29,22,0.14)",
        transform: "rotate(1.2deg)",
        cursor: "pointer",
        transition: "transform 250ms",
      }}
    >
      <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#000", position: "relative" }}>
        <img
          key={portrait.src}
          src={portrait.src}
          alt={portrait.caption}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", animation: "fadeIn 320ms ease" }}
        />
        <div style={{
          position: "absolute", top: 8, left: 8,
          fontFamily: "'Caveat', cursive", fontSize: 16,
          color: "#fff", padding: "2px 8px", background: "rgba(0,0,0,0.45)",
          letterSpacing: "0.02em",
        }}>
          {portrait.label}
        </div>
      </div>
      <div style={{
        marginTop: 8, fontFamily: "'Caveat', cursive", fontSize: 17,
        color: dark ? "#f0e9dc" : "#231d16",
        display: "flex", justifyContent: "space-between", padding: "0 4px",
      }}>
        <span style={{ opacity: 0.6, fontSize: 14 }}>tap →</span>
        <span style={{ fontStyle: "italic" }}>{portrait.caption}</span>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}

function Title({ children, accent }) {
  return (
    <h2 style={{
      fontFamily: "'Inter', sans-serif", fontWeight: 400,
      fontSize: 36, letterSpacing: "-0.025em", margin: "0 0 16px",
    }}>
      {children}
      <span style={{ display: "inline-block", width: 40, height: 1, background: accent, verticalAlign: "middle", marginLeft: 14 }} />
    </h2>
  );
}

function StatBox({ v, l, rule, top, last }) {
  return (
    <div style={{
      padding: "18px 16px",
      borderTop: top ? `1px dashed ${rule}` : "none",
      borderRight: last ? "none" : `1px solid ${rule}`,
    }}>
      <div style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1 }}>{v}</div>
      <div style={{ fontSize: 11, opacity: 0.6, marginTop: 6, letterSpacing: "0.04em" }}>{l}</div>
    </div>
  );
}

function HomePage({ theme, setTheme }) {
  const [lb, setLb] = useState(null);
  const [photos, setPhotos] = useState(D.photos);
  const scopeRef = useRef(null);
  const dark = theme === "dark";

  const bg = dark ? "#1a1612" : "#f0e9dc";
  const fg = dark ? "#f0e9dc" : "#231d16";
  const rule = dark ? "rgba(240,233,220,0.18)" : "rgba(35,29,22,0.18)";
  const accent = dark ? "#d9a679" : "#7a4a1f";

  useEffect(() => {
    const key = D.unsplash_key;
    if (!key || key === "YOUR_UNSPLASH_ACCESS_KEY") return;
    fetch(`https://api.unsplash.com/users/whereiskylenow/photos?per_page=12&order_by=latest&client_id=${key}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const mapped = data.map((p, i) => ({
          id: p.id,
          url: p.urls.regular,
          page: p.links.html,
          title: p.alt_description || p.description || "untitled",
          place: (p.location && p.location.city) || "—",
          year: new Date(p.created_at).getFullYear(),
          loc: D.photos[i % D.photos.length]?.loc || "outdoors",
        }));
        setPhotos(mapped);
      })
      .catch(() => {});
  }, []);

  return (
    <div ref={scopeRef} style={{ width: "100%", minHeight: "100vh", background: bg, color: fg, fontFamily: "'Inter', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
      <CursorDot scope={scopeRef} color={accent} />

      {/* Paper texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(${dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)"} 1px, transparent 1px)`,
        backgroundSize: "3px 3px", zIndex: 1,
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 48px", borderBottom: `1px dashed ${rule}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}>Kyle Hinkson</span>
            <span style={{ fontSize: 12, opacity: 0.55 }}>· a personal website, mostly</span>
          </div>
          <nav style={{ display: "flex", gap: 16, fontSize: 12, opacity: 0.85, alignItems: "center" }}>
            <a href="about.html" data-cursor-label="more about me" style={{ color: "inherit", textDecoration: "none" }}>about</a>
            <span style={{ opacity: 0.4 }}>·</span>
            <a href="#work" data-cursor-label="work" style={{ color: "inherit", textDecoration: "none" }}>work</a>
            <span style={{ opacity: 0.4 }}>·</span>
            <a href="#photo" data-cursor-label="photographs" style={{ color: "inherit", textDecoration: "none" }}>photographs</a>
            <span style={{ opacity: 0.4 }}>·</span>
            <a href="#run" data-cursor-label="running" style={{ color: "inherit", textDecoration: "none" }}>running</a>
            <span style={{ opacity: 0.4 }}>·</span>
            <a href="#notes" data-cursor-label="notes" style={{ color: "inherit", textDecoration: "none" }}>notes</a>
            <button
              onClick={() => setTheme(dark ? "light" : "dark")}
              title="Toggle theme"
              data-cursor-label="theme"
              style={{
                marginLeft: 6, padding: "4px 10px", fontSize: 12, letterSpacing: "0.04em",
                background: "transparent", color: "inherit",
                border: `1px solid ${rule}`,
                cursor: "pointer", fontFamily: "inherit", borderRadius: 0,
              }}
            >
              {dark ? "◐ light" : "◑ dark"}
            </button>
          </nav>
        </header>

        {/* Hero */}
        <section style={{ padding: "80px 48px 60px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 64, alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: accent, marginBottom: 8, transform: "rotate(-1deg)", display: "inline-block" }}>
                hello —
              </div>
              <h1 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
                fontSize: 88, lineHeight: 0.98, letterSpacing: "-0.04em",
                margin: "0 0 28px",
              }}>
                Kyle Hinkson.
              </h1>
              <h2 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 300,
                fontSize: 44, lineHeight: 1.18, letterSpacing: "-0.025em",
                margin: 0,
              }}>
                I work in{" "}
                <Rotator
                  words={D.hero_phrases.a}
                  accent={accent}
                  fontFamily="'Caveat', cursive"
                  fontWeight={500}
                  fontStyle="normal"
                  fontSize={52}
                />,
                <br />
                spend weekends in{" "}
                <Rotator
                  words={D.hero_phrases.b}
                  accent={fg}
                  fontFamily="'Inter', sans-serif"
                  fontWeight={400}
                  fontStyle="italic"
                  fontSize={44}
                />,
                <br />
                and keep a{" "}
                <Rotator
                  words={D.hero_phrases.c}
                  accent={accent}
                  fontFamily="'Caveat', cursive"
                  fontWeight={500}
                  fontStyle="normal"
                  fontSize={52}
                />{" "}
                that
                <br />
                mostly forgives me.
              </h2>
              <div style={{ marginTop: 36, display: "flex", gap: 16, alignItems: "center", fontSize: 13, opacity: 0.7, flexWrap: "wrap" }}>
                <span>currently — senior director at rbc</span>
                <span>·</span>
                <span>based in toronto</span>
                <span>·</span>
                <a href="about.html" style={{ color: accent, textDecoration: "none", borderBottom: `1px dashed ${accent}` }}>more about me →</a>
              </div>
            </div>
            <div>
              <HeroHeadshot dark={dark} accent={accent} />
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" style={{ padding: "32px 48px 64px", maxWidth: 1100, margin: "0 auto" }}>
          <Title accent={accent}>where I&apos;ve been</Title>
          <p style={{ fontSize: 14, opacity: 0.7, maxWidth: 540, marginTop: -8, marginBottom: 32 }}>
            The last two roles. The full résumé{" "}
            <a href="about.html" style={{ color: accent, borderBottom: `1px dashed ${accent}`, textDecoration: "none" }}>lives here</a>.
          </p>
          {D.roles.map((r, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "140px 1fr 320px", gap: 28,
              padding: "26px 0", borderTop: `1px solid ${rule}`,
              alignItems: "baseline",
            }}>
              <div style={{ fontSize: 13, opacity: 0.6 }}>{r.years}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>
                  {r.title}
                  {r.current && <span style={{ marginLeft: 10, fontFamily: "'Caveat', cursive", fontSize: 22, color: accent, fontWeight: 500 }}>— now</span>}
                </div>
                <div style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>{r.org}</div>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.55, opacity: 0.85 }}>{r.blurb}</div>
            </div>
          ))}

          {/* Award — sits right under the roles */}
          <div style={{ padding: "18px 24px", marginTop: 8, border: `1px dashed ${rule}`, fontSize: 13, lineHeight: 1.55, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 22, color: accent }}>p.s.</span>
            {D.award.title}, {D.award.year}. {D.award.note}
          </div>

          {/* Personal projects */}
          <div style={{ marginTop: 36 }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 22, letterSpacing: "-0.02em", margin: "0 0 14px", display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontFamily: "'Caveat', cursive", color: accent, fontSize: 26 }}>on the side —</span>
              personal projects
            </h3>
            {D.projects.map((p, i) => (
              <a key={i} href={p.url} target="_blank" rel="noreferrer" data-cursor-label="open ↗"
                style={{
                  display: "grid", gridTemplateColumns: "1fr auto", gap: 24,
                  padding: "22px 24px", border: `1px dashed ${accent}`, marginTop: 14,
                  textDecoration: "none", color: "inherit", alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: "-0.015em" }}>{p.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4, lineHeight: 1.55 }}>{p.blurb}</div>
                  <div style={{ fontFamily: "'Caveat', cursive", fontSize: 16, color: accent, marginTop: 6 }}>{p.tag}</div>
                </div>
                <div style={{ fontSize: 22, color: accent }}>↗</div>
              </a>
            ))}
          </div>
        </section>

        {/* Photographs */}
        <section id="photo" style={{ padding: "32px 48px 64px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28 }}>
            <Title accent={accent}>photographs</Title>
            <a href={D.unsplash} target="_blank" rel="noreferrer" style={{ fontSize: 12, opacity: 0.7, color: "inherit", borderBottom: `1px dashed ${accent}`, textDecoration: "none" }}>
              more on unsplash ↗
            </a>
          </div>
          <p style={{ fontSize: 14, opacity: 0.7, maxWidth: 540, marginTop: -16, marginBottom: 32 }}>
            Mostly when I&apos;m out for a long run and stop, briefly, to notice something.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {photos.map((p, i) => {
              const tilts = [-0.8, 0.6, -0.4, 0.5, -0.3, 0.7, -0.6, 0.3, -0.5];
              return (
                <figure
                  key={p.id}
                  onClick={() => setLb(i)}
                  data-cursor-label="open"
                  style={{ margin: 0, cursor: "zoom-in", transform: `rotate(${tilts[i]}deg)`, transition: "transform 250ms" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(0deg) scale(1.02)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${tilts[i]}deg)`}
                >
                  <div style={{
                    background: dark ? "#231d16" : "#fff",
                    padding: "10px 10px 12px",
                    boxShadow: dark ? "0 8px 24px rgba(0,0,0,0.35)" : "0 8px 24px rgba(35,29,22,0.12)",
                  }}>
                    <div style={{ aspectRatio: "3/2", overflow: "hidden", background: "#000" }}>
                      <img src={p.url} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <figcaption style={{ marginTop: 8, fontFamily: "'Caveat', cursive", fontSize: 18, color: dark ? "#f0e9dc" : "#231d16" }}>
                      {p.title}, {p.place}, {p.year}
                    </figcaption>
                  </div>
                </figure>
              );
            })}
          </div>
        </section>

        {/* Running + Garden */}
        <section id="run" style={{ padding: "32px 48px 64px", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
          <div>
            <Title accent={accent}>on running</Title>
            <p style={{ fontSize: 14, opacity: 0.7, marginTop: -8, marginBottom: 24 }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: accent }}>last 30 days</span>
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}` }}>
              <StatBox v={D.running.last30.km} l="kilometres" rule={rule} />
              <StatBox v={D.running.last30.runs} l="runs" rule={rule} last />
              <StatBox v={D.running.last30.avg_pace} l="avg pace /km" rule={rule} top />
              <StatBox v={D.running.last30.elev + "m"} l="climbed" rule={rule} top last />
            </div>
            <p style={{ fontSize: 13, marginTop: 18, opacity: 0.75, lineHeight: 1.6 }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: accent }}>favourite loops —</span>
            </p>
            <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none" }}>
              {D.running.favorites.map((f, i) => (
                <li key={i} style={{ padding: "8px 0", fontSize: 14, borderTop: i ? `1px dashed ${rule}` : "none", display: "flex", justifyContent: "space-between" }}>
                  <span>{f.name} <span style={{ opacity: 0.55, fontSize: 12 }}>— {f.note}</span></span>
                  <span style={{ opacity: 0.7 }}>{f.km}km</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 16, fontSize: 12, opacity: 0.6 }}>
              next → {D.running.next}
            </div>
          </div>
          <div>
            <Title accent={accent}>in the garden</Title>
            <p style={{ fontSize: 14, opacity: 0.7, marginTop: -8, marginBottom: 24 }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 18, color: accent }}>the long-term experiment</span>
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontStyle: "italic", fontSize: 22, lineHeight: 1.35, letterSpacing: "-0.01em", margin: 0 }}>
              &ldquo;{D.garden.note}&rdquo;
            </p>
            <ul style={{ margin: "28px 0 0", padding: 0, listStyle: "none" }}>
              {D.garden.things.map((t, i) => (
                <li key={i} style={{ padding: "10px 0", fontSize: 14, borderTop: `1px dashed ${rule}`, display: "flex", justifyContent: "space-between" }}>
                  <span>— {t}</span>
                  <span style={{ fontFamily: "'Caveat', cursive", color: accent, fontSize: 16 }}>plot {String.fromCharCode(65 + i).toLowerCase()}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Notes */}
        <section id="notes" style={{ padding: "32px 48px 64px", maxWidth: 1100, margin: "0 auto" }}>
          <Title accent={accent}>notes, occasionally</Title>
          <div style={{ marginTop: 24 }}>
            {D.notes.map((n, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 24,
                padding: "18px 0", borderTop: `1px dashed ${rule}`,
                alignItems: "baseline",
              }}>
                <span style={{ fontSize: 12, opacity: 0.55 }}>{n.date}</span>
                <span>
                  <span style={{ fontSize: 19, letterSpacing: "-0.01em", fontWeight: 500 }}>{n.title}</span>
                  <span style={{ display: "block", fontSize: 13, opacity: 0.65, marginTop: 4, lineHeight: 1.5 }}>{n.kicker}</span>
                </span>
                <span style={{ fontFamily: "'Caveat', cursive", color: accent, fontSize: 15, opacity: 0.45 }}>soon</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: "60px 48px 80px", maxWidth: 1100, margin: "0 auto", textAlign: "center", borderTop: `1px dashed ${rule}` }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 28, color: accent }}>say hello —</div>
          <a href={`mailto:${D.email}`} style={{ display: "inline-block", marginTop: 12, fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em", color: fg, textDecoration: "none", borderBottom: `1px solid ${accent}`, paddingBottom: 3 }}>
            {D.email}
          </a>
          <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 22, fontSize: 13, opacity: 0.8, flexWrap: "wrap" }}>
            <a href={D.linkedin} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>linkedin ↗</a>
            <a href={D.github} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>github ↗</a>
            <a href={D.unsplash} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>unsplash ↗</a>
            <a href={D.projects[0].url} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>human leverage group ↗</a>
            <a href="about.html" style={{ color: "inherit", textDecoration: "none", borderBottom: `1px dashed ${rule}` }}>about →</a>
          </div>
          <p style={{ marginTop: 28, fontSize: 13, opacity: 0.6, maxWidth: 460, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            I read everything. I reply slowly, but I do reply.
          </p>
          <div style={{ marginTop: 40, fontSize: 11, opacity: 0.4, letterSpacing: "0.06em" }}>
            © 2026 · toronto · written by hand, mostly
          </div>
        </footer>
      </div>

      {lb !== null && (
        <Lightbox
          photo={photos[lb]}
          theme={theme}
          onClose={() => setLb(null)}
          onPrev={() => setLb((lb - 1 + photos.length) % photos.length)}
          onNext={() => setLb((lb + 1) % photos.length)}
        />
      )}
    </div>
  );
}

window.HomePage = HomePage;
