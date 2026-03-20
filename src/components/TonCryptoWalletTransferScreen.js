import { useState } from 'react';
import './TonCryptoWalletTransferScreen.css';

const ICON_TON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" fill="#0098EA" rx="20" />
    <path fill="#fff" d="M26.831 11H13.173c-2.512 0-4.103 2.709-2.84 4.899l8.43 14.61a1.43 1.43 0 0 0 2.478 0l8.431-14.61c1.262-2.187-.33-4.899-2.84-4.899zm-8.075 15.128-1.836-3.553-4.43-7.922a.774.774 0 0 1 .68-1.157h5.584V26.13zm8.754-11.477-4.428 7.926-1.836 3.551V13.494h5.583c.612 0 .973.65.68 1.157z" />
  </svg>
);

const ICON_WALLET = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm4 4h8v2H8v-2z" />
  </svg>
);

const ICON_SWAP = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12.474 10.19a.744.744 0 0 1-.05-.995l.05-.057 3.647-3.646a.744.744 0 0 1 1.052 0l3.647 3.646a.744.744 0 0 1-1.051 1.052L17.39 7.812v9.675a.745.745 0 0 1-1.483.076l-.004-.076V7.812l-2.378 2.378-.057.05a.744.744 0 0 1-.995-.05ZM3.18 14.866a.744.744 0 0 1 1.05-1.052l2.379 2.378V6.517a.745.745 0 0 1 1.483-.076l.004.076v9.675l2.378-2.378.056-.05a.744.744 0 0 1 1.046 1.045l-.05.057-3.648 3.646a.744.744 0 0 1-1.052 0z" />
  </svg>
);

const TON_RUB_RATE = '105,73';

function TonCryptoWalletTransferScreen({ onSelectAsset, onTopUp }) {
  const [amount, setAmount] = useState('0');
  const [selectedAsset] = useState({ code: 'TON', name: 'Toncoin', icon: ICON_TON });
  const balance = '0';
  const numAmount = parseFloat(String(amount).replace(',', '.')) || 0;
  const hasBalance = numAmount > 0;
  const isNextDisabled = !hasBalance;

  return (
    <div className="ton-crypto-wallet-transfer-screen">
      <div className="ton-crypto-wallet-transfer-header">
        <span className="ton-crypto-wallet-transfer-badge">
          <span className="ton-crypto-wallet-transfer-badge-icon">{ICON_WALLET}</span>
          Ваш TON Кошелёк
        </span>
      </div>

      <div className="ton-crypto-wallet-transfer-balance">
        <div className="ton-crypto-wallet-transfer-amount-wrap">
          <input
            type="text"
            inputMode="decimal"
            className="ton-crypto-wallet-transfer-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9,.]/g, ''))}
            placeholder="0"
            aria-label="Сумма в TON"
          />
          <span className="ton-crypto-wallet-transfer-currency"> TON</span>
        </div>
        <div className="ton-crypto-wallet-transfer-rate">
          <span>1 TON ≈ {TON_RUB_RATE} RUB</span>
          <button type="button" className="ton-crypto-wallet-transfer-swap" aria-label="Обмен">
            {ICON_SWAP}
          </button>
        </div>
      </div>

      <div className="ton-crypto-wallet-transfer-bar">
        <div className="ton-crypto-wallet-transfer-bar-icon">{ICON_TON}</div>
        <div className="ton-crypto-wallet-transfer-bar-content">
          <div className="ton-crypto-wallet-transfer-bar-balance">Баланс: {balance} TON</div>
          <button
            type="button"
            className="ton-crypto-wallet-transfer-select-asset"
            onClick={() => onSelectAsset?.()}
          >
            Выбрать актив &gt;
          </button>
        </div>
        <button
          type="button"
          className="ton-crypto-wallet-transfer-topup"
          onClick={() => onTopUp?.()}
        >
          Пополнить
        </button>
      </div>

      <div className="ton-crypto-wallet-transfer-footer">
        <button
          type="button"
          className="ton-crypto-wallet-transfer-next"
          disabled={isNextDisabled}
        >
          ДАЛЕЕ
        </button>
      </div>
    </div>
  );
}

export default TonCryptoWalletTransferScreen;
