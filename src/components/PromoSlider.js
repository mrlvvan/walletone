import { useEffect, useState } from 'react';

function PromoSlider({ slides, autoMs = 3500 }) {
  const [index, setIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isClosed || slides.length < 2) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, autoMs);

    return () => clearInterval(timer);
  }, [autoMs, isClosed, slides.length]);

  if (isClosed) {
    return null;
  }

  const active = slides[index];

  return (
    <section className="promo-slider promo-wrapper">
      <div className={`promo-slide ${active.theme || ''}`}>
        <div className="promo-copy">
          <div className="promo-title">{active.title}</div>
          <button className="promo-link" type="button">
            <span>{active.cta}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="18"
              fill="none"
              viewBox="0 0 8 18"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M7.253 9.662a.45.45 0 0 1-.043.193.5.5 0 0 1-.113.162l-4.254 4.162a.48.48 0 0 1-.354.145.49.49 0 0 1-.425-.242.47.47 0 0 1-.064-.247q0-.198.14-.349l3.91-3.824-3.91-3.824a.5.5 0 0 1-.14-.35.47.47 0 0 1 .064-.246A.49.49 0 0 1 2.488 5q.21 0 .355.14l4.254 4.168q.075.075.113.166.043.086.043.188"
              />
            </svg>
          </button>
        </div>
        <div className="promo-art" aria-hidden="true">
          {active.art || null}
        </div>
        <button className="promo-close" type="button" aria-label="Close promo" onClick={() => setIsClosed(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M7.24 16.487a.9.9 0 0 1-.242-.424q-.06-.25 0-.491a.87.87 0 0 1 .234-.418l3.435-3.435-3.435-3.427a.87.87 0 0 1-.234-.418 1 1 0 0 1 0-.483q.059-.249.241-.433a.87.87 0 0 1 .418-.234.93.93 0 0 1 .49 0q.25.06.425.227L12 10.386l3.435-3.427a.87.87 0 0 1 .41-.235.9.9 0 0 1 .484 0q.249.06.424.242.19.176.25.425.057.24 0 .483a.84.84 0 0 1-.242.417l-3.42 3.428 3.42 3.435a.84.84 0 0 1 .241.418q.06.241 0 .49a.8.8 0 0 1-.249.418.9.9 0 0 1-.424.249 1 1 0 0 1-.484 0 .84.84 0 0 1-.41-.242L12 13.06l-3.428 3.435a.96.96 0 0 1-.425.234q-.24.06-.49 0a.9.9 0 0 1-.418-.242"
            />
          </svg>
        </button>
        <div className="promo-dots">
          {slides.map((slide, idx) => (
            <span
              key={slide.id}
              className={`promo-dot ${idx === index ? 'active' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromoSlider;
