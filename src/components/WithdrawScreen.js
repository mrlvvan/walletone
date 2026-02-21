import './WithdrawScreen.css';

const CHEVRON_RIGHT = (
  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" fill="none" viewBox="0 0 7 12">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5 5-5 5" />
  </svg>
);

const ICON_P2P_EXPRESS = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none" style={{ color: 'rgb(255, 255, 255)' }}>
    <circle cx="21" cy="21" r="21" fill="rgb(214, 105, 237)" />
    <g transform="translate(7, 7)">
      <path fill="currentColor" d="M5.935 13.91a2.77 2.77 0 0 1-1.527-.44 3.24 3.24 0 0 1-1.1-1.186 3.4 3.4 0 0 1-.403-1.658 3.26 3.26 0 0 1 1.503-2.782q.69-.441 1.527-.441.844 0 1.534.441.69.435 1.092 1.17.41.729.41 1.612 0 .906-.41 1.65A3.24 3.24 0 0 1 7.47 13.47q-.69.442-1.534.442M1.69 20.576q-.822 0-1.255-.318Q0 19.938 0 19.32q0-.698.395-1.464.404-.768 1.17-1.426.767-.666 1.867-1.077 1.1-.418 2.503-.418 1.402 0 2.502.418 1.1.411 1.867 1.077.768.658 1.162 1.426.404.766.403 1.464 0 .62-.434.937t-1.247.318zm20.376-6.64a2.8 2.8 0 0 1-1.534-.441 3.26 3.26 0 0 1-1.092-1.186 3.45 3.45 0 0 1-.403-1.658A3.26 3.26 0 0 1 20.54 7.87q.69-.442 1.526-.442.845 0 1.534.442.69.433 1.093 1.17.41.728.41 1.603 0 .915-.41 1.658a3.24 3.24 0 0 1-1.093 1.194q-.689.441-1.534.441m-4.245 6.663q-.822 0-1.256-.325-.433-.318-.433-.93 0-.697.395-1.464.402-.768 1.17-1.426.766-.666 1.867-1.077 1.1-.418 2.502-.418 1.403 0 2.503.418 1.1.411 1.867 1.077.767.659 1.162 1.426.403.767.403 1.464 0 .612-.434.93-.434.325-1.255.325zm-6.625-6.384a.8.8 0 0 1-.588-.248.8.8 0 0 1-.248-.596q0-.341.248-.59a.8.8 0 0 1 .588-.247q.357 0 .597.248.248.24.248.589a.8.8 0 0 1-.248.596.8.8 0 0 1-.597.248m2.805 0a.8.8 0 0 1-.597-.248.83.83 0 0 1-.24-.596q0-.341.248-.59a.8.8 0 0 1 .589-.247q.348 0 .597.248.248.24.248.589a.8.8 0 0 1-.248.596.8.8 0 0 1-.597.248m2.797 0a.8.8 0 0 1-.589-.248.8.8 0 0 1-.248-.596q0-.341.248-.59a.8.8 0 0 1 .589-.247q.348 0 .596.248.248.24.248.589a.8.8 0 0 1-.247.596.8.8 0 0 1-.597.248" />
    </g>
  </svg>
);

const ICON_P2P_MARKET = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none" style={{ color: 'rgb(255, 255, 255)' }}>
    <circle cx="21" cy="21" r="21" fill="#3B82F6" />
    <g transform="translate(7, 7)">
      <path fill="currentColor" fillRule="evenodd" d="M25.859 9.67 23.83 4.94c-.3-.702-.45-1.053-.693-1.31a2 2 0 0 0-.771-.509C22.035 3 21.653 3 20.89 3H7.11c-.763 0-1.144 0-1.476.121a2 2 0 0 0-.772.509c-.242.257-.392.608-.693 1.31L2.142 9.67zM4 15.52c.546.2 1.135.31 1.75.31a5.06 5.06 0 0 0 2.75-.808 5.06 5.06 0 0 0 2.75.808 5.06 5.06 0 0 0 2.75-.808 5.06 5.06 0 0 0 2.75.808 5.06 5.06 0 0 0 2.75-.808 5.06 5.06 0 0 0 2.75.808c.615 0 1.205-.11 1.75-.31v6.28c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C22.48 25 21.92 25 20.8 25H7.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C4 23.48 4 22.92 4 21.8zm2 4.08c0-.56 0-.84.11-1.054a1 1 0 0 1 .436-.437C6.76 18 7.04 18 7.6 18h3.8c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437c.11.214.11.494.11 1.054v1.8c0 .56 0 .84-.11 1.054a1 1 0 0 1-.437.437C12.24 23 11.96 23 11.4 23H7.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C6 22.24 6 21.96 6 21.4zm-.25-5.1A3.75 3.75 0 0 1 2.008 11h23.984a3.75 3.75 0 0 1-6.492 2.3 3.74 3.74 0 0 1-2.75 1.2A3.74 3.74 0 0 1 14 13.3a3.74 3.74 0 0 1-2.75 1.2 3.74 3.74 0 0 1-2.75-1.2 3.74 3.74 0 0 1-2.75 1.2" clipRule="evenodd" />
    </g>
  </svg>
);

