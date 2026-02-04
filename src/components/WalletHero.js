function WalletHero({ stats }) {
  return (
    <section className="wallet-hero">
      <div className="wallet-tabs">
        <button className="tab-chip active" type="button">
          Крипто
        </button>
        <button className="tab-chip" type="button">
          TON
        </button>
      </div>
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
    </section>
  );
}

export default WalletHero;
