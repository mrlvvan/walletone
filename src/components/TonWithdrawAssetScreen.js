import { useMemo, useState } from 'react';
import './TonWithdrawAssetScreen.css';

const SEARCH_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.5 4a6.5 6.5 0 1 0 4.036 11.627l3.612 3.612a1 1 0 0 0 1.414-1.414l-3.612-3.612A6.5 6.5 0 0 0 10.5 4m-4.5 6.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * TON-кошелёк: «Вывести» — выбор актива (поиск + «Вы выводите» + список балансов).
 */
function TonWithdrawAssetScreen({ assets = [], onSelectAsset }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return assets;
    return assets.filter((a) => {
      const name = String(a.name || '').toLowerCase();
      const code = String(a.code || '').toLowerCase();
      return name.includes(q) || code.includes(q);
    });
  }, [assets, q]);

  return (
    <div className="ton-withdraw-asset-screen">
      <label className="ton-withdraw-search">
        <span className="ton-withdraw-search-icon">{SEARCH_ICON}</span>
        <input
          type="search"
          className="ton-withdraw-search-input"
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Поиск"
        />
      </label>

      <div className="ton-withdraw-section-bar">
        <span className="ton-withdraw-section-title">Вы выводите</span>
      </div>

      <div className="ton-withdraw-list" role="list">
        {filtered.map((a) => (
          <button
            key={a.id}
            type="button"
            className="ton-withdraw-row"
            role="listitem"
            onClick={() => onSelectAsset?.(a)}
          >
            <div className="ton-withdraw-row-icon">{a.icon}</div>
            <div className="ton-withdraw-row-text">
              <div className="ton-withdraw-row-name">{a.name}</div>
              <div className="ton-withdraw-row-code">{a.code}</div>
            </div>
            <div className="ton-withdraw-row-values">
              <div className="ton-withdraw-row-fiat">{a.value}</div>
              <div className="ton-withdraw-row-amount">{a.amount}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TonWithdrawAssetScreen;
