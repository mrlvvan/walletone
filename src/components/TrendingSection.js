function TrendingSection({ items, onOpenAsset }) {
  return (
    <section className="section trending-section">
      <div className="section-header">
        <h2>В тренде</h2>
        <button className="link-button" type="button">
          Все
        </button>
      </div>
      <div className="trend-grid">
        {items.map((item) => (
          <div className="trend-card" key={item.id} role="button" onClick={() => onOpenAsset && onOpenAsset(item)}>
            <div className="trend-top">
              <div className={`trend-icon ${item.styleClass}`}>{item.icon}</div>
              <div className="trend-change negative">↓ {item.change}</div>
            </div>
            <div className="trend-name">{item.name}</div>
            <div className="trend-price">{item.price}</div>
            <div className="trend-line" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;
