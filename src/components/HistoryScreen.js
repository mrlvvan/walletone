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
                      return (
                        <div className="GEGJU" key={item.id}>
                          <div role="button" className="r2DGg tizzh">
                            <div className="P13QV dAgC8">
                              <div className="t1CPG Bcb3I">
                                <div className="XeMWN">
                                  <div className={`vilvX PuF7l ${isIncoming ? 'is-in' : 'is-out'}`}>
                                    <div className="history-arrow">
                                      {isIncoming ? (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          preserveAspectRatio="xMidYMid meet"
                                        >
                                          <path
                                            d="M12 6v12m0 0 4-4m-4 4-4-4"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          preserveAspectRatio="xMidYMid meet"
                                        >
                                          <path
                                            d="M12 18V6m0 0 4 4m-4-4-4 4"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      )}
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
      </div>
    </div>
  );
}

export default HistoryScreen;
