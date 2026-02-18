import IconChangeUp from './Icons/IconChangeUp';
import IconChangeDown from './Icons/IconChangeDown';

/** Унифицированная карточка секции: Продукты, Топ дня, В тренде */
function SectionCard({ icon, name, code, change, price, sparkline, sparklineUp, iconType, onClick, className = '' }) {
  const displayName = code || name;
  const hasChange = change != null && change !== '';
  const changeStr = (change || '').trim();
  const isNegative = changeStr.startsWith('↓') || changeStr.startsWith('-');
  const changeValue = changeStr.replace(/^[-+]\s?/, '').replace(/^↓\s?/, '').replace(/^↑\s?/, '');
  const iconClass = iconType ? `section__card-icon--${iconType}` : 'section__card-icon--default';

  return (
    <div
      className={`section__card ${className}`.trim()}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } }}
    >
      {(icon || sparkline) && (
        <div className={`section__card-row section__card-top ${sparkline ? 'section__card-top--with-sparkline' : ''}`}>
          {icon && <div className={`section__card-icon ${iconClass}`}>{icon}</div>}
          {sparkline && (
            <div className={`section__card-sparkline section__card-sparkline--${sparklineUp ? 'up' : 'down'}`}>
              {sparkline}
            </div>
          )}
        </div>
      )}
      <div className={`section__card-row ${!hasChange ? 'section__card-row--center' : ''}`}>
        <span className="section__card-name">{displayName}</span>
        {hasChange && (
          <span className={`section__card-change section__card-change--${isNegative ? 'down' : 'up'}`}>
            {isNegative ? <IconChangeDown size={12} /> : <IconChangeUp size={12} />}
            {changeValue}
          </span>
        )}
      </div>
      {price && <div className="section__card-price">{price}</div>}
    </div>
  );
}

export default SectionCard;
