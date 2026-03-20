import { IconArbitrum } from '../svg-icons.jsx';
import './BuyCryptoNetworkScreen.css';

const ICON_USDT_HEADER = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 40 40">
    <rect width="40" height="40" fill="#009393" rx="20" />
    <path fill="#fff" fillRule="evenodd" d="M20.024 21.43c3.44 0 6.314-.582 7.017-1.359-.596-.659-2.754-1.178-5.494-1.32v1.641q-.737.039-1.523.038-.786 0-1.524-.038v-1.641c-2.739.142-4.898.661-5.494 1.32.704.777 3.578 1.358 7.018 1.358zm6.111-7.727v2.26h-4.588v1.568c3.223.168 5.642.857 5.66 1.681v1.719c-.018.825-2.437 1.512-5.66 1.68v-3.847H18.5v-3.847c-3.223-.168-5.64-.855-5.658-1.68v-1.719c.018-.825 2.435-1.514 5.658-1.681v-1.567h-4.588v-2.261z" clipRule="evenodd" />
  </svg>
);

const ICON_BSC = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" fill="#F3BA2F" rx="20" />
    <path fill="#fff" d="M12.5 17.2L20 9.7l7.5 7.5 4.4-4.4L20 1 8.1 12.9l4.4 4.3zm-4.4 5.6L20 30.3l7.5-7.5 4.4 4.4L20 39 8.1 27.1l4.4-4.3-4.4-4.4zm27.8-5.6L20 30.3 8.1 18.4l1.5-1.5L20 27.3l10.4-10.4 1.5 1.5zM20 11.2l-7.5 7.5 7.5 7.5 7.5-7.5L20 11.2z" />
  </svg>
);

const ICON_BASE = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" fill="#0052FF" rx="20" />
  </svg>
);

/* Сети для TON кошелька (Стейблкоины) — расширенный список */
const NETWORKS_TON_USDT = [
  { id: 'ton', title: 'Toncoin', subtitle: 'TON', iconCode: 'TON' },
  { id: 'sol', title: 'Solana', subtitle: 'SOL', iconCode: 'SOL' },
  { id: 'bep20', title: 'Binance Smart Chain', subtitle: 'BEP20', iconCode: 'BSC' },
  { id: 'trc20', title: 'Tron', subtitle: 'TRC20', iconCode: 'TRX' },
  { id: 'polygon', title: 'Polygon', subtitle: 'POL', iconCode: 'POL' },
  { id: 'arb', title: 'Arbitrum', subtitle: 'ARB', iconCode: 'ARB' },
  { id: 'erc20', title: 'Ethereum', subtitle: 'ERC20', iconCode: 'ETH' },
];

const NETWORKS_TON_USDC = [
  { id: 'sol', title: 'Solana', subtitle: 'SOL', iconCode: 'SOL' },
  { id: 'base', title: 'Base', subtitle: 'BASE', iconCode: 'BASE' },
  { id: 'polygon', title: 'Polygon', subtitle: 'POL', iconCode: 'POL' },
  { id: 'arb', title: 'Arbitrum', subtitle: 'ARB', iconCode: 'ARB' },
  { id: 'erc20', title: 'Ethereum', subtitle: 'ERC20', iconCode: 'ETH' },
];

/* Сети для обычного кошелька — исходный список */
const NETWORKS_DEFAULT_USDT_USDC = [
  { id: 'trc20', title: 'TRC20', subtitle: 'Tron', iconCode: 'TRX' },
  { id: 'ton', title: 'TON', subtitle: 'TON', iconCode: 'TON' },
  { id: 'sol', title: 'SOL', subtitle: 'Solana', iconCode: 'SOL' },
  { id: 'erc20', title: 'ERC20', subtitle: 'Ethereum', iconCode: 'ETH' },
];

const NETWORKS_BY_ASSET = {
  TON: [{ id: 'ton', title: 'TON', subtitle: 'TON', iconCode: 'TON' }],
  BTC: [{ id: 'btc', title: 'BTC', subtitle: 'Bitcoin', iconCode: 'BTC' }],
  ETH: [{ id: 'erc20', title: 'ERC20', subtitle: 'Ethereum', iconCode: 'ETH' }],
  SOL: [{ id: 'sol', title: 'SOL', subtitle: 'Solana', iconCode: 'SOL' }],
};

const NETWORK_CUSTOM_ICONS = {
  BSC: ICON_BSC,
  BASE: ICON_BASE,
  ARB: (props) => <IconArbitrum size={42} {...props} />,
};

/**
 * isTonWallet: true = TON кошелёк (расширенные сети USDT/USDC), false = обычный кошелёк (4 сети).
 * Определяется по walletTab === 'ton', НЕ по prevScreen — т.к. путь tonCryptoWalletTransfer → buyCryptoDeposit
 * перезаписывает prevScreen перед переходом сюда.
 */
