function sparklinePath(prices, width = 56, height = 24) {
  if (!prices || prices.length < 2) return '';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const step = (width - 2) / (prices.length - 1);
  const points = prices.map((p, i) => {
    const x = 1 + i * step;
    const y = height - 2 - ((p - min) / range) * (height - 4);
    return `${x},${y}`;
  });
  return `M ${points.join(' L ')}`;
}

function AssetsSection({ assets, totalLabel, onOpenAsset, sparklines = {} }) {
  return (
    <section className="section crypto-section">
      <div className="section-header">
        <h2>Крипто</h2>
        <div className="section-note">{totalLabel}</div>
      </div>
      <div className="asset-list">
        {assets.map((asset) => {
          const points = sparklines[asset.id];
          const isNegative = asset.delta && asset.delta.toString().startsWith('-');
          return (
            <button
              className="asset-row clickable"
              type="button"
              key={asset.id}
              onClick={() => onOpenAsset(asset)}
            >
              <div className="asset-left">
                <div className={`asset-icon ${asset.styleClass}`}>{asset.icon}</div>
                <div>
                  <div className="asset-name">{asset.name}</div>
                  <div className="asset-code">{asset.code}</div>
                </div>
              </div>
              <div className="asset-right">
                {points && points.length >= 2 && (
                  <div className="asset-sparkline" aria-hidden="true">
                    <svg width="56" height="24" viewBox="0 0 56 24" fill="none" preserveAspectRatio="none">
                      <path
                        d={sparklinePath(points)}
                        stroke={isNegative ? 'var(--tg-theme-destructive-text-color, #e53935)' : 'var(--button-confirm-color, #4CAF50)'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
                <div className="asset-amount">{asset.value}</div>
                <div
                  className={`asset-value ${
                    isNegative ? 'negative' : ''
                  }`}
                >
                  {asset.delta}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default AssetsSection;
