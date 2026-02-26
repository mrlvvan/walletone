import { useState, useEffect } from "react";

import "./AssetScreen.css";
import { fetchChartData, buildChartPath, buildChartGridAndAxis, createFallbackChartPoints, CHART_AREA_WIDTH, CHART_HEIGHT } from "../services/chartService";

const QR_CODE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path fill="currentColor" d="M8.8 15.175c.546 0 1.006 0 1.38.03.385.032.753.1 1.103.278.53.27.964.703 1.235 1.235.178.35.246.717.277 1.102.03.374.03.834.03 1.38v1.6c0 .546 0 1.006-.03 1.38-.031.385-.1.753-.277 1.102a2.83 2.83 0 0 1-1.236 1.236c-.349.178-.717.246-1.101.277-.375.03-.835.03-1.38.03H7.2c-.547 0-1.007 0-1.381-.03-.385-.031-.753-.1-1.102-.277a2.83 2.83 0 0 1-1.235-1.236c-.178-.349-.246-.717-.278-1.101-.03-.375-.03-.835-.03-1.381v-1.6c0-.546 0-1.006.03-1.38.032-.385.1-.753.278-1.102.27-.532.703-.965 1.235-1.235.35-.178.717-.246 1.102-.278.374-.03.834-.03 1.38-.03h1.6Zm8.65 6.575c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zm6 0c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zM7.2 16.825c-.573 0-.955 0-1.247.025-.282.023-.408.063-.486.103a1.18 1.18 0 0 0-.514.514c-.04.078-.08.204-.103.486-.024.292-.025.674-.025 1.247v1.6c0 .573.001.955.025 1.247.023.282.064.408.103.486.113.221.293.401.514.514.078.04.205.08.486.104.292.023.674.024 1.247.024h1.6c.574 0 .955 0 1.247-.024.282-.023.408-.064.486-.104.222-.113.402-.293.514-.514.04-.078.08-.204.104-.486.024-.292.024-.674.024-1.247v-1.6c0-.573 0-.955-.024-1.247-.023-.281-.064-.408-.104-.486a1.18 1.18 0 0 0-.514-.514c-.078-.04-.204-.08-.486-.103-.292-.024-.673-.025-1.247-.025zm13.25 1.925c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zm-3-3c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zm6 0c.28 0 .42 0 .527.055.094.048.17.125.219.219.054.107.054.246.054.526v.9c0 .28 0 .42-.054.527a.5.5 0 0 1-.22.218c-.106.055-.246.055-.526.055h-.9c-.28 0-.42 0-.526-.055a.5.5 0 0 1-.22-.218c-.053-.107-.054-.247-.054-.527v-.9c0-.28 0-.42.055-.526a.5.5 0 0 1 .219-.22c.107-.053.246-.054.526-.054zM8.8 3.175c.546 0 1.006 0 1.38.03.385.032.753.1 1.103.278.53.27.964.703 1.235 1.235.178.35.246.717.277 1.102.03.374.03.834.03 1.38v1.6c0 .546 0 1.006-.03 1.38-.031.385-.1.753-.277 1.102a2.83 2.83 0 0 1-1.236 1.236c-.349.178-.717.246-1.101.277-.375.03-.835.03-1.38.03H7.2c-.547 0-1.007 0-1.381-.03-.385-.031-.753-.1-1.102-.277a2.83 2.83 0 0 1-1.235-1.236c-.178-.349-.246-.717-.278-1.101-.03-.375-.03-.835-.03-1.381V7.2c0-.546 0-1.006.03-1.38.032-.385.1-.753.278-1.102.27-.532.703-.965 1.235-1.235.35-.178.717-.246 1.102-.278.374-.03.834-.03 1.38-.03h1.6Zm12 0c.546 0 1.006 0 1.38.03.385.032.753.1 1.102.278.532.27.965.703 1.236 1.235.178.35.246.717.277 1.102.03.374.03.834.03 1.38v1.6c0 .546 0 1.006-.03 1.38-.031.385-.1.753-.277 1.102a2.83 2.83 0 0 1-1.236 1.236c-.349.178-.717.246-1.101.277-.375.03-.835.03-1.381.03h-1.6c-.546 0-1.006 0-1.38-.03-.385-.031-.753-.1-1.102-.277a2.83 2.83 0 0 1-1.235-1.236c-.178-.349-.246-.717-.278-1.101-.03-.375-.03-.835-.03-1.381V7.2c0-.546 0-1.006.03-1.38.032-.385.1-.753.278-1.102.27-.532.703-.965 1.235-1.235.35-.178.717-.246 1.102-.278.374-.03.834-.03 1.38-.03zM7.2 4.825c-.573 0-.955 0-1.247.025-.282.023-.408.064-.486.103a1.18 1.18 0 0 0-.514.514c-.04.078-.08.204-.103.486-.024.292-.025.674-.025 1.247v1.6c0 .574.001.955.025 1.247.023.282.064.408.103.486.113.221.293.401.514.514.078.04.205.08.486.104.292.023.674.024 1.247.024h1.6c.574 0 .955 0 1.247-.024.282-.024.408-.064.486-.104.222-.113.402-.293.514-.514.04-.078.08-.204.104-.486.024-.292.024-.673.024-1.247V7.2c0-.573 0-.955-.024-1.247-.023-.281-.064-.408-.104-.486a1.18 1.18 0 0 0-.514-.514c-.078-.04-.204-.08-.486-.103-.292-.024-.673-.025-1.247-.025zm12 0c-.573 0-.954 0-1.247.025-.281.023-.408.064-.486.103a1.18 1.18 0 0 0-.514.514c-.04.078-.08.204-.103.486-.024.292-.025.674-.025 1.247v1.6c0 .574.001.955.025 1.247.023.282.064.408.103.486.113.221.293.401.514.514.078.04.205.08.486.104.293.023.674.024 1.247.024h1.6c.574 0 .955 0 1.247-.024.282-.024.408-.064.486-.104.221-.113.401-.293.514-.514.04-.078.08-.204.104-.486.023-.292.024-.673.024-1.247V7.2c0-.573 0-.955-.024-1.247-.023-.281-.064-.408-.104-.486a1.18 1.18 0 0 0-.514-.514c-.078-.04-.204-.08-.486-.103-.292-.024-.673-.025-1.247-.025z" />
  </svg>
);

