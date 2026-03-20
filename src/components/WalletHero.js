function WalletHero({ stats, activeTab = 'crypto', onTabChange }) {
  return (
    <section className={`wallet-hero ${activeTab === 'ton' ? 'wallet-hero--tabs-only' : ''}`}>
      <div className="wallet-tabs" role="tablist">
        <button
          className={`tab-chip ${activeTab === 'crypto' ? 'active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 'crypto'}
          onClick={() => onTabChange?.('crypto')}
        >
          Крипто
        </button>
        <button
          className={`tab-chip ${activeTab === 'ton' ? 'active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 'ton'}
          onClick={() => onTabChange?.('ton')}
        >
          TON
        </button>
      </div>
      {activeTab === 'crypto' && (
      <div className="wallet-balance">
        <div className="balance-label">Баланс</div>
        <div className="balance-amount large">
          <span className="balance-int">{stats.balanceInt}</span>
          <span className="balance-sep">,</span>
          <span className="balance-dec">{stats.balanceDec}</span>
          <span className="balance-currency"> ₽</span>
        </div>
        <div className="balance-change">
          <span className="balance-delta negative">{stats.delta}</span>
          <span className="balance-pill negative">
            <span className="balance-pill-icon" aria-hidden="true">
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
                  d="M6 13V3.5m0 0 4 4m-4-4-4 4"
                />
              </svg>
            </span>
            {stats.percent}
          </span>
          <span className="balance-period">{stats.period}</span>
        </div>
      </div>
      )}
    </section>
  );
}

export default WalletHero;
