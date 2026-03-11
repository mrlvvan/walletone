import './BuyCryptoNetworkScreen.css';

const NETWORKS_BY_ASSET = {
  USDT: [
    { id: 'trc20', title: 'TRC20', subtitle: 'Tron', iconCode: 'TRX' },
    { id: 'ton', title: 'TON', subtitle: 'TON', iconCode: 'TON' },
    { id: 'sol', title: 'SOL', subtitle: 'Solana', iconCode: 'SOL' },
    { id: 'erc20', title: 'ERC20', subtitle: 'Ethereum', iconCode: 'ETH' },
  ],
  TON: [{ id: 'ton', title: 'TON', subtitle: 'TON', iconCode: 'TON' }],
  BTC: [{ id: 'btc', title: 'BTC', subtitle: 'Bitcoin', iconCode: 'BTC' }],
  ETH: [{ id: 'erc20', title: 'ERC20', subtitle: 'Ethereum', iconCode: 'ETH' }],
};

function BuyCryptoNetworkScreen({ asset, cryptoAssets = [], onSelectNetwork }) {
  const assetCode = (asset?.code || '').toUpperCase();
  const networks = NETWORKS_BY_ASSET[assetCode] || [{ id: assetCode.toLowerCase(), title: assetCode, subtitle: asset?.name || assetCode, iconCode: assetCode }];

  const iconByCode = Object.fromEntries(
    cryptoAssets.map((item) => [String(item.code || '').toUpperCase(), item.icon])
  );

  return (
    <div className="buy-crypto-network-screen">
      <div className="buy-crypto-network-warning">
        Убедитесь, что вы выбрали нужную сеть. Неверный выбор может привести к утрате средств.
      </div>

      <div className="buy-crypto-network-title">Выберите сеть {assetCode}</div>

      <div className="buy-crypto-network-list">
        {networks.map((network) => (
          <button
            key={network.id}
            type="button"
            className="buy-crypto-network-item"
            onClick={() => onSelectNetwork?.(network)}
          >
            <div className="buy-crypto-network-icon">{iconByCode[network.iconCode] || asset?.icon || null}</div>
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
