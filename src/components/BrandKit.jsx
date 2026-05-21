import React, { useState } from 'react';
import './BrandKit.scss';

const PALETTES = {
  dark: {
    bg: '#06070A',
    surface: '#0D0E14',
    surfaceAlt: 'rgba(255,255,255,0.04)',
    line: 'rgba(255,255,255,0.08)',
    text: '#F4F1EA',
    sub: '#8A8FA3',
  },
  light: {
    bg: '#F4F1EA',
    surface: '#FFFFFF',
    surfaceAlt: 'rgba(0,0,0,0.03)',
    line: 'rgba(0,0,0,0.08)',
    text: '#06070A',
    sub: '#5C6072',
  },
};

const BRAND = {
  purple: '#9945FF',
  mint:   '#14F195',
  magenta:'#FF2E88',
};

const Glyph = ({ size = 160, theme = 'dark' }) => {
  const stroke = size * 0.085;
  const r = (size - stroke) / 2 - size * 0.02;
  const cx = size / 2;
  const cy = size / 2;
  const slashOverflow = size * 0.18;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="0xbits diameter mark">
      <defs>
        <linearGradient id={`ring-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={BRAND.purple} />
          <stop offset="60%"  stopColor={BRAND.magenta} />
          <stop offset="100%" stopColor={BRAND.mint} />
        </linearGradient>
        <filter id={`glow-${theme}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={size * 0.025} result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter={theme === 'dark' ? `url(#glow-${theme})` : undefined}>
        <circle cx={cx} cy={cy} r={r} fill="none"
                stroke={`url(#ring-${theme})`} strokeWidth={stroke} />
        <line
          x1={cx - r * 0.85 - slashOverflow * 0.7}
          y1={cy + r * 0.85 + slashOverflow * 0.7}
          x2={cx + r * 0.85 + slashOverflow * 0.7}
          y2={cy - r * 0.85 - slashOverflow * 0.7}
          stroke={`url(#ring-${theme})`}
          strokeWidth={stroke}
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
};

const Wordmark = ({ size = 38, theme = 'dark', mono = false }) => {
  const p = PALETTES[theme];
  return (
    <span className="bk__wordmark" style={{ fontSize: size, color: p.text }}>
      <Glyph size={size * 1.15} theme={theme} />
      <span className="bk__wordmark-text" style={{ fontFamily: mono ? "'Cascadia Mono', monospace" : "'Space Grotesk', sans-serif" }}>
        <span style={{ color: BRAND.magenta }}>0x</span>bits
      </span>
    </span>
  );
};

const Swatch = ({ hex, name, role, theme }) => {
  const p = PALETTES[theme];
  return (
    <div className="bk__swatch" style={{ background: p.surface, borderColor: p.line }}>
      <div className="bk__swatch-chip" style={{ background: hex }} />
      <div className="bk__swatch-info">
        <div className="bk__swatch-name" style={{ color: p.text }}>{name}</div>
        <div className="bk__swatch-role" style={{ color: p.sub }}>{role}</div>
        <code style={{ color: p.sub }}>{hex.toUpperCase()}</code>
      </div>
    </div>
  );
};

const Section = ({ id, label, title, theme, children }) => {
  const p = PALETTES[theme];
  return (
    <section className="bk__section" id={id}>
      <header className="bk__section-head">
        <span className="bk__section-label" style={{ color: BRAND.mint }}>
          {label}
        </span>
        <h2 style={{ color: p.text }}>{title}</h2>
      </header>
      {children}
    </section>
  );
};

export default function BrandKit() {
  const [theme, setTheme] = useState('dark');
  const p = PALETTES[theme];
  const isDark = theme === 'dark';

  return (
    <div className={`bk bk--${theme}`} style={{ background: p.bg, color: p.text }}>
      <header className="bk__top" style={{ borderColor: p.line }}>
        <Wordmark size={22} theme={theme} mono />
        <nav className="bk__nav">
          <a href="#glyph" style={{ color: p.sub }}>Glyph</a>
          <a href="#wordmark" style={{ color: p.sub }}>Wordmark</a>
          <a href="#palette" style={{ color: p.sub }}>Palette</a>
          <a href="#type" style={{ color: p.sub }}>Type</a>
        </nav>
        <button
          className="bk__toggle"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          style={{ borderColor: p.line, color: p.text }}
          aria-label="Toggle theme"
        >
          <span>{isDark ? '◐' : '◑'}</span>
          {isDark ? 'Dark' : 'Light'}
        </button>
      </header>

      <main className="bk__main">
        {/* HERO */}
        <section className="bk__hero">
          <div className="bk__hero-meta">
            <span className="bk__tag" style={{ color: BRAND.mint, borderColor: BRAND.mint }}>
              ⌀ BRAND SYSTEM · v1.0
            </span>
            <h1 style={{ color: p.text }}>
              <span style={{ color: BRAND.magenta }}>0x</span>bits
            </h1>
            <p className="bk__motto" style={{ color: p.sub }}>
              Solana cyberpunk · on-chain platform infrastructure
            </p>
          </div>
          <div className="bk__hero-mark">
            <Glyph size={280} theme={theme} />
          </div>
        </section>

        {/* GLYPH */}
        <Section id="glyph" label="01 — The Mark" title="The Diameter" theme={theme}>
          <div className="bk__glyph-row">
            <div className="bk__glyph-frame" style={{ background: p.surfaceAlt, borderColor: p.line }}>
              <Glyph size={220} theme={theme} />
            </div>
            <div className="bk__glyph-copy">
              <p style={{ color: p.text }}>
                A precise ring bisected by a single diagonal that overruns
                the boundary. It carries three readings at once:
              </p>
              <ul style={{ color: p.sub }}>
                <li><strong style={{ color: BRAND.mint }}>⌀</strong>  the engineer's diameter mark — exact, dimensional</li>
                <li><strong style={{ color: BRAND.magenta }}>0x</strong>  the slashed zero — hex prefix, the start of every address</li>
                <li><strong style={{ color: BRAND.purple }}>∅</strong>  the empty set — cryptographic ground state</li>
              </ul>
              <div className="bk__glyph-scales">
                <div><Glyph size={16} theme={theme} /><span style={{ color: p.sub }}>16px · favicon</span></div>
                <div><Glyph size={32} theme={theme} /><span style={{ color: p.sub }}>32px · UI chip</span></div>
                <div><Glyph size={64} theme={theme} /><span style={{ color: p.sub }}>64px · nav</span></div>
                <div><Glyph size={120} theme={theme} /><span style={{ color: p.sub }}>120px · hero</span></div>
              </div>
            </div>
          </div>
        </Section>

        {/* WORDMARK */}
        <Section id="wordmark" label="02 — Lockup" title="Wordmark" theme={theme}>
          <div className="bk__lockups">
            <div className="bk__lockup" style={{ background: p.surface, borderColor: p.line }}>
              <Wordmark size={56} theme={theme} />
              <span style={{ color: p.sub }}>Primary · Space Grotesk</span>
            </div>
            <div className="bk__lockup" style={{ background: p.surface, borderColor: p.line }}>
              <Wordmark size={56} theme={theme} mono />
              <span style={{ color: p.sub }}>Mono · Cascadia Mono</span>
            </div>
            <div className="bk__lockup" style={{ background: '#06070A', borderColor: p.line }}>
              <span className="bk__wordmark" style={{ fontSize: 56, color: '#F4F1EA' }}>
                <Glyph size={64} theme="dark" />
                <span className="bk__wordmark-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span style={{ color: BRAND.magenta }}>0x</span>bits
                </span>
              </span>
              <span style={{ color: '#8A8FA3' }}>On Void · always-dark surface</span>
            </div>
          </div>
        </Section>

        {/* PALETTE */}
        <Section id="palette" label="03 — Spectrum" title="Palette" theme={theme}>
          <div className="bk__palette-grid">
            <Swatch hex={BRAND.purple} name="Solana Purple" role="Primary brand · gradient anchor" theme={theme} />
            <Swatch hex={BRAND.mint}    name="Solana Mint"   role="Confirm · live · positive"      theme={theme} />
            <Swatch hex={BRAND.magenta} name="Cyber Magenta" role="Highlight · cyberpunk edge"     theme={theme} />
            <Swatch hex="#06070A"       name="Void"           role="Default dark surface"          theme={theme} />
            <Swatch hex="#F4F1EA"       name="Paper"          role="Default light surface"         theme={theme} />
            <Swatch hex="#8A8FA3"       name="Sub"            role="Secondary text · meta"         theme={theme} />
          </div>
          <div className="bk__gradient-bar" style={{
            background: `linear-gradient(90deg, ${BRAND.purple} 0%, ${BRAND.magenta} 55%, ${BRAND.mint} 100%)`,
          }}>
            <span>Signature gradient · purple → magenta → mint</span>
          </div>
        </Section>

        {/* TYPOGRAPHY */}
        <Section id="type" label="04 — Voice" title="Typography" theme={theme}>
          <div className="bk__type-row">
            <div className="bk__type" style={{ background: p.surface, borderColor: p.line }}>
              <span style={{ color: p.sub }}>Display · Space Grotesk · 600</span>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '2.2rem', color: p.text }}>
                Ship state, not strings.
              </div>
            </div>
            <div className="bk__type" style={{ background: p.surface, borderColor: p.line }}>
              <span style={{ color: p.sub }}>Body · Inter · 400</span>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: p.text, lineHeight: 1.55 }}>
                0xbits is the connective tissue for Solana programs that
                actually have to talk to each other — accounts, indexes,
                queues, and proofs, all addressed at the bit.
              </div>
            </div>
            <div className="bk__type" style={{ background: p.surface, borderColor: p.line }}>
              <span style={{ color: p.sub }}>Mono · Cascadia Mono · 400</span>
              <code style={{ fontFamily: "'Cascadia Mono', monospace", fontSize: '0.95rem', color: BRAND.mint }}>
                0x9F4A...AcE3 → bits.commit(state)
              </code>
            </div>
          </div>
        </Section>

        {/* APPLICATION PREVIEW */}
        <Section id="apply" label="05 — In situ" title="On the product" theme={theme}>
          <div
            className="bk__mock"
            style={{
              background: `radial-gradient(at 20% 0%, ${BRAND.purple}33, transparent 50%), radial-gradient(at 80% 100%, ${BRAND.mint}22, transparent 50%), #06070A`,
              color: '#F4F1EA',
              borderColor: p.line,
            }}
          >
            <header className="bk__mock-nav">
              <span className="bk__wordmark" style={{ fontSize: 22, color: '#F4F1EA' }}>
                <Glyph size={26} theme="dark" />
                <span className="bk__wordmark-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span style={{ color: BRAND.magenta }}>0x</span>bits
                </span>
              </span>
              <span className="bk__mock-meta" style={{ fontFamily: "'Cascadia Mono', monospace", color: '#8A8FA3' }}>
                mainnet · slot 314_159_265
              </span>
            </header>
            <div className="bk__mock-body">
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.4rem', margin: 0, color: '#F4F1EA' }}>
                On-chain, <span style={{
                  background: `linear-gradient(90deg, ${BRAND.purple}, ${BRAND.magenta}, ${BRAND.mint})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>at the bit.</span>
              </h3>
              <p style={{ color: '#8A8FA3', maxWidth: 540 }}>
                The Solana infrastructure layer for teams that don't
                want to write the same account, queue, and proof stack
                a fourth time.
              </p>
              <div className="bk__mock-cta">
                <button style={{ background: BRAND.mint, color: '#06070A' }}>Deploy →</button>
                <button style={{ background: 'transparent', color: '#F4F1EA', borderColor: 'rgba(255,255,255,0.2)' }}>Read the spec</button>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="bk__footer" style={{ borderColor: p.line, color: p.sub }}>
        <span>0xbits brand system · v1.0</span>
        <span style={{ fontFamily: "'Cascadia Mono', monospace" }}>⌀ // solana · cyberpunk · infra</span>
      </footer>
    </div>
  );
}
