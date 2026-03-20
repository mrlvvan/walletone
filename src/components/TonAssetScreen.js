import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import "./AssetScreen.css";
import "./TonAssetScreen.css";
import { fetchChartData, buildChartPath, buildChartGridAndAxis, createFallbackChartPoints, CHART_AREA_WIDTH, CHART_HEIGHT } from "../services/chartService";

const QR_CODE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path fill="currentColor" d="M8.8 15.175c.546 0 1.006 0 1.38.03.385.032.753.1 1.103.278.53.27.964.703 1.235 1.235.178.35.246.717.277 1.102.03.374.03.834.03 1.38v1.6c0 .546 0 1.006-.03 1.38-.031.385-.1.753-.277 1.102a2.83 2.83 0 0 1-1.236 1.236c-.349.178-.717.246-1.101.277-.375.03-.835.03-1.38.03H7.2c-.547 0-1.007 0-1.381-.03-.385-.031-.753-.1-1.102-.277a2.83 2.83 0 0 1-1.235-1.236c-.178-.349-.246-.717-.278-1.101-.03-.375-.03-.835-.03-1.381v-1.6c0-.546 0-1.006.03-1.38.032-.385.1-.753.278-1.102.27-.532.703-.965 1.235-1.235.35-.178.717-.246 1.102-.278.374-.03.834-.03 1.38-.03h1.6Zm8.65 6.575c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zm6 0c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zM7.2 16.825c-.573 0-.955 0-1.247.025-.282.023-.408.063-.486.103a1.18 1.18 0 0 0-.514.514c-.04.078-.08.204-.103.486-.024.292-.025.674-.025 1.247v1.6c0 .573.001.955.025 1.247.023.282.064.408.103.486.113.221.293.401.514.514.078.04.205.08.486.104.292.023.674.024 1.247.024h1.6c.574 0 .955 0 1.247-.024.282-.023.408-.064.486-.104.222-.113.402-.293.514-.514.04-.078.08-.204.104-.486.024-.292.024-.674.024-1.247v-1.6c0-.573 0-.955-.024-1.247-.023-.281-.064-.408-.104-.486a1.18 1.18 0 0 0-.514-.514c-.078-.04-.204-.08-.486-.103-.292-.024-.673-.025-1.247-.025zm13.25 1.925c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zm-3-3c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zm6 0c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zM8.8 3.175c.546 0 1.006 0 1.38.03.385.032.753.1 1.103.278.53.27.964.703 1.235 1.235.178.35.246.717.277 1.102.03.374.03.834.03 1.38v1.6c0 .546 0 1.006-.03 1.38-.031.385-.1.753-.277 1.102a2.83 2.83 0 0 1-1.236 1.236c-.349.178-.717.246-1.101.277-.375.03-.835.03-1.38.03H7.2c-.547 0-1.007 0-1.381-.03-.385-.031-.753-.1-1.102-.277a2.83 2.83 0 0 1-1.235-1.236c-.178-.349-.246-.717-.278-1.101-.03-.375-.03-.835-.03-1.381V7.2c0-.546 0-1.006.03-1.38.032-.385.1-.753.278-1.102.27-.532.703-.965 1.235-1.235.35-.178.717-.246 1.102-.278.374-.03.834-.03 1.38-.03h1.6Zm12 0c.546 0 1.006 0 1.38.03.385.032.753.1 1.102.278.532.27.965.703 1.236 1.235.178.35.246.717.277 1.102.03.374.03.834.03 1.38v1.6c0 .546 0 1.006-.03 1.38-.031.385-.1.753-.277 1.102a2.83 2.83 0 0 1-1.236 1.236c-.349.178-.717.246-1.101.277-.375.03-.835.03-1.381.03h-1.6c-.546 0-1.006 0-1.38-.03-.385-.031-.753-.1-1.102-.277a2.83 2.83 0 0 1-1.235-1.236c-.178-.349-.246-.717-.278-1.101-.03-.375-.03-.835-.03-1.381V7.2c0-.546 0-1.006.03-1.38.032-.385.1-.753.278-1.102.27-.532.703-.965 1.235-1.235.35-.178.717-.246 1.102-.278.374-.03.834-.03 1.38-.03zM7.2 4.825c-.573 0-.955 0-1.247.025-.282.023-.408.064-.486.103a1.18 1.18 0 0 0-.514.514c-.04.078-.08.204-.103.486-.024.292-.025.674-.025 1.247v1.6c0 .574.001.955.025 1.247.023.282.064.408.103.486.113.221.293.401.514.514.078.04.205.08.486.104.292.023.674.024 1.247.024h1.6c.574 0 .955 0 1.247-.024.282-.024.408-.064.486-.104.222-.113.402-.293.514-.514.04-.078.08-.204.104-.486.024-.292.024-.673.024-1.247V7.2c0-.573 0-.955-.024-1.247-.023-.281-.064-.408-.104-.486a1.18 1.18 0 0 0-.514-.514c-.078-.04-.204-.08-.486-.103-.292-.024-.673-.025-1.247-.025zm12 0c-.573 0-.954 0-1.247.025-.281.023-.408.064-.486.103a1.18 1.18 0 0 0-.514.514c-.04.078-.08.204-.103.486-.024.292-.025.674-.025 1.247v1.6c0 .574.001.955.025 1.247.023.282.064.408.103.486.113.221.293.401.514.514.078.04.205.08.486.104.293.023.674.024 1.247.024h1.6c.574 0 .955 0 1.247-.024.282-.024.408-.064.486-.104.221-.113.401-.293.514-.514.04-.078.08-.204.104-.486.023-.292.024-.673.024-1.247V7.2c0-.573 0-.955-.024-1.247-.023-.281-.064-.408-.104-.486a1.18 1.18 0 0 0-.514-.514c-.078-.04-.204-.08-.486-.103-.292-.024-.673-.025-1.247-.025z" />
  </svg>
);

