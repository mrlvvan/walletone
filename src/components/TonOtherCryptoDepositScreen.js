import { useEffect, useMemo, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { IconToncoin } from '../svg-icons.jsx';
import './TonOtherCryptoDepositScreen.css';

const ADDRESS_BY_ASSET = {
  BTC: { btc: 'bc1qc3tu4rtgwn4zsswa87t6yxdlqq8lkpc6y32ewy' },
  ETH: { erc20: '0xe50EDF6E39B5c588EfA783d92224426146698EB8' },
  SOL: { sol: 'BeYk7iFRwDHep2SREhr6pMjr2Pdu11GiAbrNwSk81Hoa' },
};

/** Совпадает с BuyCryptoAddressScreen — адрес пополнения в исходной сети */
const STABLECOIN_ADDRESSES = {
  USDT: {
    trc20: 'TSRfDaDkKVpPfqSwm7shCzN9vLdhuYcz2c',
    ton: 'UQBn0VppkjvVFhMWOg98lGcXiUgEmQBiHLDjf_UfeuSwoswz',
    sol: 'BeYk7iFRwDHep2SREhr6pMjr2Pdu11GiAbrNwSk81Hoa',
    erc20: '0xe50EDF6E39B5c588EfA783d92224426146698EB8',
    bep20: '0xe50EDF6E39B5c588EfA783d92224426146698EB8',
    polygon: '0xe50EDF6E39B5c588EfA783d92224426146698EB8',
    arb: '0xe50EDF6E39B5c588EfA783d92224426146698EB8',
  },
  USDC: {
    trc20: 'TSRfDaDkKVpPfqSwm7shCzN9vLdhuYcz2c',
    ton: 'UQBn0VppkjvVFhMWOg98lGcXiUgEmQBiHLDjf_UfeuSwoswz',
    sol: 'BeYk7iFRwDHep2SREhr6pMjr2Pdu11GiAbrNwSk81Hoa',
    base: '0xe50EDF6E39B5c588EfA783d92224426146698EB8',
    polygon: '0xe50EDF6E39B5c588EfA783d92224426146698EB8',
    arb: '0xe50EDF6E39B5c588EfA783d92224426146698EB8',
    erc20: '0xe50EDF6E39B5c588EfA783d92224426146698EB8',
  },
};

const BRIDGE_LIMITS = {
  sol: { min: '10', max: '191 512', creditMinutes: '6' },
  bep20: { min: '10', max: '500 000', creditMinutes: '10' },
  trc20: { min: '10', max: '500 000', creditMinutes: '3' },
  polygon: { min: '10', max: '250 000', creditMinutes: '5' },
  arb: { min: '10', max: '250 000', creditMinutes: '5' },
  erc20: { min: '10', max: '500 000', creditMinutes: '15' },
  base: { min: '10', max: '250 000', creditMinutes: '5' },
  default: { min: '10', max: '500 000', creditMinutes: '15' },
};

const DEPOSIT_META = {
  BTC: {
    networkId: 'btc',
    addressLabel: 'Bitcoin',
    networkLine: 'Bitcoin',
    rateTon: '56 870,75517',
    min: '0,0003',
    max: '2,7113',
    creditMinutes: '21',
  },
  ETH: {
    networkId: 'erc20',
    addressLabel: 'Ethereum',
    networkLine: 'Ethereum',
    rateTon: '34 120,45',
    min: '0,001',
    max: '18,5',
    creditMinutes: '15',
  },
  SOL: {
    networkId: 'sol',
    addressLabel: 'Solana',
    networkLine: 'Solana',
    rateTon: '8 945,2',
    min: '0,05',
    max: '420',
    creditMinutes: '5',
  },
};

function getQrForegroundColor() {
  if (typeof document === 'undefined') return '#000000';
  const scheme = document.documentElement.getAttribute('data-color-scheme');
  return scheme === 'light' ? '#000000' : '#ffffff';
}

function getQrHoleColor() {
  if (typeof document === 'undefined') return '#ffffff';
  const scheme = document.documentElement.getAttribute('data-color-scheme');
  return scheme === 'light' ? '#ffffff' : '#1f1f22';
}

function getCenterHoleImage(fill) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="${fill}"/></svg>`
  )}`;
}

