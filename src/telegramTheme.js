// Utilities to sync Telegram Web App theme params with CSS variables.
// Safe to use in both Telegram Mini App and regular browser (no-op if API missing).

const THEME_VAR_MAP = {
  bg_color: '--tg-theme-bg-color',
  text_color: '--tg-theme-text-color',
  hint_color: '--tg-theme-hint-color',
  link_color: '--tg-theme-link-color',
  button_color: '--tg-theme-button-color',
  button_text_color: '--tg-theme-button-text-color',
  secondary_bg_color: '--tg-theme-secondary-bg-color',
  header_bg_color: '--tg-theme-header-bg-color',
  accent_text_color: '--tg-theme-accent-text-color',
  section_bg_color: '--tg-theme-section-bg-color',
  section_header_text_color: '--tg-theme-section-header-text-color',
  section_separator_color: '--tg-theme-section-separator-color',
  subtitle_text_color: '--tg-theme-subtitle-text-color',
  destructive_text_color: '--tg-theme-destructive-text-color',
  accent_color: '--tg-theme-accent-color',
};

export function applyTelegramTheme(themeParams, colorScheme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const params = themeParams || {};

  Object.entries(THEME_VAR_MAP).forEach(([tgKey, cssVar]) => {
    const value = params[tgKey];
    if (typeof value === 'string' && value.trim()) {
      root.style.setProperty(cssVar, value);
    }
  });

  if (colorScheme) {
    root.style.setProperty('--tg-color-scheme', colorScheme);
  }
}

export function initTelegramThemeSync() {
  if (typeof window === 'undefined') return;

  const tg = window.Telegram && window.Telegram.WebApp;
  if (!tg) return;

  const apply = () => {
    applyTelegramTheme(tg.themeParams, tg.colorScheme);
  };

  apply();

  if (typeof tg.onEvent === 'function') {
    tg.onEvent('themeChanged', apply);
  }

  if (typeof tg.ready === 'function') {
    tg.ready();
  }

  return () => {
    if (typeof tg.offEvent === 'function') {
      tg.offEvent('themeChanged', apply);
    }
  };
}

