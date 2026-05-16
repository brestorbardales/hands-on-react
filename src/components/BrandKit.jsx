import React, { useState } from 'react';
import './BrandKit.scss';

const VARIANTS = {
  coral: {
    name: 'Coral',
    tagline: 'Original',
    dark:  { bg: '#07070B', accent: '#FF6B6B', middle: '#FFFFFF' },
    light: { bg: '#FFFFFF', accent: '#FF6B6B', middle: '#07070B' },
  },
  tokyo: {
    name: 'Tokyo',
    tagline: 'Neon Night',
    dark:  { bg: '#0B0B1A', accent: '#FF2E88', middle: '#00E5FF' },
    light: { bg: '#FFF5F8', accent: '#FF2E88', middle: '#1A1A3A' },
  },
};

const Logo = ({ palette }) => (
  <span className="brandkit__logo" style={{ color: palette.accent }}>
    <span>0x</span>
    <span
      className="brandkit__logo-middle"
      style={{ color: palette.middle }}
    >
      bits
    </span>
    <span>.io</span>
  </span>
);

const Swatch = ({ hex, label }) => (
  <div className="brandkit__swatch">
    <span className="brandkit__swatch-chip" style={{ background: hex }} />
    <div className="brandkit__swatch-meta">
      <strong>{label}</strong>
      <code>{hex.toUpperCase()}</code>
    </div>
  </div>
);

const VariantCard = ({ variant, theme }) => {
  const palette = variant[theme];
  return (
    <article
      className={`brandkit__card brandkit__card--${theme}`}
      style={{ background: palette.bg }}
    >
      <header className="brandkit__card-header">
        <h2 style={{ color: palette.middle }}>{variant.name}</h2>
        <span style={{ color: palette.accent }}>{variant.tagline}</span>
      </header>
      <div className="brandkit__stage">
        <Logo palette={palette} />
      </div>
      <footer className="brandkit__card-footer">
        <Swatch hex={palette.accent} label='"0x" & ".io"' />
        <Swatch hex={palette.middle} label='"bits" (1.3×)' />
        <Swatch hex={palette.bg}     label="Background" />
      </footer>
    </article>
  );
};

export default function BrandKit() {
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  return (
    <div className={`brandkit brandkit--${theme}`}>
      <header className="brandkit__top">
        <div>
          <h1>0xbits.io — Brand Kit</h1>
          <p>Dancing Script · Bold 700 · "bits" scaled 1.3×</p>
        </div>
        <button
          className="brandkit__toggle"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label="Flip theme"
        >
          <span className={`brandkit__toggle-track ${isDark ? 'is-dark' : 'is-light'}`}>
            <span className="brandkit__toggle-thumb">{isDark ? '🌙' : '☀️'}</span>
          </span>
          <span className="brandkit__toggle-label">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>
      </header>

      <section className="brandkit__grid">
        <VariantCard variant={VARIANTS.coral} theme={theme} />
        <VariantCard variant={VARIANTS.tokyo} theme={theme} />
      </section>

      <footer className="brandkit__notes">
        <p>
          The accent colour stays constant within each variant. Only the
          middle "bits" flips for contrast when toggling light/dark.
        </p>
      </footer>
    </div>
  );
}