function QrWithHole({ value, size = 200 }) {
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
      qrOptions: { errorCorrectionLevel: 'M' },
      dotsOptions: { color: qrColor, type: 'rounded' },
      backgroundOptions: { color: 'transparent' },
      cornersSquareOptions: { color: qrColor, type: 'extra-rounded' },
      cornersDotOptions: { color: qrColor, type: 'square' },
      image: qrHoleImage,
      imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 2, crossOrigin: 'anonymous' },
    });
    qr.append(container);
    return () => {
      container.innerHTML = '';
    };
  }, [value, size, qrColor, qrHoleImage]);

  return <div ref={containerRef} className="ton-other-crypto-deposit-qr-canvas" />;
}

const IconCopy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="m7.742 5.5-.666.001a2.7 2.7 0 0 1 .251-.863 3 3 0 0 1 1.311-1.311C9.28 3 10.12 3 11.8 3h4.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v4.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311 2.7 2.7 0 0 1-.863.25l.001-.665v-4.516c0-.79 0-1.473-.046-2.035-.048-.593-.155-1.182-.445-1.75a4.5 4.5 0 0 0-1.966-1.967c-.568-.289-1.157-.396-1.75-.444-.562-.046-1.244-.046-2.035-.046zM3.327 8.638C3 9.28 3 10.12 3 11.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21h4.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C17 18.72 17 17.88 17 16.2v-4.4c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C14.72 7 13.88 7 12.2 7H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311"
      clipRule="evenodd"
    />
  </svg>
);

const IconInfoWarn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9.996 18.25a7.9 7.9 0 0 1-3.185-.647 8.3 8.3 0 0 1-2.634-1.78 8.5 8.5 0 0 1-1.78-2.636A7.9 7.9 0 0 1 1.75 10q0-1.693.647-3.187a8.46 8.46 0 0 1 4.406-4.417 7.9 7.9 0 0 1 3.185-.646q1.7 0 3.193.647a8.4 8.4 0 0 1 2.634 1.789 8.3 8.3 0 0 1 1.788 2.627q.647 1.494.647 3.187t-.647 3.187a8.43 8.43 0 0 1-4.422 4.416 7.9 7.9 0 0 1-3.185.647m0-1.63q1.38 0 2.578-.51 1.198-.511 2.108-1.422a6.6 6.6 0 0 0 1.42-2.108q.512-1.199.512-2.58 0-1.374-.511-2.572a6.6 6.6 0 0 0-3.537-3.538 6.5 6.5 0 0 0-2.578-.51q-1.373 0-2.578.51a6.5 6.5 0 0 0-2.1 1.422 6.7 6.7 0 0 0-1.413 2.116A6.5 6.5 0 0 0 3.387 10q0 1.382.51 2.58a6.7 6.7 0 0 0 1.413 2.108 6.54 6.54 0 0 0 4.686 1.933m0-5.294q-.694 0-.718-.703l-.112-3.881a.72.72 0 0 1 .215-.575.83.83 0 0 1 .599-.224q.367 0 .607.231.24.225.223.568l-.128 3.88q-.015.704-.686.704m0 2.651a.98.98 0 0 1-.67-.247.83.83 0 0 1-.272-.631q0-.375.271-.623a.96.96 0 0 1 .671-.256q.383 0 .655.248.279.247.279.63a.8.8 0 0 1-.28.632.96.96 0 0 1-.654.247"
    />
  </svg>
);

