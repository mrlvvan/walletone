import './IncomeScreen.css';

/* Данные карточек по референсу: TON, USDT, Bitcoin, Ethereum, Золото, USDe.
   Метка «new» только на USDT, Bitcoin, Ethereum. */
const INCOME_ITEMS = [
  { id: 'ton', name: 'TON', rate: '3.14%', styleClass: 'ton', showNew: false },
  { id: 'usdt', name: 'USDT', rate: 'До 17.98%', styleClass: 'dollar', showNew: true },
  { id: 'bitcoin', name: 'Bitcoin', rate: '2.00%', styleClass: 'bitcoin', showNew: true },
  { id: 'ethereum', name: 'Ethereum', rate: '0.00%', styleClass: 'ethereum', showNew: true },
  { id: 'gold', name: 'Золото', rate: '3.36%', styleClass: 'gold', showNew: false },
  { id: 'usde', name: 'USDe', rate: '3.50%', styleClass: 'usde', showNew: false },
];

function renderIncomeIcon(item) {
  const key = item.styleClass || item.id;

  if (key === 'ton') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40">
        <rect width="40" height="40" fill="#0098EA" rx="20" />
        <path
          fill="#fff"
          d="M26.831 11H13.173c-2.512 0-4.103 2.709-2.84 4.899l8.43 14.61a1.43 1.43 0 0 0 2.478 0l8.431-14.61c1.262-2.187-.33-4.899-2.84-4.899zm-8.075 15.128-1.836-3.553-4.43-7.922a.774.774 0 0 1 .68-1.157h5.584V26.13zm8.754-11.477-4.428 7.926-1.836 3.551V13.494h5.583c.612 0 .973.65.68 1.157z"
        />
      </svg>
    );
  }

  if (key === 'dollar') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40">
        <rect width="40" height="40" fill="#28C281" rx="20" />
        <path
          fill="#fff"
          d="M20.014 32.05c-.739 0-1.217-.464-1.217-1.243v-1.381c-2.899-.342-4.908-1.832-5.496-3.733a2.2 2.2 0 0 1-.137-.752c0-.86.588-1.435 1.531-1.435.793 0 1.245.465 1.532 1.107.546 1.395 1.832 2.16 3.91 2.16 2.2 0 3.61-.875 3.61-2.501 0-1.381-1.259-2.092-3.35-2.584l-1.86-.438c-3.117-.71-5.181-2.488-5.181-5.072 0-3.09 2.378-4.95 5.44-5.332V9.45c0-.78.48-1.244 1.218-1.244s1.217.465 1.217 1.244v1.395c2.68.328 4.62 1.777 5.222 3.787.069.26.123.506.123.765 0 .793-.601 1.272-1.476 1.272-.793 0-1.217-.383-1.559-1.04-.615-1.435-1.682-2.132-3.514-2.132-2.091 0-3.35.93-3.35 2.393 0 1.257 1.231 2.037 3.05 2.447l1.777.41c3.514.807 5.51 2.516 5.51 5.195 0 3.364-2.68 5.168-5.783 5.51v1.354c0 .779-.479 1.244-1.217 1.244"
        />
      </svg>
    );
  }

  if (key === 'bitcoin') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
        <path fill="#F7931A" d="M39.397 24.838c-2.671 10.715-13.523 17.235-24.239 14.563C4.448 36.731-2.073 25.877.6 15.164 3.269 4.448 14.121-2.073 24.833.598c10.715 2.672 17.235 13.525 14.564 24.24" />
        <path fill="#fff" d="M28.817 17.155c.398-2.661-1.628-4.092-4.4-5.046l.9-3.606-2.195-.546-.875 3.51c-.577-.144-1.17-.28-1.759-.414l.882-3.533-2.193-.547-.9 3.604a73 73 0 0 1-1.401-.33l.002-.01-3.026-.757-.584 2.344s1.628.374 1.594.397c.889.221 1.05.81 1.023 1.276l-1.024 4.107c.061.016.14.038.228.074l-.232-.058-1.435 5.754c-.109.27-.385.675-1.006.521.022.032-1.595-.398-1.595-.398l-1.09 2.512 2.857.712c.53.134 1.051.273 1.564.404l-.908 3.647 2.192.547.9-3.608q.896.242 1.749.454l-.897 3.59 2.195.547.908-3.64c3.742.709 6.556.423 7.74-2.962.955-2.725-.047-4.297-2.016-5.322 1.434-.33 2.515-1.274 2.803-3.222zm-5.015 7.032c-.678 2.725-5.266 1.252-6.754.882l1.205-4.83c1.488.37 6.258 1.106 5.55 3.948m.68-7.071c-.62 2.479-4.439 1.22-5.677.91l1.092-4.381c1.239.309 5.229.885 4.584 3.47" />
      </svg>
    );
  }

  if (key === 'ethereum') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
        <circle cx="20" cy="20" r="20" fill="#627EEA" />
        <path fill="#fff" fillOpacity="0.6" d="M20 6v10.455l9.275 4.075L20 6Z" />
        <path fill="#fff" d="M20 6 10.725 20.53 20 16.455V6ZM20 27.235v6.765l9.3-12.98L20 27.235Z" />
        <path fill="#fff" fillOpacity="0.6" d="M20 27.235 10.725 34.02 20 33.999v-6.764ZM20 16.455 10.725 20.53 20 27.235V16.455Z" />
      </svg>
    );
  }

  if (key === 'gold') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20" fill="#D6A535" />
        <path
          fill="#fff"
          d="M14.117 6.262a.578.578 0 0 1 1.092 0l.6 1.719a.58.58 0 0 0 .336.348L17.859 9c.49.192.49.885 0 1.077l-1.715.672a.58.58 0 0 0-.334.347l-.601 1.72a.578.578 0 0 1-1.092 0l-.601-1.72a.58.58 0 0 0-.335-.347l-1.715-.672a.578.578 0 0 1 0-1.077l1.715-.671a.58.58 0 0 0 .335-.348z"
        />
        <path
          fill="#fff"
          d="M8.184 13.405a.315.315 0 0 1 .595 0l.328.937c.03.087.097.156.183.19l.934.366a.315.315 0 0 1 0 .587l-.934.366a.32.32 0 0 0-.183.19l-.328.937a.315.315 0 0 1-.595 0l-.327-.937a.32.32 0 0 0-.183-.19l-.935-.366a.315.315 0 0 1 0-.587l.935-.366a.32.32 0 0 0 .183-.19z"
        />
        <path
          fill="#F8F8F6"
          d="M21.859 12.477a1 1 0 0 1 .883-.082l7.457 2.874a1 1 0 0 1 .537.49l3.004 6.082a1 1 0 0 1-.333 1.27l-13.395 9.125a1 1 0 0 1-.955.094L6.765 27.098a1 1 0 0 1-.485-1.4l2.807-5.126a1.5 1.5 0 0 1 .53-.557zm7.77 4.923-11.133 6.922a.13.13 0 0 0-.057.123l.861 6.003a.125.125 0 0 0 .193.086l12.511-8.32a.124.124 0 0 0 .043-.158l-2.24-4.605a.125.125 0 0 0-.178-.051m-6.991-3.34a.25.25 0 0 0-.22.021l-10.546 6.53a.075.075 0 0 0 .01.131l5.379 2.354a.25.25 0 0 0 .232-.016l10.75-6.656a.125.125 0 0 0-.02-.223z"
        />
      </svg>
    );
  }

  if (key === 'usde') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
        <circle cx="20" cy="20" r="20" fill="#2c2c2e" />
        <path
          fill="#fff"
          d="M20 10c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
        />
        <path fill="#fff" d="M20 13v4h-2v-2h-2v6h2v2h6v-2h-4v-2h2c1.105 0 2-.895 2-2v-2c0-1.105-.895-2-2-2h-2zm0 4v2h2v-2h-2z" />
      </svg>
    );
  }

  return <span className="bonus-fallback-icon">{item.icon || '?'}</span>;
}

