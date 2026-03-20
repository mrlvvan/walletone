/* TonWalletContent — экран TON-кошелька (вторая вкладка в главном экране).
 * Адрес, баланс, кнопки (Перевести/Пополнить/Вывести), setup-карточка,
 * промо USDT-доходность, Токены (TON/USDT), Доходные активы, История активности. */

import { IconToncoin, IconUsdt } from './Icons';
import TonPromoArt from './TonPromoArt';
import './TonWalletContent.css';

const COPY_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" fill="none" viewBox="0 0 19 18" preserveAspectRatio="xMidYMid meet">
    <path fill="currentColor" d="M4.485 13.467q-1.136 0-1.758-.616-.616-.623-.616-1.752V4.48q0-1.137.616-1.752.622-.615 1.758-.616h6.608q1.137 0 1.752.616.622.615.622 1.752v1.618H11.5V4.751q0-.355-.17-.514-.165-.158-.502-.158H4.752q-.336 0-.508.158-.165.159-.165.514v6.069q0 .362.165.52.172.159.508.159h1.714v1.968zm3.422 3.275q-1.137 0-1.759-.622-.615-.615-.615-1.746V7.748q0-1.131.615-1.746.622-.622 1.759-.622h6.608q1.135 0 1.752.622.622.615.622 1.746v6.626q0 1.131-.622 1.746-.616.622-1.752.622zm.266-1.968h6.075q.33 0 .502-.165.17-.158.17-.514V8.027q0-.356-.17-.514-.172-.159-.502-.159H8.173q-.336 0-.507.159-.172.158-.172.514v6.068q0 .356.172.514.171.165.507.165" />
  </svg>
);

const CHEVRON_RIGHT = (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" fill="none" viewBox="0 0 8 14" preserveAspectRatio="xMidYMid meet">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6-6 6" />
  </svg>
);

/* Иконки истории — как в HistoryScreen: out = стрелка вниз, in = стрелка вверх */
const TON_ICON_DOWN = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path fill="currentColor" fillRule="evenodd" d="M14 25c6.075 0 11-4.925 11-11S20.075 3 14 3 3 7.925 3 14s4.925 11 11 11m-3.434-10.566a.8.8 0 0 0-1.132 1.132l4 4a.8.8 0 0 0 1.132 0l4-4a.8.8 0 0 0-1.132-1.132L14.8 17.07V9.5a.8.8 0 0 0-1.6 0v7.569z" clipRule="evenodd" />
  </svg>
);

const TON_ICON_UP = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path fill="currentColor" fillRule="evenodd" d="M14 3C7.925 3 3 7.925 3 14s4.925 11 11 11 11-4.925 11-11S20.075 3 14 3m4.53 9.47-4-4a.75.75 0 0 0-1.06 0l-4 4a.75.75 0 1 0 1.06 1.06l2.72-2.72V19a.75.75 0 0 0 1.5 0v-8.19l2.72 2.72a.75.75 0 1 0 1.06-1.06" clipRule="evenodd" />
  </svg>
);

const TON_ICON_CHECK = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path fill="currentColor" fillRule="evenodd" d="M21.07 7.07 11.5 16.64l-4.57-4.57a.75.75 0 0 0-1.06 1.06l5.1 5.1a.75.75 0 0 0 1.06 0l10.1-10.1a.75.75 0 1 0-1.06-1.06Z" clipRule="evenodd" />
  </svg>
);