const IconInfoMoney = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9.94 5.09c.373 0 .676.303.676.676v.369c1.108.234 1.74.988 1.988 1.592a.75.75 0 0 1-1.388.569c-.105-.255-.463-.735-1.315-.735-.453 0-.792.144-.983.315a.57.57 0 0 0-.197.568c.043.22.155.355.414.483.308.152.7.233 1.224.353.53.122 1.058.31 1.49.604.442.3.818.739.933 1.343a2.13 2.13 0 0 1-.648 1.995c-.393.367-.916.6-1.518.702v.31a.676.676 0 0 1-1.351 0v-.311c-1.206-.232-1.82-1.094-2.102-1.627a.75.75 0 0 1 1.326-.701c.213.401.586.889 1.412.89.636 0 1.017-.18 1.21-.36a.64.64 0 0 0 .198-.618c-.021-.11-.092-.24-.303-.383-.22-.15-.552-.283-.983-.382-.436-.1-1.046-.221-1.551-.47-.555-.274-1.066-.74-1.223-1.539a2.07 2.07 0 0 1 .667-1.973c.367-.33.838-.542 1.349-.639v-.355c0-.373.302-.676.675-.676"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 1.75a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5m0 1.5a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5"
      clipRule="evenodd"
    />
  </svg>
);

const IconInfoGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fill="currentColor"
      d="m3.147 6.574.503-1.118a9.1 9.1 0 0 0 3.185 2.507 9.1 9.1 0 0 0 4 .887 9 9 0 0 0 3.152-.56 9 9 0 0 0 2.738-1.628l.511 1.014q-1.35 1.086-2.993 1.677a10.1 10.1 0 0 1-3.409.583q-1.476 0-2.874-.391a10.6 10.6 0 0 1-2.618-1.15 10.4 10.4 0 0 1-2.195-1.821m-.87 4.536.28-1.214a12.2 12.2 0 0 0 3.304 2.236q1.82.823 3.768 1.047t3.88-.176q1.94-.399 3.68-1.422l.031 1.23a13 13 0 0 1-3.767 1.318 13.6 13.6 0 0 1-7.776-.886 13 13 0 0 1-3.4-2.133m3.975 5.495a12.6 12.6 0 0 1-.51-1.94 13 13 0 0 1-.184-1.982 13 13 0 0 1 .423-3.945q.51-1.924 1.548-3.61a13.3 13.3 0 0 1 2.555-3.019l1.141.456A12.2 12.2 0 0 0 8.64 5.4a12.3 12.3 0 0 0-1.573 3.458 11.9 11.9 0 0 0-.423 3.817q.008 1.095.24 2.157.231 1.055.654 2.06zm5.309.798a13.35 13.35 0 0 1-2.403-7.667q0-1.925.535-3.761a13.4 13.4 0 0 1 1.572-3.442l1.062.375a12 12 0 0 0-2.084 6.828q0 1.957.6 3.802.598 1.837 1.731 3.41zm4.653-2.954a9.7 9.7 0 0 1-4.166-5 9.7 9.7 0 0 1-.591-3.282 9.7 9.7 0 0 1 .151-1.813 9.4 9.4 0 0 1 .487-1.741l1.046.295a8.3 8.3 0 0 0-.463 1.597 9 9 0 0 0-.136 1.654q.017 1.565.551 2.986.543 1.414 1.525 2.572a8.5 8.5 0 0 0 2.33 1.909zm-9.635-4.6a1.27 1.27 0 0 1-.933-.384 1.3 1.3 0 0 1-.384-.935q0-.542.384-.926a1.27 1.27 0 0 1 .933-.383q.535 0 .918.383.384.383.384.926 0 .544-.384.935a1.25 1.25 0 0 1-.918.383m6.131.662q-.55 0-.934-.383a1.3 1.3 0 0 1-.375-.935q0-.534.375-.91a1.27 1.27 0 0 1 .934-.383q.535 0 .91.383.383.375.383.91 0 .543-.383.935-.375.383-.91.383m-2.387 4.544a1.28 1.28 0 0 1-.942-.383 1.27 1.27 0 0 1-.383-.934q0-.552.383-.935a1.28 1.28 0 0 1 .942-.383q.543 0 .926.383.384.384.383.935 0 .55-.383.934a1.26 1.26 0 0 1-.926.383m-.327 3.195a7.9 7.9 0 0 1-3.185-.647 8.3 8.3 0 0 1-2.634-1.78 8.5 8.5 0 0 1-1.78-2.636A7.9 7.9 0 0 1 1.75 10q0-1.693.647-3.187a8.46 8.46 0 0 1 4.406-4.417 7.9 7.9 0 0 1 3.185-.646q1.7 0 3.193.647a8.4 8.4 0 0 1 2.634 1.789 8.3 8.3 0 0 1 1.788 2.627q.647 1.494.647 3.187t-.647 3.187a8.43 8.43 0 0 1-4.422 4.416 7.9 7.9 0 0 1-3.185.647m0-1.278q1.43 0 2.69-.55a7.08 7.08 0 0 0 3.728-3.73q.55-1.263.55-2.692t-.55-2.691a7 7 0 0 0-1.509-2.22 7.1 7.1 0 0 0-2.227-1.502 6.65 6.65 0 0 0-2.69-.551q-1.42 0-2.682.55-1.26.544-2.22 1.502a7.2 7.2 0 0 0-1.508 2.22A6.7 6.7 0 0 0 3.035 10q0 1.43.543 2.691.55 1.262 1.509 2.229a7 7 0 0 0 2.219 1.501q1.26.55 2.69.551"
    />
  </svg>
);

const IconInfoClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5.965 10.998a.62.62 0 0 1-.455-.183.62.62 0 0 1-.184-.456q0-.27.184-.447a.62.62 0 0 1 .455-.184h3.392v-4.6q0-.263.184-.447a.6.6 0 0 1 .447-.184q.272 0 .455.184a.6.6 0 0 1 .184.447v5.231a.62.62 0 0 1-.184.456.62.62 0 0 1-.455.183zm4.031 7.252a7.9 7.9 0 0 1-3.185-.647 8.3 8.3 0 0 1-2.634-1.78 8.5 8.5 0 0 1-1.78-2.636A7.9 7.9 0 0 1 1.75 10q0-1.693.647-3.187a8.46 8.46 0 0 1 4.406-4.417 7.9 7.9 0 0 1 3.185-.646q1.7 0 3.193.647a8.4 8.4 0 0 1 2.634 1.789 8.3 8.3 0 0 1 1.788 2.627q.647 1.494.647 3.187t-.647 3.187a8.43 8.43 0 0 1-4.422 4.416 7.9 7.9 0 0 1-3.185.647m0-1.63q1.38 0 2.578-.51 1.198-.511 2.108-1.422a6.6 6.6 0 0 0 1.42-2.108q.512-1.199.512-2.58 0-1.374-.511-2.572a6.6 6.6 0 0 0-3.537-3.538 6.5 6.5 0 0 0-2.578-.51q-1.373 0-2.578.51a6.5 6.5 0 0 0-2.1 1.422 6.7 6.7 0 0 0-1.413 2.116A6.5 6.5 0 0 0 3.387 10q0 1.382.51 2.58a6.7 6.7 0 0 0 1.413 2.108 6.54 6.54 0 0 0 4.686 1.933"
    />
  </svg>
);

const IconQrSmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28" aria-hidden="true">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.167 3.175h1.666c.532 0 .98 0 1.348.03.384.031.752.1 1.101.278.532.27.964.703 1.235 1.234.178.35.246.718.278 1.102.03.368.03.816.03 1.348v1.666c0 .532 0 .98-.03 1.348-.032.384-.1.752-.278 1.102-.27.531-.703.963-1.235 1.234-.35.178-.717.247-1.101.278-.368.03-.816.03-1.348.03H7.167c-.532 0-.98 0-1.348-.03-.384-.031-.752-.1-1.102-.278a2.83 2.83 0 0 1-1.234-1.234c-.178-.35-.247-.718-.278-1.102-.03-.368-.03-.816-.03-1.348V7.167c0-.532 0-.98.03-1.348.031-.384.1-.752.278-1.102.27-.531.703-.963 1.234-1.234.35-.178.718-.247 1.102-.278.367-.03.816-.03 1.348-.03M5.953 4.85c-.282.023-.408.063-.487.103-.22.113-.4.292-.513.514-.04.078-.08.204-.104.487-.024.292-.024.672-.024 1.246v1.6c0 .574 0 .954.024 1.246.023.283.064.41.104.487.113.222.292.401.513.514.079.04.205.08.487.103.293.024.673.025 1.247.025h1.6c.573 0 .954 0 1.246-.025.283-.023.409-.063.487-.103.221-.113.401-.293.514-.514.04-.078.08-.204.103-.487.024-.292.025-.672.025-1.246V7.2c0-.574 0-.954-.025-1.246-.023-.283-.063-.41-.103-.487a1.18 1.18 0 0 0-.514-.514c-.078-.04-.204-.08-.487-.103-.292-.024-.673-.025-1.246-.025H7.2c-.574 0-.954 0-1.247.025m.797 2.7c0-.28 0-.42.054-.527a.5.5 0 0 1 .219-.218c.107-.055.247-.055.527-.055h.9c.28 0 .42 0 .527.054a.5.5 0 0 1 .218.219c.055.107.055.247.055.527v.9c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.218c-.107.055-.247.055-.527.055h-.9c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.219-.218C6.75 8.87 6.75 8.73 6.75 8.45zm.417 7.625h1.666c.532 0 .98 0 1.348.03.384.031.752.1 1.101.278.532.27.964.703 1.235 1.235.178.35.246.717.278 1.101.03.368.03.816.03 1.348v1.666c0 .532 0 .98-.03 1.348-.032.384-.1.752-.278 1.101-.27.532-.703.964-1.235 1.235-.35.178-.717.247-1.101.278-.368.03-.816.03-1.348.03H7.167c-.532 0-.98 0-1.348-.03-.384-.031-.752-.1-1.102-.278a2.83 2.83 0 0 1-1.234-1.235c-.178-.35-.247-.717-.278-1.101-.03-.367-.03-.816-.03-1.348v-1.666c0-.532 0-.98.03-1.348.031-.384.1-.752.278-1.101.27-.532.703-.964 1.234-1.235.35-.178.718-.247 1.102-.278.367-.03.816-.03 1.348-.03m-1.214 1.674c-.282.024-.408.064-.487.104-.22.113-.4.293-.513.514-.04.078-.08.204-.104.487-.024.292-.024.672-.024 1.246v1.6c0 .574 0 .954.024 1.246.023.283.064.41.104.487.113.221.292.401.513.514.079.04.205.08.487.104.293.023.673.024 1.247.024h1.6c.573 0 .954 0 1.246-.024.283-.024.409-.064.487-.104.221-.113.401-.293.514-.514.04-.078.08-.204.103-.487.024-.292.025-.672.025-1.246v-1.6c0-.574 0-.954-.025-1.246-.023-.283-.063-.41-.103-.487a1.17 1.17 0 0 0-.514-.514c-.078-.04-.204-.08-.487-.104a18 18 0 0 0-1.246-.024H7.2c-.574 0-.954 0-1.247.024m.797 2.701c0-.28 0-.42.054-.527a.5.5 0 0 1 .219-.218c.107-.055.247-.055.527-.055h.9c.28 0 .42 0 .527.055a.5.5 0 0 1 .218.218c.055.107.055.247.055.527v.9c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.218c-.107.055-.247.055-.527.055h-.9c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.219-.218c-.054-.107-.054-.247-.054-.527zm9-3c0-.28 0-.42.054-.527a.5.5 0 0 1 .219-.218c.107-.055.247-.055.527-.055h.9c.28 0 .42 0 .527.055a.5.5 0 0 1 .218.218c.055.107.055.247.055.527v.9c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.218c-.107.055-.247.055-.527.055h-.9c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.219-.218c-.054-.107-.054-.247-.054-.527zm3 3c0-.28 0-.42.054-.527a.5.5 0 0 1 .219-.218c.107-.055.247-.055.527-.055h.9c.28 0 .42 0 .527.055a.5.5 0 0 1 .218.218c.055.107.055.247.055.527v.9c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.218c-.107.055-.247.055-.527.055h-.9c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.219-.218c-.054-.107-.054-.247-.054-.527zm-2.946 2.473c-.054.107-.054.247-.054.527v.9c0 .28 0 .42.054.527a.5.5 0 0 0 .219.218c.107.055.247.055.527.055h.9c.28 0 .42 0 .527-.055a.5.5 0 0 0 .218-.218c.055-.107.055-.247.055-.527v-.9c0-.28 0-.42-.055-.527a.5.5 0 0 0-.218-.218c-.107-.055-.247-.055-.527-.055h-.9c-.28 0-.42 0-.527.055a.5.5 0 0 0-.219.218m5.946-5.473c0-.28 0-.42.054-.527a.5.5 0 0 1 .219-.218c.107-.055.247-.055.527-.055h.9c.28 0 .42 0 .527.055a.5.5 0 0 1 .218.218c.055.107.055.247.055.527v.9c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.218c-.107.055-.247.055-.527.055h-.9c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.219-.218c-.054-.107-.054-.247-.054-.527zm.054 5.473c-.054.107-.054.247-.054.527v.9c0 .28 0 .42.054.527a.5.5 0 0 0 .219.218c.107.055.247.055.527.055h.9c.28 0 .42 0 .527-.055a.5.5 0 0 0 .218-.218c.055-.107.055-.247.055-.527v-.9c0-.28 0-.42-.055-.527a.5.5 0 0 0-.218-.218c-.107-.055-.247-.055-.527-.055h-.9c-.28 0-.42 0-.527.055a.5.5 0 0 0-.219.218M19.167 3.175h1.666c.532 0 .98 0 1.348.03.384.031.752.1 1.101.278.532.27.964.703 1.235 1.234.178.35.246.718.278 1.102.03.368.03.816.03 1.348v1.666c0 .532 0 .98-.03 1.348-.032.384-.1.752-.278 1.102-.27.531-.703.963-1.235 1.234-.35.178-.717.247-1.101.278-.368.03-.816.03-1.348.03h-1.666c-.532 0-.98 0-1.348-.03-.384-.031-.752-.1-1.102-.278a2.83 2.83 0 0 1-1.234-1.234c-.178-.35-.247-.718-.278-1.102-.03-.368-.03-.816-.03-1.348V7.167c0-.532 0-.98.03-1.348.031-.384.1-.752.278-1.102.27-.531.703-.963 1.234-1.234.35-.178.718-.247 1.102-.278.367-.03.816-.03 1.348-.03M17.953 4.85c-.282.023-.408.063-.487.103-.22.113-.4.292-.513.514-.04.078-.08.204-.104.487-.024.292-.024.672-.024 1.246v1.6c0 .574 0 .954.024 1.246.023.283.064.41.104.487.113.222.292.401.513.514.079.04.205.08.487.103.293.024.673.025 1.247.025h1.6c.573 0 .954 0 1.246-.025.283-.023.409-.063.487-.103.221-.113.401-.293.514-.514.04-.078.08-.204.103-.487.024-.292.025-.672.025-1.246V7.2c0-.574 0-.954-.025-1.246-.023-.283-.063-.41-.103-.487a1.18 1.18 0 0 0-.514-.514c-.078-.04-.204-.08-.487-.103-.292-.024-.672-.025-1.246-.025h-1.6c-.574 0-.954 0-1.247.025m.797 2.7c0-.28 0-.42.054-.527a.5.5 0 0 1 .219-.218c.107-.055.247-.055.527-.055h.9c.28 0 .42 0 .527.054a.5.5 0 0 1 .218.219c.055.107.055.247.055.527v.9c0 .28 0 .42-.055.527a.5.5 0 0 1-.218.218c-.107.055-.247.055-.527.055h-.9c-.28 0-.42 0-.527-.055a.5.5 0 0 1-.219-.218c-.054-.107-.054-.247-.054-.527z"
      clipRule="evenodd"
    />
  </svg>
);

