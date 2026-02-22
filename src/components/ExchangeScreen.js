import { useState, useEffect } from 'react';
import './ExchangeScreen.css';
import { useRates } from '../context/RatesContext';
import { IconSwap } from './Icons';
import ExchangeCurrencyPicker from './ExchangeCurrencyPicker';

const ICON_USDT = (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" fill="#28C281" rx="20" />
    <path fill="#fff" d="M20.014 32.05c-.739 0-1.217-.464-1.217-1.243v-1.381c-2.899-.342-4.908-1.832-5.496-3.733a2.2 2.2 0 0 1-.137-.752c0-.86.588-1.435 1.531-1.435.793 0 1.245.465 1.532 1.107.546 1.395 1.832 2.16 3.91 2.16 2.2 0 3.61-.875 3.61-2.501 0-1.381-1.259-2.092-3.35-2.584l-1.86-.438c-3.117-.71-5.181-2.488-5.181-5.072 0-3.09 2.378-4.95 5.44-5.332V9.45c0-.78.48-1.244 1.218-1.244s1.217.465 1.217 1.244v1.395c2.68.328 4.62 1.777 5.222 3.787.069.26.123.506.123.765 0 .793-.601 1.272-1.476 1.272-.793 0-1.217-.383-1.559-1.04-.615-1.435-1.682-2.132-3.514-2.132-2.091 0-3.35.93-3.35 2.393 0 1.257 1.231 2.037 3.05 2.447l1.777.41c3.514.807 5.51 2.516 5.51 5.195 0 3.364-2.68 5.168-5.783 5.51v1.354c0 .779-.479 1.244-1.217 1.244" />
  </svg>
);

const ICON_TON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" fill="#0098EA" rx="20" />
    <path fill="#fff" d="M26.831 11H13.173c-2.512 0-4.103 2.709-2.84 4.899l8.43 14.61a1.43 1.43 0 0 0 2.478 0l8.431-14.61c1.262-2.187-.33-4.899-2.84-4.899zm-8.075 15.128-1.836-3.553-4.43-7.922a.774.774 0 0 1 .68-1.157h5.584V26.13zm8.754-11.477-4.428 7.926-1.836 3.551V13.494h5.583c.612 0 .973.65.68 1.157z" />
  </svg>
);

const CHEVRON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="m4 2 4 4-4 4" />
  </svg>
);

const CURRENCY_ICONS = {
  USDT: ICON_USDT,
  TON: ICON_TON,
};

function ExchangeScreen({ onNavigateToDeposit, onBack, cryptoAssets = [] }) {
  const { convert } = useRates();
  const [payAmount, setPayAmount] = useState('');
  const [payCurrency, setPayCurrency] = useState('USDT');
  const [receiveAsset, setReceiveAsset] = useState({ id: 'ton', code: 'TON', name: 'Toncoin', icon: ICON_TON });
  const [showReceivePicker, setShowReceivePicker] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp || window.telegram?.webapp;
    const backButton = tg?.BackButton || tg?.backButton;
    if (!backButton || showReceivePicker) return;
    const handleBack = () => onBack?.();
    backButton.show();
    backButton.onClick(handleBack);
    return () => {
      backButton.offClick(handleBack);
      backButton.hide();
    };
  }, [showReceivePicker, onBack]);

  useEffect(() => {
    if (cryptoAssets.length > 0) {
      setReceiveAsset((prev) => {
        const found = cryptoAssets.find((a) => a.code === prev?.code);
        return found || prev;
      });
    }
  }, [cryptoAssets]);

  const receiveCurrency = receiveAsset?.code || 'TON';
  const receiveAmount = convert(payAmount, payCurrency, receiveCurrency);

  const handleSwap = () => {
    const newPay = receiveCurrency;
    const newReceiveCode = payCurrency;
    const newReceiveAsset =
      cryptoAssets.find((a) => a.code === newReceiveCode) ||
      (newReceiveCode === 'USDT'
        ? { id: 'usdt', code: 'USDT', name: 'Доллары', icon: ICON_USDT }
        : { id: 'ton', code: 'TON', name: 'Toncoin', icon: ICON_TON });
    setPayCurrency(newPay);
    setReceiveAsset(newReceiveAsset);
    setPayAmount(receiveAmount);
  };

  const handleSelectReceive = (asset) => {
    setReceiveAsset(asset);
    setShowReceivePicker(false);
  };

  return (
    <div className="exchange-screen">
      <div className="exchange-form">
        <div className="exchange-row exchange-row-pay">
          <div className="exchange-row-header">
            <span className="exchange-row-label">
              <span className={`exchange-row-icon exchange-row-icon--${payCurrency === 'USDT' ? 'green' : 'blue'}`}>
                {CURRENCY_ICONS[payCurrency]}
              </span>
              Вы платите
            </span>
            <div className="exchange-balance-wrap">
              <span
                className="exchange-balance-link"
                role="button"
                tabIndex={0}
                onClick={() => onNavigateToDeposit?.()}
                onKeyDown={(e) => e.key === 'Enter' && onNavigateToDeposit?.()}
              >
                Пополнить
              </span>
              <span className="exchange-balance-value"> · 0 {payCurrency}</span>
            </div>
          </div>
          <div className="exchange-row-input-wrap">
            <input
              type="text"
              className="exchange-input"
              placeholder="0"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              inputMode="decimal"
            />
            <button type="button" className="exchange-currency-btn">
              {payCurrency}
              <span className="exchange-currency-chevron">{CHEVRON}</span>
            </button>
          </div>
        </div>

        <div className="exchange-divider">
          <button type="button" className="exchange-swap-btn" onClick={handleSwap} aria-label="Поменять местами">
            <IconSwap size={24} />
          </button>
        </div>

        <div className="exchange-row exchange-row-receive">
          <div className="exchange-row-header">
            <span className="exchange-row-label">
              <span className={`exchange-row-icon exchange-row-icon--${receiveCurrency === 'USDT' ? 'green' : 'blue'}`}>
                {receiveAsset?.icon || CURRENCY_ICONS[receiveCurrency]}
              </span>
              Вы получите
            </span>
          </div>
          <div className="exchange-row-input-wrap">
            <input
              type="text"
              className="exchange-input"
              placeholder="0"
              value={receiveAmount}
              readOnly
              inputMode="decimal"
            />
            <button
              type="button"
              className="exchange-currency-btn"
              onClick={() => setShowReceivePicker(true)}
            >
              {receiveCurrency}
              <span className="exchange-currency-chevron">{CHEVRON}</span>
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="exchange-submit-btn"
        disabled={!payAmount || parseFloat(String(payAmount).replace(',', '.')) <= 0}
      >
        Обменять
      </button>

      {showReceivePicker && (
        <ExchangeCurrencyPicker
          cryptoAssets={cryptoAssets}
          onSelect={handleSelectReceive}
          onClose={() => setShowReceivePicker(false)}
        />
      )}
    </div>
  );
}

export default ExchangeScreen;
