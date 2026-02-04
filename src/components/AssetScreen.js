import ActivityList from './ActivityList';

function AssetScreen({ selectedAsset, activity }) {
  return (
    <>
      <section className="asset-hero">
        <div className="asset-hero-left">
          <div className={`asset-icon large ${selectedAsset.styleClass}`}>
            {selectedAsset.icon}
          </div>
          <div>
            <div className="asset-hero-name">{selectedAsset.name}</div>
            <div className="asset-hero-code">{selectedAsset.code}</div>
          </div>
        </div>
        <div className="asset-hero-right">
          <div className="asset-hero-price">{selectedAsset.price}</div>
          <div className="asset-hero-change">{selectedAsset.change} 24h</div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Your balance</h2>
        </div>
        <div className="detail-balance">
          <div className="detail-amount">{selectedAsset.amount}</div>
          <div className="detail-value">{selectedAsset.value}</div>
        </div>
        <div className="detail-actions">
          <button className="primary-button" type="button">
            Send
          </button>
          <button className="ghost-button" type="button">
            Receive
          </button>
          <button className="ghost-button" type="button">
            Swap
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Price chart</h2>
        </div>
        <div className="chart-placeholder">
          <div className="chart-line" />
          <div className="chart-caption">Mock chart • last 7 days</div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Latest operations</h2>
        </div>
        <ActivityList activity={activity} />
      </section>
    </>
  );
}

export default AssetScreen;