function TonOtherCryptoDepositScreen({ asset, bridgeSourceNetwork = null, onHome }) {
  const code = String(asset?.code || 'BTC').toUpperCase();
  const isStablecoinBridge =
    (code === 'USDT' || code === 'USDC') &&
    bridgeSourceNetwork?.id &&
    (code !== 'USDT' || bridgeSourceNetwork.id !== 'ton');

  const cryptoMeta = useMemo(() => {
    if (isStablecoinBridge) {
      const lim = BRIDGE_LIMITS[bridgeSourceNetwork.id] || BRIDGE_LIMITS.default;
      return {
        ...lim,
        networkLine: bridgeSourceNetwork.title,
        addressLabel: `${code} ${bridgeSourceNetwork.title}`,
      };
    }
    return DEPOSIT_META[code] || DEPOSIT_META.BTC;
  }, [code, isStablecoinBridge, bridgeSourceNetwork]);

  const meta = cryptoMeta;
  const address = useMemo(() => {
    if (isStablecoinBridge) {
      const by = STABLECOIN_ADDRESSES[code] || {};
      return by[bridgeSourceNetwork.id] || '';
    }
    const m = DEPOSIT_META[code] || DEPOSIT_META.BTC;
    const by = ADDRESS_BY_ASSET[code] || ADDRESS_BY_ASSET.BTC;
    return by[m.networkId] || '';
  }, [code, isStablecoinBridge, bridgeSourceNetwork?.id]);

  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {
      setCopied(false);
    }
  };

  const sub = bridgeSourceNetwork?.subtitle || '';

  return (
    <div className="ton-other-crypto-deposit">
      <div className="ton-other-crypto-deposit-scroll">
      <header
        className={`ton-other-crypto-deposit-header${isStablecoinBridge ? ' ton-other-crypto-deposit-header--stablecoin' : ''}`}
      >
        <div
          className={`ton-other-crypto-deposit-icons${isStablecoinBridge ? ' ton-other-crypto-deposit-icons--single' : ''}`}
          aria-hidden="true"
        >
          {isStablecoinBridge ? (
            <span className="ton-other-crypto-deposit-icon ton-other-crypto-deposit-icon--single">{asset?.icon}</span>
          ) : (
            <>
              <span className="ton-other-crypto-deposit-icon ton-other-crypto-deposit-icon--from">{asset?.icon}</span>
              <span className="ton-other-crypto-deposit-icon ton-other-crypto-deposit-icon--ton">
                <IconToncoin size={72} />
              </span>
            </>
          )}
        </div>
        <div className="ton-other-crypto-deposit-titles">
          {isStablecoinBridge ? (
            <>
              <p className="ton-other-crypto-deposit-line">
                Отправляете {code}{' '}
                <span className="ton-other-crypto-deposit-sub">{sub}</span>
              </p>
              <p className="ton-other-crypto-deposit-line">
                Получаете {code}{' '}
                <span className="ton-other-crypto-deposit-sub">TON</span>
              </p>
            </>
          ) : (
            <>
              <p className="ton-other-crypto-deposit-line">
                Отправляете <span className="ton-other-crypto-deposit-code">{code}</span>
              </p>
              <p className="ton-other-crypto-deposit-line">
                Получаете <span className="ton-other-crypto-deposit-code">TON</span>
              </p>
            </>
          )}
        </div>
        <p className="ton-other-crypto-deposit-rate">
          {isStablecoinBridge
            ? `1 ${code} ${sub} = 1 ${code} TON`
            : `1 ${code} ≈ ${meta.rateTon} TON`}
        </p>
      </header>

      <section className="ton-other-crypto-deposit-card">
        <div className="ton-other-crypto-deposit-card-label">Адрес {meta.addressLabel}</div>
        <div className="ton-other-crypto-deposit-address">{address}</div>
        <div className="ton-other-crypto-deposit-actions">
          <button type="button" className="ton-other-crypto-deposit-copy" onClick={handleCopy}>
            <IconCopy />
            <span>{copied ? 'Скопировано' : 'Копировать адрес'}</span>
          </button>
          <button
            type="button"
            className="ton-other-crypto-deposit-qr-btn"
            onClick={() => setQrOpen(true)}
            aria-label="Показать QR-код"
          >
            <IconQrSmall />
          </button>
        </div>
      </section>

      <section className="ton-other-crypto-deposit-info">
        <h2 className="ton-other-crypto-deposit-info-title">Важно знать</h2>
        <ul className="ton-other-crypto-deposit-info-list">
          <li className="ton-other-crypto-deposit-info-item">
            <span className="ton-other-crypto-deposit-info-icon-wrap" aria-hidden="true">
              <IconInfoWarn />
            </span>
            <div>
              <strong>Используйте адрес для одного пополнения</strong>
              <p>Повторные переводы приведут к потере средств</p>
            </div>
          </li>
          <li className="ton-other-crypto-deposit-info-item">
            <span className="ton-other-crypto-deposit-info-icon-wrap" aria-hidden="true">
              <IconInfoMoney />
            </span>
            <div>
              <strong>
                Минимум — {meta.min} {code}, макс — {meta.max} {code}
              </strong>
              <p>Переводы вне лимитов приведут к потере средств</p>
            </div>
          </li>
          <li className="ton-other-crypto-deposit-info-item">
            <span className="ton-other-crypto-deposit-info-icon-wrap" aria-hidden="true">
              <IconInfoGlobe />
            </span>
            <div>
              <strong>Отправляйте только через сеть {meta.networkLine}</strong>
              <p>Переводы через другие сети приведут к потере средств</p>
            </div>
          </li>
          <li className="ton-other-crypto-deposit-info-item">
            <span className="ton-other-crypto-deposit-info-icon-wrap" aria-hidden="true">
              <IconInfoClock />
            </span>
            <div>
              <strong>Зачисление занимает до {meta.creditMinutes} мин</strong>
            </div>
          </li>
        </ul>
      </section>

      {isStablecoinBridge ? (
        <p className="ton-other-crypto-deposit-legal">
          Сервис предоставляется партнёром swaps.xyz. Продолжая, вы соглашаетесь с{' '}
          <a href="https://swaps.xyz" target="_blank" rel="noopener noreferrer">
            условиями использования
          </a>
          .
        </p>
      ) : null}
      </div>

      <div className="ton-other-crypto-deposit-footer">
        <button type="button" className="ton-other-crypto-deposit-home" onClick={() => onHome?.()}>
          НА ГЛАВНЫЙ ЭКРАН
        </button>
      </div>

      {qrOpen ? (
        <div className="ton-other-crypto-deposit-qr-overlay" role="dialog" aria-modal="true" aria-label="QR-код">
          <button type="button" className="ton-other-crypto-deposit-qr-close" onClick={() => setQrOpen(false)}>
            Закрыть
          </button>
          <div className="ton-other-crypto-deposit-qr-sheet">
            <QrWithHole value={address} size={220} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TonOtherCryptoDepositScreen;