/** Найти баланс токена в TON-кошельке по id актива */
function getTokenBalance(assetId, assetCode, tonWalletData) {
  if (!tonWalletData?.tokens) return null;
  const code = (assetCode || "").toUpperCase();
  const id = String(assetId || "").toLowerCase();
  return tonWalletData.tokens.find(
    (t) =>
      (t.id && String(t.id).toLowerCase() === id) ||
      (t.id && id.includes(t.id)) ||
      (t.name && (t.name.toUpperCase() === code || id.includes(t.name.toLowerCase())))
  ) || null;
}

function TonAssetScreen({ selectedAsset, tonWalletData = {}, assetDetails = {} }) {
  const [selectedPeriod, setSelectedPeriod] = useState("1Д");
  const [chartPoints, setChartPoints] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [actionPopupOpen, setActionPopupOpen] = useState(false);

  const periods = ["1Д", "7Д", "1М", "1Г", "Все"];
  const periodIndex = Math.max(0, periods.indexOf(selectedPeriod));

  const code = selectedAsset.code?.split(" · ")[0] || selectedAsset.name || "—";
  const displayName = selectedAsset.name || (code === "USDT" ? "Доллары" : code);
  const normalizedId = String(selectedAsset.id || "").toLowerCase().replace(/-ton$/, "");
  const detailKey =
    assetDetails[selectedAsset.id] ? selectedAsset.id :
    assetDetails[normalizedId] ? normalizedId :
    assetDetails[code?.toLowerCase()] ? code.toLowerCase() : null;

  const coinData = (detailKey ? assetDetails[detailKey] : null) || {
    price: selectedAsset.price || "— ₽",
    delta: selectedAsset.delta || "—",
    percent: selectedAsset.change || "—%",
    overview: {
      capitalization: { value: "—" },
      totalSupply: { value: "—" },
      holders: { value: "—" },
      liquidity: { value: "—" },
      listingDate: { value: "—" },
    },
  };

  const tokenBalance = getTokenBalance(selectedAsset.id, code, tonWalletData);
  const portfolioValue = tokenBalance?.value ?? "0,00 ₽";
  const portfolioAmount = tokenBalance?.amount ?? `0 ${code}`;
  const portfolioPercent = tonWalletData?.percent ?? "0,00%";
  const portfolioPeriod = tonWalletData?.period ?? "За всё время";

  const tonOverview = coinData.tonOverview || coinData.overview || {};
  const isNegative = coinData.percent && (String(coinData.percent).startsWith("-") || parseFloat(coinData.percent) < 0);

  const tradingActivity = coinData.tradingActivity || {
    volume: "5,6 тыс. $",
    buyVolume: "2,7 тыс. $",
    sellVolume: "2,9 тыс. $",
    buyPercent: 48,
  };

  useEffect(() => {
    let cancelled = false;
    setChartLoading(true);
    setChartPoints(null);
    const chartId = selectedAsset.id?.replace(/-ton$/, "") || selectedAsset.id;
    fetchChartData(chartId, selectedPeriod)
      .then((points) => {
        if (!cancelled && points && points.length >= 2) setChartPoints(points);
        else if (!cancelled) setChartPoints(null);
      })
      .catch(() => { if (!cancelled) setChartPoints(null); })
      .finally(() => { if (!cancelled) setChartLoading(false); });
    return () => { cancelled = true; };
  }, [selectedAsset.id, selectedPeriod]);

  const displayPoints =
    chartPoints && chartPoints.length >= 2
      ? chartPoints
      : !chartLoading
        ? createFallbackChartPoints(coinData.percent || selectedAsset.change || 0, `${selectedAsset.id}-${selectedPeriod}`)
        : null;

  return (
    <div className="asset-screen ton-asset-screen">
      {/* Заголовок: SVG → название/тикер → цена → дельта; бейдж справа */}
      <section className="ton-asset-header">
        <div className="ton-asset-header-row">
          <div className="ton-asset-header-left">
            <div className="ton-asset-icon-wrap">
              <div className={`asset-icon-large ${selectedAsset.styleClass || "ton"}`}>
                {selectedAsset.icon}
              </div>
            </div>
            <div className="ton-asset-title-block">
              <h1 className="ton-asset-name">{displayName}</h1>
              <span className="ton-asset-code">{code}</span>
            </div>
            <div className="ton-asset-price">{coinData.price}</div>
            <div className={`ton-asset-delta ${isNegative ? "negative" : "positive"}`}>
              {String(coinData.percent || "0").replace(/[↑↓%]/g, "").trim()}%
              {coinData.delta && ` ${coinData.delta}`}
            </div>
          </div>
          <div className={`ton-asset-profit-badge ${isNegative ? "negative" : "positive"}`}>
            Доход {String(coinData.percent || "0").replace(/[↑↓]/g, "").trim() || "0%"}
          </div>
        </div>
      </section>

      {/* График */}
      <section className="asset-chart-section asset-main">
        <div className="asset-chart-container">
          <div className="asset-chart-wrapper">
            {chartLoading && <div className="asset-chart-loading">Загрузка графика…</div>}
            {!chartLoading && displayPoints?.length >= 2 && (() => {
              const pts = displayPoints;
              const { gridLines, axisLabels } = buildChartGridAndAxis(pts);
              const lastPrice = pts[pts.length - 1][1];
              const firstPrice = pts[0][1];
              const chartIsNegative = lastPrice < firstPrice;
              return (
                <div className="asset-chart-row">
                  <div className="asset-chart-area">
                    <svg className="asset-chart-svg" viewBox={`0 0 ${CHART_AREA_WIDTH} ${CHART_HEIGHT}`} preserveAspectRatio="none">
                      <path d={buildChartPath(pts)} fill="transparent" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                        className={`asset-chart-path ${chartIsNegative ? "negative" : "positive"}`} />
                      <g className="asset-chart-grid">
                        {gridLines.map((line, i) => (
                          <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} className="asset-chart-grid-line" />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <div className="asset-chart-axis">
                    {axisLabels.map((label, i) => (
                      <div key={i} className="asset-chart-axis-label" style={{ top: `${((label.y - 5) / CHART_HEIGHT) * 100}%` }}>
                        {label.text}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
            {!chartLoading && (!displayPoints || displayPoints.length < 2) && (
              <div className="asset-chart-no-data">Нет данных для графика</div>
            )}
          </div>
          <div className="asset-chart-periods">
            <div className="asset-period-selector" role="radiogroup" style={{ "--period-count": periods.length, "--period-index": periodIndex }}>
              {periods.map((period) => (
                <button key={period} className={`asset-period-button ${selectedPeriod === period ? "active" : ""}`} role="radio" aria-checked={selectedPeriod === period}
                  onClick={() => setSelectedPeriod(period)}>{period}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-gap" aria-hidden="true" />

      {/* Секция «Ваш портфель» */}
      <section className="ton-asset-section">
        <div className="ton-asset-section-header">Ваш портфель</div>
        <div className="ton-asset-section-content">
          <div className="ton-portfolio-summary">
            <span className="ton-portfolio-value">{portfolioValue}</span>
            <span className={`ton-portfolio-percent ${portfolioPercent.startsWith("-") ? "negative" : "positive"}`}>
              {portfolioPercent.replace("-", "")} {portfolioPeriod}
            </span>
          </div>
          <div className="ton-portfolio-main-balance">
            <div className="ton-portfolio-main-icon">
              <div className={`asset-icon-large ${selectedAsset.styleClass || "ton"}`}>{selectedAsset.icon}</div>
            </div>
            <div className="ton-portfolio-main-info">
              <span className="ton-portfolio-main-label">Основной баланс</span>
              <span className="ton-portfolio-main-amount">{portfolioAmount}</span>
            </div>
            <span className="ton-portfolio-main-value">{portfolioValue}</span>
          </div>
        </div>
      </section>

      <div className="section-gap" aria-hidden="true" />

      {/* Секция «Обзор» — TON-поля */}
      <section className="ton-asset-section">
        <div className="ton-asset-section-header">Обзор</div>
        <div className="ton-asset-section-content ton-overview-content">
          <div className="asset-overview-list">
            <div className="asset-overview-item">
              <div className="asset-overview-label">Капитализация</div>
              <div className="asset-overview-main-value">{tonOverview.capitalization?.value ?? coinData.overview?.capitalization?.value ?? "—"}</div>
            </div>
            <div className="asset-overview-item">
              <div className="asset-overview-label">Общее предложение</div>
              <div className="asset-overview-main-value">{tonOverview.totalSupply?.value ?? coinData.overview?.inCirculation?.value ?? "—"}</div>
            </div>
            <div className="asset-overview-item">
              <div className="asset-overview-label">Владельцы</div>
              <div className="asset-overview-main-value">{tonOverview.holders?.value ?? "—"}</div>
            </div>
            <div className="asset-overview-item">
              <div className="asset-overview-label">Ликвидность</div>
              <div className="asset-overview-main-value">{tonOverview.liquidity?.value ?? "—"}</div>
            </div>
            <div className="asset-overview-item">
              <div className="asset-overview-label">Дата листинга</div>
              <div className="asset-overview-main-value">{tonOverview.listingDate?.value ?? "—"}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-gap" aria-hidden="true" />

      {/* Секция «Торговая активность за 24 ч» */}
      <section className="ton-asset-section">
        <div className="ton-asset-section-header">Торговая активность за 24 ч</div>
        <div className="ton-asset-section-content">
          <div className="ton-trading-volume-row">
            <span className="ton-trading-label">Объём</span>
            <span className="ton-trading-value">{tradingActivity.volume}</span>
          </div>
          <div className="ton-trading-bar-wrap">
            <div
              className="ton-trading-bar"
              style={{
                background: `linear-gradient(to right, #34c759 ${tradingActivity.buyPercent}%, #ff3b30 ${tradingActivity.buyPercent}%)`,
              }}
            />
          </div>
          <div className="ton-trading-legend">
            <span className="ton-trading-buy">Покупка · {tradingActivity.buyVolume}</span>
            <span className="ton-trading-sell">{tradingActivity.sellVolume} · Продажа</span>
          </div>
        </div>
      </section>

      <div className="asset-bottom-area ton-asset-bottom-area">
        <div className="asset-scroll-tail" aria-hidden="true" />
      </div>
      {createPortal(
        <div className="ton-asset-action-bar-fixed">
          <div className="asset-action-bar">
            <button className="asset-action-button buy" type="button">Купить</button>
            <div className="asset-action-more-wrap">
              <button className="asset-action-button asset-action-more" type="button" onClick={() => setActionPopupOpen(true)} aria-label="Ещё">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
                  <path fill="currentColor" d="M6.995 11.995a2 2 0 1 1 0 4 2 2 0 0 1 0-4m7 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4m7 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4" />
                </svg>
              </button>
              {actionPopupOpen && (
                <>
                  <div className="asset-action-popup-backdrop" onClick={() => setActionPopupOpen(false)} />
                  <div className="asset-action-popup" onClick={(e) => e.stopPropagation()}>
                    <button className="asset-action-popup-item" type="button" onClick={() => setActionPopupOpen(false)}>
                      <span className="asset-action-popup-icon">{QR_CODE_ICON}</span>
                      <span>Получить {displayName}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
        document.getElementById('ton-action-bar-root') || document.body
      )}
    </div>
  );
}

export default TonAssetScreen;
