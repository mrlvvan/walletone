import { useRef, useState, useEffect } from 'react';
import './MarketScreen.css';
import IconProductCrypto from './Icons/IconProductCrypto';
import IconProductStocks from './Icons/IconProductStocks';
import IconProductFunds from './Icons/IconProductFunds';
import IconChangeUp from './Icons/IconChangeUp';
import IconChangeDown from './Icons/IconChangeDown';

function MarketScreen({ marketTickers, fundTickers = [], topDay, topDayFall = [], assets, searchAssets, tonAssets, onOpenAsset }) {
  const searchInputRef = useRef(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchFilterTab, setSearchFilterTab] = useState('all'); // 'all' | 'crypto' | 'stocks' | 'funds'
  const [usMarketTab, setUsMarketTab] = useState('stocks'); // 'stocks' | 'funds'
  const [topDayTab, setTopDayTab] = useState('gain'); // 'gain' | 'fall'
  const filteredSearchAssets = (searchAssets || assets || []).filter(
    (item) => searchFilterTab === 'all' || (item.category === searchFilterTab)
  );

  const openSearchWithFilter = (filter) => {
    setSearchFilterTab(filter);
    setIsSearchFocused(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setIsSearchFocused(false);
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  };

  // Управление кнопкой "Назад" в Telegram WebApp при открытии/закрытии поиска
  useEffect(() => {
    const tg = window.Telegram?.WebApp || window.telegram?.webapp;
    if (!tg) return;

    const backButton = tg.BackButton || tg.backButton;
    if (!backButton) return;

    if (isSearchFocused) {
      backButton.show();
      backButton.onClick(closeSearch);
    } else {
      backButton.hide();
      backButton.offClick(closeSearch);
    }

    return () => {
      backButton.offClick(closeSearch);
      backButton.hide();
    };
  }, [isSearchFocused]);

  const tickerRows = [];
  const fundRows = [];
  for (let i = 0; i < marketTickers.length; i += 4) {
    tickerRows.push(marketTickers.slice(i, i + 4));
  }
  for (let i = 0; i < fundTickers.length; i += 4) {
    fundRows.push(fundTickers.slice(i, i + 4));
  }

  const TickerCard = ({ item }) => {
    const isNegative = item.change.trim().startsWith('-');
    const changeValue = item.change.replace(/^[-+]/, '');
    return (
      <div className="r2DGg Z3c2A Syue2" role="button" onClick={() => onOpenAsset && onOpenAsset(item)}>
        <div className="P13QV DV0WS _0g3V">
          <div className="ticker-svg">{item.icon}</div>
          <div className="mUVUv">
            <div className="cpHhd caBg6 CF5m5">{item.code}</div>
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
    <>
      <div className={`FhO5I ${isSearchFocused ? 'search-overlay-open' : ''}`}>
        <section className="oJKLh LySHd iXSn4 KIbKh ">
          <div className="JNQMw">
            <div className="market-search-input-wrap">
              <div className="ydmxJ tf4r_ search-input-wrap ioskrug">
              <form className="pPd9Y nsMB8" action=".">
                <label className="cpHhd IqPae PmUAN Ka5fP YrFt1 DIb0V XTiUr l_jV4">
                  <div className="KKBuo">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      preserveAspectRatio="xMidYMid meet"
                      className="cqybA"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
                      />
                    </svg>
                  </div>
                  <input
                    ref={searchInputRef}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={128}
                    aria-label="Поиск"
                    type="search"
                    className="Kndc7"
                    placeholder=" "
                    onFocus={() => setIsSearchFocused(true)}
                  />
                  <div className="TlsKl">Поиск</div>
                  <div className="V2GJs" aria-hidden="true">
                    <button
                      type="button"
                      className="BSzXJ"
                      aria-label="Закрыть поиск"
                      tabIndex={-1}
                      onClick={closeSearch}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" d="m6 6 16 16" />
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" d="M6 22 22 6" />
                      </svg>
                    </button>
                  </div>
                </label>
              </form>
              </div>
            </div>

            {isSearchFocused && (
              <div className="wtAUk Rmex8" data-scroll-restoration-id="TradeSearch-all">
                <div className="qMqm9">
                  <div className="yPhAq xjd0r cJa9x AY7Xx hHy4V M3D51" dir="ltr">
                    <button data-testid="search-filter-all" type="button" className="r2DGg BDWMw BDWMw hHy4V" onClick={() => setSearchFilterTab('all')}>
                      <div className="P13QV DLQxA">
                        <div className={`yaBp6 yaBp6 ${searchFilterTab === 'all' ? 'ecfXP' : ''}`}>
                          <div className="cpHhd UBSxc CF5m5">Все</div>
                        </div>
                      </div>
                      <div className="gtBIz" />
                    </button>
                    <button data-testid="search-filter-crypto" type="button" className="r2DGg BDWMw BDWMw hHy4V" onClick={() => setSearchFilterTab('crypto')}>
                      <div className="P13QV DLQxA">
                        <div className={`yaBp6 yaBp6 ${searchFilterTab === 'crypto' ? 'ecfXP' : ''}`}>
                          <div className="cpHhd UBSxc CF5m5">Крипто</div>
                        </div>
                      </div>
                      <div className="gtBIz" />
                    </button>
                    <button data-testid="search-filter-stocks" type="button" className="r2DGg BDWMw BDWMw hHy4V" onClick={() => setSearchFilterTab('stocks')}>
                      <div className="P13QV DLQxA">
                        <div className={`yaBp6 yaBp6 ${searchFilterTab === 'stocks' ? 'ecfXP' : ''}`}>
                          <div className="cpHhd UBSxc CF5m5">Акции</div>
                        </div>
                      </div>
                      <div className="gtBIz" />
                    </button>
                    <button data-testid="search-filter-funds" type="button" className="r2DGg BDWMw BDWMw hHy4V" onClick={() => setSearchFilterTab('funds')}>
                      <div className="P13QV DLQxA">
                        <div className={`yaBp6 yaBp6 ${searchFilterTab === 'funds' ? 'ecfXP' : ''}`}>
                          <div className="cpHhd UBSxc CF5m5">Фонды</div>
                        </div>
                      </div>
                      <div className="gtBIz" />
                    </button>
                    <div className="yq9lM" style={{ width: 25, transform: 'translateX(12.24px)' }} />
                  </div>
                </div>
                <div className="DTT0W yPGCL">
                  <section className="oJKLh LySHd iXSn4 CgUOn lKYcT">
                    <div className="JNQMw">
                      <div className="Rfm73 ZR_ns umRMK kJf7o">
                        <div className="cpHhd YLSRc CF5m5 Ka5fP">Все активы</div>
                      </div>
                      <div className="ydmxJ tf4r_">
                        <div className="mjigr ODmGt LQUdc lIhZN search-results-list">
                          {filteredSearchAssets.map((item) => {
                            const changeStr = (item.change || '').trim();
                            const isNegative = changeStr.startsWith('↓') || changeStr.startsWith('-');
                            const changeValue = changeStr.replace(/^[-+]\s?/, '').replace(/^↓\s?/, '').replace(/^↑\s?/, '');

                            return (
                              <div className="tSWgK" key={item.id}>
                                <div className="r2DGg tizzh" role="button" onClick={() => onOpenAsset && onOpenAsset(item)}>
                                  <div className="P13QV dAgC8">
                                    <div className="t1CPG Bcb3I">
                                      <div className="RkvKd">
                                        <div className={`asset-icon ${item.styleClass}`}>{item.icon}</div>
                                      </div>
                                    </div>
                                    <div className="f5GTj Wv9yg">
                                      <div className="jOCse TYgZR NXXwZ">
                                        <div className="cpHhd IqPae CF5m5 Ka5fP kzP3J">
                                          <span>{item.name}</span>
                                        </div>
                                        {item.badge ? (
                                          <div className="cpHhd YLSRc PmUAN Fx5Cf Bgj6A mdnGg">
                                            <span>{item.code}</span>
                                            <div className="cpHhd LMb8t CF5m5 jJi8N VbUp4 tej97">
                                              {item.badge}
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="cpHhd YLSRc PmUAN Fx5Cf Bgj6A">{item.code}</div>
                                        )}
                                      </div>
                                      <div className="eslGw CFakS">
                                        <div className="jOCse TYgZR Gihoq">
                                          <div className="cpHhd IqPae PmUAN Ka5fP kzP3J VyspS">
                                            <span>{item.price}</span>
                                          </div>
                                          <div className="cpHhd YLSRc PmUAN Fx5Cf Bgj6A">
                                            <div
                                              className={`cpHhd YLSRc PmUAN ku6Sb G5Dxc ${
                                                isNegative ? 'pPUsT' : 'WXss8'
                                              }`}
                                            >
                                              <span className="G4GF9" aria-hidden="true">
                                                {isNegative ? <IconChangeDown size={12} /> : <IconChangeUp size={12} />}
                                              </span>
                                              {changeValue}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {!isSearchFocused && (
      <>
      <div className="market-us-row">
        <div className="market-section-header">
          <div className="Rfm73 Jn71M hCZ1A">
            <div className="cpHhd KbDJo eqZCR">Рынок США</div>
            <div className="cpHhd KbDJo eqZCR z5Bkg z5Bkg">
              <div className="cpHhd UBSxc t6rva">
                <button type="button" className="cpHhd uzQIE SqDwU hQlED" onClick={() => openSearchWithFilter('stocks')}>
                  Посмотреть все
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="market-section market-section-card">
          <div className="Ofdvj PReSx">
            <div className="Zwf9p mFYy9 IPADx" role="radiogroup">
              <div className="TsSEl TRjCi uuakV" style={{ transform: usMarketTab === 'stocks' ? 'translateX(0)' : 'translateX(100%)' }} />
              <button type="button" className={`cpHhd YLSRc CF5m5 p_KOn ${usMarketTab === 'stocks' ? 'r3qNc' : ''}`} role="radio" aria-checked={usMarketTab === 'stocks'} onClick={() => setUsMarketTab('stocks')}>
                <span className="p_KOn-inner">Акции</span>
              </button>
              <button type="button" className={`cpHhd YLSRc CF5m5 p_KOn ${usMarketTab === 'funds' ? 'r3qNc' : ''}`} role="radio" aria-checked={usMarketTab === 'funds'} onClick={() => setUsMarketTab('funds')}>
                <span className="p_KOn-inner">Фонды</span>
              </button>
            </div>
          </div>
          <div className="nR3tb">
            <div className="LxOPn okTpb">
              {(usMarketTab === 'stocks' ? tickerRows : fundRows).map((row, rowIndex) => (
                <div className="aVY7i" style={{ paddingInline: '4px' }} key={`row-${rowIndex}`}>
                  {row.map((item) => (
                    <TickerCard key={item.id} item={item} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="section-gap" aria-hidden="true" />

      <section className="market-section products-section">
        <div className="JNQMw">
          <div className="Rfm73 Jn71M hCZ1A">
            <div className="cpHhd KbDJo eqZCR section-title-subtitle">Продукты</div>
          </div>
          <div className="ydmxJ tf4r_">
            <div className="LxOPn aJFEC">
              <div className="aVY7i products-cards" style={{ paddingInline: '4px' }}>
                <div className="r2DGg Z3c2A Syue2" role="button" tabIndex={0} onClick={() => openSearchWithFilter('crypto')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSearchWithFilter('crypto'); } }}>
                  <div className="P13QV DV0WS _0g3V">
                    <div className="vilvX product-icon-crypto">
                      <div className="product-icon-svg">
                        <IconProductCrypto size={40} />
                      </div>
                    </div>
                    <div className="mUVUv">
                      <div className="cpHhd caBg6 CF5m5">Крипто</div>
                    </div>
                  </div>
                  <div className="gtBIz" />
                </div>
                <div className="r2DGg Z3c2A Syue2" role="button" tabIndex={0} onClick={() => openSearchWithFilter('stocks')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSearchWithFilter('stocks'); } }}>
                  <div className="P13QV DV0WS _0g3V">
                    <div className="vilvX product-icon-stocks">
                      <div className="product-icon-svg">
                        <IconProductStocks size={40} />
                      </div>
                    </div>
                    <div className="mUVUv">
                      <div className="cpHhd caBg6 CF5m5">Акции</div>
                    </div>
                  </div>
                  <div className="gtBIz" />
                </div>
                <div className="r2DGg Z3c2A Syue2" role="button" tabIndex={0} onClick={() => openSearchWithFilter('funds')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSearchWithFilter('funds'); } }}>
                  <div className="P13QV DV0WS _0g3V">
                    <div className="vilvX product-icon-funds">
                      <div className="product-icon-svg">
                        <IconProductFunds size={40} />
                      </div>
                    </div>
                    <div className="mUVUv">
                      <div className="cpHhd caBg6 CF5m5">Фонды</div>
                    </div>
                  </div>
                  <div className="gtBIz" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-gap" aria-hidden="true" />
      <section className="oJKLh LySHd iXSn4 CgUOn pmioA topday-section">
        <div className="JNQMw">
          <div className="Rfm73 Jn71M hCZ1A">
            <div className="cpHhd KbDJo eqZCR section-title-subtitle">Топ дня</div>
            <div className="cpHhd KbDJo eqZCR z5Bkg">
              <div className="cpHhd UBSxc t6rva">
                <button className="cpHhd uzQIE SqDwU hQlED" type="button" onClick={() => openSearchWithFilter('all')}>
                  Посмотреть все
                </button>
              </div>
            </div>
          </div>
          <div className="ydmxJ tf4r_">
            <div className="Ofdvj PReSx">
              <div className="Zwf9p mFYy9 IPADx" role="radiogroup">
                <div className="TsSEl TRjCi uuakV" style={{ transform: topDayTab === 'gain' ? 'translateX(0)' : 'translateX(100%)' }} />
                <button type="button" className={`cpHhd YLSRc CF5m5 p_KOn ${topDayTab === 'gain' ? 'r3qNc' : ''}`} role="radio" aria-checked={topDayTab === 'gain'} onClick={() => setTopDayTab('gain')}>
                  <span className="p_KOn-inner">Топ роста</span>
                </button>
                <button type="button" className={`cpHhd YLSRc CF5m5 p_KOn ${topDayTab === 'fall' ? 'r3qNc' : ''}`} role="radio" aria-checked={topDayTab === 'fall'} onClick={() => setTopDayTab('fall')}>
                  <span className="p_KOn-inner">Топ падения</span>
                </button>
              </div>
            </div>
            <div className="nR3tb">
              <div className="LxOPn okTpb">
                {(topDayTab === 'gain' ? topDay : topDayFall || []).length > 0 && Array.from({ length: Math.ceil((topDayTab === 'gain' ? topDay : topDayFall || []).length / 4) }).map((_, rowIndex) => {
                  const source = topDayTab === 'gain' ? topDay : topDayFall || [];
                  const row = source.slice(rowIndex * 4, rowIndex * 4 + 4);
                  return (
                    <div className="aVY7i" style={{ paddingInline: '4px' }} key={`top-${topDayTab}-row-${rowIndex}`}>
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

      <div className="section-gap" aria-hidden="true" />
      <section className="oJKLh LySHd iXSn4 CgUOn lKYcT allassets-section">
        <div className="JNQMw">
          <div className="Rfm73 Jn71M hCZ1A">
            <div className="cpHhd KbDJo eqZCR section-title-subtitle">Все активы</div>
            <div className="cpHhd KbDJo eqZCR z5Bkg">
              <div className="cpHhd UBSxc t6rva">
                <button className="cpHhd uzQIE SqDwU hQlED" type="button" onClick={() => openSearchWithFilter('all')}>
                  Посмотреть все
                </button>
              </div>
            </div>
          </div>
          <div className="ydmxJ tf4r_">
            <div className="mjigr ODmGt LQUdc lIhZN">
              {assets.map((item) => {
                const isNegative = item.change.trim().startsWith('↓') || item.change.trim().startsWith('-');
                const changeValue = item.change.replace(/^[-+]\s?/, '').replace(/^↓\s?/, '').replace(/^↑\s?/, '');

                return (
                  <div className="tSWgK" key={item.id}>
                    <div className="r2DGg tizzh" role="button" onClick={() => onOpenAsset && onOpenAsset(item)}>
                      <div className="P13QV dAgC8">
                        <div className="t1CPG Bcb3I">
                          <div className="RkvKd">
                            <div className={`asset-icon ${item.styleClass}`}>{item.icon}</div>
                          </div>
                        </div>
                        <div className="f5GTj Wv9yg">
                          <div className="jOCse TYgZR NXXwZ">
                            <div className="cpHhd IqPae CF5m5 Ka5fP kzP3J">
                              <span>{item.name}</span>
                            </div>
                            {item.badge ? (
                              <div className="cpHhd YLSRc PmUAN Fx5Cf Bgj6A mdnGg">
                                <span>{item.code}</span>
                                <div className="cpHhd LMb8t CF5m5 jJi8N VbUp4 tej97">
                                  {item.badge}
                                </div>
                              </div>
                            ) : (
                              <div className="cpHhd YLSRc PmUAN Fx5Cf Bgj6A">{item.code}</div>
                            )}
                          </div>
                          <div className="eslGw CFakS">
                            <div className="jOCse TYgZR Gihoq">
                              <div className="cpHhd IqPae PmUAN Ka5fP kzP3J VyspS">
                                <span>{item.price}</span>
                              </div>
                              <div className="cpHhd YLSRc PmUAN Fx5Cf Bgj6A">
                                <div
                                  className={`cpHhd YLSRc PmUAN ku6Sb G5Dxc ${
                                    isNegative ? 'pPUsT' : 'WXss8'
                                  }`}
                                >
                                  <span className="G4GF9" aria-hidden="true">
                                    {isNegative ? <IconChangeDown size={12} /> : <IconChangeUp size={12} />}
                                  </span>
                                  {changeValue}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="section-gap" aria-hidden="true" />
      <section className="oJKLh LySHd iXSn4 CgUOn pmioA ton-section">
        <div className="JNQMw">
          <div className="Rfm73 Jn71M hCZ1A">
            <div className="cpHhd KbDJo eqZCR section-title-subtitle">Активы TON</div>
          </div>
          <div className="ydmxJ tf4r_">
            <div className="nR3tb">
              <div style={{ overflow: 'hidden', position: 'relative', opacity: 1, height: 'auto' }}>
                <div className="LxOPn okTpb">
                  {Array.from({ length: Math.ceil(tonAssets.length / 4) }).map((_, rowIndex) => {
                    const row = tonAssets.slice(rowIndex * 4, rowIndex * 4 + 4);

                    return (
                      <div className="aVY7i" style={{ paddingInline: '4px' }} key={`ton-row-${rowIndex}`}>
                        {row.map((item) => {
                          const isNegative =
                            item.change.trim().startsWith('↓') || item.change.trim().startsWith('-');
                          const changeValue = item.change
                            .replace(/^[-+]\s?/, '')
                            .replace(/^↓\s?/, '')
                            .replace(/^↑\s?/, '');

                          return (
                            <div className="r2DGg Z3c2A Syue2" key={item.id} role="button" onClick={() => onOpenAsset && onOpenAsset(item)}>
                              <div className="P13QV DV0WS _0g3V">
                                <div className="ticker-svg">{item.icon}</div>
                                <div className="mUVUv">
                                  <div className="cpHhd caBg6 CF5m5">{item.code}</div>
                                  <div className="cpHhd YLSRc PmUAN">
                                    <div
                                      className={`cpHhd YLSRc PmUAN ku6Sb G5Dxc ${
                                        isNegative ? 'pPUsT' : 'WXss8'
                                      }`}
                                    >
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
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      <div className="section-gap" aria-hidden="true" />
      <div className="section-gap" />
      <div className="section-gap" />
      <div className="section-gap" />
      <div className="section-gap" />
      <div className="section-gap" />
      <div className="section-gap" />
        </>
      )}
    </>
  );
}

export default MarketScreen;
