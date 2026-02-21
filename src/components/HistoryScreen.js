const ICON_UP = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path fill="currentColor" fillRule="evenodd" d="M14 3C7.925 3 3 7.925 3 14s4.925 11 11 11 11-4.925 11-11S20.075 3 14 3m4.53 9.47-4-4a.75.75 0 0 0-1.06 0l-4 4a.75.75 0 1 0 1.06 1.06l2.72-2.72V19a.75.75 0 0 0 1.5 0v-8.19l2.72 2.72a.75.75 0 1 0 1.06-1.06" clipRule="evenodd" />
  </svg>
);

const ICON_DOWN = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28">
    <path fill="currentColor" fillRule="evenodd" d="M14 25c6.075 0 11-4.925 11-11S20.075 3 14 3 3 7.925 3 14s4.925 11 11 11m-3.434-10.566a.8.8 0 0 0-1.132 1.132l4 4a.8.8 0 0 0 1.132 0l4-4a.8.8 0 0 0-1.132-1.132L14.8 17.07V9.5a.8.8 0 0 0-1.6 0v7.569z" clipRule="evenodd" />
  </svg>
);

const ICON_EXCHANGE = (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" fill="none" viewBox="0 0 28 29">
    <path fill="currentColor" fillRule="evenodd" d="M3 14.5c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11m9.304-5.97c.26.26.26.68 0 .94l-1.365 1.365h7.394a.665.665 0 1 1 0 1.33H10.94l1.364 1.365a.665.665 0 1 1-.94.94l-2.5-2.5a.665.665 0 0 1 0-.94l2.5-2.5c.26-.26.68-.26.94 0m3.556 6.94a.665.665 0 1 1 .94-.94l2.5 2.5a.665.665 0 0 1 0 .94l-2.5 2.5a.665.665 0 1 1-.94-.94l1.365-1.365H9.83a.665.665 0 1 1 0-1.33h7.395z" clipRule="evenodd" />
  </svg>
);

function getHistoryIcon(title, type) {
  if (title.includes('Обмен')) return ICON_EXCHANGE;
  if (type === 'out') return ICON_UP;
  return ICON_DOWN;
}

function getAccentClass(title, type) {
  if (title.includes('Обмен')) return 'history-accent-exchange';
  return type === 'out' ? 'history-accent-out' : 'history-accent-in';
}

function HistoryScreen({ items }) {
  return (
    <div id="appContent" className="PKleQ">
      <div className="wtAUk gEZt4">
        <section className="oJKLh LySHd iXSn4">
          <div className="JNQMw">
            <div className="Rfm73 Jn71M hCZ1A">
              <div className="cpHhd KbDJo eqZCR section-title-subtitle">История транзакций</div>
            </div>
            <div className="ydmxJ tf4r_">
              <div className="PsHqe">
                <div className="rDiIn">
                  <div className="mjigr ODmGt LQUdc vubxg">
                    {items.map((item) => {
                      const isIncoming = item.type === 'in';
                      const accentClass = getAccentClass(item.title, item.type);
                      return (
                        <div className="GEGJU" key={item.id}>
                          <div role="button" className="r2DGg tizzh">
                            <div className="P13QV dAgC8">
                              <div className="t1CPG Bcb3I">
                                <div className="XeMWN">
                                  <div className={`vilvX PuF7l history-tx-icon ${accentClass}`}>
                                    <div className="history-tx-icon-inner">
                                      {getHistoryIcon(item.title, item.type)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="f5GTj Wv9yg">
                                <div className="jOCse TYgZR NXXwZ">
                                  <div className="cpHhd IqPae CF5m5 Ka5fP kzP3J VyspS">
                                    {item.title}
                                  </div>
                                  <div className="cpHhd YLSRc PmUAN Fx5Cf Bgj6A">{item.time}</div>
                                </div>
                                <div className="eslGw CFakS">
                                  <div className="jOCse TYgZR Gihoq">
                                    <div
                                      className={`cpHhd IqPae PmUAN Ka5fP kzP3J VyspS ${
                                        isIncoming ? 'WXss8' : ''
                                      }`}
                                    >
                                      {item.amount}
                                    </div>
                                    <div className={`cpHhd YLSRc PmUAN Fx5Cf Bgj6A ${isIncoming ? 'WXss8' : ''}`}>
                                      {item.status}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="gtBIz" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="section-gap" />
        <div className="section-gap" />
        <div className="section-gap" />
        <div className="section-gap" />
        <div className="section-gap" />
        <div className="section-gap" />
        <div className="section-gap" />
      </div>
    </div>
  );
}

export default HistoryScreen;