function IncomeScreen({ walletTab = 'crypto' }) {
  const isTonWallet = walletTab === 'ton';
  return (
    <div className={`income-screen-wrap${isTonWallet ? ' income-screen-wrap--ton' : ''}`}>
      <section className="income-hero">
        <div className="income-hero-icon-placeholder" aria-hidden="true">
          {/* Иконка % пока не реализована — placeholder */}
        </div>
        <h1 className="income-hero-title">Доход</h1>
        <p className="income-hero-subtitle">Получайте бонусы за криптовалюту.</p>
      </section>

      <section className="income-grid LGGuk">
        {INCOME_ITEMS.map((item) => (
          <div className="r2DGg pK3y3 bdh8O income-card" key={item.id}>
            <div className="P13QV">
              <div className="JCPzJ">
                <div className="bonus-icon-wrap">{renderIncomeIcon(item)}</div>
              </div>
              <div className="iYgED gfXvW">
                <div className="cpHhd IqPae PmUAN Se5d5 Ka5fP">{item.name}</div>
                <div className="cpHhd fv_Nl Se5d5 Ka5fP">{item.rate}</div>
              </div>
              {item.showNew && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="55"
                    fill="none"
                    viewBox="0 0 56 55"
                    preserveAspectRatio="xMidYMid meet"
                    className="Wb1nA"
                    aria-hidden="true"
                  >
                    <path
                      fill={`url(#incomeRibbon-${item.id})`}
                      d="M50.024 52.309 3.321 5.605C1.607 3.89.75 3.035.692 2.299A2 2 0 0 1 1.387.621C1.948.142 3.16.142 5.583.142h13.932c2.446 0 3.669 0 4.82.276a10 10 0 0 1 2.89 1.198c1.01.618 1.874 1.483 3.603 3.212l19.973 19.973c1.73 1.73 2.594 2.594 3.212 3.603a10 10 0 0 1 1.198 2.89c.276 1.152.276 2.375.276 4.82v13.932c0 2.423 0 3.635-.48 4.196a2 2 0 0 1-1.677.695c-.735-.058-1.592-.915-3.306-2.628"
                    />
                    <defs>
                      <linearGradient
                        id={`incomeRibbon-${item.id}`}
                        x1="4.929"
                        x2="62.558"
                        y1="-6.929"
                        y2="50.7"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6DD1FF" />
                        <stop offset="1" stopColor="#37A6FB" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="cpHhd LMb8t CF5m5 Se5d5 income-new-label">new</div>
                </>
              )}
            </div>
            <div className="gtBIz" />
          </div>
        ))}
      </section>
      <div className="section-gap" />
    </div>
  );
}

export default IncomeScreen;
