import { useRef, useState, useEffect } from 'react';
import './MarketScreen.css';
import IconChangeUp from './Icons/IconChangeUp';
import IconChangeDown from './Icons/IconChangeDown';

function ExchangeCurrencyPicker({ cryptoAssets = [], onSelect, onClose }) {
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp || window.telegram?.webapp;
    const backButton = tg?.BackButton || tg?.backButton;
    if (!backButton) return;
    const handleBack = () => onClose?.();
    backButton.show();
    backButton.onClick(handleBack);
    return () => {
      backButton.offClick(handleBack);
      backButton.hide();
    };
  }, [onClose]);

  const filtered = cryptoAssets.filter((item) => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return true;
    const name = (item.name || '').toLowerCase();
    const code = (item.code || '').toLowerCase();
    return name.includes(q) || code.includes(q);
  });

  return (
    <div className="FhO5I search-overlay-open">
      <section className="oJKLh LySHd iXSn4 KIbKh">
        <div className="JNQMw">
          <div className="market-search-input-wrap">
            <div className="ydmxJ tf4r_ search-input-wrap">
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="TlsKl">Поиск</div>
                  <div className="V2GJs" aria-hidden="true">
                    <button
                      type="button"
                      className="BSzXJ"
                      aria-label="Закрыть"
                      tabIndex={-1}
                      onClick={onClose}
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

          <div className="wtAUk Rmex8" data-scroll-restoration-id="ExchangeCurrencyPicker">
            <div className="DTT0W yPGCL">
              <section className="oJKLh LySHd iXSn4 CgUOn lKYcT">
                <div className="JNQMw">
                  <div className="Rfm73 ZR_ns umRMK kJf7o">
                    <div className="cpHhd YLSRc CF5m5 Ka5fP">Вы получите</div>
                  </div>
                  <div className="ydmxJ tf4r_">
                    <div className="mjigr ODmGt LQUdc lIhZN search-results-list">
                      {filtered.map((item) => {
                        const changeStr = (item.change || '').trim();
                        const isNegative = changeStr.startsWith('↓') || changeStr.startsWith('-');
                        const changeValue = changeStr.replace(/^[-+]\s?/, '').replace(/^↓\s?/, '').replace(/^↑\s?/, '');

                        return (
                          <div className="tSWgK" key={item.id}>
                            <div
                              className="r2DGg tizzh"
                              role="button"
                              tabIndex={0}
                              onClick={() => onSelect && onSelect(item)}
                              onKeyDown={(e) => e.key === 'Enter' && onSelect && onSelect(item)}
                            >
                              <div className="P13QV dAgC8">
                                <div className="t1CPG Bcb3I">
                                  <div className="RkvKd">
                                    <div className={`asset-icon ${item.styleClass || ''}`}>{item.icon}</div>
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
        </div>
      </section>
    </div>
  );
}

export default ExchangeCurrencyPicker;