const ICON_EXTERNAL_WALLET = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
    <defs>
      <linearGradient id="external-wallet-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgb(114, 213, 253)" />
        <stop offset="100%" stopColor="rgb(42, 158, 241)" />
      </linearGradient>
    </defs>
    <circle cx="21" cy="21" r="21" fill="url(#external-wallet-bg)" />
    <g transform="translate(7, 7)">
      <path fill="#fff" d="M16.606 6c2.337 0 3.506 0 4.399.455a4.17 4.17 0 0 1 1.823 1.824q.12.236.2.503h-2.876c-1.294 0-1.942 0-2.47.155a3.83 3.83 0 0 0-2.592 2.594c-.155.528-.155 1.175-.155 2.469s0 1.941.155 2.469a3.83 3.83 0 0 0 2.593 2.593c.527.155 1.175.156 2.47.156h2.875q-.08.268-.2.503a4.17 4.17 0 0 1-1.823 1.824c-.893.455-2.062.455-4.4.455H11.18c-2.338 0-3.507 0-4.4-.455a4.18 4.18 0 0 1-1.824-1.824c-.455-.893-.455-2.062-.455-4.4V12.68c0-2.338 0-3.507.455-4.4A4.18 4.18 0 0 1 6.78 6.455C7.672 6 8.841 6 11.18 6zm4.937 4.174c1.297 0 1.947 0 2.447.241.497.24.899.64 1.138 1.138.24.5.241 1.15.241 2.447s0 1.947-.241 2.447c-.24.497-.64.899-1.138 1.138-.5.24-1.15.241-2.447.241h-1.392c-1.297 0-1.946 0-2.447-.241a2.44 2.44 0 0 1-1.138-1.138c-.24-.5-.24-1.15-.24-2.447s0-1.947.24-2.447a2.44 2.44 0 0 1 1.138-1.138c.5-.24 1.15-.241 2.447-.241zm-2.088 2.434a1.391 1.391 0 1 0 .002 2.783 1.391 1.391 0 0 0-.002-2.783" />
      <rect width="12" height="12" x="1" y="15" fill="#71D4FD" rx="6" />
      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 24v-6m0 0 2.5 2.5M7 18l-2.5 2.5" />
    </g>
  </svg>
);

function WithdrawScreen() {
  const methods = [
    {
      id: 'p2p-express',
      title: 'P2P Экспресс',
      subtitle: 'Без комиссии · Для новичков',
      icon: ICON_P2P_EXPRESS,
    },
    {
      id: 'p2p-market',
      title: 'P2P Маркет',
      subtitle: 'Без комиссии · Расширенные опции',
      icon: ICON_P2P_MARKET,
      badge: 'PRO',
    },
  ];

  const cryptoMethods = [
    {
      id: 'external',
      title: 'Внешний кошелёк или биржа',
      subtitle: 'Отправить на адрес',
      icon: ICON_EXTERNAL_WALLET,
    },
  ];

  const handleSelect = (id) => {
    // TODO: навигация на соответствующий экран
  };

  return (
    <div className="withdraw-screen">
      <h1 className="withdraw-title">Как вы хотите вывести средства?</h1>

      <section className="withdraw-section">
        <h2 className="withdraw-section-title">Наличные</h2>
        <div className="withdraw-list">
          {methods.map((item) => (
            <button
              key={item.id}
              type="button"
              className="withdraw-item"
              onClick={() => handleSelect(item.id)}
            >
              <div className="withdraw-item-icon">{item.icon}</div>
              <div className="withdraw-item-content">
                <span className="withdraw-item-title-wrap">
                  <span className="withdraw-item-title">{item.title}</span>
                  {item.badge && <span className="withdraw-item-badge">{item.badge}</span>}
                </span>
                <span className="withdraw-item-subtitle">{item.subtitle}</span>
              </div>
              <span className="withdraw-item-chevron">{CHEVRON_RIGHT}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="withdraw-section">
        <h2 className="withdraw-section-title">Криптовалюта</h2>
        <div className="withdraw-list">
          {cryptoMethods.map((item) => (
            <button
              key={item.id}
              type="button"
              className="withdraw-item"
              onClick={() => handleSelect(item.id)}
            >
              <div className="withdraw-item-icon">{item.icon}</div>
              <div className="withdraw-item-content">
                <span className="withdraw-item-title">{item.title}</span>
                <span className="withdraw-item-subtitle">{item.subtitle}</span>
              </div>
              <span className="withdraw-item-chevron">{CHEVRON_RIGHT}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default WithdrawScreen;
