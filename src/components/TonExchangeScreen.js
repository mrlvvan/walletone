import { useState, useMemo } from 'react';
import './ExchangeScreen.css';
import './TonExchangeScreen.css';
import './MarketScreen.css';
import { useRates } from '../context/RatesContext';
import IconChangeUp from './Icons/IconChangeUp';
import IconChangeDown from './Icons/IconChangeDown';
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
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" fill="none" viewBox="0 18 16 28" aria-hidden="true">
    <path fill="currentColor" d="m7.031 44.672 4.297-10.547c.344-.828.672-1.656.672-2.437 0-.782-.328-1.625-.672-2.438L7.031 18.688c-.281-.688-.89-1.141-1.593-1.141-1.141 0-1.954.844-1.954 1.89 0 .563.313 1.297.547 1.829l4.203 10.422-4.203 10.421c-.234.532-.547 1.25-.547 1.813 0 1.062.813 1.89 1.954 1.906.703 0 1.312-.469 1.593-1.156" />
  </svg>
);

const CURRENCY_ICONS = { USDT: ICON_USDT, TON: ICON_TON };

const ICON_SWAP = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12.474 10.19a.744.744 0 0 1-.05-.995l.05-.057 3.647-3.646a.744.744 0 0 1 1.052 0l3.647 3.646a.744.744 0 0 1-1.051 1.052L17.39 7.812v9.675a.745.745 0 0 1-1.483.076l-.004-.076V7.812l-2.378 2.378-.057.05a.744.744 0 0 1-.995-.05ZM3.18 14.866a.744.744 0 0 1 1.05-1.052l2.379 2.378V6.517a.745.745 0 0 1 1.483-.076l.004.076v9.675l2.378-2.378.056-.05a.744.744 0 0 1 1.046 1.045l-.05.057-3.648 3.646a.744.744 0 0 1-1.052 0z" />
  </svg>
);

