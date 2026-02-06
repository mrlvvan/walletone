import { useState, useEffect, useMemo } from 'react';
import ActivityList from './ActivityList';
import './AssetScreen.css';

// Маппинг id монет на CoinGecko id
const COINGECKO_IDS = {
  btc: 'bitcoin',
  bitcoin: 'bitcoin',
  ton: 'the-open-network',
  usdt: 'tether',
  tether: 'tether',
  major: null, // major может не быть в CoinGecko, используем fallback
};

// Преобразование периода в дни для API
const PERIOD_TO_DAYS = {
  '1Д': 1,
  '7Д': 7,
  '1М': 30,
  '1Г': 365,
  'Все': 'max',
};

function AssetScreen({ selectedAsset, activity, assetDetails = {} }) {
  const [selectedPeriod, setSelectedPeriod] = useState('1Д');
  const [chartData, setChartData] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChange24h, setPriceChange24h] = useState(null);

  const periods = ['1Д', '7Д', '1М', '1Г', 'Все'];

  // Получение CoinGecko id для монеты
  const coinGeckoId = useMemo(() => {
    const symbol = (selectedAsset.code && selectedAsset.code.split(' · ')[0]?.toLowerCase()) || '';
    const id = selectedAsset.id?.toLowerCase() || '';
    
    // Проверяем по символу и id
    if (COINGECKO_IDS[symbol]) return COINGECKO_IDS[symbol];
    if (COINGECKO_IDS[id]) return COINGECKO_IDS[id];
    
    // Если major или неизвестная монета, возвращаем null (не загружаем график)
    if (id === 'major' || !symbol) return null;
    
    // Fallback на bitcoin для других монет
    return 'bitcoin';
  }, [selectedAsset]);

  // Загрузка текущей цены и изменения за 24ч
  useEffect(() => {
    if (!coinGeckoId) return;

    const fetchCurrentPrice = async () => {
      try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoId}&vs_currencies=rub&include_24hr_change=true`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch price');
        
        const data = await response.json();
        const coinData = data[coinGeckoId];
        if (coinData) {
          setCurrentPrice(coinData.rub);
          setPriceChange24h(coinData.rub_24h_change);
        }
      } catch (error) {
        console.error('Error fetching current price:', error);
      }
    };

    fetchCurrentPrice();
    // Обновляем цену каждые 30 секунд
    const interval = setInterval(fetchCurrentPrice, 30000);
    return () => clearInterval(interval);
  }, [coinGeckoId]);

  // Загрузка данных графика
  useEffect(() => {
    // Если нет coinGeckoId (например, для major), не загружаем данные
    if (!coinGeckoId) {
      setChartLoading(false);
      setChartData(null);
      return;
    }

    const fetchChartData = async () => {
      setChartLoading(true);
      setChartError(null);

      try {
        const days = PERIOD_TO_DAYS[selectedPeriod];
        const url = `https://api.coingecko.com/api/v3/coins/${coinGeckoId}/market_chart?vs_currency=rub&days=${days}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch chart data');
        
        const data = await response.json();
        setChartData(data.prices || []);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartError(error.message);
        setChartData(null);
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, [coinGeckoId, selectedPeriod]);

  // Генерация SVG path из данных с плавными кривыми
  const generateChartPath = (prices) => {
    if (!prices || prices.length === 0) return '';

    const width = 814.114;
    const height = 456;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Находим min и max значения
    const values = prices.map(([, price]) => price);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue || 1;

    // Генерируем точки
    const points = prices.map(([timestamp, price], index) => {
      const x = padding + (index / (prices.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((price - minValue) / range) * chartHeight;
      return { x, y };
    });

    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

    // Используем кубические кривые Безье для плавности
    let path = `M ${points[0].x},${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Вычисляем контрольные точки для плавной кривой
      let cp1x, cp1y, cp2x, cp2y;

      if (i === 0) {
        // Первая точка: контрольная точка вправо от текущей
        cp1x = current.x + (next.x - current.x) / 3;
        cp1y = current.y;
        cp2x = current.x + (next.x - current.x) * 2 / 3;
        cp2y = next.y;
      } else if (i === points.length - 2) {
        // Последняя точка: контрольная точка влево от следующей
        const prev = points[i - 1];
        cp1x = current.x + (next.x - prev.x) / 6;
        cp1y = current.y;
        cp2x = next.x - (next.x - current.x) / 3;
        cp2y = next.y;
      } else {
        // Средние точки: используем соседние точки для плавности
        const prev = points[i - 1];
        const nextNext = points[i + 2];
        const dx1 = (next.x - prev.x) / 6;
        const dy1 = (next.y - prev.y) / 6;
        const dx2 = (nextNext.x - current.x) / 6;
        const dy2 = (nextNext.y - current.y) / 6;
        
        cp1x = current.x + dx1;
        cp1y = current.y + dy1;
        cp2x = next.x - dx2;
        cp2y = next.y - dy2;
      }

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }

    return path;
  };

  // Вычисление значений для оси Y
  const getYAxisValues = (prices) => {
    if (!prices || prices.length === 0) return ['4.66M', '4.93M', '5.20M', '5.48M'];

    const values = prices.map(([, price]) => price);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;

    const formatValue = (val) => {
      if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(2)}K`;
      return val.toFixed(2);
    };

    return [
      formatValue(minValue + range * 0.75),
      formatValue(minValue + range * 0.5),
      formatValue(minValue + range * 0.25),
      formatValue(maxValue),
    ];
  };

  const chartPath = useMemo(() => {
    if (!chartData) return '';
    return generateChartPath(chartData);
  }, [chartData]);

  const yAxisValues = useMemo(() => {
    if (!chartData) return ['4.66M', '4.93M', '5.20M', '5.48M'];
    return getYAxisValues(chartData);
  }, [chartData]);

  const symbol = (selectedAsset.code && selectedAsset.code.split(' · ')[0]) || selectedAsset.name || '—';

  // Форматирование цены
  const formatPrice = (price) => {
    if (!price) return null;
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Форматирование изменения в процентах
  const formatPercent = (change) => {
    if (change === null || change === undefined) return null;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  // Форматирование дельты
  const formatDelta = (price, change) => {
    if (!price || change === null || change === undefined) return null;
    const delta = (price * change) / 100;
    const sign = delta >= 0 ? '+' : '';
    return `${sign}${new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(delta)}`;
  };

  const baseCoinData = assetDetails[selectedAsset.id] || {
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

  // Обновляем данные из реальных цен, если доступны
  const coinData = useMemo(() => {
    if (currentPrice !== null && priceChange24h !== null) {
      return {
        ...baseCoinData,
        price: formatPrice(currentPrice) || baseCoinData.price,
        percent: formatPercent(priceChange24h) || baseCoinData.percent,
        delta: formatDelta(currentPrice, priceChange24h) || baseCoinData.delta,
      };
    }
    return baseCoinData;
  }, [currentPrice, priceChange24h, baseCoinData]);

  return (
    <div className="asset-screen">
      {/* Заголовок с логотипом и названием */}
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

        {/* Цена */}
        <div className="asset-price-container">
          <div className="asset-price-value">{coinData.price}</div>
        </div>

        {/* Изменение цены */}
        <div className="asset-delta-container">
          <div className="asset-delta-group">
            <div className={`asset-delta-value ${coinData.percent && (coinData.percent.startsWith('-') || parseFloat(coinData.percent) < 0) ? 'negative' : 'positive'}`}>
              {coinData.delta}
            </div>
            <div className={`asset-delta-percent ${coinData.percent && (coinData.percent.startsWith('-') || parseFloat(coinData.percent) < 0) ? 'negative' : 'positive'}`}>
              {coinData.percent && (coinData.percent.startsWith('-') || parseFloat(coinData.percent) < 0) ? (
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

      {/* График */}
      <section className="asset-chart-section">
        <div className="asset-chart-container">
          <div className="asset-chart-wrapper">
            {!coinGeckoId ? (
              <div className="asset-chart-loading">График недоступен для этой монеты</div>
            ) : chartLoading ? (
              <div className="asset-chart-loading">Загрузка графика...</div>
            ) : chartError ? (
              <div className="asset-chart-error">Не удалось загрузить график</div>
            ) : (
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
                    <text y="426" x="0" textAnchor="end" fontSize="12">{yAxisValues[0]}</text>
                  </g>
                  <g className="visx-group visx-axis-tick" transform="translate(0, 0)">
                    <text y="294" x="0" textAnchor="end" fontSize="12">{yAxisValues[1]}</text>
                  </g>
                  <g className="visx-group visx-axis-tick" transform="translate(0, 0)">
                    <text y="162" x="0" textAnchor="end" fontSize="12">{yAxisValues[2]}</text>
                  </g>
                  <g className="visx-group visx-axis-tick" transform="translate(0, 0)">
                    <text y="30" x="0" textAnchor="end" fontSize="12">{yAxisValues[3]}</text>
                  </g>
                </g>
                {chartPath && (
                  <path
                    d={chartPath}
                    fill="transparent"
                    stroke={coinData.percent && (coinData.percent.startsWith('-') || parseFloat(coinData.percent) < 0) ? '#ff4444' : '#4caf50'}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    mask={`url(#mouseMaskMainPath-${selectedAsset.id})`}
                    className="asset-chart-path"
                  ></path>
                )}
                <rect x="0" y="0" width="814.114" height="456" fill="transparent" rx="14"></rect>
              </svg>
            )}
          </div>
          <div className="asset-chart-periods">
            <div className="asset-period-selector" role="radiogroup">
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

      {/* История транзакций */}
      <section className="asset-section">
        <div className="asset-section-header">
          <div className="asset-section-title">История транзакций</div>
        </div>
        <div className="asset-section-content">
          <div className="asset-transaction-list">
            {activity.slice(0, 3).map((item) => (
              <div key={item.id} className="asset-transaction-item">
                <div className="asset-transaction-left">
                  <div className="asset-transaction-icon">
                    {item.tone === 'success' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28" preserveAspectRatio="xMidYMid meet">
                        <path fill="currentColor" fillRule="evenodd" d="M14 25c6.075 0 11-4.925 11-11S20.075 3 14 3 3 7.925 3 14s4.925 11 11 11m-3.434-10.566a.8.8 0 0 0-1.132 1.132l4 4a.8.8 0 0 0 1.132 0l4-4a.8.8 0 0 0-1.132-1.132L14.8 17.07V9.5a.8.8 0 0 0-1.6 0v7.569z" clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="none" viewBox="0 0 28 29" preserveAspectRatio="xMidYMid meet">
                        <path fill="currentColor" fillRule="evenodd" d="M3 14.5c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11m9.304-5.97c.26.26.26.68 0 .94l-1.365 1.365h7.394a.665.665 0 1 1 0 1.33H10.94l1.364 1.365a.665.665 0 1 1-.94.94l-2.5-2.5a.665.665 0 0 1 0-.94l2.5-2.5c.26-.26.68-.26.94 0m3.556 6.94a.665.665 0 1 1 .94-.94l2.5 2.5a.665.665 0 0 1 0 .94l-2.5 2.5a.665.665 0 1 1-.94-.94l1.365-1.365H9.83a.665.665 0 1 1 0-1.33h7.395z" clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                  <div className="asset-transaction-info">
                    <div className="asset-transaction-title">{item.title}</div>
                    <div className="asset-transaction-time">{item.time}</div>
                  </div>
                </div>
                <div className="asset-transaction-right">
                  <div className={`asset-transaction-amount ${item.tone === 'success' ? 'positive' : ''}`}>
                    {item.value}
                  </div>
                  <div className={`asset-transaction-status ${item.tone === 'success' ? 'positive' : ''}`}>
                    {item.tone === 'success' ? 'Получено' : 'Отправлено'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="asset-transaction-show-all">
            <span>Показать все</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" fill="none" viewBox="0 0 7 12" preserveAspectRatio="xMidYMid meet">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5 5-5 5"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* О криптовалюте */}
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

      {/* Обзор */}
      <section className="asset-section">
        <div className="asset-section-header">
          <div className="asset-section-title">Обзор</div>
        </div>
        <div className="asset-section-content">
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
    </div>
  );
}

export default AssetScreen;
