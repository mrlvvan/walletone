function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="promo-content">
        <div className="promo-title">Зарабатывайте до 25% годовых на ADI</div>
        <button className="promo-link" type="button">
          Начать зарабатывать →
        </button>
      </div>
      <button className="promo-close" type="button" aria-label="Close promo">
        ×
      </button>
    </section>
  );
}

export default PromoBanner;
