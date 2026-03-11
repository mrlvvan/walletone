import { useEffect, useMemo, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { IconEthereum, IconSolana, IconToncoin, IconTron } from '../svg-icons.jsx';
import './BuyCryptoAddressScreen.css';

const ADDRESS_BY_ASSET_NETWORK = {
  USDT: {
    trc20: 'TSRfDaDkKVpPfqSwm7shCzN9vLdhuYcz2c',
    ton: 'UQBn0VppkjvVFhMWOg98lGcXiUgEmQBiHLDjf_UfeuSwoswz',
    sol: 'BeYk7iFRwDHep2SREhr6pMjr2Pdu11GiAbrNwSk81Hoa',
    erc20: '0xe50EDF6E39B5c588EfA783d92224426146698EB8',
  },
  TON: {
    ton: 'UQBn0VppkjvVFhMWOg98lGcXiUgEmQBiHLDjf_UfeuSwoswz',
  },
  BTC: {
    btc: 'bc1q3pt9c8wrc2ec84stlyges02qn990q9al7zfw7z',
  },
  ETH: {
    erc20: '0xA0b86991c6218b36c1d19d4a2e9Eb0cE3606eB48',
  },
};

function getAssetLabel(code) {
  if (code === 'USDT') return 'в долларах';
  if (code === 'BTC') return 'в биткоине';
  if (code === 'ETH') return 'в эфире';
  if (code === 'TON') return 'в TON';
  return `в ${code}`;
}

function getAddress(assetCode, networkId) {
  const byAsset = ADDRESS_BY_ASSET_NETWORK[assetCode] || {};
  return byAsset[networkId] || `${assetCode}_${networkId || 'network'}_address_demo`;
}

function getQrForegroundColor() {
  if (typeof document === 'undefined') return '#ffffff';
  const scheme = document.documentElement.getAttribute('data-color-scheme');
  return scheme === 'light' ? '#000000' : '#ffffff';
}

function getQrHoleColor() {
  if (typeof document === 'undefined') return '#1f1f22';
  const scheme = document.documentElement.getAttribute('data-color-scheme');
  return scheme === 'light' ? '#ffffff' : '#1f1f22';
}

function getCenterHoleImage(fill) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="${fill}"/></svg>`
  )}`;
}

function QrTetherIcon({ size = 38 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 40 40">
      <rect width="40" height="40" fill="#009393" rx="20"></rect>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M20.024 21.43c3.44 0 6.314-.582 7.017-1.359-.596-.659-2.754-1.178-5.494-1.32v1.641q-.737.039-1.523.038-.786 0-1.524-.038v-1.641c-2.739.142-4.898.661-5.494 1.32.704.777 3.578 1.358 7.018 1.358zm6.111-7.727v2.26h-4.588v1.568c3.223.168 5.642.857 5.66 1.681v1.719c-.018.825-2.437 1.512-5.66 1.68v3.847H18.5v-3.847c-3.223-.168-5.64-.855-5.658-1.68v-1.719c.018-.825 2.435-1.514 5.658-1.681v-1.567h-4.588v-2.261zm-14.028-3.598h16.108c.386 0 .74.203.932.532l4.693 8.058c.242.418.17.945-.177 1.284L20.747 32.588a1.083 1.083 0 0 1-1.51 0L6.335 19.996a1.05 1.05 0 0 1-.16-1.31l5.016-8.074a1.08 1.08 0 0 1 .916-.506z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function QrHelpIcon({ size = 22 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 28 28">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14 3.8C8.367 3.8 3.8 8.367 3.8 14S8.367 24.2 14 24.2 24.2 19.633 24.2 14 19.633 3.8 14 3.8M2.2 14C2.2 7.483 7.483 2.2 14 2.2S25.8 7.483 25.8 14 20.517 25.8 14 25.8 2.2 20.517 2.2 14m14.355-5.589c.751.592 1.245 1.49 1.245 2.633 0 1.013-.235 1.767-.672 2.346-.419.555-.967.865-1.363 1.089-.437.247-.69.393-.876.615-.152.182-.31.486-.31 1.138a.835.835 0 0 1-1.67 0c0-.957.245-1.665.697-2.207.39-.468.896-.752 1.26-.957l.078-.043c.41-.232.666-.396.851-.64.167-.222.335-.595.335-1.341 0-.618-.248-1.037-.609-1.321-.382-.302-.93-.476-1.52-.475-.587.001-1.137.178-1.522.482-.362.286-.609.705-.609 1.314a.835.835 0 0 1-1.67 0c0-1.139.495-2.034 1.245-2.625.727-.574 1.66-.84 2.553-.841.894-.002 1.828.259 2.557.833m-2.793 12.18a1.165 1.165 0 1 0 0-2.33 1.165 1.165 0 0 0 0 2.33"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function QrWithHole({ value, size = 180 }) {
  const containerRef = useRef(null);
  const [qrColor, setQrColor] = useState(() => getQrForegroundColor());
  const [qrHoleImage, setQrHoleImage] = useState(() => getCenterHoleImage(getQrHoleColor()));

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setQrColor(getQrForegroundColor());
      setQrHoleImage(getCenterHoleImage(getQrHoleColor()));
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-color-scheme'] });
    return () => observer.disconnect();
  }, []);

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
      image: qrHoleImage,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.40,
        margin: 2,
        crossOrigin: 'anonymous',
      },
    });

    qr.append(container);

    return () => {
      container.innerHTML = '';
    };
  }, [value, size, qrColor, qrHoleImage]);

  return <div ref={containerRef} className="buy-crypto-address-qr-canvas" />;
}

