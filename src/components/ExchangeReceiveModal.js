import { useState, useRef, useEffect } from 'react';
import './ExchangeReceiveModal.css';
import IconChangeUp from './Icons/IconChangeUp';
import IconChangeDown from './Icons/IconChangeDown';

function ExchangeReceiveModal({ cryptoAssets = [], onSelect, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  const filtered = cryptoAssets.filter(
    (a) =>
      !searchQuery.trim() ||
      (a.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.code || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSelect = (asset) => {
    onSelect?.(asset);
    onClose?.();
  };

  return (
    <div className="exchange-receive-modal-overlay" role="dialog" aria-modal="true" aria-label="Выберите валюту">
      <div className="exchange-receive-modal">
        <div className="exchange-receive-modal-header">
          <button type="button" className="exchange-receive-modal-back" onClick={onClose} aria-label="Назад">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="exchange-receive-modal-title">Вы получите</h2>
        </div>

        <div className="exchange-receive-modal-search">
          <div className="exchange-receive-search-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="exchange-receive-search-icon" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="exchange-receive-search-input"
              aria-label="Поиск"
            />
          </div>
        </div>

        <div className="exchange-receive-modal-list">
          {filtered.map((item) => {
            const changeStr = (item.change || '').trim();
            const isNegative = changeStr.startsWith('↓') || changeStr.startsWith('-');
            const changeValue = changeStr.replace(/^[-+]\s?/, '').replace(/^↓\s?/, '').replace(/^↑\s?/, '');

            return (
              <button
                key={item.id}
                type="button"
                className="exchange-receive-modal-row"
                onClick={() => handleSelect(item)}
              >
                <div className="exchange-receive-row-icon-wrap">
                  <div className={`exchange-receive-row-icon ${item.styleClass || ''}`}>{item.icon}</div>
                </div>
                <div className="exchange-receive-row-content">
                  <div className="exchange-receive-row-name">{item.name}</div>
                  <div className="exchange-receive-row-code">{item.code}</div>
                </div>
                <div className="exchange-receive-row-right">
                  <div className="exchange-receive-row-price">{item.price}</div>
                  <div className={`exchange-receive-row-change ${isNegative ? 'negative' : ''}`}>
                    <span className="exchange-receive-row-change-icon" aria-hidden="true">
                      {isNegative ? <IconChangeDown size={12} /> : <IconChangeUp size={12} />}
                    </span>
                    {changeValue}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExchangeReceiveModal;
