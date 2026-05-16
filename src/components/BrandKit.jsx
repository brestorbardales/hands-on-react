import React, { useState, useEffect } from 'react';
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
  noir: {
    name: 'Noir',
    tagline: 'Premium',
    dark:  { bg: '#0A0A0F', accent: '#FF2E88', middle: '#EDEDE8' },
    light: { bg: '#FAFAF7', accent: '#FF2E88', middle: '#0A0A0F' },
  },
};

const STORAGE_KEY = 'brandkit-selected';

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

const VariantCard = ({ id, variant, theme, isSelected, onSelect }) => {
  const palette = variant[theme];
  return (
    <article
      className={`brandkit__card brandkit__card--${theme}${isSelected ? ' is-selected' : ''}`}
      style={{ background: palette.bg, '--card-accent': palette.accent }}
      onClick={() => onSelect(id)}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(id)}
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
      <button
        className="brandkit__select-btn"
        style={{
          background: isSelected ? palette.accent : 'transparent',
          color: isSelected ? palette.bg : palette.accent,
          borderColor: palette.accent,
        }}
        onClick={(e) => { e.stopPropagation(); onSelect(id); }}
      >
        {isSelected ? '✓ Selected' : 'Use this theme'}
      </button>
    </article>
  );
};

export default function BrandKit() {
  const [theme, setTheme] = useState('dark');
  const [selected, setSelected] = useState(() => {
    if (typeof window === 'undefined') return 'coral';
    return window.localStorage.getItem(STORAGE_KEY) || 'coral';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, selected);
  }, [selected]);

  const isDark = theme === 'dark';
  const activeAccent = VARIANTS[selected][theme].accent;

  return (
    <div
      className={`brandkit brandkit--${theme}`}
      style={{ '--active-accent': activeAccent }}
      role="radiogroup"
      aria-label="Theme variant"
    >
      <header className="brandkit__top">
        <div>
          <h1>0xbits.io — Brand Kit</h1>
          <p>
            Active theme:{' '}
            <strong style={{ color: activeAccent }}>
              {VARIANTS[selected].name}
            </strong>{' '}
            · Click a card to switch
          </p>
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
        {Object.entries(VARIANTS).map(([id, variant]) => (
          <VariantCard
            key={id}
            id={id}
            variant={variant}
            theme={theme}
            isSelected={selected === id}
            onSelect={setSelected}
          />
        ))}
      </section>

      <footer className="brandkit__notes">
        <p>
          Your choice is saved locally and applies the accent across the
          page chrome. Light/dark flips all three at once.
        </p>
      </footer>
    </div>
  );
}