function NetworkBadgeIcon({ assetCode, networkId, size = 16 }) {
  if (assetCode !== 'USDT') return null;
  if (networkId === 'trc20') return <IconTron size={size} />;
  if (networkId === 'ton') return <IconToncoin size={size} />;
  if (networkId === 'sol') return <IconSolana size={size} />;
  if (networkId === 'erc20') return <IconEthereum size={size} />;
  return null;
}

function BuyCryptoAddressScreen({ asset, network }) {
  const [copied, setCopied] = useState(false);
  const assetCode = String(asset?.code || '').toUpperCase();
  const networkId = String(network?.id || '').toLowerCase();
  const networkTitle = String(network?.title || '').toUpperCase();
  const networkBadge = NetworkBadgeIcon({ assetCode, networkId, size: 16 });
  const showNetworkBadge = assetCode === 'USDT' && Boolean(networkBadge);

  const address = useMemo(() => getAddress(assetCode, networkId), [assetCode, networkId]);

  const warningText = useMemo(() => {
    const token = assetCode || 'токен';
    const net = networkTitle || 'сеть';
    return `На этот адрес отправляйте только ${token} ${net}. Активы других сетей или NFT будут безвозвратно утеряны.`;
  }, [assetCode, networkTitle]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (_) {
      setCopied(false);
    }
  };

  return (
    <div className="buy-crypto-address-screen">
      <h1 className="buy-crypto-address-title">
        <span className="buy-crypto-address-title-text">Ваш адрес {getAssetLabel(assetCode)}</span>
        <span className="buy-crypto-address-title-help" aria-hidden="true">
          <QrHelpIcon />
        </span>
      </h1>
      <p className="buy-crypto-address-warning">{warningText}</p>

      <section className="buy-crypto-address-qr-card">
        <div className="buy-crypto-address-qr-wrap">
          <QrWithHole value={address} size={188} />

          <div className="buy-crypto-address-qr-logo-shell">
            <div className="buy-crypto-address-qr-logo-main">
              {assetCode === 'USDT' ? (
                <QrTetherIcon size={38} />
              ) : asset?.icon ? (
                <span className="buy-crypto-address-qr-logo-asset-icon">{asset.icon}</span>
              ) : (
                <span className="buy-crypto-address-qr-logo-main-text">
                  {assetCode || 'TOKEN'}
                </span>
              )}
            </div>
            {showNetworkBadge ? <div className="buy-crypto-address-qr-logo-badge">{networkBadge}</div> : null}
          </div>
        </div>
        <p className="buy-crypto-address-qr-caption">
          Отсканируйте QR-код
          <br />
          для отправки {assetCode || 'токена'}
          <br />
          на свой кошелек.
        </p>
      </section>

      <section className="buy-crypto-address-card">
        <div className="buy-crypto-address-label">Ваш адрес {assetCode} {networkTitle}</div>
        <div className="buy-crypto-address-value">{address}</div>
        <button type="button" className="buy-crypto-address-copy-btn" onClick={handleCopy}>
          {copied ? 'Скопировано' : 'Копировать адрес'}
        </button>
      </section>
    </div>
  );
}

export default BuyCryptoAddressScreen;