function TonWalletContent({
  address = 'UQBD...INHFO',
  balanceInt = '0',
  balanceDec = '55',
  deltaUsd = '<0,01 $',
  percent = '35,00%',
  period = 'За всё время',
  isNegative = true,
  tokens = [
    { id: 'ton', name: 'Toncoin', amount: '0,005 TON', value: '0,55 ₽', delta: '<0,01 $', isNegative: true, icon: <IconToncoin size={42} /> },
    { id: 'usdt', name: 'USDT', amount: '0 USDT', value: '0,00 ₽', delta: null, icon: <IconUsdt size={42} /> },
  ],
  activity = [
    { id: 'a1', type: 'out', title: 'Отправлено', detail: 'UQDg...ZRvi', amount: '10 USDT', time: '28 дек. 2025 г. в 04:55' },
    { id: 'a2', type: 'in', title: 'Получено', detail: 'UQDf...rCJV', amount: '+0,03 TON', time: '28 дек. 2025 г. в 04:55', isPositive: true },
    { id: 'a3', type: 'in', title: 'Получено', detail: 'HAC', amount: '+10 USDT', time: '28 дек. 2025 г. в 00:12', isPositive: true },
    { id: 'a4', type: 'out', title: 'Отправлено', detail: 'UQAw...bfFJ', amount: '1,244 TON', time: '23 мая 2024 г. в 18:55' },
    { id: 'a5', type: 'in', title: 'Получено', detail: 'NDside', amount: '+0,4 TON', time: '23 мая 2024 г. в 18:48', isPositive: true },
    { id: 'a6', type: 'out', title: 'Отправлено', detail: 'NDside', amount: '0,5 TON', time: '23 мая 2024 г. в 18:30' },
    { id: 'a7', type: 'in', title: 'Получено', detail: 'Wallet in Telegram', amount: '+0,777 TON', time: '23 мая 2024 г. в 18:12', isPositive: true },
    { id: 'a8', type: 'activated', title: 'Кошелёк активирован', detail: 'UQBD...INHF', amount: '', time: '23 мая 2024 г. в 18:04' },
    { id: 'a9', type: 'in', title: 'Получено', detail: 'UOBD...INHF', amount: '+0,441 TON', time: '23 мая 2024 г. в 18:04', isPositive: true },
  ],
  onTransfer,
  onAddDeposit,
  onWithdraw,
}) {
  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address).catch(() => {});
    }
    if (window.Telegram?.WebApp?.HapticFeedback?.impactOccurred) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  return (
    <div className="ton-wallet-content">
      <div className="ton-wallet-header">
        {/* Адрес кошелька с кнопкой копирования */}
        <div className="ton-wallet-address-wrap">
        <span className="ton-wallet-address">{address}</span>
        <button type="button" className="ton-wallet-address-copy" onClick={handleCopyAddress} aria-label="Копировать адрес">
          {COPY_ICON}
        </button>
      </div>

      {/* Баланс */}
      <div className="ton-wallet-balance">
        <div className="ton-balance-amount large">
          <span className="ton-balance-int">{balanceInt}</span>
          <span className="ton-balance-sep">,</span>
          <span className="ton-balance-dec">{balanceDec}</span>
          <span className="ton-balance-currency"> ₽</span>
        </div>
        <div className="ton-balance-change">
          <span className={`ton-balance-delta ${isNegative ? 'negative' : 'positive'}`}>{deltaUsd}</span>
          <span className={`ton-balance-pill ${isNegative ? 'negative' : 'positive'}`}>
            <span className="ton-balance-pill-icon" aria-hidden="true">
              {isNegative ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 16" preserveAspectRatio="xMidYMid meet">
                  <path fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.25" d="M6 13V3.5m0 0 4 4m-4-4-4 4" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 16" preserveAspectRatio="xMidYMid meet">
                  <path fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.25" d="M6 3v9.5m0 0 4-4m-4 4-4-4" />
                </svg>
              )}
            </span>
            {percent}
          </span>
          <span className="ton-balance-period">{period}</span>
        </div>
      </div>

      {/* Кнопки действий: Перевести, Пополнить, Вывести */}
      <section className="ton-wallet-actions">
        <button type="button" className="ton-action-item" onClick={onTransfer}>
          <span className="ton-action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
              <path fill="currentColor" d="M3.012 13.733q8.86-3.86 11.813-5.09c5.629-2.34 6.797-2.746 7.56-2.76.167-.002.54.04.784.237.203.166.26.39.289.548.025.158.06.517.031.797-.303 3.204-1.623 10.977-2.295 14.566-.281 1.518-.842 2.027-1.383 2.076-1.177.109-2.07-.777-3.21-1.524-1.782-1.169-2.788-1.896-4.52-3.037-2-1.318-.703-2.042.437-3.226.297-.31 5.482-5.025 5.58-5.453.013-.053.026-.253-.094-.358-.117-.105-.292-.069-.418-.04-.18.04-3.026 1.923-8.547 5.648q-1.21.832-2.197.811c-.721-.015-2.114-.409-3.15-.745-1.265-.412-2.275-.63-2.187-1.331q.068-.547 1.507-1.12Z" />
            </svg>
          </span>
          <span className="ton-action-label">Перевести</span>
        </button>
        <button type="button" className="ton-action-item" onClick={onAddDeposit}>
          <span className="ton-action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
              <path fill="currentColor" fillRule="evenodd" d="M3 14C3 7.925 7.925 3 14 3s11 4.925 11 11-4.925 11-11 11S3 20.075 3 14m11-5.75a.75.75 0 0 1 .75.75v4.25H19a.75.75 0 0 1 0 1.5h-4.25V19a.75.75 0 0 1-1.5 0v-4.25H9a.75.75 0 0 1 0-1.5h4.25V9a.75.75 0 0 1 .75-.75" clipRule="evenodd" />
            </svg>
          </span>
          <span className="ton-action-label">Пополнить</span>
        </button>
        <button type="button" className="ton-action-item" onClick={onWithdraw}>
          <span className="ton-action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
              <path fill="currentColor" fillRule="evenodd" d="M14 3C7.925 3 3 7.925 3 14s4.925 11 11 11 11-4.925 11-11S20.075 3 14 3m4.53 9.47-4-4a.75.75 0 0 0-1.06 0l-4 4a.75.75 0 1 0 1.06 1.06l2.72-2.72V19a.75.75 0 0 0 1.5 0v-8.19l2.72 2.72a.75.75 0 1 0 1.06-1.06" clipRule="evenodd" />
            </svg>
          </span>
          <span className="ton-action-label">Вывести</span>
        </button>
      </section>
      </div>

      <div className="section-gap" aria-hidden="true" />

      {/* Завершите настройку */}
      <section className="ton-card ton-setup-card">
        <h3 className="ton-card-title ton-setup-title">Завершите настройку</h3>
        <button type="button" className="ton-setup-item">
          <span className="ton-setup-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
              <path fill="currentColor" d="M17.85 3.025a7.15 7.15 0 1 1-2.75 13.751v2.969c0 .308 0 .462-.06.58a.55.55 0 0 1-.24.24c-.118.06-.272.06-.58.06h-3.74c-.308 0-.462 0-.58.06a.55.55 0 0 0-.24.24c-.06.118-.06.272-.06.58v2.09c0 .308 0 .462-.06.58a.55.55 0 0 1-.24.24c-.118.06-.272.06-.58.06H3.88c-.308 0-.462 0-.58-.06a.55.55 0 0 1-.24-.24c-.06-.118-.06-.272-.06-.58v-1.008c0-.521 0-.782.058-1.029.05-.218.134-.428.249-.62.128-.218.31-.407.67-.784l7.167-7.494a7.15 7.15 0 0 1 6.706-9.635m1.65 3.3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4" />
            </svg>
          </span>
          <span className="ton-setup-text">Создайте резервную копию</span>
          <span className="ton-setup-chevron">{CHEVRON_RIGHT}</span>
        </button>
      </section>

      <div className="section-gap" aria-hidden="true" />

      {/* Промо: USDT доходность */}
      <section className="ton-promo-banner ton-promo-green">
        <div className="ton-promo-copy">
          <div className="ton-promo-title">Повышенная доходность на USDT – до 17.98%</div>
          <button type="button" className="ton-promo-link">Получать доход &gt;</button>
        </div>
        <div className="ton-promo-art">
          <TonPromoArt className="ton-promo-art-svg" width={400} height={104} />
        </div>
        <div className="ton-promo-dots">
          <span className="ton-promo-dot" />
          <span className="ton-promo-dot active" />
          <span className="ton-promo-dot" />
          <span className="ton-promo-dot" />
          <span className="ton-promo-dot" />
        </div>
        <button type="button" className="ton-promo-close" aria-label="Закрыть">×</button>
      </section>

      <div className="section-gap" aria-hidden="true" />

      {/* Токены */}
      <section className="ton-card ton-tokens-card">
        <h3 className="ton-card-title">Токены</h3>
        <div className="ton-tokens-list">
          {tokens.map((t) => (
            <div key={t.id} className="ton-token-row">
              <div className="ton-token-left">
                <div className="ton-token-icon">{t.icon}</div>
                <div>
                  <div className="ton-token-name">{t.name}</div>
                  <div className="ton-token-amount">{t.amount}</div>
                </div>
              </div>
              <div className="ton-token-right">
                <div className="ton-token-value">{t.value}</div>
                {t.delta != null && (
                  <div className={`ton-token-delta ${t.isNegative ? 'negative' : 'positive'}`}>{t.delta}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-gap" aria-hidden="true" />

      {/* Доходные активы — без заголовка сверху, всё внутри строки */}
      <section className="ton-card ton-yield-card">
        <button type="button" className="ton-yield-row">
          <span className="ton-yield-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
              <defs>
                <linearGradient id="ton-yield-grad" x1="20" x2="20" y1="0" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A0DE7E" />
                  <stop offset="1" stopColor="#54CB68" />
                </linearGradient>
                <clipPath id="ton-yield-clip">
                  <rect width="40" height="40" fill="#fff" rx="20" />
                </clipPath>
              </defs>
              <g clipPath="url(#ton-yield-clip)">
                <rect width="40" height="40" fill="url(#ton-yield-grad)" rx="20" />
                <path fill="#fff" d="M15.435 28.247c-.634 0-1.247-.408-1.247-1.085 0-.376.108-.612.29-.88l4.426-6.553 4.448-6.714c.365-.548.666-.774 1.289-.774.666 0 1.181.462 1.181 1.117 0 .29-.118.559-.3.838l-4.265 6.349-4.63 6.96c-.365.549-.677.742-1.192.742m-1.397-7.37c-2.299 0-3.77-1.621-3.77-4.339 0-2.728 1.482-4.286 3.77-4.286 2.277 0 3.76 1.547 3.76 4.286 0 2.707-1.472 4.34-3.76 4.34Zm0-2.019c.623 0 1.053-.676 1.053-2.32s-.43-2.267-1.053-2.267c-.634 0-1.063.623-1.063 2.278 0 1.633.43 2.31 1.063 2.31Zm11.988 9.39c-2.299 0-3.76-1.623-3.76-4.34 0-2.73 1.483-4.287 3.76-4.287 2.278 0 3.76 1.547 3.76 4.286 0 2.697-1.46 4.34-3.76 4.34Zm0-2.031c.634 0 1.053-.666 1.053-2.31 0-1.654-.419-2.277-1.053-2.277s-1.052.623-1.052 2.277c0 1.644.419 2.31 1.052 2.31" />
              </g>
            </svg>
          </span>
          <div className="ton-yield-content">
            <div className="ton-yield-title">Доходные активы</div>
            <div className="ton-yield-subtitle">Получайте бонусы за криптовалюту</div>
          </div>
          <span className="ton-yield-chevron">{CHEVRON_RIGHT}</span>
        </button>
      </section>

      <div className="section-gap" aria-hidden="true" />

      {/* История активности */}
      <section className="ton-card ton-activity-card">
        <h3 className="ton-card-title">История активности</h3>
        <div className="ton-activity-list">
          {activity.map((a) => (
            <div key={a.id} className="ton-activity-row">
              <span className={`ton-activity-icon ton-activity-icon-${a.type}`}>
                <span className="ton-activity-icon-inner">
                  {a.type === 'in' ? TON_ICON_UP : a.type === 'activated' ? TON_ICON_CHECK : TON_ICON_DOWN}
                </span>
              </span>
              <div className="ton-activity-content">
                <div className="ton-activity-title">{a.title}</div>
                <div className="ton-activity-detail">{a.detail}</div>
              </div>
              <div className="ton-activity-right">
                <div className={`ton-activity-amount ${a.isPositive ? 'positive' : ''}`}>{a.amount}</div>
                <div className="ton-activity-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-gap" aria-hidden="true" />

      {/* FAQ */}
      <section className="ton-card ton-faq-card">
        <h3 className="ton-card-title">FAQ</h3>
        <div className="ton-faq-list">
          <button type="button" className="ton-faq-item">
            <span className="ton-faq-text">Что такое TON Кошелёк?</span>
            <span className="ton-faq-chevron">{CHEVRON_RIGHT}</span>
          </button>
          <button type="button" className="ton-faq-item">
            <span className="ton-faq-text">Как обезопасить свой TON Кошелёк?</span>
            <span className="ton-faq-chevron">{CHEVRON_RIGHT}</span>
          </button>
          <button type="button" className="ton-faq-item">
            <span className="ton-faq-text">Как работает подключение к приложениям?</span>
            <span className="ton-faq-chevron">{CHEVRON_RIGHT}</span>
          </button>
        </div>
      </section>

      {/* Нижний отступ под TabBar: spacer гарантирует, что контент не перекрывается */}
      <div className="ton-wallet-tabbar-spacer" aria-hidden="true" />
    </div>
  );
}

export default TonWalletContent;
