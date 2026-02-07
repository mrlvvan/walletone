function AssetsSection({ assets, totalLabel, onOpenAsset }) {
  return (
    <section className="section crypto-section">
      <div className="section-header">
        <h2>Крипто</h2>
        <div className="section-note">{totalLabel}</div>
      </div>
      <div className="asset-list">
        {assets.map((asset) => (
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
              <div className="asset-amount">{asset.value}</div>
              <div
                className={`asset-value ${
                  asset.delta && asset.delta.startsWith('-') ? 'negative' : ''
                }`}
              >
                {asset.delta}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default AssetsSection;
