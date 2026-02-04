// Utilities to sync Telegram Web App theme params and platform with CSS.
// Safe to use in both Telegram Mini App and regular browser (no-op if API missing).
// В CSS можно использовать: [data-tg-theme="light"], [data-tg-platform="ios"], [data-tg-platform="android"] и т.д.

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

/** Определяет платформу/ОС: из Telegram WebApp или по userAgent (вне Telegram).
 *  В Mini App на iPhone Telegram часто отдаёт platform "weba", а не "ios" — тогда смотрим userAgent. */
export function getPlatform() {
  if (typeof window === 'undefined') return 'unknown';
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const tg = window.Telegram && window.Telegram.WebApp;
  if (tg && typeof tg.platform === 'string' && tg.platform) {
    const p = tg.platform.toLowerCase();
    // В Telegram на iPhone может быть weba/webk — определяем iOS по userAgent
    if ((p === 'weba' || p === 'webk') && /iPhone|iPad|iPod/i.test(ua)) return 'ios';
    if ((p === 'weba' || p === 'webk') && /Android/i.test(ua)) return 'android';
    if (p !== 'weba' && p !== 'webk') return p;
  }
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Mac/i.test(ua)) return 'macos';
  if (/Win/i.test(ua)) return 'windows';
  if (/Linux/i.test(ua)) return 'linux';
  return 'web';
}

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
    root.setAttribute('data-tg-theme', colorScheme);
  }
}

/** Выставляет на <html> атрибут data-tg-platform (ios, android, web, tdesktop, macos, windows, linux и т.д.). */
export function applyPlatform() {
  if (typeof document === 'undefined') return;
  const platform = getPlatform();
  document.documentElement.setAttribute('data-tg-platform', platform);
}

export function initTelegramThemeSync() {
  if (typeof window === 'undefined') return;

  const tg = window.Telegram && window.Telegram.WebApp;
  applyPlatform();

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

