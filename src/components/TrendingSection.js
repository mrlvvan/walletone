import IconSparkline from './Icons/IconSparkline';

const SPARKLINE_UP = 'M2,40 L8,32 L14,28 L22,22 L30,18 L38,14 L46,10 L54,8 L62,6 L70,4 L78,2';
const SPARKLINE_DOWN = 'M2,8 L8,12 L14,16 L22,20 L30,24 L38,28 L46,32 L54,34 L62,36 L70,38 L78,40';

function TrendingSection({ items, onOpenAsset }) {
  return (
    <section className="section trending-section">
      <div className="section-header">
        <h2>В тренде</h2>
        <button className="link-button" type="button">Все</button>
      </div>
      <div className="trend-grid">
        {items.map((item) => {
          const up = item.change.startsWith('↑') || !item.change.startsWith('-');
          return (
            <div className="trend-card" key={item.id} role="button" onClick={() => onOpenAsset?.(item)}>
              <div className="trend-top">
                <div className="trend-icon">{item.icon}</div>
                <div className={`trend-sparkline trend-sparkline-${up ? 'up' : 'down'}`} data-up={up}>
                  <IconSparkline d={item.sparklinePath || (up ? SPARKLINE_UP : SPARKLINE_DOWN)} up={up} />
                </div>
              </div>
              <div className="trend-row">
                <span className="trend-name">{item.name}</span>
                <span className={`trend-change-badge ${up ? 'positive' : 'negative'}`}>
                  <span className="trend-change-badge-icon" aria-hidden="true">
                    {up ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 14" preserveAspectRatio="xMidYMid meet">
                        <path fill="currentColor" fillRule="evenodd" d="M5.558 2.058a.625.625 0 0 1 .884 0l3.5 3.5-.884.884-2.433-2.433V11h-1.25V4.009L2.942 6.442l-.884-.884z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" fill="none" viewBox="0 0 12 14" preserveAspectRatio="xMidYMid meet">
                        <path fill="currentColor" fillRule="evenodd" d="M5.558 11.442c.244.244.64.244.884 0l3.5-3.5-.884-.884-2.433 2.433V2.5h-1.25v6.991L2.942 7.058l-.884.884z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  {item.change.replace(/^-/, '')}
                </span>
              </div>
              <div className="trend-price">{item.price}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TrendingSection;
