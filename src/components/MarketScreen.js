import { useRef, useState, useEffect } from 'react';
import PromoSlider from './PromoSlider';
import './MarketScreen.css';

function MarketScreen({ promoSlides, marketTickers, fundTickers = [], topDay, topDayFall = [], assets, searchAssets, tonAssets, onOpenAsset }) {
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
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    const backButton = tg.backButton;
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

  return (
    <>
      <div className={`FhO5I ${isSearchFocused ? 'search-overlay-open' : ''}`}>
        <section className="oJKLh LySHd iXSn4 KIbKh">
          <div className="JNQMw">
            <div className="ydmxJ tf4r_" style={{ borderRadius: 0, overflow: 'initial' }}>
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
                                                {isNegative ? (
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 18" preserveAspectRatio="xMidYMid meet">
                                                    <path fill="currentColor" d="M6 3.263a.576.576 0 0 1 .593.586v7.302l-.073 1.802-.38-.132 2.226-2.469 1.047-1.018a.6.6 0 0 1 .41-.161.54.54 0 0 1 .41.169.57.57 0 0 1 .162.41q0 .234-.184.432l-3.772 3.78a.58.58 0 0 1-.439.204.58.58 0 0 1-.44-.205l-3.77-3.779a.62.62 0 0 1-.184-.432.57.57 0 0 1 .162-.41.54.54 0 0 1 .41-.169.6.6 0 0 1 .41.161l1.047 1.018 2.22 2.469-.374.132-.073-1.802V3.849A.576.576 0 0 1 6 3.263" />
                                                  </svg>
                                                ) : (
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 18" preserveAspectRatio="xMidYMid meet">
                                                    <path fill="currentColor" d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z" />
                                                  </svg>
                                                )}
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
      <section className="market-section">
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
        <div className="Ofdvj PReSx">
          <div className="Zwf9p mFYy9 IPADx" role="radiogroup" style={{ width: '388px' }}>
            <div
              className="TsSEl TRjCi uuakV"
              style={{
                transform: usMarketTab === 'stocks' ? 'translateX(0)' : 'translateX(190px)',
                width: '190px',
              }}
            />
            <button
              type="button"
              className={`cpHhd YLSRc CF5m5 p_KOn ${usMarketTab === 'stocks' ? 'r3qNc' : ''}`}
              role="radio"
              aria-checked={usMarketTab === 'stocks'}
              onClick={() => setUsMarketTab('stocks')}
            >
              <div className="SNkiP">Акции</div>
              <div aria-hidden="true" className="_BP0C">
                Акции
              </div>
            </button>
            <button
              type="button"
              className={`cpHhd YLSRc CF5m5 p_KOn ${usMarketTab === 'funds' ? 'r3qNc' : ''}`}
              role="radio"
              aria-checked={usMarketTab === 'funds'}
              onClick={() => setUsMarketTab('funds')}
            >
              <div className="SNkiP">Фонды</div>
              <div aria-hidden="true" className="_BP0C">
                Фонды
              </div>
            </button>
          </div>
        </div>
        <div className="nR3tb">
          <div className="LxOPn okTpb">
            {(usMarketTab === 'stocks' ? tickerRows : fundRows).map((row, rowIndex) => (
              <div className="aVY7i" style={{ paddingInline: '4px' }} key={`row-${rowIndex}`}>
                {row.map((item) => {
                  const isNegative = item.change.trim().startsWith('-');
                  const changeValue = item.change.replace(/^[-+]/, '');

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
                                {isNegative ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 12 18"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M6 3.263a.576.576 0 0 1 .593.586v7.302l-.073 1.802-.38-.132 2.226-2.469 1.047-1.018a.6.6 0 0 1 .41-.161.54.54 0 0 1 .41.169.57.57 0 0 1 .162.41q0 .234-.184.432l-3.772 3.78a.58.58 0 0 1-.439.204.58.58 0 0 1-.44-.205l-3.77-3.779a.62.62 0 0 1-.184-.432.57.57 0 0 1 .162-.41.54.54 0 0 1 .41-.169.6.6 0 0 1 .41.161l1.047 1.018 2.22 2.469-.374.132-.073-1.802V3.849A.576.576 0 0 1 6 3.263"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 12 18"
                                    preserveAspectRatio="xMidYMid meet"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z"
                                    />
                                  </svg>
                                )}
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
            ))}
          </div>
        </div>
      </section>
      <div className="section-gap" aria-hidden="true" />
      <PromoSlider slides={promoSlides} />
      <div className="section-gap" aria-hidden="true" />

      <section className="market-section">
        <div className="JNQMw">
          <div className="Rfm73 Jn71M hCZ1A">
            <div className="cpHhd KbDJo eqZCR section-title-subtitle">Продукты</div>
          </div>
          <div className="ydmxJ tf4r_">
            <div className="LxOPn aJFEC">
              <div className="aVY7i" style={{ paddingInline: '4px' }}>
                <div className="r2DGg Z3c2A Syue2" role="button" tabIndex={0} onClick={() => openSearchWithFilter('crypto')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSearchWithFilter('crypto'); } }}>
                  <div className="P13QV DV0WS _0g3V">
                    <div className="vilvX product-icon-crypto">
                      <div className="product-icon-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                          <path fill="url(#product_crypto_a)" stroke="url(#product_crypto_b)" strokeLinejoin="round" strokeWidth="0.8" d="M18.234 34.241c6.55 0 11.861-2.525 11.861-5.64v-3.165H6.372V28.6c0 3.116 5.311 5.641 11.862 5.641Z" />
                          <ellipse cx="18.234" cy="25.436" fill="url(#product_crypto_c)" stroke="url(#product_crypto_d)" strokeWidth="0.8" rx="11.861" ry="5.641" />
                          <path fill="url(#product_crypto_e)" stroke="url(#product_crypto_f)" strokeLinejoin="round" strokeWidth="0.8" d="M18.234 31.078c6.55 0 11.861-2.526 11.861-5.641v-3.164H6.372v3.164c0 3.115 5.311 5.64 11.862 5.64Z" />
                          <path stroke="#803222" strokeLinecap="round" strokeWidth="0.8" d="M6.372 25.436c0 2.307 2.911 4.29 7.08 5.165" />
                          <ellipse cx="18.234" cy="22.356" fill="url(#product_crypto_g)" stroke="url(#product_crypto_h)" strokeWidth="0.8" rx="11.861" ry="5.641" />
                          <path stroke="#FFAE00" strokeLinecap="round" strokeWidth="0.8" d="M6.372 22.356c0 3.116 5.311 5.641 11.862 5.641 3.077 0 5.881-.557 7.99-1.471" />
                          <path stroke="#FFE4AA" strokeLinecap="round" strokeWidth="0.8" d="M18.234 27.997c-3.634 0-6.887-.777-9.063-2.001" />
                          <ellipse cx="20.285" cy="20.771" fill="url(#product_crypto_i)" opacity="0.6" rx="9.809" ry="4.665" />
                          <path fill="url(#product_crypto_j)" stroke="url(#product_crypto_k)" strokeLinejoin="round" strokeWidth="0.8" d="M20.545 20.982c6.328 1.695 12.11.63 12.917-2.38l.82-3.055-22.915-6.14-.82 3.056c-.806 3.01 3.67 6.823 9.998 8.519Z" />
                          <ellipse cx="22.825" cy="12.477" fill="url(#product_crypto_l)" stroke="url(#product_crypto_m)" strokeWidth="0.8" rx="11.861" ry="5.641" transform="rotate(15 22.825 12.477)" />
                          <path stroke="#FFAE00" strokeLinecap="round" strokeWidth="0.8" d="M11.367 9.407c-.807 3.009 3.67 6.823 9.997 8.518 2.973.797 5.825.984 8.098.647" />
                          <path stroke="#FFF8D8" strokeLinecap="round" strokeWidth="0.8" d="M13.16 9.488c-.81 1.144.582 3.644 5.6 5.911m3.444 1.191c.666.225 2.622.63 4.782.675" opacity="0.75" />
                          <path stroke="#803222" strokeLinecap="round" strokeWidth="0.6" d="M18.234 34.2c-6.551 0-11.862-2.526-11.862-5.642" />
                          <defs>
                            <linearGradient id="product_crypto_a" x1="30.401" x2="6.493" y1="26.578" y2="26.524" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#F9C23A" />
                              <stop offset="0.266" stopColor="#FCDC6F" />
                              <stop offset="1" stopColor="#D98819" />
                            </linearGradient>
                            <linearGradient id="product_crypto_b" x1="12.959" x2="18.234" y1="30.38" y2="34.241" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#9B4736" />
                              <stop offset="1" stopColor="#D28256" />
                            </linearGradient>
                            <linearGradient id="product_crypto_d" x1="18.234" x2="18.234" y1="19.795" y2="31.077" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#C07512" />
                              <stop offset="1" stopColor="#ED8A05" />
                            </linearGradient>
                            <linearGradient id="product_crypto_e" x1="30.401" x2="6.493" y1="23.415" y2="23.361" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#F9C23A" />
                              <stop offset="0.266" stopColor="#FCDC6F" />
                              <stop offset="1" stopColor="#D98819" />
                            </linearGradient>
                            <linearGradient id="product_crypto_f" x1="12.959" x2="18.234" y1="27.217" y2="31.078" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#9B4736" />
                              <stop offset="1" stopColor="#D28256" />
                            </linearGradient>
                            <linearGradient id="product_crypto_g" x1="11.9" x2="15.145" y1="26.956" y2="18.049" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#FCDC6F" />
                              <stop offset="0.356" stopColor="#F9C23A" />
                              <stop offset="1" stopColor="#D98819" />
                            </linearGradient>
                            <linearGradient id="product_crypto_h" x1="15.777" x2="13.125" y1="17.866" y2="26.726" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#B06400" />
                              <stop offset="0.255" stopColor="#C27611" />
                              <stop offset="1" stopColor="#FF9200" />
                            </linearGradient>
                            <linearGradient id="product_crypto_i" x1="21.68" x2="20.285" y1="20.211" y2="25.437" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#A3503B" />
                              <stop offset="1" stopColor="#A3503B" stopOpacity="0.5" />
                            </linearGradient>
                            <linearGradient id="product_crypto_j" x1="34.281" x2="11.201" y1="16.729" y2="10.489" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#F9C23A" />
                              <stop offset="0.266" stopColor="#FCDC6F" />
                              <stop offset="1" stopColor="#D98819" />
                            </linearGradient>
                            <linearGradient id="product_crypto_k" x1="17.553" x2="20.545" y1="14.448" y2="20.982" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#9B4736" />
                              <stop offset="1" stopColor="#D28256" />
                            </linearGradient>
                            <linearGradient id="product_crypto_l" x1="16.491" x2="30.73" y1="17.076" y2="7.131" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#FCDC6F" />
                              <stop offset="0.356" stopColor="#F9C23A" />
                              <stop offset="1" stopColor="#D98819" />
                            </linearGradient>
                            <linearGradient id="product_crypto_m" x1="18.604" x2="17.716" y1="9.402" y2="16.846" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#C27611" />
                              <stop offset="1" stopColor="#FF9200" />
                            </linearGradient>
                            <radialGradient id="product_crypto_c" cx="0" cy="0" r="1" gradientTransform="matrix(12.13516 -18.82502 39.49579 25.46013 12.033 29.85)" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#FFE27B" />
                              <stop offset="0.272" stopColor="#EAB222" />
                              <stop offset="0.484" stopColor="#EEAE0D" />
                              <stop offset="0.656" stopColor="#FFD66C" />
                              <stop offset="0.818" stopColor="#EEAE0D" />
                              <stop offset="1" stopColor="#F90" />
                            </radialGradient>
                          </defs>
                        </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                          <path fill="url(#product_stocks_p0)" d="M33.537 8.715c1.487-.398 2.849.963 2.45 2.45l-2.78 10.371c-.398 1.487-2.256 1.985-3.345.897L27.68 20.25l-6.044 6.043a2.02 2.02 0 0 1-2.829.001L14.211 21.7l-6.793 6.794a2 2 0 0 1-2.829-2.829l8.207-8.207c.78-.728 2.057-.774 2.833.002l4.591 4.591 4.63-4.629-2.58-2.58c-1.09-1.09-.59-2.948.896-3.346z" />
                          <path fill="url(#product_stocks_p1)" d="M33.431 10.66a.5.5 0 0 1 .613.612l-2.466 9.202a.5.5 0 0 1-.836.224l-2.64-2.64-7.352 7.352a.75.75 0 0 1-1.06 0l-5.479-5.48-7.677 7.679a.75.75 0 0 1-1.06-1.06l8.206-8.208c.302-.264.765-.298 1.065.001l5.475 5.476 6.822-6.82-3.037-3.037a.5.5 0 0 1 .224-.835z" />
                          <path fill="#CEEFFF" d="M32.503 10.51a.4.4 0 0 1 .206.773l-7.583 2.027a.4.4 0 0 1-.207-.773z" />
                          <path fill="url(#product_stocks_p2)" fillRule="evenodd" d="M33.432 8.326c1.785-.478 3.417 1.155 2.939 2.94l-2.779 10.371c-.478 1.785-2.709 2.382-4.015 1.076l-1.9-1.9-5.755 5.754a2.4 2.4 0 0 1-3.395 0l-4.313-4.313-6.51 6.511a2.4 2.4 0 1 1-3.394-3.393l8.217-8.217c.939-.876 2.446-.93 3.388.012l4.308 4.307 4.059-4.056-2.297-2.297c-1.306-1.306-.71-3.537 1.075-4.016zm2.166 2.732A1.6 1.6 0 0 0 33.64 9.1l-10.372 2.779a1.6 1.6 0 0 0-.717 2.676l2.581 2.582a.4.4 0 0 1 0 .566l-4.625 4.622a.4.4 0 0 1-.565 0l-4.592-4.59c-.61-.612-1.625-.601-2.276.006l-8.197 8.197a1.6 1.6 0 0 0-.001 2.263 1.6 1.6 0 0 0 2.263 0l6.794-6.794a.43.43 0 0 1 .284-.117.4.4 0 0 1 .282.117L19.092 26a1.6 1.6 0 0 0 2.264 0l6.037-6.038a.4.4 0 0 1 .567 0l2.182 2.184c.911.862 2.355.487 2.678-.717z" clipRule="evenodd" />
                          <path fill="#AAE2FF" d="M12.527 17.155c.939-.876 2.446-.929 3.388.012l4.24 4.24a.4.4 0 0 1-.565.565l-4.24-4.238c-.612-.612-1.625-.6-2.276.006a.4.4 0 0 1-.547-.585" />
                          <path fill="#AAE2FF" d="M36.372 11.266a.401.401 0 0 1-.774-.207c.321-1.198-.794-2.235-1.959-1.96l-10.372 2.78a1.6 1.6 0 0 0-.716 2.676.4.4 0 0 1-.565.566c-1.307-1.306-.71-3.537 1.074-4.015l10.372-2.78c1.747-.398 3.424 1.133 2.94 2.94" />
                          <path fill="#105EAC" d="M13.354 21.983a.4.4 0 1 1 .566.566l-6.216 6.216a2.4 2.4 0 0 1-3.211.165l-.183-.165a2.4 2.4 0 0 1 0-3.394.4.4 0 0 1 .566.566A1.6 1.6 0 0 0 7.138 28.2z" />
                          <path fill="#105EAC" d="M27.676 19.846c.106 0 .209.042.284.117l2.182 2.183c.871.871 2.36.473 2.678-.716a.4.4 0 0 1 .772.207c-.478 1.784-2.709 2.381-4.015 1.076l-1.902-1.902-2.735 2.737a.4.4 0 0 1-.565-.567l3.018-3.018a.44.44 0 0 1 .283-.117" />
                          <path fill="#F896B2" d="M26.24 30.423c-.44-.158-.44-.796 0-.954l1.594-.572a.5.5 0 0 0 .295-.293l.62-1.625a.487.487 0 0 1 .916 0l.62 1.625a.5.5 0 0 0 .295.293l1.594.572c.44.158.44.796 0 .954l-1.594.572a.5.5 0 0 0-.295.293l-.62 1.625a.487.487 0 0 1-.916 0l-.62-1.625a.5.5 0 0 0-.295-.293z" />
                          <path fill="#E54D78" fillRule="evenodd" d="M28.376 26.838a.887.887 0 0 1 1.663 0l.62 1.625a.1.1 0 0 0 .057.059l1.594.572c.792.284.792 1.422 0 1.707l-1.594.572a.1.1 0 0 0-.058.059l-.619 1.625a.887.887 0 0 1-1.663 0l-.62-1.625a.1.1 0 0 0-.058-.059l-1.593-.572c-.793-.285-.793-1.423 0-1.707l1.593-.572a.1.1 0 0 0 .058-.059zm.783.235a.1.1 0 0 0-.036.05l-.62 1.625a.9.9 0 0 1-.534.527l-1.594.572a.1.1 0 0 0-.047.035.12.12 0 0 0-.017.065q.001.041.017.066a.1.1 0 0 0 .047.034l1.594.573a.9.9 0 0 1 .534.527l.62 1.625a.1.1 0 0 0 .036.05q.02.013.048.013a.1.1 0 0 0 .048-.014.1.1 0 0 0 .036-.05l.62-1.624a.9.9 0 0 1 .535-.527l1.593-.572a.1.1 0 0 0 .047-.035.12.12 0 0 0 0-.131.1.1 0 0 0-.047-.035l-1.593-.572a.9.9 0 0 1-.535-.527l-.62-1.626a.1.1 0 0 0-.036-.049.1.1 0 0 0-.048-.013.1.1 0 0 0-.048.013" clipRule="evenodd" />
                          <path fill="#FCDC6F" d="M7.408 10.5a.5.5 0 0 1 0-.941l1.608-.577a.5.5 0 0 0 .299-.293l.61-1.602a.5.5 0 0 1 .935 0l.611 1.602a.5.5 0 0 0 .298.293l1.608.577a.5.5 0 0 1 0 .941l-1.608.578a.5.5 0 0 0-.298.292l-.611 1.602a.5.5 0 0 1-.934 0l-.611-1.602a.5.5 0 0 0-.299-.292z" />
                          <path fill="#FFAE00" fillRule="evenodd" d="M9.551 6.944c.295-.773 1.388-.772 1.683 0l.61 1.602c.01.027.033.049.06.059l1.608.577c.795.285.795 1.409 0 1.694l-1.608.577a.1.1 0 0 0-.06.059l-.61 1.602c-.295.773-1.388.773-1.683 0l-.61-1.602a.1.1 0 0 0-.06-.059l-1.608-.577c-.794-.285-.794-1.409 0-1.694l1.608-.577a.1.1 0 0 0 .06-.059zm.841.22a.1.1 0 0 0-.056.016.1.1 0 0 0-.037.049L9.69 8.83a.9.9 0 0 1-.538.527l-1.607.577a.1.1 0 0 0-.051.036.1.1 0 0 0-.016.058.1.1 0 0 0 .016.058.1.1 0 0 0 .05.036l1.608.578a.9.9 0 0 1 .537.526l.611 1.602c.01.027.024.04.037.048a.11.11 0 0 0 .114 0 .1.1 0 0 0 .036-.048l.611-1.602a.9.9 0 0 1 .537-.527l1.608-.577a.1.1 0 0 0 .05-.036.1.1 0 0 0 .016-.058.1.1 0 0 0-.016-.058.1.1 0 0 0-.05-.036l-1.608-.577a.9.9 0 0 1-.537-.527l-.611-1.602a.1.1 0 0 0-.036-.05.1.1 0 0 0-.058-.015" clipRule="evenodd" />
                          <defs>
                            <linearGradient id="product_stocks_p0" x1="25.22" x2="19.775" y1="8.393" y2="28.685" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#C3EAFF" />
                              <stop offset="0.4" stopColor="#60BFEF" />
                              <stop offset="1" stopColor="#0094FE" />
                            </linearGradient>
                            <linearGradient id="product_stocks_p1" x1="15.637" x2="26.544" y1="5.315" y2="24.139" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#fff" />
                              <stop offset="1" stopColor="#fff" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="product_stocks_p2" x1="20.031" x2="15.888" y1="29.47" y2="12.041" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#0067D8" />
                              <stop offset="0.49" stopColor="#0098EA" />
                              <stop offset="1" stopColor="#C6EBFF" />
                            </linearGradient>
                          </defs>
                        </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                          <path fill="url(#product_funds_p0)" d="m30.338 10.817-9.194 9.193-9.195-9.195a12.96 12.96 0 0 1 9.193-3.81 12.96 12.96 0 0 1 9.196 3.812" />
                          <path fill="url(#product_funds_p1)" d="M21.142 6.605a13.36 13.36 0 0 1 9.479 3.93.4.4 0 0 1 0 .565l-9.193 9.193a.4.4 0 0 1-.567 0l-9.195-9.195a.4.4 0 0 1 0-.566 13.36 13.36 0 0 1 9.476-3.927m0 .801a12.55 12.55 0 0 0-8.62 3.415l8.622 8.623 8.621-8.62a12.55 12.55 0 0 0-8.623-3.418" />
                          <path fill="#FFCFF0" d="M21.142 6.605a.4.4 0 0 1 0 .801c-3.48 0-6.63 1.41-8.91 3.692a.401.401 0 0 1-.566-.566 13.36 13.36 0 0 1 9.476-3.927" />
                          <path fill="url(#product_funds_p2)" d="m30.338 10.818-9.194 9.194 9.19 9.189a12.96 12.96 0 0 0 3.808-9.194c0-3.588-1.454-6.836-3.804-9.189" />
                          <path fill="url(#product_funds_p3)" d="M33.742 20.008c0-3.334-1.297-6.363-3.411-8.617l-8.621 8.62 8.616 8.617a12.55 12.55 0 0 0 3.416-8.62m.8 0c0 3.7-1.501 7.05-3.926 9.475a.4.4 0 0 1-.566 0l-9.189-9.188a.4.4 0 0 1 0-.567l9.193-9.193c.17-.137.402-.165.567 0a13.36 13.36 0 0 1 3.92 9.473" />
                          <path fill="url(#product_funds_p4)" d="M8.14 20.006c0 7.18 5.82 13 13 13a12.96 12.96 0 0 0 9.191-3.807l-9.189-9.189z" />
                          <path fill="url(#product_funds_p5)" d="M21.142 19.61a.44.44 0 0 1 .283.117l9.189 9.189c.15.15.15.416 0 .566a13.36 13.36 0 0 1-9.474 3.923c-7.4 0-13.4-5.999-13.4-13.4 0-.211.188-.4.4-.4zm-12.595.796c.211 6.774 5.769 12.2 12.593 12.2a12.55 12.55 0 0 0 8.619-3.414l-8.784-8.783z" />
                          <path fill="#003D7A" d="M8.928 24.486a.4.4 0 0 1 .521.222c1.864 4.63 6.398 7.898 11.693 7.898a.4.4 0 0 1 0 .8c-5.633 0-10.454-3.477-12.435-8.4a.4.4 0 0 1 .221-.52" />
                          <path fill="#fff" d="M22.349 8.862a.4.4 0 0 0 .349.445 10.31 10.31 0 0 1 8.719 7.57.4.4 0 1 0 .772-.207c-1.209-4.512-5.027-7.626-9.395-8.157a.4.4 0 0 0-.445.349" opacity="0.5" />
                          <path fill="#105EAC" d="M19.983 31.07a.4.4 0 0 0-.349-.446 10.315 10.315 0 0 1-8.72-7.57.4.4 0 1 0-.772.208c1.21 4.511 5.028 7.626 9.395 8.157a.4.4 0 0 0 .446-.35" opacity="0.5" />
                          <path fill="url(#product_funds_p6)" d="m2.14 17.777 13.002.004-9.195-9.195a12.96 12.96 0 0 0-3.807 9.191" />
                          <path fill="#FFF8D8" d="M6.107 10.784a.4.4 0 0 1 .566-.016l4.486 4.244a.4.4 0 0 1-.55.58L6.124 11.35a.4.4 0 0 1-.017-.566" opacity="0.75" />
                          <path fill="url(#product_funds_p7)" d="m6.23 8.303 9.195 9.195c.246.246.066.683-.283.684L2.14 18.177a.4.4 0 0 1-.4-.4c0-3.7 1.5-7.05 3.924-9.474.168-.139.401-.164.565 0m-.277.855a12.55 12.55 0 0 0-3.406 8.219l11.628.003z" />
                          <path fill="#FFBF69" d="m6.231 8.303 3.913 3.914a.4.4 0 0 1-.565.565L5.954 9.158a12.6 12.6 0 0 0-2.331 3.504.4.4 0 1 1-.73-.325 13.4 13.4 0 0 1 2.772-4.034c.17-.138.401-.165.566 0" />
                          <defs>
                            <linearGradient id="product_funds_p0" x1="21.143" x2="21.143" y1="20.01" y2="7.006" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#DD2A5D" />
                              <stop offset="0.5" stopColor="#FF749C" />
                              <stop offset="1" stopColor="#FFB8E9" />
                            </linearGradient>
                            <linearGradient id="product_funds_p1" x1="21.143" x2="23.07" y1="19.408" y2="8.327" gradientUnits="userSpaceOnUse">
                              <stop offset="0" stopColor="#D41F52" />
                              <stop offset="1" stopColor="#FF99B6" />
                            </linearGradient>
                            <linearGradient id="product_funds_p2" x1="28.164" x2="28.126" y1="29.201" y2="10.818" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#764EF0" />
                              <stop offset="0.5" stopColor="#9877FF" />
                              <stop offset="1" stopColor="#C9B7FF" />
                            </linearGradient>
                            <linearGradient id="product_funds_p3" x1="25.28" x2="29.864" y1="23.998" y2="11.442" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#5A24CD" />
                              <stop offset="0.498" stopColor="#815FEB" />
                              <stop offset="1" stopColor="#AE8BFF" />
                            </linearGradient>
                            <linearGradient id="product_funds_p4" x1="21.187" x2="17.798" y1="15.732" y2="30.574" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#C4EAFF" />
                              <stop offset="0.504" stopColor="#60BFEF" />
                              <stop offset="1" stopColor="#0094FE" />
                            </linearGradient>
                            <linearGradient id="product_funds_p5" x1="14.395" x2="16.614" y1="30.055" y2="15.166" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#0067D8" />
                              <stop offset="0.49" stopColor="#0098EA" />
                              <stop offset="1" stopColor="#C6EBFF" />
                            </linearGradient>
                            <linearGradient id="product_funds_p6" x1="6.617" x2="11.567" y1="10.205" y2="20.428" gradientUnits="userSpaceOnUse">
                              <stop offset="0.062" stopColor="#FCDC6F" />
                              <stop offset="1" stopColor="#D98819" />
                            </linearGradient>
                            <linearGradient id="product_funds_p7" x1="9.522" x2="3.281" y1="17.781" y2="10.42" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#C27611" />
                              <stop offset="1" stopColor="#FF9200" />
                            </linearGradient>
                          </defs>
                        </svg>
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
      <section className="oJKLh LySHd iXSn4 CgUOn pmioA">
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
              <div className="Zwf9p mFYy9 IPADx" role="radiogroup" style={{ width: '388px' }}>
                <div
                  className="TsSEl TRjCi uuakV"
                  style={{
                    transform: topDayTab === 'gain' ? 'translateX(0)' : 'translateX(190px)',
                    width: '190px',
                  }}
                />
                <button
                  type="button"
                  className={`cpHhd YLSRc CF5m5 p_KOn ${topDayTab === 'gain' ? 'r3qNc' : ''}`}
                  role="radio"
                  aria-checked={topDayTab === 'gain'}
                  onClick={() => setTopDayTab('gain')}
                >
                  <div className="SNkiP">Топ роста</div>
                  <div className="_BP0C" aria-hidden="true">
                    Топ роста
                  </div>
                </button>
                <button
                  type="button"
                  className={`cpHhd YLSRc CF5m5 p_KOn ${topDayTab === 'fall' ? 'r3qNc' : ''}`}
                  role="radio"
                  aria-checked={topDayTab === 'fall'}
                  onClick={() => setTopDayTab('fall')}
                >
                  <div className="SNkiP">Топ падения</div>
                  <div className="_BP0C" aria-hidden="true">
                    Топ падения
                  </div>
                </button>
              </div>
            </div>

            <div className="nR3tb">
              <div className="LxOPn okTpb">
                {(topDayTab === 'gain' ? topDay : topDayFall).length > 0 && Array.from({ length: Math.ceil((topDayTab === 'gain' ? topDay : topDayFall).length / 4) }).map((_, rowIndex) => {
                  const source = topDayTab === 'gain' ? topDay : topDayFall;
                  const row = source.slice(rowIndex * 4, rowIndex * 4 + 4);

                  return (
                    <div className="aVY7i" style={{ paddingInline: '4px' }} key={`top-${topDayTab}-row-${rowIndex}`}>
                      {row.map((item) => {
                        const isNegative = item.change.trim().startsWith('-');
                        const changeValue = item.change.replace(/^[-+]/, '');

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
                                      {isNegative ? (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="12"
                                          height="16"
                                          fill="none"
                                          viewBox="0 0 12 18"
                                          preserveAspectRatio="xMidYMid meet"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M6 3.263a.576.576 0 0 1 .593.586v7.302l-.073 1.802-.38-.132 2.226-2.469 1.047-1.018a.6.6 0 0 1 .41-.161.54.54 0 0 1 .41.169.57.57 0 0 1 .162.41q0 .234-.184.432l-3.772 3.78a.58.58 0 0 1-.439.204.58.58 0 0 1-.44-.205l-3.77-3.779a.62.62 0 0 1-.184-.432.57.57 0 0 1 .162-.41.54.54 0 0 1 .41-.169.6.6 0 0 1 .41.161l1.047 1.018 2.22 2.469-.374.132-.073-1.802V3.849A.576.576 0 0 1 6 3.263"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="12"
                                          height="16"
                                          fill="none"
                                          viewBox="0 0 12 18"
                                          preserveAspectRatio="xMidYMid meet"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z"
                                          />
                                        </svg>
                                      )}
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
      </section>

      <div className="section-gap" aria-hidden="true" />
      <section className="oJKLh LySHd iXSn4 CgUOn lKYcT">
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
                                    {isNegative ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 12 18"
                                        preserveAspectRatio="xMidYMid meet"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M6 3.263a.576.576 0 0 1 .593.586v7.302l-.073 1.802-.38-.132 2.226-2.469 1.047-1.018a.6.6 0 0 1 .41-.161.54.54 0 0 1 .41.169.57.57 0 0 1 .162.41q0 .234-.184.432l-3.772 3.78a.58.58 0 0 1-.439.204.58.58 0 0 1-.44-.205l-3.77-3.779a.62.62 0 0 1-.184-.432.57.57 0 0 1 .162-.41.54.54 0 0 1 .41-.169.6.6 0 0 1 .41.161l1.047 1.018 2.22 2.469-.374.132-.073-1.802V3.849A.576.576 0 0 1 6 3.263"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 12 18"
                                        preserveAspectRatio="xMidYMid meet"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z"
                                        />
                                      </svg>
                                    )}
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
      <section className="oJKLh LySHd iXSn4 CgUOn pmioA">
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
                                <div style={{ willChange: 'auto', opacity: 1 }}>{item.icon}</div>
                                <div className="mUVUv">
                                  <div className="cpHhd caBg6 CF5m5">{item.code}</div>
                                  <div className="cpHhd YLSRc PmUAN">
                                    <div
                                      className={`cpHhd YLSRc PmUAN ku6Sb G5Dxc ${
                                        isNegative ? 'pPUsT' : 'WXss8'
                                      }`}
                                    >
                                      <span className="G4GF9" aria-hidden="true">
                                        {isNegative ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="16"
                                            fill="none"
                                            viewBox="0 0 12 18"
                                            preserveAspectRatio="xMidYMid meet"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M6 3.263a.576.576 0 0 1 .593.586v7.302l-.073 1.802-.38-.132 2.226-2.469 1.047-1.018a.6.6 0 0 1 .41-.161.54.54 0 0 1 .41.169.57.57 0 0 1 .162.41q0 .234-.184.432l-3.772 3.78a.58.58 0 0 1-.439.204.58.58 0 0 1-.44-.205l-3.77-3.779a.62.62 0 0 1-.184-.432.57.57 0 0 1 .162-.41.54.54 0 0 1 .41-.169.6.6 0 0 1 .41.161l1.047 1.018 2.22 2.469-.374.132-.073-1.802V3.849A.576.576 0 0 1 6 3.263"
                                            />
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="16"
                                            fill="none"
                                            viewBox="0 0 12 18"
                                            preserveAspectRatio="xMidYMid meet"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M6 14.168a.576.576 0 0 0 .593-.585V6.28l-.073-1.8-.38.131L8.365 7.08l1.047 1.018a.6.6 0 0 0 .41.161.54.54 0 0 0 .41-.169.57.57 0 0 0 .162-.41q0-.234-.184-.432L6.44 3.467A.58.58 0 0 0 6 3.264a.58.58 0 0 0-.44.205L1.79 7.248a.62.62 0 0 0-.184.431.57.57 0 0 0 .162.41.54.54 0 0 0 .41.169.6.6 0 0 0 .41-.161l1.047-1.018 2.22-2.469-.374-.131-.073 1.801v7.302a.576.576 0 0 0 .593.586z"
                                            />
                                          </svg>
                                        )}
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
        <hr className="LPWUW a0Knu" />
      </section>
      <div className="section-gap" aria-hidden="true" />
        </>
      )}
    </>
  );
}

export default MarketScreen;