function BuyCryptoNetworkScreen({ asset, cryptoAssets = [], onSelectNetwork, isTonWallet }) {
  const assetCode = (asset?.code || '').toUpperCase();
  let networks;
  if (assetCode === 'USDT') {
    networks = isTonWallet ? NETWORKS_TON_USDT : NETWORKS_DEFAULT_USDT_USDC;
  } else if (assetCode === 'USDC') {
    networks = isTonWallet ? NETWORKS_TON_USDC : NETWORKS_DEFAULT_USDT_USDC;
  } else {
    networks = NETWORKS_BY_ASSET[assetCode] || [{ id: assetCode.toLowerCase(), title: assetCode, subtitle: asset?.name || assetCode, iconCode: assetCode }];
  }

  const iconByCode = Object.fromEntries(
    cryptoAssets.map((item) => [String(item.code || '').toUpperCase(), item.icon])
  );

  const getNetworkIcon = (network) => {
    const custom = NETWORK_CUSTOM_ICONS[network.iconCode];
    if (custom) return typeof custom === 'function' ? custom({}) : custom;
    return iconByCode[network.iconCode] || asset?.icon || null;
  };

  return (
    <div className="buy-crypto-network-screen">
      <div className="buy-crypto-network-warning">
        Убедитесь, что вы выбрали нужную сеть. Неверный выбор может привести к утрате средств.
      </div>

      <div className="buy-crypto-network-header">
        {(assetCode === 'USDT' || assetCode === 'USDC') && isTonWallet && (
          <span className="buy-crypto-network-header-icon">
            {assetCode === 'USDT' ? ICON_USDT_HEADER : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 96 96">
                <path fill="#2775CA" d="M48 96c26.6 0 48-21.4 48-48S74.6 0 48 0 0 21.4 0 48s21.4 48 48 48" />
                <path fill="#fff" d="M61.2 55.6c0-7-4.2-9.4-12.6-10.4-6-.8-7.2-2.4-7.2-5.2s2-4.6 6-4.6c3.6 0 5.6 1.2 6.6 4.2.2.6.8 1 1.4 1h3.2c.8 0 1.4-.6 1.4-1.4V39c-.8-4.4-4.4-7.8-9-8.2V26c0-.8-.6-1.4-1.6-1.6h-3c-.8 0-1.4.6-1.6 1.6v4.6c-6 .8-9.8 4.8-9.8 9.8 0 6.6 4 9.2 12.4 10.2 5.6 1 7.4 2.2 7.4 5.4s-2.8 5.4-6.6 5.4c-5.2 0-7-2.2-7.6-5.2-.2-.8-.8-1.2-1.4-1.2h-3.4c-.8 0-1.4.6-1.4 1.4v.2c.8 5 4 8.6 10.6 9.6V71c0 .8.6 1.4 1.6 1.6h3c.8 0 1.4-.6 1.6-1.6v-4.8c6-1 10-5.2 10-10.6" />
                <path fill="#fff" d="M37.8 76.6C22.2 71 14.2 53.6 20 38.2c3-8.4 9.6-14.8 17.8-17.8.8-.4 1.2-1 1.2-2v-2.8c0-.8-.4-1.4-1.2-1.6-.2 0-.6 0-.8.2-19 6-29.4 26.2-23.4 45.2C17.2 70.6 25.8 79.2 37 82.8c.8.4 1.6 0 1.8-.8.2-.2.2-.4.2-.8v-2.8c0-.6-.6-1.4-1.2-1.8M59 14.2c-.8-.4-1.6 0-1.8.8-.2.2-.2.4-.2.8v2.8c0 .8.6 1.6 1.2 2C73.8 26.2 81.8 43.6 76 59c-3 8.4-9.6 14.8-17.8 17.8-.8.4-1.2 1-1.2 2v2.8c0 .8.4 1.4 1.2 1.6.2 0 .6 0 .8-.2 19-6 29.4-26.2 23.4-45.2C78.8 26.4 70 17.8 59 14.2" />
              </svg>
            )}
          </span>
        )}
        <span className="buy-crypto-network-title">Выберите сеть {assetCode}</span>
      </div>

      <div className="buy-crypto-network-list">
        {networks.map((network) => (
          <button
            key={network.id}
            type="button"
            className="buy-crypto-network-item"
            onClick={() => onSelectNetwork?.(network)}
          >
            <div className="buy-crypto-network-icon">{getNetworkIcon(network)}</div>
            <div className="buy-crypto-network-content">
              <span className="buy-crypto-network-name">{network.title}</span>
              <span className="buy-crypto-network-subtitle">{network.subtitle}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BuyCryptoNetworkScreen;
