import './StablecoinSelectScreen.css';

const ICON_USDT = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="none" viewBox="0 0 40 40">
    <rect width="40" height="40" fill="#009393" rx="20" />
    <path fill="#fff" fillRule="evenodd" d="M20.024 21.43c3.44 0 6.314-.582 7.017-1.359-.596-.659-2.754-1.178-5.494-1.32v1.641q-.737.039-1.523.038-.786 0-1.524-.038v-1.641c-2.739.142-4.898.661-5.494 1.32.704.777 3.578 1.358 7.018 1.358zm6.111-7.727v2.26h-4.588v1.568c3.223.168 5.642.857 5.66 1.681v1.719c-.018.825-2.437 1.512-5.66 1.68v3.847H18.5v-3.847c-3.223-.168-5.64-.855-5.658-1.68v-1.719c.018-.825 2.435-1.514 5.658-1.681v-1.567h-4.588v-2.261zm-14.028-3.598h16.108c.386 0 .74.203.932.532l4.693 8.058c.242.418.17.945-.177 1.284L20.747 32.588a1.083 1.083 0 0 1-1.51 0L6.335 19.996a1.05 1.05 0 0 1-.16-1.31l5.016-8.074a1.08 1.08 0 0 1 .916-.506z" clipRule="evenodd" />
  </svg>
);

const ICON_USDC = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="none" viewBox="0 0 96 96">
    <path fill="#2775CA" d="M48 96c26.6 0 48-21.4 48-48S74.6 0 48 0 0 21.4 0 48s21.4 48 48 48" />
    <path fill="#fff" d="M61.2 55.6c0-7-4.2-9.4-12.6-10.4-6-.8-7.2-2.4-7.2-5.2s2-4.6 6-4.6c3.6 0 5.6 1.2 6.6 4.2.2.6.8 1 1.4 1h3.2c.8 0 1.4-.6 1.4-1.4V39c-.8-4.4-4.4-7.8-9-8.2V26c0-.8-.6-1.4-1.6-1.6h-3c-.8 0-1.4.6-1.6 1.6v4.6c-6 .8-9.8 4.8-9.8 9.8 0 6.6 4 9.2 12.4 10.2 5.6 1 7.4 2.2 7.4 5.4s-2.8 5.4-6.6 5.4c-5.2 0-7-2.2-7.6-5.2-.2-.8-.8-1.2-1.4-1.2h-3.4c-.8 0-1.4.6-1.4 1.4v.2c.8 5 4 8.6 10.6 9.6V71c0 .8.6 1.4 1.6 1.6h3c.8 0 1.4-.6 1.6-1.6v-4.8c6-1 10-5.2 10-10.6" />
    <path fill="#fff" d="M37.8 76.6C22.2 71 14.2 53.6 20 38.2c3-8.4 9.6-14.8 17.8-17.8.8-.4 1.2-1 1.2-2v-2.8c0-.8-.4-1.4-1.2-1.6-.2 0-.6 0-.8.2-19 6-29.4 26.2-23.4 45.2C17.2 70.6 25.8 79.2 37 82.8c.8.4 1.6 0 1.8-.8.2-.2.2-.4.2-.8v-2.8c0-.6-.6-1.4-1.2-1.8M59 14.2c-.8-.4-1.6 0-1.8.8-.2.2-.2.4-.2.8v2.8c0 .8.6 1.6 1.2 2C73.8 26.2 81.8 43.6 76 59c-3 8.4-9.6 14.8-17.8 17.8-.8.4-1.2 1-1.2 2v2.8c0 .8.4 1.4 1.2 1.6.2 0 .6 0 .8-.2 19-6 29.4-26.2 23.4-45.2C78.8 26.4 70 17.8 59 14.2" />
  </svg>
);

const STABLECOINS = [
  { id: 'usdt', code: 'USDT', name: 'USDT', icon: ICON_USDT },
  { id: 'usdc', code: 'USDC', name: 'USDC', icon: ICON_USDC },
];

function StablecoinSelectScreen({ onSelect }) {
  return (
    <div className="stablecoin-select-screen">
      <div className="stablecoin-select-banner">
        Средства поступят как USDT в сети TON по курсу 1:1.
      </div>

      <div className="stablecoin-select-header-wrap">
        <div className="stablecoin-select-header">Выберите токен для пополнения</div>
      </div>

      <div className="stablecoin-select-list">
        {STABLECOINS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="stablecoin-select-item"
            onClick={() => onSelect?.(item)}
          >
            <div className="stablecoin-select-icon">{item.icon}</div>
            <span className="stablecoin-select-label">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StablecoinSelectScreen;
