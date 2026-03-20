import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import './TonWalletAddressScreen.css';

const TON_ADDRESS = 'UQBDL2X14ZobcamLb18qfT8krcAX6gyXvPJ44wZNtKidiNHF';

function getQrForegroundColor() {
  if (typeof document === 'undefined') return '#000000';
  const scheme = document.documentElement.getAttribute('data-color-scheme');
  return scheme === 'light' ? '#000000' : '#000000';
}

function getCenterHoleImage() {
  return 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="28" fill="#ffffff"/></svg>'
  );
}

function QrWithAvatar({ value, size = 200, avatarUrl }) {
  const containerRef = useRef(null);
  const [qrColor] = useState(() => getQrForegroundColor());
  const [avatarError, setAvatarError] = useState(false);
  const showAvatar = avatarUrl && !avatarError;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const qr = new QRCodeStyling({
      width: size,
      height: size,
      type: 'svg',
      data: value || '',
      margin: 0,
      qrOptions: {
        errorCorrectionLevel: 'M',
      },
      dotsOptions: {
        color: qrColor,
        type: 'rounded',
      },
      backgroundOptions: {
        color: 'transparent',
      },
      cornersSquareOptions: {
        color: qrColor,
        type: 'extra-rounded',
      },
      cornersDotOptions: {
        color: qrColor,
        type: 'square',
      },
      image: getCenterHoleImage(),
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.28,
        margin: 4,
        crossOrigin: 'anonymous',
      },
    });

    qr.append(container);

    return () => {
      container.innerHTML = '';
    };
  }, [value, size, qrColor]);

  return (
    <div className="ton-wallet-address-qr-wrap">
      <div ref={containerRef} className="ton-wallet-address-qr-canvas" />
      <div className="ton-wallet-address-qr-avatar-shell">
        {showAvatar ? (
          <img
            src={avatarUrl}
            alt=""
            className="ton-wallet-address-qr-avatar"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="ton-wallet-address-avatar-fallback">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="var(--tg-theme-button-color, #2481cc)" />
              <path fill="#fff" d="M20 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

function TonWalletAddressScreen() {
  const [copied, setCopied] = useState(false);
  const tg = typeof window !== 'undefined' && (window.Telegram?.WebApp || window.telegram?.webapp);
  const userPhotoUrl = tg?.initDataUnsafe?.user?.photo_url || null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TON_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      tg?.HapticFeedback?.impactOccurred?.('light');
    } catch (_) {
      setCopied(false);
    }
  };

  return (
    <div className="ton-wallet-address-screen">
      <h1 className="ton-wallet-address-title">Ваш адрес TON Кошелька</h1>
      <p className="ton-wallet-address-warning">
        На этот адрес отправляйте только Toncoin (TON) и токены блокчейна TON, иначе ваши средства будут безвозвратно утрачены.
      </p>

      <section className="ton-wallet-address-qr-card">
        <QrWithAvatar value={TON_ADDRESS} size={200} avatarUrl={userPhotoUrl} />
        <p className="ton-wallet-address-qr-caption">
          Отсканируйте QR-код для отправки TON на свой кошелёк.
        </p>
      </section>

      <section className="ton-wallet-address-card">
        <div className="ton-wallet-address-label">Ваш адрес TON</div>
        <div className="ton-wallet-address-value">{TON_ADDRESS}</div>
        <button type="button" className="ton-wallet-address-copy-btn" onClick={handleCopy}>
          {copied ? 'Скопировано' : 'Копировать адрес'}
        </button>
      </section>
    </div>
  );
}

export default TonWalletAddressScreen;
