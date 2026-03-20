import './OtherCryptoSelectScreen.css';

const ICON_BTC = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="none" viewBox="0 0 40 40">
    <path fill="#F7931A" d="M39.397 24.838c-2.671 10.715-13.523 17.235-24.239 14.563C4.448 36.731-2.073 25.877.6 15.164 3.269 4.448 14.121-2.073 24.833.598c10.715 2.672 17.235 13.525 14.564 24.24" />
    <path fill="#fff" d="M28.817 17.155c.398-2.661-1.628-4.092-4.4-5.046l.9-3.606-2.195-.546-.875 3.51c-.577-.144-1.17-.28-1.759-.414l.882-3.533-2.193-.547-.9 3.604a73 73 0 0 1-1.401-.33l.002-.01-3.026-.757-.584 2.344s1.628.374 1.594.397c.889.221 1.05.81 1.023 1.276l-1.024 4.107c.061.016.14.038.228.074l-.232-.058-1.435 5.754c-.109.27-.385.675-1.006.521.022.032-1.595-.398-1.595-.398l-1.09 2.512 2.857.712c.53.134 1.051.273 1.564.404l-.908 3.647 2.192.547.9-3.608q.896.242 1.749.454l-.897 3.59 2.195.547.908-3.64c3.742.709 6.556.423 7.74-2.962.955-2.725-.047-4.297-2.016-5.322 1.434-.33 2.515-1.274 2.803-3.222zm-5.015 7.032c-.678 2.725-5.266 1.252-6.754.882l1.205-4.83c1.488.37 6.258 1.106 5.55 3.948m.68-7.071c-.62 2.479-4.439 1.22-5.677.91l1.092-4.381c1.239.309 5.229.885 4.584 3.47" />
  </svg>
);

const ICON_ETH = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="none" viewBox="0 0 96 96">
    <defs>
      <clipPath id="other-crypto-eth-clip">
        <path fill="#fff" d="M0 0h96v96H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#other-crypto-eth-clip)">
      <path fill="#627EEA" fillRule="evenodd" d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48" clipRule="evenodd" />
      <path fill="#fff" d="M27.692 48.462 48 14.769l20.308 33.693-20.308 12z" />
      <path fill="#fff" d="M68.308 52.615 48 80.77 27.692 52.615l20.308 12z" />
      <path fill="#C1CCF7" d="m48 14.77 20.308 33.692L48 39.38z" />
      <path fill="#8198EE" d="M48 39.38v21.082l20.308-12z" />
      <path fill="#C1CCF7" d="m48 60.462-20.308-12L48 39.38z" />
      <path fill="#fff" d="m27.692 52.615 20.308 12V80.77z" />
      <path fill="#C1CCF7" d="M68.308 52.615 48 80.77V64.615z" />
    </g>
  </svg>
);

const ICON_SOL = (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="42" height="42" fill="none" viewBox="0 0 96 96">
    <defs>
      <linearGradient id="other-crypto-sol-a">
        <stop offset="0" stopColor="#00ffa3" />
        <stop offset="1" stopColor="#dc1fff" />
      </linearGradient>
      <linearGradient xlinkHref="#other-crypto-sol-a" id="other-crypto-sol-b" x1="71.465" x2="39.653" y1="20.975" y2="81.907" gradientUnits="userSpaceOnUse" />
      <linearGradient xlinkHref="#other-crypto-sol-a" id="other-crypto-sol-c" x1="57.555" x2="25.743" y1="13.714" y2="74.646" gradientUnits="userSpaceOnUse" />
      <linearGradient xlinkHref="#other-crypto-sol-a" id="other-crypto-sol-d" x1="64.466" x2="32.654" y1="17.321" y2="78.253" gradientUnits="userSpaceOnUse" />
    </defs>
    <path fill="#000" d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48" />
    <path fill="url(#other-crypto-sol-b)" d="M28.558 60.852c.348-.348.826-.55 1.332-.55h45.966c.84 0 1.26 1.013.666 1.607l-9.08 9.08c-.348.348-.826.55-1.332.55H20.143c-.84 0-1.26-1.013-.666-1.607z" />
    <path fill="url(#other-crypto-sol-c)" d="M28.558 26.95c.362-.347.84-.55 1.332-.55h45.966c.84 0 1.26 1.014.666 1.608l-9.08 9.08c-.348.347-.826.55-1.332.55H20.143c-.84 0-1.26-1.014-.666-1.608z" />
    <path fill="url(#other-crypto-sol-d)" d="M67.442 43.792a1.9 1.9 0 0 0-1.332-.55H20.143c-.84 0-1.26 1.014-.666 1.607l9.08 9.08c.348.348.826.55 1.332.55h45.966c.84 0 1.26-1.013.666-1.607z" />
  </svg>
);

const OTHER_CRYPTO = [
  { id: 'btc', code: 'BTC', name: 'Bitcoin', ticker: 'BTC', icon: ICON_BTC },
  { id: 'eth', code: 'ETH', name: 'Ethereum', ticker: 'ETH', icon: ICON_ETH },
  { id: 'sol', code: 'SOL', name: 'Solana', ticker: 'SOL', icon: ICON_SOL },
];

function OtherCryptoSelectScreen({ onSelect }) {
  return (
    <div className="other-crypto-select-screen">
      <div className="other-crypto-select-banner">
        Средства будут конвертированы в Toncoin по текущему курсу.
      </div>

      <div className="other-crypto-select-header-wrap">
        <div className="other-crypto-select-header">Выберите токен для пополнения</div>
      </div>

      <div className="other-crypto-select-list">
        {OTHER_CRYPTO.map((item) => (
          <button
            key={item.id}
            type="button"
            className="other-crypto-select-item"
            onClick={() => onSelect?.(item)}
          >
            <div className="other-crypto-select-icon">{item.icon}</div>
            <div className="other-crypto-select-content">
              <span className="other-crypto-select-label">{item.name}</span>
              <span className="other-crypto-select-ticker">{item.ticker}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default OtherCryptoSelectScreen;