function AssetScreen({ selectedAsset, activity, assetDetails = {} }) {
  const [selectedPeriod, setSelectedPeriod] = useState("1Д");
  const [chartPoints, setChartPoints] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [actionPopupOpen, setActionPopupOpen] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const periods = ["1Д", "7Д", "1М", "1Г", "Все"];

  useEffect(() => {
    let cancelled = false;
    setChartLoading(true);
    setChartPoints(null);

    fetchChartData(selectedAsset.id, selectedPeriod)
      .then((points) => {
        if (!cancelled && points && points.length >= 2) {
          setChartPoints(points);
        } else if (!cancelled) {
          setChartPoints(null);
        }
      })
      .catch(() => {
        if (!cancelled) setChartPoints(null);
      })
      .finally(() => {
        if (!cancelled) setChartLoading(false);
      });

    return () => { cancelled = true; };
  }, [selectedAsset.id, selectedPeriod]);

  useEffect(() => {
    setDescriptionExpanded(false);
  }, [selectedAsset.id]);
  const periodIndex = Math.max(0, periods.indexOf(selectedPeriod));

  const symbol =
    (selectedAsset.code && selectedAsset.code.split(" · ")[0]) ||
    selectedAsset.name ||
    "—";

  const coinData = assetDetails[selectedAsset.id] || {
    price: selectedAsset.price || "— ₽",
    delta: selectedAsset.delta || "—",
    percent: selectedAsset.change || "—%",
    period: "24 ч",
    description: `${selectedAsset.name} (${symbol}) — криптовалюта для переводов и расчётов.`,
    features: [
      "Получайте и отправляйте кому угодно (с комиссией).",
      "Подходит для расчётов в сети.",
    ],
    overview: {
      capitalization: {
        value: selectedAsset.value || "—",
        change: selectedAsset.change || "—",
        isPositive: !(
          selectedAsset.change && selectedAsset.change.startsWith("-")
        ),
      },
      volume: { value: "—", change: "—", isPositive: true },
      inCirculation: { value: selectedAsset.amount || "—" },
    },
  };

  const isNegative =
    coinData.percent &&
    (coinData.percent.startsWith("-") || parseFloat(coinData.percent) < 0);

  const displayPoints =
    chartPoints && chartPoints.length >= 2
      ? chartPoints
      : !chartLoading
        ? createFallbackChartPoints(coinData.percent || selectedAsset.change || 0)
        : null;
  const canCollapseDescription = (coinData.description || "").length > 60;

  return (
    <div className="asset-screen">
      <section className="asset-header-section asset-main">
        <div className="asset-header-content">
          <div className="asset-logo-container">
            <div className={`asset-icon-large ${selectedAsset.styleClass}`}>
              {selectedAsset.icon}
            </div>
          </div>
          <div className="asset-title-group">
            <div className="asset-name-title">
              <span className="asset-name-text">{selectedAsset.name}</span>
              <span className="asset-code-text">
                {" "}
                {selectedAsset.code?.split(" · ")[0] || "BTC"}
              </span>
            </div>
          </div>
        </div>

        <div className="asset-price-container">
          <div className="asset-price-value">{coinData.price}</div>
        </div>

        <div className="asset-delta-container">
          <div className="asset-delta-group">
            <div
              className={`asset-delta-value ${isNegative ? "negative" : "positive"}`}
            >
              {coinData.delta}
            </div>
            <div
              className={`asset-delta-percent ${isNegative ? "negative" : "positive"}`}
            >
              {isNegative ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="16"
                  fill="none"
                  viewBox="0 0 12 16"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="1.25"
                    d="M6 3v9.5m0 0 4-4m-4 4-4-4"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="18"
                  fill="none"
                  viewBox="0 0 12 18"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    fill="currentColor"
                    d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z"
                  ></path>
                </svg>
              )}
              {coinData.percent ? coinData.percent.replace(/[+-]/, "") : "—"}
            </div>
            <div className="asset-delta-period">{coinData.period}</div>
          </div>
        </div>
      </section>

      <section className="asset-chart-section asset-main">
        <div className="asset-chart-container">
          <div className="asset-chart-wrapper">
            {chartLoading && (
              <div className="asset-chart-loading">Загрузка графика…</div>
            )}
            {!chartLoading && (displayPoints?.length >= 2 ? (() => {
              const pts = displayPoints;
              const { gridLines, axisLabels } = buildChartGridAndAxis(pts);
              const lastPrice = pts[pts.length - 1][1];
              const firstPrice = pts[0][1];
              const chartIsNegative = lastPrice < firstPrice;
              return (
                <div className="asset-chart-row">
                  <div className="asset-chart-area">
                    <svg
                      className="asset-chart-svg"
                      viewBox={`0 0 ${CHART_AREA_WIDTH} ${CHART_HEIGHT}`}
                      preserveAspectRatio="none"
                    >
                      <path
                        d={buildChartPath(pts)}
                        fill="transparent"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`asset-chart-path ${chartIsNegative ? "negative" : "positive"}`}
                      />
                      <g className="asset-chart-grid">
                        {gridLines.map((line, i) => (
                          <line
                            key={i}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            className="asset-chart-grid-line"
                          />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <div className="asset-chart-axis">
                    {axisLabels.map((label, i) => (
                      <div
                        key={i}
                        className="asset-chart-axis-label"
                        style={{ top: `${((label.y - 5) / CHART_HEIGHT) * 100}%` }}
                      >
                        {label.text}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })() : (
              <div className="asset-chart-no-data">Нет данных для графика</div>
            ))}
          </div>
          <div className="asset-chart-periods">
            <div
              className="asset-period-selector"
              role="radiogroup"
              style={{
                "--period-count": periods.length,
                "--period-index": periodIndex,
              }}
            >
              {periods.map((period) => (
                <button
                  key={period}
                  className={`asset-period-button ${selectedPeriod === period ? "active" : ""}`}
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
            <div className="asset-description-text-wrap">
              <div className={`asset-description-text ${descriptionExpanded ? "expanded" : "collapsed"}`}>
                {coinData.description}
              </div>
              {canCollapseDescription && (
                <button
                  type="button"
                  className="asset-description-toggle"
                  onClick={() => setDescriptionExpanded((prev) => !prev)}
                >
                  {descriptionExpanded ? "Скрыть" : "Подробнее"}
                </button>
              )}
            </div>
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
                <div className="asset-overview-main-value">
                  {coinData.overview.capitalization.value}
                </div>
                <div
                  className={`asset-overview-change ${coinData.overview.capitalization.isPositive ? "positive" : "negative"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="18"
                    fill="none"
                    viewBox="0 0 12 18"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      fill="currentColor"
                      d="M6 3.263a.576.576 0 0 1 .593.586v7.302l-.073 1.802-.38-.132 2.226-2.469 1.047-1.018a.6.6 0 0 1 .41-.161.54.54 0 0 1 .41.169.57.57 0 0 1 .162.41q0 .234-.184.432l-3.772 3.78a.58.58 0 0 1-.439.204.58.58 0 0 1-.44-.205l-3.77-3.779a.62.62 0 0 1-.184-.432.57.57 0 0 1 .162-.41.54.54 0 0 1 .41-.169.6.6 0 0 1 .41.161l1.047 1.018 2.22 2.469-.374.132-.073-1.802V3.849A.576.576 0 0 1 6 3.263"
                    ></path>
                  </svg>
                  {coinData.overview.capitalization.change.replace("-", "")}
                </div>
              </div>
            </div>
            <div className="asset-overview-item">
              <div className="asset-overview-label">Торговый объём</div>
              <div className="asset-overview-value">
                <div className="asset-overview-main-value">
                  {coinData.overview.volume.value}
                </div>
                <div
                  className={`asset-overview-change ${coinData.overview.volume.isPositive ? "positive" : "negative"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="18"
                    fill="none"
                    viewBox="0 0 12 18"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      fill="currentColor"
                      d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z"
                    ></path>
                  </svg>
                  {coinData.overview.volume.change.replace("+", "")}
                </div>
              </div>
            </div>
            <div className="asset-overview-item">
              <div className="asset-overview-label">В обороте</div>
              <div className="asset-overview-value">
                <div className="asset-overview-main-value">
                  {coinData.overview.inCirculation.value}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="asset-bottom-area">
        {selectedAsset.id === "major" && (
          <section className="asset-section links-section">
            <div className="asset-section-header">
              <div className="asset-section-title">Ссылки</div>
            </div>
            <div className="asset-section-content">
              <div className="asset-link-row">
                <div className="asset-link-left">
                  <div className={`asset-icon ${selectedAsset.styleClass}`}>
                    {selectedAsset.icon}
                  </div>
                  <div className="asset-link-info">
                    <div className="asset-link-title">{selectedAsset.name}</div>
                    <div className="asset-link-subtitle">мини-приложение</div>
                  </div>
                </div>
                <div className="asset-link-chevron">›</div>
              </div>
              <div className="asset-link-row">
                <div className="asset-link-left">
                  <div className={`asset-icon ${selectedAsset.styleClass}`}>
                    {selectedAsset.icon}
                  </div>
                  <div className="asset-link-info">
                    <div className="asset-link-title">
                      Сообщество {selectedAsset.name}
                    </div>
                    <div className="asset-link-subtitle">
                      Более 28 млн подписчиков
                    </div>
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
          <div className="asset-action-more-wrap">
            <button
              className="asset-action-button asset-action-more"
              type="button"
              onClick={() => setActionPopupOpen(true)}
              aria-label="Ещё"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
                <path fill="currentColor" d="M6.995 11.995a2 2 0 1 1 0 4 2 2 0 0 1 0-4m7 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4m7 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4" />
              </svg>
            </button>
            {actionPopupOpen && (
              <>
                <div className="asset-action-popup-backdrop" onClick={() => setActionPopupOpen(false)} />
                <div className="asset-action-popup" onClick={(e) => e.stopPropagation()}>
              <button
                className="asset-action-popup-item"
                type="button"
                onClick={() => {
                  setActionPopupOpen(false);
                  /* TODO: открыть экран получения */
                }}
              >
                <span className="asset-action-popup-icon">{QR_CODE_ICON}</span>
                <span>Получить {selectedAsset.name}</span>
              </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetScreen;