function TonExchangeScreen({
  marketTickers = [],
  fundTickers = [],
  mainTokens = [],
  topDay = [],
  allTokensForExchange = [],
  cryptoAssets = [],
  onOpenAsset,
  onNavigateToDeposit,
  onNavigateToExchange,
}) {
  const { convert } = useRates();
  const [payAmount, setPayAmount] = useState('');
  const [payAsset, setPayAsset] = useState({ id: 'ton', code: 'TON', name: 'Toncoin', icon: ICON_TON });
  const [receiveAsset, setReceiveAsset] = useState({ id: 'usdt', code: 'USDT', name: 'Доллары', icon: ICON_USDT });
  const [showPayPicker, setShowPayPicker] = useState(false);
  const [showReceivePicker, setShowReceivePicker] = useState(false);

  const payCurrency = payAsset?.code || 'TON';
  const receiveCurrency = receiveAsset?.code || 'USDT';

  /* «Вы меняете» — только TON с балансом (скрин 1) */
  const payPickerAssets = useMemo(() => {
    const tonFromCrypto = (cryptoAssets || []).find((a) => String(a?.code || '').toUpperCase() === 'TON');
    const tonAsset = {
      ...(tonFromCrypto || { id: 'ton', code: 'TON', name: 'Toncoin', icon: ICON_TON }),
      balanceRub: '0,57 ₽',
      balanceCrypto: '0,0052 TON',
    };
    return [tonAsset];
  }, [cryptoAssets]);

  /* «Вы получите» — Ваши токены (TON) + Все токены (с name и price) */
  const receivePickerSections = useMemo(() => {
    const tonFromCrypto = (cryptoAssets || []).find((a) => String(a?.code || '').toUpperCase() === 'TON');
    const yourTon = {
      ...(tonFromCrypto || { id: 'ton', code: 'TON', name: 'Toncoin', icon: ICON_TON }),
      balanceRub: '0,57 ₽',
      balanceCrypto: '0,005 TON',
    };
    const allTokens = (allTokensForExchange || []).length > 0
      ? allTokensForExchange
      : (() => {
          const seen = new Set();
          return []
            .concat(mainTokens || [], marketTickers || [], fundTickers || [], topDay || [])
            .filter((item) => {
              const key = (item?.id || item?.code || '').toLowerCase();
              if (!key || seen.has(key)) return false;
              seen.add(key);
              return true;
            })
            .map((item) => ({
              ...item,
              name: item.name || (item.code || '').replace(/x$/i, '') || item.code,
              price: item.price || '—',
            }));
        })();
    return [
      { title: 'Ваши токены', items: [yourTon], showBalance: true },
      { title: 'Все токены', items: allTokens, showBalance: false },
    ];
  }, [cryptoAssets, allTokensForExchange, mainTokens, marketTickers, fundTickers, topDay]);

  const parseRubPrice = (value) => {
    const normalized = String(value || '').replace(/[^\d,.\-]/g, '').replace(/\s/g, '').replace(',', '.');
    const num = parseFloat(normalized);
    return Number.isFinite(num) ? num : null;
  };
  const formatAmount = (num) => {
    if (!Number.isFinite(num) || num <= 0) return '';
    if (num >= 1000) return num.toFixed(2).replace(/\.?0+$/, '');
    if (num >= 1) return num.toFixed(4).replace(/\.?0+$/, '');
    if (num >= 0.01) return num.toFixed(6).replace(/\.?0+$/, '');
    return num.toFixed(8).replace(/\.?0+$/, '');
  };
  const convertByAssetPrice = (amount, fromAsset, toAsset) => {
    const amountNum = parseFloat(String(amount || '').replace(',', '.'));
    if (!Number.isFinite(amountNum) || amountNum <= 0) return '';
    const fromPriceRub = parseRubPrice(fromAsset?.price);
    const toPriceRub = parseRubPrice(toAsset?.price);
    if (!fromPriceRub || !toPriceRub) return '';
    return formatAmount((amountNum * fromPriceRub) / toPriceRub);
  };
  const receiveAmount =
    convert(payAmount, payCurrency, receiveCurrency) ||
    convertByAssetPrice(payAmount, payAsset, receiveAsset);

  const payPriceRub = parseRubPrice(payAsset?.price);
  const receivePriceRub = parseRubPrice(receiveAsset?.price);
  const payAmountNum = parseFloat(String(payAmount || '').replace(',', '.')) || 0;
  const receiveAmountNum = parseFloat(String(receiveAmount || '').replace(',', '.')) || 0;
  const payRubValue = payPriceRub && payAmountNum > 0 ? payAmountNum * payPriceRub : 0;
  const receiveRubValue = receivePriceRub && receiveAmountNum > 0 ? receiveAmountNum * receivePriceRub : 0;

  const formatRub = (val) => {
    if (!val || val <= 0) return '0,00 ₽';
    if (val >= 1000) return val.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, ' ') + ' ₽';
    return val.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₽';
  };

  const handleSwap = () => {
    setPayAsset(receiveAsset);
    setReceiveAsset(payAsset);
    setPayAmount(receiveAmount);
  };

  const stocksFundsItems = [...marketTickers, ...fundTickers].slice(0, 8);

  const TickerCard = ({ item }) => {
    const isNegative = (item.change || '').trim().startsWith('-') || (item.change || '').trim().startsWith('↓');
    const changeValue = (item.change || '').replace(/^[-+]\s?/, '').replace(/^↓\s?/, '').replace(/^↑\s?/, '');
    const code = item.code || item.name;
    return (
      <div className="r2DGg Z3c2A Syue2" role="button" onClick={() => onOpenAsset && onOpenAsset(item)}>
        <div className="P13QV DV0WS _0g3V">
          <div className="ticker-svg">{item.icon}</div>
          <div className="mUVUv">
            <div className="cpHhd caBg6 CF5m5">{code}</div>
            <div className="cpHhd YLSRc PmUAN">
              <div className={`cpHhd YLSRc PmUAN ku6Sb G5Dxc ${isNegative ? 'pPUsT' : 'WXss8'}`}>
                <span className="G4GF9" aria-hidden="true">
                  {isNegative ? <IconChangeDown size={12} /> : <IconChangeUp size={12} />}
                </span>
                {changeValue}
              </div>
            </div>
          </div>
        </div>
        <div className="gtBIz" />
      </div>
    );
  };

  return (
    <div className="ton-exchange-screen">
      <div className="ton-exchange-form-block">
        <div className="ton-exchange-form">
          <div className="exchange-row exchange-row-pay">
            <div className="exchange-row-header">
              <span className="exchange-row-label">Вы меняете</span>
            </div>
            <div
              className="exchange-row-input-wrap"
              role="button"
              tabIndex={0}
              onClick={() => onNavigateToExchange?.({ payAmount, payAsset, receiveAsset })}
              onKeyDown={(e) => e.key === 'Enter' && onNavigateToExchange?.({ payAmount, payAsset, receiveAsset })}
            >
              <div className="ton-exchange-left-col">
                <input
                  type="text"
                  className="exchange-input"
                  placeholder="0"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  onFocus={() => onNavigateToExchange?.({ payAmount, payAsset, receiveAsset })}
                  inputMode="decimal"
                />
                <div className="exchange-amount-rub">{formatRub(payRubValue)}</div>
              </div>
              <div className="ton-exchange-currency-col">
                <button type="button" className="exchange-currency-btn" onClick={(e) => { e.stopPropagation(); setShowPayPicker(true); }}>
                  <span className={`exchange-row-icon exchange-row-icon--${payCurrency === 'USDT' ? 'green' : 'blue'}`}>
                    {payAsset?.icon || CURRENCY_ICONS[payCurrency]}
                  </span>
                  <span className="exchange-currency-name">{payCurrency}</span>
                  <span className="exchange-currency-chevron">{CHEVRON}</span>
                </button>
                <div className="exchange-balance-wrap">
                  <span className="exchange-balance-value">0,0052 {payCurrency}</span>
                  <span
                    className="exchange-balance-link"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); onNavigateToDeposit?.(); }}
                    onKeyDown={(e) => e.key === 'Enter' && onNavigateToDeposit?.()}
                  >
                    Макс.
                  </span>
                </div>
              </div>
            </div>
          </div>

        <div className="exchange-divider">
          <button type="button" className="exchange-swap-btn" onClick={handleSwap} aria-label="Поменять местами">
            {ICON_SWAP}
          </button>
        </div>

        <div className="exchange-row exchange-row-receive">
          <div className="exchange-row-header">
            <span className="exchange-row-label">Вы получите</span>
          </div>
          <div
            className="exchange-row-input-wrap"
            role="button"
            tabIndex={0}
            onClick={() => onNavigateToExchange?.({ payAmount, payAsset, receiveAsset })}
            onKeyDown={(e) => e.key === 'Enter' && onNavigateToExchange?.({ payAmount, payAsset, receiveAsset })}
          >
            <div className="ton-exchange-left-col">
              <input
                type="text"
                className="exchange-input"
                placeholder="0"
                value={receiveAmount}
                readOnly
                inputMode="decimal"
              />
              <div className="exchange-amount-rub">{formatRub(receiveRubValue)}</div>
            </div>
            <div className="ton-exchange-currency-col">
              <button type="button" className="exchange-currency-btn" onClick={(e) => { e.stopPropagation(); setShowReceivePicker(true); }}>
                <span className={`exchange-row-icon exchange-row-icon--${receiveCurrency === 'USDT' ? 'green' : 'blue'}`}>
                  {receiveAsset?.icon || CURRENCY_ICONS[receiveCurrency]}
                </span>
                <span className="exchange-currency-name">{receiveCurrency}</span>
                <span className="exchange-currency-chevron">{CHEVRON}</span>
              </button>
              <div className="exchange-balance-wrap">
                <span className="exchange-balance-value">0 {receiveCurrency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="ton-exchange-sections">
        {stocksFundsItems.length > 0 && (
          <>
            <div className="section-gap" aria-hidden="true" />
            <div className="market-us-row">
              <div className="market-section-header">
                <div className="Rfm73 Jn71M hCZ1A">
                  <div className="cpHhd KbDJo eqZCR">Акции и фонды</div>
                  <div className="cpHhd KbDJo eqZCR z5Bkg">
                    <button type="button" className="cpHhd uzQIE SqDwU hQlED">
                      Посмотреть все
                    </button>
                  </div>
                </div>
              </div>
              <section className="market-section market-section-card">
                <div className="nR3tb">
                  <div className="LxOPn okTpb">
                    {Array.from({ length: Math.ceil(stocksFundsItems.length / 4) }).map((_, rowIndex) => {
                      const row = stocksFundsItems.slice(rowIndex * 4, rowIndex * 4 + 4);
                      return (
                        <div className="aVY7i" style={{ paddingInline: '4px' }} key={`sf-row-${rowIndex}`}>
                          {row.map((item) => (
                            <TickerCard key={item.id} item={item} />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {mainTokens.length > 0 && (
          <>
            <div className="section-gap" aria-hidden="true" />
            <section className="oJKLh LySHd iXSn4 CgUOn pmioA ton-exchange-main-tokens">
              <div className="JNQMw">
                <div className="Rfm73 Jn71M hCZ1A">
                  <div className="cpHhd KbDJo eqZCR section-title-subtitle">Основные токены</div>
                </div>
                <div className="ydmxJ tf4r_">
                  <div className="nR3tb">
                    <div className="LxOPn okTpb">
                      {Array.from({ length: Math.ceil(mainTokens.length / 4) }).map((_, rowIndex) => {
                        const row = mainTokens.slice(rowIndex * 4, rowIndex * 4 + 4);
                        return (
                          <div className="aVY7i" style={{ paddingInline: '4px' }} key={`mt-row-${rowIndex}`}>
                            {row.map((item) => (
                              <TickerCard key={item.id} item={item} />
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {topDay.length > 0 && (
          <>
            <div className="section-gap" aria-hidden="true" />
            <section className="oJKLh LySHd iXSn4 CgUOn pmioA ton-exchange-top-trades">
              <div className="JNQMw">
                <div className="Rfm73 Jn71M hCZ1A">
                  <div className="cpHhd KbDJo eqZCR section-title-subtitle">Топ торгов</div>
                  <div className="cpHhd KbDJo eqZCR z5Bkg">
                    <button type="button" className="cpHhd uzQIE SqDwU hQlED">
                      Посмотреть все
                    </button>
                  </div>
                </div>
                <div className="ydmxJ tf4r_">
                  <div className="nR3tb">
                    <div className="LxOPn okTpb">
                      {Array.from({ length: Math.ceil(topDay.slice(0, 8).length / 4) }).map((_, rowIndex) => {
                        const row = topDay.slice(0, 8).slice(rowIndex * 4, rowIndex * 4 + 4);
                        return (
                          <div className="aVY7i" style={{ paddingInline: '4px' }} key={`tt-row-${rowIndex}`}>
                            {row.map((item) => (
                              <TickerCard key={item.id} item={item} />
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <div className="section-gap" aria-hidden="true" />

      {showPayPicker && (
        <ExchangeCurrencyPicker
          customSections={[{ title: 'Вы меняете', items: payPickerAssets }]}
          searchPlaceholder="Поиск по тикеру или названию"
          onSelect={(asset) => {
            setPayAsset(asset);
            setShowPayPicker(false);
          }}
          onClose={() => setShowPayPicker(false)}
        />
      )}

      {showReceivePicker && (
        <ExchangeCurrencyPicker
          customSections={receivePickerSections.map(({ title, items, showBalance }) => ({ title, items, showBalance }))}
          searchPlaceholder="Поиск по тикеру или названию"
          onSelect={(asset) => {
            setReceiveAsset(asset);
            setShowReceivePicker(false);
          }}
          onClose={() => setShowReceivePicker(false)}
        />
      )}
    </div>
  );
}

export default TonExchangeScreen;
