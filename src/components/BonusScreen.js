import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

// Локальный JSON: public/bonus-hero-bag.json. Чтобы подставить анимацию из референса:
// 1) Открой референсное приложение → вкладка «Бонусы» → DevTools → Network → фильтр XHR/Fetch.
// 2) Найди запрос к .json (Lottie), скопируй URL сюда или сохрани ответ в public/bonus-hero-bag.json.
const BONUS_BAG_LOTTIE_PATH = '/bonus-hero-bag.json';
const BONUS_BAG_LOTTIE_URL = null; // например: 'https://example.com/static/bonus-bag.json'
const BONUS_BAG_STATIC_SVG = '/bonus-hero-bag-lottie.svg';

function BonusHeroLottie() {
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const url = BONUS_BAG_LOTTIE_URL || BONUS_BAG_LOTTIE_PATH;
    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Not ok'))))
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => { cancelled = true; };
  }, []);

  if (error || !animationData) {
    return (
      <img
        src={BONUS_BAG_STATIC_SVG}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain', maxWidth: 80, maxHeight: 80 }}
      />
    );
  }

  return (
    <Lottie
      animationData={animationData}
      loop
      style={{ width: '100%', height: '100%', maxWidth: 80, maxHeight: 80 }}
    />
  );
}

function BonusScreen({ activeItems, completedItems }) {
  const [tab, setTab] = useState('active');
  const list = tab === 'active' ? activeItems : completedItems;

  const renderBonusIcon = (item) => {
    const key = item.styleClass || item.id;

    if (key === 'mon') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="28" fill="#6E54FF" />
          <path
            fill="#fff"
            d="M28.024 10.503c-5.06 0-17.521 12.45-17.521 17.505s12.461 17.505 17.52 17.505c5.06 0 17.522-12.45 17.522-17.505S33.084 10.503 28.024 10.503m-2.73 27.515c-2.134-.581-7.87-10.606-7.289-12.738s10.616-7.863 12.75-7.282c2.133.581 7.87 10.606 7.288 12.738s-10.616 7.863-12.75 7.282"
          />
        </svg>
      );
    }

    if (key === 'ton') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40">
          <rect width="40" height="40" fill="#0098EA" rx="20" />
          <path
            fill="#fff"
            d="M26.831 11H13.173c-2.512 0-4.103 2.709-2.84 4.899l8.43 14.61a1.43 1.43 0 0 0 2.478 0l8.431-14.61c1.262-2.187-.33-4.899-2.84-4.899zm-8.075 15.128-1.836-3.553-4.43-7.922a.774.774 0 0 1 .68-1.157h5.584V26.13zm8.754-11.477-4.428 7.926-1.836 3.551V13.494h5.583c.612 0 .973.65.68 1.157z"
          />
        </svg>
      );
    }

    if (key === 'dollar') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40">
          <rect width="40" height="40" fill="#28C281" rx="20" />
          <path
            fill="#fff"
            d="M20.014 32.05c-.739 0-1.217-.464-1.217-1.243v-1.381c-2.899-.342-4.908-1.832-5.496-3.733a2.2 2.2 0 0 1-.137-.752c0-.86.588-1.435 1.531-1.435.793 0 1.245.465 1.532 1.107.546 1.395 1.832 2.16 3.91 2.16 2.2 0 3.61-.875 3.61-2.501 0-1.381-1.259-2.092-3.35-2.584l-1.86-.438c-3.117-.71-5.181-2.488-5.181-5.072 0-3.09 2.378-4.95 5.44-5.332V9.45c0-.78.48-1.244 1.218-1.244s1.217.465 1.217 1.244v1.395c2.68.328 4.62 1.777 5.222 3.787.069.26.123.506.123.765 0 .793-.601 1.272-1.476 1.272-.793 0-1.217-.383-1.559-1.04-.615-1.435-1.682-2.132-3.514-2.132-2.091 0-3.35.93-3.35 2.393 0 1.257 1.231 2.037 3.05 2.447l1.777.41c3.514.807 5.51 2.516 5.51 5.195 0 3.364-2.68 5.168-5.783 5.51v1.354c0 .779-.479 1.244-1.217 1.244"
          />
        </svg>
      );
    }

    if (key === 'gold') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="20" fill="#D6A535" />
          <path
            fill="#fff"
            d="M14.117 6.262a.578.578 0 0 1 1.092 0l.6 1.719a.58.58 0 0 0 .336.348L17.859 9c.49.192.49.885 0 1.077l-1.715.672a.58.58 0 0 0-.334.347l-.601 1.72a.578.578 0 0 1-1.092 0l-.601-1.72a.58.58 0 0 0-.335-.347l-1.715-.672a.578.578 0 0 1 0-1.077l1.715-.671a.58.58 0 0 0 .335-.348z"
          />
          <path
            fill="#fff"
            d="M8.184 13.405a.315.315 0 0 1 .595 0l.328.937c.03.087.097.156.183.19l.934.366a.315.315 0 0 1 0 .587l-.934.366a.32.32 0 0 0-.183.19l-.328.937a.315.315 0 0 1-.595 0l-.327-.937a.32.32 0 0 0-.183-.19l-.935-.366a.315.315 0 0 1 0-.587l.935-.366a.32.32 0 0 0 .183-.19z"
          />
          <path
            fill="#fff"
            d="M31.97 10.76a.365.365 0 0 1 .689 0l.38 1.085c.034.1.112.18.21.22l1.083.423c.31.121.31.559 0 .68l-1.082.424a.37.37 0 0 0-.212.22l-.38 1.085a.365.365 0 0 1-.688 0l-.38-1.086a.37.37 0 0 0-.211-.219l-1.082-.424a.365.365 0 0 1 0-.68l1.082-.424a.37.37 0 0 0 .211-.22z"
          />
          <path
            fill="#F8F8F6"
            d="M21.859 12.477a1 1 0 0 1 .883-.082l7.457 2.874a1 1 0 0 1 .537.49l3.004 6.082a1 1 0 0 1-.333 1.27l-13.395 9.125a1 1 0 0 1-.955.094L6.765 27.098a1 1 0 0 1-.485-1.4l2.807-5.126a1.5 1.5 0 0 1 .53-.557zm7.77 4.923-11.133 6.922a.13.13 0 0 0-.057.123l.861 6.003a.125.125 0 0 0 .193.086l12.511-8.32a.124.124 0 0 0 .043-.158l-2.24-4.605a.125.125 0 0 0-.178-.051m-6.991-3.34a.25.25 0 0 0-.22.021l-10.546 6.53a.075.075 0 0 0 .01.131l5.379 2.354a.25.25 0 0 0 .232-.016l10.75-6.656a.125.125 0 0 0-.02-.223z"
          />
        </svg>
      );
    }

    if (key === 'adi') {
      const baseId = `adi-${item.id}`;
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="28" fill={`url(#${baseId}-a)`} />
          <path
            fill={`url(#${baseId}-b)`}
            d="M28.01 22.1c1.07 0 1.93.88 1.93 1.96S29.08 26 28.01 26a1.94 1.94 0 0 1-1.92-1.95c0-1.08.86-1.96 1.92-1.96Z"
          />
          <path
            fill={`url(#${baseId}-c)`}
            d="m22.96 38.12-.03-.04-2.53-4.22-.42-.69-.47-.8-1.08-1.81-.74-1.25c-.23-.36-.45-.74-.66-1.12-.06-.12-.03-.3.1-.53l.85-1.46 3.27-5.48 6.18-10.36c.3-.5.9-.47 1.2.04L30 12.7l7.36 12.38 1.05 1.77c.1.14.18.28.27.43.26.44.45.69.18 1.16l-.51.84-.01.03-1.83 3.05-.82 1.39-2.55 4.27c-1.5 2.54-3 5.07-4.52 7.6-.3.47-.89.53-1.2.02-1.5-2.5-3-5-4.48-7.52Zm5.76-20.16c-.32-.54-.93-.76-1.3-.12l-5.04 8.41c-.18.3-.6.88-.5 1.23.1.34.33.51.71.52h10.67c.26 0 .52-.02.7-.2.25-.25.27-.57.05-.95l-1.08-1.81c-1.4-2.34-2.81-4.7-4.21-7.08"
          />
          <defs>
            <linearGradient id={`${baseId}-a`} x1="8.37" x2="45.79" y1="10.12" y2="50.66">
              <stop stopColor="#052087" />
              <stop offset="1" stopColor="#040A22" />
            </linearGradient>
            <linearGradient id={`${baseId}-b`} x1="28" x2="28" y1="10" y2="46">
              <stop stopColor="#FD7007" />
              <stop offset="0.37" stopColor="#FC710B" />
              <stop offset="1" stopColor="#013BFF" />
            </linearGradient>
            <linearGradient id={`${baseId}-c`} x1="28" x2="28" y1="10" y2="46">
              <stop stopColor="#FD7007" />
              <stop offset="0.37" stopColor="#FC710B" />
              <stop offset="1" stopColor="#013BFF" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (key === 'xlm') {
      const baseId = `xlm-${item.id}`;
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 96 96">
          <clipPath id={`${baseId}-a`}>
            <rect width="96" height="96" rx="48" />
          </clipPath>
          <g clipPath={`url(#${baseId}-a)`}>
            <circle cx="48" cy="48" r="48" fill="#030303" />
            <g fill="#fff">
              <path d="M76.872 36.202v4.968l-2.101 1.069a4.44 4.44 0 0 0-2.411 4.29q.07.931.07 1.873a24.4 24.4 0 0 1-13.339 21.732 24.46 24.46 0 0 1-25.444-1.995l4.314-2.196.245-.13a20.02 20.02 0 0 0 19.886-.184 19.97 19.97 0 0 0 9.726-19.852L34.208 62.88l-6.952 3.538-8.128 4.136v-4.98l8.184-4.165 3.977-2.028zm-39.97-9.54a24.46 24.46 0 0 1 25.448 1.991l-.593.303-3.98 2.025a20.02 20.02 0 0 0-19.865.205 19.97 19.97 0 0 0-9.89 17.209q.001 1.31.172 2.608l33.575-17.08 6.953-3.537 8.15-4.153v4.982l-8.22 4.185-3.978 2.022-35.395 18.012-1.972 1.003-2 1.02-6.18 3.145v-4.985l2.1-1.069a4.44 4.44 0 0 0 2.413-4.289 24.4 24.4 0 0 1 13.262-23.596" />
              <path
                fillOpacity="0.03"
                  fillRule="evenodd"
                d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48m0-2c25.405 0 46-20.595 46-46S73.405 2 48 2 2 22.595 2 48s20.595 46 46 46"
                clipRule="evenodd"
              />
            </g>
          </g>
        </svg>
      );
    }

    if (key === 'bitcoin') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
          <path fill="#F7931A" d="M39.397 24.838c-2.671 10.715-13.523 17.235-24.239 14.563C4.448 36.731-2.073 25.877.6 15.164 3.269 4.448 14.121-2.073 24.833.598c10.715 2.672 17.235 13.525 14.564 24.24" />
          <path fill="#fff" d="M28.817 17.155c.398-2.661-1.628-4.092-4.4-5.046l.9-3.606-2.195-.546-.875 3.51c-.577-.144-1.17-.28-1.759-.414l.882-3.533-2.193-.547-.9 3.604a73 73 0 0 1-1.401-.33l.002-.01-3.026-.757-.584 2.344s1.628.374 1.594.397c.889.221 1.05.81 1.023 1.276l-1.024 4.107c.061.016.14.038.228.074l-.232-.058-1.435 5.754c-.109.27-.385.675-1.006.521.022.032-1.595-.398-1.595-.398l-1.09 2.512 2.857.712c.53.134 1.051.273 1.564.404l-.908 3.647 2.192.547.9-3.608q.896.242 1.749.454l-.897 3.59 2.195.547.908-3.64c3.742.709 6.556.423 7.74-2.962.955-2.725-.047-4.297-2.016-5.322 1.434-.33 2.515-1.274 2.803-3.222zm-5.015 7.032c-.678 2.725-5.266 1.252-6.754.882l1.205-4.83c1.488.37 6.258 1.106 5.55 3.948m.68-7.071c-.62 2.479-4.439 1.22-5.677.91l1.092-4.381c1.239.309 5.229.885 4.584 3.47" />
        </svg>
      );
    }

    if (key === 'flr') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
          <g clipPath="url(#FLR_clip0_bonus)">
            <path d="M0 0h40v40H0z" />
            <path fill="#E62058" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20" />
            <path fill="#fff" fillRule="evenodd" d="M31.32 10H15.015c-2.997 0-5.395 2.338-5.515 5.335 0 .06.06.18.12.18h16.365c2.997 0 5.395-2.338 5.515-5.335q0-.18-.18-.18m-5.455 8.212h-10.85c-2.997 0-5.395 2.338-5.515 5.336 0 .06.06.12.12.12h10.85c2.997 0 5.395-2.338 5.515-5.336 0-.06-.06-.12-.12-.12m-10.85 10.97a2.757 2.757 0 1 1-5.515 0 2.757 2.757 0 0 1 5.515 0" clipRule="evenodd" />
          </g>
          <defs>
            <clipPath id="FLR_clip0_bonus">
              <path fill="#fff" d="M0 0h40v40H0z" />
            </clipPath>
          </defs>
        </svg>
      );
    }

    if (key === 'tac') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 73 72" preserveAspectRatio="xMidYMid meet">
          <circle cx="36.5" cy="36" r="35.944" fill="#91019B" />
          <path fill="#fff" d="M37.96 60.941V26.753c0-.83.673-1.501 1.504-1.501H58.23c1.916 0 3.1 2.086 2.118 3.728L40.754 61.711c-.783 1.308-2.794.754-2.794-.77" />
          <path fill="#fff" d="M35.068 45.224V11.036c0-1.524-2.01-2.079-2.793-.77L12.68 42.995c-.983 1.643.202 3.73 2.118 3.73h18.766c.83 0 1.503-.673 1.503-1.502" />
        </svg>
      );
    }

    if (key === 'dogs') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
          <rect width="40" height="40" fill="#000" rx="20" />
          <path fill="#fff" fillRule="evenodd" d="M13.008 9.207A5.07 5.07 0 0 0 9.78 8.031l-.13-.003c-.092-.002-.185-.005-.277.005-.51.054-1.004.18-1.303.638-.576.883-.873 2.185-.122 3.238.34.478.77.902 1.2 1.306.263.248.542.479.821.71.268.221.535.443.79.679.197.183.379.441.445.697q.18.694.367 1.39c.406 1.523.812 3.047 1.096 4.593.304 1.645.416 3.334.491 5.01a12.6 12.6 0 0 0 .944 4.276c.557 1.363 1.4 2.453 2.659 3.22.53.323 1.083.512 1.721.43 1.356-.176 2.547-.7 3.558-1.621 1.408-1.285 2.271-2.92 2.955-4.662 1.01-2.578 1.515-5.284 2.005-7.995.179-.99.382-1.978.585-2.965l.121-.592c.107-.525.413-.87.915-1.103.756-.35 1.499-.736 2.216-1.16 1.378-.813 2.292-1.986 2.575-3.59.074-.423.095-.863-.19-1.233-.687-.892-1.561-1.496-2.712-1.535a6.5 6.5 0 0 0-1.7.187c-1.162.276-2.21.826-3.257 1.375q-.272.143-.545.284a45 45 0 0 1-2.51 1.193 1.9 1.9 0 0 1-1.35.093c-.947-.29-1.906-.303-2.875-.13q-.468.084-.938.164c-.508.088-1.017.176-1.525.273-.298.057-.515-.031-.736-.226-.68-.6-1.366-1.194-2.067-1.77m2.742 21.695-.027-.007q.035-.203.067-.408c.046-.296.093-.592.169-.88.094-.359.265-.691.49-.98.494-.633 1.25-1.06 2.048-1.109 1.265-.078 2.49.653 2.95 1.761.39.943.178 1.988-.575 2.778a3 3 0 0 1-.223.213 4.2 4.2 0 0 1-1.155.735 3.9 3.9 0 0 1-1.816.287c-1.16-.085-1.798-.737-1.904-1.89q-.013-.167-.017-.333zm7.308-9.026c.634.018 1.045-.114 1.318-.405q.155-.165.258-.401c.1-.227.183-.462.266-.697l.032-.09c.15-.423.064-.83-.021-1.24-.032-.15-.063-.3-.083-.451-.066-.504-.278-.935-.578-1.33-.56-.738-1.32-.871-2.04-.294q-.229.183-.421.384c-.753.787-1.087 1.773-.985 2.918.055.614.394 1.09.99 1.292.362.123.74.202 1.015.26q.147.03.248.055zm-8.313-.955q.207.086.463.107c.632.05 1.128-.217 1.443-.75.413-.698.424-1.43.017-2.138-.21-.364-.491-.608-.84-.72a1.6 1.6 0 0 0-.675-.059c-.614.068-.998.44-1.19 1.007-.063.188-.1.385-.138.58l-.052.262h-.001q.028.132.05.263c.034.188.067.37.129.543.153.43.412.747.793.905m9.775-7.758c-.264-.071-.454-.191-.471-.52l.198-.029c.13-.018.246-.034.358-.068.363-.114.426-.388.16-.66q-.038-.037-.084-.064-.05-.029-.088-.067a2 2 0 0 1-.147-.18l-.063-.082q.054-.033.107-.07a.7.7 0 0 1 .248-.131c.104-.024.213-.027.323-.03.089-.003.178-.005.266-.019a.5.5 0 0 0 .261-.137c.31-.327.363-.331.742.017l-.044.051q-.044.053-.092.103a2 2 0 0 1-.098.09l-.05.044.225.286.06.077-.084.032a1 1 0 0 1-.117.041c-.407.106-.547.275-.576.701l-.014.238q-.011.21-.027.417c-.02.228-.16.394-.374.387-.084-.002-.165-.079-.246-.155q-.058-.058-.117-.103l-.067-.052c-.06-.049-.12-.098-.19-.117" clipRule="evenodd" />
        </svg>
      );
    }

    if (key === 'major') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
          <circle cx="20" cy="20" r="20" fill="#24324d" />
          <text x="20" y="26" fill="#fff" fontSize="14" fontWeight="600" textAnchor="middle">M</text>
        </svg>
      );
    }

    return <span className="bonus-fallback-icon">{item.icon}</span>;
  };

  const FlrBadgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
      <g clipPath="url(#FLR_badge_clip)">
        <path d="M0 0h40v40H0z" />
        <path fill="#E62058" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20" />
        <path fill="#fff" fillRule="evenodd" d="M31.32 10H15.015c-2.997 0-5.395 2.338-5.515 5.335 0 .06.06.18.12.18h16.365c2.997 0 5.395-2.338 5.515-5.335q0-.18-.18-.18m-5.455 8.212h-10.85c-2.997 0-5.395 2.338-5.515 5.336 0 .06.06.12.12.12h10.85c2.997 0 5.395-2.338 5.515-5.336 0-.06-.06-.12-.12-.12m-10.85 10.97a2.757 2.757 0 1 1-5.515 0 2.757 2.757 0 0 1 5.515 0" clipRule="evenodd" />
      </g>
      <defs>
        <clipPath id="FLR_badge_clip">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );

  const isCompleted = tab === 'completed';
  const hasPairIcons = (item) => isCompleted && item.name && item.name.includes(' × ');

  return (
    <div className="bonus-screen-wrap">
      <section className="bonus-hero nluVg qf2Gj">
        <div className="bonus-hero-icon">
          <div className="bonus-hero-icon-frame">
            <div className="bonus-hero-icon-media">
              <BonusHeroLottie />
            </div>
          </div>
        </div>
        <h1 className="cpHhd yq6BH OUOn_">Бонусы</h1>
        <div className="cpHhd IqPae PmUAN oqrc8">
          Получайте бонусы за&nbsp;хранение криптовалюты.
        </div>
        <button className="cpHhd IqPae PmUAN SqDwU wHOsr bonus-hero-link" type="button">
          Как это работает
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="20"
            fill="none"
            viewBox="0 0 8 18"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M7.31 9.122a.45.45 0 0 1-.043.193.5.5 0 0 1-.113.162L2.9 13.639a.48.48 0 0 1-.354.145.49.49 0 0 1-.424-.242.47.47 0 0 1-.065-.247q0-.198.14-.349l3.91-3.824-3.91-3.824a.5.5 0 0 1-.14-.35.47.47 0 0 1 .065-.246.49.49 0 0 1 .424-.242q.21 0 .354.14l4.254 4.168q.075.075.113.166.043.086.043.188"
            />
          </svg>
        </button>
      </section>

      <section className="bonus-tabs rquXm">
        <button
          className={`pill-tab ${tab === 'active' ? 'active' : ''}`}
          type="button"
          onClick={() => setTab('active')}
        >
          Активные
        </button>
        <button
          className={`pill-tab ${tab === 'completed' ? 'active' : ''}`}
          type="button"
          onClick={() => setTab('completed')}
        >
          Завершённые
        </button>
      </section>

      <section className="bonus-grid LGGuk">
        {list.map((item) => {
          const pair = hasPairIcons(item);
          const secondFlr = pair && item.name.includes('× FLR');
          const secondStyle = pair && !secondFlr && (item.name.includes('× XLM') ? 'xlm' : item.name.includes('× Золото') ? 'gold' : null);
          const secondItem = secondStyle ? { ...item, styleClass: secondStyle } : null;
          return (
            <div className={`r2DGg pK3y3 bdh8O ${isCompleted ? 'completed' : ''}`} key={item.id}>
              <div className="P13QV">
                <div className={`JCPzJ ${isCompleted ? 'OxyIx' : ''}`}>
                  {isCompleted && pair ? (
                    <div className="gFO3r _uXb7">
                      <div style={{ willChange: 'transform', opacity: 1 }}>
                        <div className="bonus-icon-wrap">{renderBonusIcon(item)}</div>
                      </div>
                      <div style={{ willChange: 'transform', opacity: 1 }}>
                        {secondFlr ? <div className="bonus-icon-wrap"><FlrBadgeIcon /></div> : secondItem ? <div className="bonus-icon-wrap">{renderBonusIcon(secondItem)}</div> : null}
                      </div>
                    </div>
                  ) : isCompleted ? (
                    <div style={{ willChange: 'transform', opacity: 1 }}>
                      <div className="bonus-icon-wrap">{renderBonusIcon(item)}</div>
                    </div>
                  ) : (
                    <div className="bonus-icon-wrap">{renderBonusIcon(item)}</div>
                  )}
                </div>
                <div className={`iYgED gfXvW ${isCompleted ? 'Fx5Cf' : ''}`}>
                  <div className={`cpHhd IqPae PmUAN Se5d5 ${isCompleted ? 'Fx5Cf' : 'Ka5fP'}`}>{item.name}</div>
                  <div className={`cpHhd fv_Nl Se5d5 ${isCompleted ? 'Fx5Cf' : 'Ka5fP'}`}>{item.rate}</div>
                </div>
                {!isCompleted && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="55"
                      fill="none"
                      viewBox="0 0 56 55"
                      preserveAspectRatio="xMidYMid meet"
                      className="Wb1nA"
                      aria-hidden="true"
                    >
                      <path
                        fill={`url(#bonusRibbon-${item.id})`}
                        d="M50.024 52.309 3.321 5.605C1.607 3.89.75 3.035.692 2.299A2 2 0 0 1 1.387.621C1.948.142 3.16.142 5.583.142h13.932c2.446 0 3.669 0 4.82.276a10 10 0 0 1 2.89 1.198c1.01.618 1.874 1.483 3.603 3.212l19.973 19.973c1.73 1.73 2.594 2.594 3.212 3.603a10 10 0 0 1 1.198 2.89c.276 1.152.276 2.375.276 4.82v13.932c0 2.423 0 3.635-.48 4.196a2 2 0 0 1-1.677.695c-.735-.058-1.592-.915-3.306-2.628"
                      />
                      <defs>
                        <linearGradient
                          id={`bonusRibbon-${item.id}`}
                          x1="4.929"
                          x2="62.558"
                          y1="-6.929"
                          y2="50.7"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#6DD1FF" />
                          <stop offset="1" stopColor="#37A6FB" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="cpHhd LMb8t CF5m5 Se5d5 wMBS1">bonus</div>
                  </>
                )}
              </div>
              <div className="gtBIz" />
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default BonusScreen;
