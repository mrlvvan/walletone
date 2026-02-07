import { useState } from 'react';
import ActivityList from './ActivityList';
import './AssetScreen.css';

function AssetScreen({ selectedAsset, activity, assetDetails = {} }) {
  const [selectedPeriod, setSelectedPeriod] = useState('1Д');

  const periods = ['1Д', '7Д', '1М', '1Г', 'Все'];
  const periodIndex = Math.max(0, periods.indexOf(selectedPeriod));

  const symbol = (selectedAsset.code && selectedAsset.code.split(' · ')[0]) || selectedAsset.name || '—';

  const coinData = assetDetails[selectedAsset.id] || {
    price: selectedAsset.price || '— ₽',
    delta: selectedAsset.delta || '—',
    percent: selectedAsset.change || '—%',
    period: '24 ч',
    description: `${selectedAsset.name} (${symbol}) — криптовалюта для переводов и расчётов.`,
    features: [
      'Получайте и отправляйте кому угодно (с комиссией).',
      'Подходит для расчётов в сети.',
    ],
    overview: {
      capitalization: { value: selectedAsset.value || '—', change: selectedAsset.change || '—', isPositive: !(selectedAsset.change && selectedAsset.change.startsWith('-')) },
      volume: { value: '—', change: '—', isPositive: true },
      inCirculation: { value: selectedAsset.amount || '—' },
    },
  };

  const isNegative = coinData.percent && (coinData.percent.startsWith('-') || parseFloat(coinData.percent) < 0);

  return (
    <div className="asset-screen">
      <section className="asset-header-section">
        <div className="asset-header-content">
          <div className="asset-logo-container">
            <div className={`asset-icon-large ${selectedAsset.styleClass}`}>
              {selectedAsset.icon}
            </div>
          </div>
          <div className="asset-title-group">
            <div className="asset-name-title">
              <span className="asset-name-text">{selectedAsset.name}</span>
              <span className="asset-code-text"> {selectedAsset.code?.split(' · ')[0] || 'BTC'}</span>
            </div>
          </div>
        </div>

        <div className="asset-price-container">
          <div className="asset-price-value">{coinData.price}</div>
        </div>

        <div className="asset-delta-container">
          <div className="asset-delta-group">
            <div className={`asset-delta-value ${isNegative ? 'negative' : 'positive'}`}>
              {coinData.delta}
            </div>
            <div className={`asset-delta-percent ${isNegative ? 'negative' : 'positive'}`}>
              {isNegative ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 16" preserveAspectRatio="xMidYMid meet">
                  <path fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.25" d="M6 3v9.5m0 0 4-4m-4 4-4-4"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" fill="none" viewBox="0 0 12 18" preserveAspectRatio="xMidYMid meet">
                  <path fill="currentColor" d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z"></path>
                </svg>
              )}
              {coinData.percent ? coinData.percent.replace(/[+-]/, '') : '—'}
            </div>
            <div className="asset-delta-period">{coinData.period}</div>
          </div>
        </div>
      </section>

      <section className="asset-chart-section">
        <div className="asset-chart-container">
          <div className="asset-chart-wrapper">
            <svg className="asset-chart-svg" viewBox="0 0 930 456" preserveAspectRatio="xMidYMid meet">
              <defs>
                <mask id={`mouseMaskMainPath-${selectedAsset.id}`}>
                  <rect x="0" y="0" width="930" height="456" fill="white"></rect>
                </mask>
              </defs>
              <g className="visx-group visx-rows" transform="translate(0, 0)">
                <line className="visx-line" x1="0" y1="426" x2="814.114" y2="426" fill="transparent" stroke="#eaf0f6" strokeWidth="1"></line>
                <line className="visx-line" x1="0" y1="294" x2="814.114" y2="294" fill="transparent" stroke="#eaf0f6" strokeWidth="1"></line>
                <line className="visx-line" x1="0" y1="162" x2="814.114" y2="162" fill="transparent" stroke="#eaf0f6" strokeWidth="1"></line>
                <line className="visx-line" x1="0" y1="30" x2="814.114" y2="30" fill="transparent" stroke="#eaf0f6" strokeWidth="1"></line>
              </g>
              <g className="visx-group visx-axis visx-axis-right" transform="translate(920, 0)">
                <g className="visx-group visx-axis-tick" transform="translate(0, 0)">
                  <text y="426" x="0" textAnchor="end" fontSize="12">4.66M</text>
                </g>
                <g className="visx-group visx-axis-tick" transform="translate(0, 0)">
                  <text y="294" x="0" textAnchor="end" fontSize="12">4.93M</text>
                </g>
                <g className="visx-group visx-axis-tick" transform="translate(0, 0)">
                  <text y="162" x="0" textAnchor="end" fontSize="12">5.20M</text>
                </g>
                <g className="visx-group visx-axis-tick" transform="translate(0, 0)">
                  <text y="30" x="0" textAnchor="end" fontSize="12">5.48M</text>
                </g>
              </g>
              <path
                d="M 44 380 C 120 360 200 200 280 180 C 360 160 440 120 520 100 C 600 80 680 60 770 30"
                fill="transparent"
                stroke={isNegative ? '#ff4444' : '#4caf50'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                mask={`url(#mouseMaskMainPath-${selectedAsset.id})`}
                className="asset-chart-path"
              />
              <rect x="0" y="0" width="814.114" height="456" fill="transparent" rx="14"></rect>
            </svg>
          </div>
          <div className="asset-chart-periods">
            <div
              className="asset-period-selector"
              role="radiogroup"
              style={{ '--period-count': periods.length, '--period-index': periodIndex }}
            >
              {periods.map((period) => (
                <button
                  key={period}
                  className={`asset-period-button ${selectedPeriod === period ? 'active' : ''}`}
                  role="radio"
                  aria-checked={selectedPeriod === period}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-gap" aria-hidden="true" />

      <section className="asset-section">
        <div className="asset-section-header">
          <div className="asset-section-title">О криптовалюте</div>
        </div>
        <div className="asset-section-content">
          <div className="asset-description">
            <div className="asset-description-text">{coinData.description}</div>
            <ul className="asset-features-list">
              {coinData.features.map((feature, index) => (
                <li key={index} className="asset-feature-item">
                  <div className="asset-feature-bullet"></div>
                  <div className="asset-feature-text">{feature}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="section-gap" aria-hidden="true" />

      <section className="asset-section overview-section">
        <div className="asset-section-header">
          <div className="asset-section-title">Обзор</div>
        </div>
        <div className="asset-section-content overview-content">
          <div className="asset-overview-list">
            <div className="asset-overview-item">
              <div className="asset-overview-label">Капитализация</div>
              <div className="asset-overview-value">
                <div className="asset-overview-main-value">{coinData.overview.capitalization.value}</div>
                <div className={`asset-overview-change ${coinData.overview.capitalization.isPositive ? 'positive' : 'negative'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" fill="none" viewBox="0 0 12 18" preserveAspectRatio="xMidYMid meet">
                    <path fill="currentColor" d="M6 3.263a.576.576 0 0 1 .593.586v7.302l-.073 1.802-.38-.132 2.226-2.469 1.047-1.018a.6.6 0 0 1 .41-.161.54.54 0 0 1 .41.169.57.57 0 0 1 .162.41q0 .234-.184.432l-3.772 3.78a.58.58 0 0 1-.439.204.58.58 0 0 1-.44-.205l-3.77-3.779a.62.62 0 0 1-.184-.432.57.57 0 0 1 .162-.41.54.54 0 0 1 .41-.169.6.6 0 0 1 .41.161l1.047 1.018 2.22 2.469-.374.132-.073-1.802V3.849A.576.576 0 0 1 6 3.263"></path>
                  </svg>
                  {coinData.overview.capitalization.change.replace('-', '')}
                </div>
              </div>
            </div>
            <div className="asset-overview-item">
              <div className="asset-overview-label">Торговый объём</div>
              <div className="asset-overview-value">
                <div className="asset-overview-main-value">{coinData.overview.volume.value}</div>
                <div className={`asset-overview-change ${coinData.overview.volume.isPositive ? 'positive' : 'negative'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" fill="none" viewBox="0 0 12 18" preserveAspectRatio="xMidYMid meet">
                    <path fill="currentColor" d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z"></path>
                  </svg>
                  {coinData.overview.volume.change.replace('+', '')}
                </div>
              </div>
            </div>
            <div className="asset-overview-item">
              <div className="asset-overview-label">В обороте</div>
              <div className="asset-overview-value">
                <div className="asset-overview-main-value">{coinData.overview.inCirculation.value}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="asset-bottom-area">
        {selectedAsset.id === 'major' && (
          <section className="asset-section links-section">
            <div className="asset-section-header">
              <div className="asset-section-title">Ссылки</div>
            </div>
            <div className="asset-section-content">
              <div className="asset-link-row">
                <div className="asset-link-left">
                  <div className={`asset-icon ${selectedAsset.styleClass}`}>{selectedAsset.icon}</div>
                  <div className="asset-link-info">
                    <div className="asset-link-title">{selectedAsset.name}</div>
                    <div className="asset-link-subtitle">мини-приложение</div>
                  </div>
                </div>
                <div className="asset-link-chevron">›</div>
              </div>
              <div className="asset-link-row">
                <div className="asset-link-left">
                  <div className={`asset-icon ${selectedAsset.styleClass}`}>{selectedAsset.icon}</div>
                  <div className="asset-link-info">
                    <div className="asset-link-title">Сообщество {selectedAsset.name}</div>
                    <div className="asset-link-subtitle">Более 28 млн подписчиков</div>
                  </div>
                </div>
                <div className="asset-link-chevron">›</div>
              </div>
            </div>
          </section>
        )}

        <div className="asset-scroll-tail" aria-hidden="true" />
        <div className="asset-action-bar">
          <button className="asset-action-button buy" type="button">
            Купить
          </button>
          <button className="asset-action-button sell" type="button">
            Продать
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssetScreen;
