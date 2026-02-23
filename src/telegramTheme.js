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
    root.setAttribute('data-color-scheme', colorScheme);
  }
}

/** Определяет платформу (ios/android/...) и добавляет data-platform на html */
function detectPlatform() {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  let platform = '';

  /* Отладка: ?platform=ios или localStorage.debugPlatform=ios — показывать как на iOS */
  const search = (typeof window !== 'undefined' && (window.location?.search || (window.location?.hash?.includes('?') ? window.location.hash.split('?')[1] : ''))) || '';
  const urlPlatform = new URLSearchParams(search).get('platform');
  const storedPlatform = typeof localStorage !== 'undefined' && localStorage.getItem('debugPlatform');
  const debugPlatform = urlPlatform || storedPlatform;
  if (debugPlatform) {
    platform = String(debugPlatform).toLowerCase();
  } else if (window.Telegram?.WebApp?.platform) {
    platform = String(window.Telegram.WebApp.platform).toLowerCase();
  } else {
    const ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/.test(ua)) platform = 'ios';
    else if (/Android/.test(ua)) platform = 'android';
  }

  if (platform) {
    root.setAttribute('data-platform', platform);
  }

  /* Отладка: ?theme=dark или localStorage.debugTheme=dark — принудительно тёмная тема */
  const urlTheme = new URLSearchParams(search).get('theme');
  const storedTheme = typeof localStorage !== 'undefined' && localStorage.getItem('debugTheme');
  const debugTheme = urlTheme || storedTheme;
  if (debugTheme && platform) {
    root.setAttribute('data-color-scheme', String(debugTheme).toLowerCase());
  }
}

/** Вызвать при загрузке (index.js) — ставит data-platform до рендера React */
export function setDebugPlatform() {
  detectPlatform();
}

export function initTelegramThemeSync() {
  if (typeof window === 'undefined') return;

  const tg = window.Telegram && window.Telegram.WebApp;

  detectPlatform();

  if (!tg) return;

  const apply = () => {
    applyTelegramTheme(tg.themeParams, tg.colorScheme);
    /* После apply — вернуть debug-тему из URL, если задана (?theme=dark) */
    detectPlatform();
  };

  apply();

  if (typeof tg.onEvent === 'function') {
    tg.onEvent('themeChanged', apply);
  }

  if (typeof tg.ready === 'function') {
    tg.ready();
  }

  if (typeof tg.expand === 'function') {
    tg.expand();
  }

  return () => {
    if (typeof tg.offEvent === 'function') {
      tg.offEvent('themeChanged', apply);
    }
  };
}

