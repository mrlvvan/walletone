import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import AssetScreen from './components/AssetScreen';
import BonusScreen from './components/BonusScreen';
import HomeScreen from './components/HomeScreen';
import TransferScreen from './components/TransferScreen';
import BuyCryptoScreen from './components/BuyCryptoScreen';
import WithdrawScreen from './components/WithdrawScreen';
import BuyCryptoNetworkScreen from './components/BuyCryptoNetworkScreen';
import BuyCryptoAddressScreen from './components/BuyCryptoAddressScreen';
import ExchangeScreen from './components/ExchangeScreen';
import ExchangeCurrencyPicker from './components/ExchangeCurrencyPicker';
import HistoryScreen from './components/HistoryScreen';
import MarketScreen from './components/MarketScreen';
import TabBar from './components/TabBar';
import { initTelegramThemeSync } from './telegramTheme';
import { fetchAllPrices } from './services/priceService';
import { useRates } from './context/RatesContext';
import {
  IconDollar,
  IconBtc,
  IconEth,
  IconXrp,
  IconSol,
  IconTrx,
  IconDoge,
  IconBch,
  IconCati,
  IconLink,
  IconApt,
  IconCardano,
  IconStellar,
  IconLitecoin,
  IconSui,
  IconAvalanche,
  IconShibaInu,
  IconHedera,
  IconWorldLibertyFinancial,
  IconToncoin,
  IconPolkadot,
  IconUniswap,
  IconGold,
  IconMantle,
  IconAave,
  IconPepe,
  IconNearProtocol,
  IconAster,
  IconEtheriumClassic,
  IconInternetComputer,
  IconSky,
  IconPi,
  IconOnd,
  IconPol,
  IconWorldCoin,
  IconEthena,
  IconTslax,
  IconNvdaX,
  IconGooglX,
  IconAaplX,
  IconCoinX,
  IconHoodX,
  IconMcdX,
  IconCscoX,
} from './components/Icons';

function App() {
  const assets = [
    {
      id: 'major',
      name: 'Major',
      code: 'MAJOR · 6,96 ₽',
      amount: '6.91 MAJOR',
      value: '1,38 ₽',
      delta: '-0,01 ₽',
      price: '0,20 ₽',
      change: '-0,04%',
      icon: (
        <span style={{ willChange: 'auto', opacity: 1 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="42"
            height="42"
            fill="none"
            viewBox="0 0 360 360"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <image
              xlinkHref="data:image/webp;base64,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"
              width="100%"
              height="100%"
              clipPath="inset(0% round 50%)"
            />
          </svg>
        </span>
      ),
      styleClass: 'major',
    },
  ];

  const activity = [
    { id: 1, title: 'Обмен: BTC на USDT', time: '12 нояб. 2025 г. в 16:16', value: '0,0002039 BTC', tone: 'danger' },
    { id: 2, title: 'Покупка: P2P', time: '12 нояб. 2025 г. в 15:49', value: '+0,0002039 BTC', tone: 'success' },
    { id: 3, title: 'Обмен: BTC на USDT', time: '23 мая 2024 г. в 19:01', value: '0,0000359 BTC', tone: 'danger' },
  ];

  // Данные развертки для каждой монеты (по id)
  const assetDetails = {
    major: {
      price: '0,20 ₽',
      delta: '-0,01 ₽',
      percent: '-0,04%',
      period: '24 ч',
      description: 'Major (MAJOR) — токен платформы с возможностью расчётов и переводов.',
      features: [
        'Получайте и отправляйте MAJOR кому угодно (с комиссией).',
        'Подходит для расчётов в экосистеме.',
      ],
      overview: {
        capitalization: { value: '₽1,38', change: '-0,04%', isPositive: false },
        volume: { value: '₽0,05', change: '+2,1%', isPositive: true },
        inCirculation: { value: '6.91 MAJOR' },
      },
    },
    btc: {
      price: '5 014 761,57 ₽',
      delta: '-384 902,36 ₽',
      percent: '-7,13%',
      period: 'Сегодня',
      description: 'Bitcoin (BTC) — это первая криптовалюта, созданная в 2009.',
      features: [
        'Получайте и отправляйте кому угодно (с комиссией).',
        'Подходит для любых расчётов в Bitcoin.',
      ],
      overview: {
        capitalization: { value: '₽100.22T', change: '-7,13%', isPositive: false },
        volume: { value: '₽11.1T', change: '+80,74%', isPositive: true },
        inCirculation: { value: '19.99M BTC' },
      },
    },
    ton: {
      price: '684,50 ₽',
      delta: '+12,30 ₽',
      percent: '+1,83%',
      period: 'Сегодня',
      description: 'Toncoin (TON) — нативный токен сети TON, созданный для быстрых и дешёвых переводов.',
      features: [
        'Мгновенные переводы с минимальной комиссией.',
        'Интеграция с Telegram и приложениями TON.',
      ],
      overview: {
        capitalization: { value: '₽18.5T', change: '+1,83%', isPositive: true },
        volume: { value: '₽2.1T', change: '+15,2%', isPositive: true },
        inCirculation: { value: '5.1B TON' },
      },
    },
    usdt: {
      price: '75,98 ₽',
      delta: '+0,12 ₽',
      percent: '+0,16%',
      period: 'Сегодня',
      description: 'Tether (USDT) — стейблкоин, привязанный к курсу доллара США.',
      features: [
        'Стабильная стоимость 1 USDT ≈ 1 USD.',
        'Удобен для хранения и переводов в долларовом эквиваленте.',
      ],
      overview: {
        capitalization: { value: '₽22.8T', change: '+0,16%', isPositive: true },
        volume: { value: '₽45.2T', change: '-3,2%', isPositive: false },
        inCirculation: { value: '120B USDT' },
      },
    },
    tsla: {
      price: '— ₽',
      delta: '—',
      percent: '-2,13%',
      period: '24 ч',
      description: 'Tesla (TSLAx) — токенизированная акция Tesla для переводов и расчётов.',
      features: [
        'Получайте и отправляйте TSLAx кому угодно (с комиссией).',
        'Подходит для расчётов в сети.',
      ],
      overview: {
        capitalization: { value: '—', change: '-2,13%', isPositive: false },
        volume: { value: '—', change: '—', isPositive: true },
        inCirculation: { value: '—' },
      },
    },
    goog: {
      price: '— ₽',
      delta: '—',
      percent: '-1,19%',
      period: '24 ч',
      description: 'Alphabet (GOOGLx) — токенизированная акция Google для переводов и расчётов.',
      features: [
        'Получайте и отправляйте GOOGLx кому угодно (с комиссией).',
        'Подходит для расчётов в сети.',
      ],
      overview: {
        capitalization: { value: '—', change: '-1,19%', isPositive: false },
        volume: { value: '—', change: '—', isPositive: true },
        inCirculation: { value: '—' },
      },
    },
    nvda: {
      price: '— ₽',
      delta: '—',
      percent: '-1,71%',
      period: '24 ч',
      description: 'NVIDIA (NVDAx) — токенизированная акция NVIDIA для переводов и расчётов.',
      features: [
        'Получайте и отправляйте NVDAx кому угодно (с комиссией).',
        'Подходит для расчётов в сети.',
      ],
      overview: {
        capitalization: { value: '—', change: '-1,71%', isPositive: false },
        volume: { value: '—', change: '—', isPositive: true },
        inCirculation: { value: '—' },
      },
    },
    aapl: {
      price: '— ₽',
      delta: '—',
      percent: '-1,17%',
      period: '24 ч',
      description: 'Apple (AAPLx) — токенизированная акция Apple для переводов и расчётов.',
      features: [
        'Получайте и отправляйте AAPLx кому угодно (с комиссией).',
        'Подходит для расчётов в сети.',
      ],
      overview: {
        capitalization: { value: '—', change: '-1,17%', isPositive: false },
        volume: { value: '—', change: '—', isPositive: true },
        inCirculation: { value: '—' },
      },
    },
    coin: {
      price: '— ₽',
      delta: '—',
      percent: '-2,12%',
      period: '24 ч',
      description: 'Coinbase (COINx) — токенизированная акция Coinbase для переводов и расчётов.',
      features: [
        'Получайте и отправляйте COINx кому угодно (с комиссией).',
        'Подходит для расчётов в сети.',
      ],
      overview: {
        capitalization: { value: '—', change: '-2,12%', isPositive: false },
        volume: { value: '—', change: '—', isPositive: true },
        inCirculation: { value: '—' },
      },
    },
    hood: {
      price: '— ₽',
      delta: '—',
      percent: '-2,96%',
      period: '24 ч',
      description: 'Robinhood (HOODx) — токенизированная акция Robinhood для переводов и расчётов.',
      features: [
        'Получайте и отправляйте HOODx кому угодно (с комиссией).',
        'Подходит для расчётов в сети.',
      ],
      overview: {
        capitalization: { value: '—', change: '-2,96%', isPositive: false },
        volume: { value: '—', change: '—', isPositive: true },
        inCirculation: { value: '—' },
      },
    },
    mcd: {
      price: '— ₽',
      delta: '—',
      percent: '—%',
      period: '24 ч',
      description: 'McDonald\'s (MCD) — токенизированная акция для переводов и расчётов.',
      features: ['Получайте и отправляйте MCD кому угодно (с комиссией).', 'Подходит для расчётов в сети.'],
      overview: { capitalization: { value: '—', change: '—', isPositive: false }, volume: { value: '—', change: '—', isPositive: true }, inCirculation: { value: '—' } },
    },
    cisco: {
      price: '— ₽',
      delta: '—',
      percent: '—%',
      period: '24 ч',
      description: 'Cisco (CSCO) — токенизированная акция Cisco для переводов и расчётов.',
      features: ['Получайте и отправляйте CSCO кому угодно (с комиссией).', 'Подходит для расчётов в сети.'],
      overview: { capitalization: { value: '—', change: '—', isPositive: false }, volume: { value: '—', change: '—', isPositive: true }, inCirculation: { value: '—' } },
    },
    amzn: {
      price: '— ₽',
      delta: '—',
      percent: '—%',
      period: '24 ч',
      description: 'Amazon (AMZNx) — токенизированная акция Amazon для переводов и расчётов.',
      features: ['Получайте и отправляйте AMZNx кому угодно (с комиссией).', 'Подходит для расчётов в сети.'],
      overview: { capitalization: { value: '—', change: '—', isPositive: false }, volume: { value: '—', change: '—', isPositive: true }, inCirculation: { value: '—' } },
    },
  };

  const [screen, setScreen] = useState('home');
  const [prevScreen, setPrevScreen] = useState('home');
  const mainRef = useRef(null);
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [selectedDepositAsset, setSelectedDepositAsset] = useState(null);
  const [selectedDepositNetwork, setSelectedDepositNetwork] = useState(null);
  const [livePrices, setLivePrices] = useState({});
  const { updateRates } = useRates();

  const refreshPrices = useCallback(() => {
    fetchAllPrices()
      .then((prices) => {
        if (prices && Object.keys(prices).length > 0) setLivePrices(prices);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      fetchAllPrices()
        .then((prices) => {
          if (!cancelled && prices && Object.keys(prices).length > 0) setLivePrices(prices);
        })
        .catch(() => {});
    load();
    const interval = setInterval(load, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (screen === 'asset' || screen === 'trade' || screen === 'exchange') refreshPrices();
  }, [screen, selectedAsset?.id]);

  useEffect(() => {
    const prices = livePrices;
    const idsWithPrice = Object.keys(prices).filter((id) => prices[id]?.priceRaw != null && prices[id].priceRaw > 0);
    if (idsWithPrice.length < 2) return;
    const codeById = {
      btc: 'BTC', eth: 'ETH', ton: 'TON', usdt: 'USDT', xrp: 'XRP', sol: 'SOL', trx: 'TRX', doge: 'DOGE',
      bch: 'BCH', link: 'LINK', apt: 'APT', ada: 'ADA', xlm: 'XLM', ltc: 'LTC', sui: 'SUI', avax: 'AVAX',
      shib: 'SHIB', hbar: 'HBAR', dot: 'DOT', uni: 'UNI', xaut: 'XAUT', mnt: 'MNT', aave: 'AAVE', pepe: 'PEPE',
      near: 'NEAR', etc: 'ETC', icp: 'ICP', sky: 'SKY', pi: 'PI', ondo: 'ONDO', pol: 'POL', wld: 'WLD', ena: 'ENA',
    };
    const newRates = {};
    for (const id1 of idsWithPrice) {
      for (const id2 of idsWithPrice) {
        if (id1 === id2) continue;
        const code1 = codeById[id1];
        const code2 = codeById[id2];
        if (!code1 || !code2) continue;
        const p1 = prices[id1].priceRaw;
        const p2 = prices[id2].priceRaw;
        /* code1_to_code2 = сколько code2 за 1 code2. 1 from = p1 RUB, 1 to = p2 RUB => 1 from = p1/p2 to */
        if (p2 > 0) newRates[`${code1}_${code2}`] = p1 / p2;
      }
    }
    if (Object.keys(newRates).length > 0) updateRates(newRates);
  }, [livePrices, updateRates]);

  useEffect(() => {
    const cleanup = initTelegramThemeSync();
    const tg = (window.Telegram && window.Telegram.WebApp) || (window.telegram && window.telegram.webapp);
    if (tg && typeof tg.ready === 'function') {
      tg.ready();
    }
    if (tg && typeof tg.expand === 'function') {
      tg.expand();
    }
    return cleanup;
  }, []);

  useEffect(() => {
    const tg = (window.Telegram && window.Telegram.WebApp) || (window.telegram && window.telegram.webapp);
    const backButton = tg?.BackButton || tg?.backButton;
    if (!backButton) return;

    const handleBack = () => {
      setScreen(prevScreen || 'home');
    };

    if (screen === 'asset' || screen === 'transfer' || screen === 'buyCrypto' || screen === 'buyCryptoDeposit' || screen === 'buyCryptoNetwork' || screen === 'buyCryptoAddress' || screen === 'withdraw') {
      backButton.show();
      backButton.onClick(handleBack);
    } else {
      backButton.offClick(handleBack);
      backButton.hide();
    }

    return () => {
      backButton.offClick(handleBack);
      if (screen === 'asset' || screen === 'transfer' || screen === 'buyCrypto' || screen === 'buyCryptoDeposit' || screen === 'buyCryptoNetwork' || screen === 'buyCryptoAddress' || screen === 'withdraw') {
        backButton.hide();
      }
    };
  }, [screen, prevScreen]);

  const walletStats = {
    balanceInt: '1',
    balanceDec: '38',
    delta: '<0,01 ₽',
    percent: '0,01%',
    period: '24 ч',
  };

  const cashAsset = {
    title: 'Доллары',
    subtitle: 'USDT · 75,98 ₽',
    value: '0,00 ₽',
    icon: <IconDollar size={42} />,
    styleClass: 'dollar',
  };

  const cryptoTotal = 'ВСЕГО: 1,38 ₽';

  const promoSlides = [
    {
      id: 'promo-1',
      title: 'Зарабатывайте до 25% годовых на ADI',
      cta: 'Начать зарабатывать',
      theme: 'promo-orange',
      art: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="374"
          height="104"
          fill="none"
          viewBox="0 0 374 104"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: `<path fill="url(#paint0_linear_6841_3001)" d="M325.094 82.926c9.98-5.756 17.577-11.279 16.967-12.336l-2.286-4.013-36.121 20.932 2.265 3.925c.61 1.057 9.195-2.752 19.175-8.508"></path><path fill="url(#paint1_linear_6841_3001)" d="M325.095 82.925c9.98-5.756 17.577-11.279 16.967-12.336l-2.287-4.013-20.414 11.83 3.378 5.856q1.162-.649 2.356-1.337" opacity="0.5"></path><path fill="url(#paint2_linear_6841_3001)" d="m327.803 81.242-2.333-4.046 2.311-1.333 2.334 4.046z" opacity="0.5"></path><path fill="url(#paint3_linear_6841_3001)" d="m313.014 89.291-2.318-4.019 4.519-2.26 2.335 4.049z" opacity="0.3"></path><path stroke="url(#paint4_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M325.094 82.928c9.98-5.756 17.577-11.279 16.967-12.336l-2.286-4.013-36.121 20.932 2.265 3.925c.61 1.057 9.195-2.752 19.175-8.508"></path><ellipse cx="321.637" cy="76.894" fill="url(#paint5_linear_6841_3001)" rx="20.861" ry="2.209" transform="rotate(-29.972 321.637 76.895)"></ellipse><path fill="url(#paint6_linear_6841_3001)" d="M322.747 78.809c9.98-5.756 17.577-11.279 16.967-12.336-.609-1.057-9.194 2.752-19.174 8.508a188 188 0 0 0-5.371 3.214l5.227 1.948a190 190 0 0 0 2.351-1.334" opacity="0.15"></path><ellipse cx="321.637" cy="76.894" stroke="url(#paint7_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" rx="20.861" ry="2.209" transform="rotate(-29.972 321.636 76.893)"></ellipse><path stroke="url(#paint8_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M322.747 78.808a186 186 0 0 0 6.313-3.804m-23.311 9.7c-1.581 1.305-2.392 2.238-2.177 2.612.449.777 5.213-1.079 11.675-4.406"></path><path fill="url(#paint9_linear_6841_3001)" d="M260.111 39.951c-2.982-11.128-6.355-19.894-7.533-19.578l-4.468 1.172 10.889 40.303 4.377-1.175c1.179-.316-.283-9.593-3.265-20.722"></path><path fill="url(#paint10_linear_6841_3001)" d="M260.114 39.951c-2.982-11.128-6.355-19.893-7.533-19.577l-4.467 1.172 6.153 22.776 6.53-1.75q-.327-1.29-.683-2.62" opacity="0.5"></path><path fill="url(#paint11_linear_6841_3001)" d="m259.183 36.9-4.51 1.21-.691-2.578 4.511-1.208z" opacity="0.5"></path><path fill="url(#paint12_linear_6841_3001)" d="m263.146 53.266-4.481 1.2-1.016-4.948 4.514-1.21z" opacity="0.3"></path><path stroke="url(#paint13_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.083" d="M260.119 39.952c-2.982-11.128-6.355-19.894-7.534-19.578l-4.467 1.172 10.889 40.303 4.377-1.175c1.178-.316-.283-9.593-3.265-20.722"></path><ellipse cx="253.392" cy="41.732" fill="url(#paint14_linear_6841_3001)" rx="20.861" ry="2.209" transform="rotate(-105 253.392 41.732)"></ellipse><path fill="url(#paint15_linear_6841_3001)" d="M255.532 41.161c-2.982-11.129-6.354-19.894-7.533-19.578s.283 9.593 3.265 20.722a188 188 0 0 0 1.718 6.018l3.232-4.546q-.326-1.288-.682-2.616" opacity="0.15"></path><ellipse cx="253.392" cy="41.731" stroke="url(#paint16_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.083" rx="20.861" ry="2.209" transform="rotate(-105 253.392 41.731)"></ellipse><path stroke="url(#paint17_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.083" d="M255.527 41.16a186 186 0 0 0-2.044-7.08m3.349 25.025c.851 1.864 1.543 2.89 1.96 2.778.867-.233.305-5.315-1.24-12.417"></path><ellipse cx="300.697" cy="47.466" fill="url(#paint18_linear_6841_3001)" rx="23.419" ry="32.733" transform="matrix(.86603 .50006 -.49994 .86603 64.016 -144.006)"></ellipse><path fill="url(#paint19_linear_6841_3001)" d="M320.856 59.188c9.039-15.656 7.415-33.602-3.786-40.07a17 17 0 0 0-2.01-.99c12.641 11.31 6.1 30.365 1.286 38.456z"></path><path fill="#3358C1" d="m309.834 71.66-4.037-2.331c-3.035 2.649-9.118 5.157-10.816 6.07l3.45 1.991c2.683-.441 9.726-4.172 11.403-5.73"></path><path stroke="#04143F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M312.938 16.876c1.175.618 2.533 1.353 3.843 2.11 11.201 6.466 12.954 24.4 3.915 40.056s-25.447 23.105-36.648 16.638l-3.009-1.667"></path><ellipse cx="297.023" cy="45.456" fill="url(#paint20_linear_6841_3001)" rx="22.46" ry="32.733" transform="matrix(.86603 .50006 -.49994 .86603 62.519 -142.439)"></ellipse><ellipse cx="296.97" cy="44.967" fill="url(#paint21_linear_6841_3001)" rx="17.765" ry="27.582" transform="matrix(.86603 .50006 -.49994 .86603 62.267 -142.477)"></ellipse><ellipse cx="298.442" cy="45.972" fill="url(#paint22_linear_6841_3001)" rx="15.835" ry="26.92" transform="matrix(.86603 .50006 -.49994 .86603 62.967 -143.078)"></ellipse><path stroke="url(#paint23_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M313.292 23.115c-8.45-5.337-21.45 2.624-28.842 15.427-6.458 11.186-6.53 25.354.213 30.933"></path><ellipse cx="296.885" cy="44.945" stroke="url(#paint24_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" rx="17.692" ry="27.546" transform="matrix(.86603 .50006 -.49994 .86603 62.245 -142.438)"></ellipse><path stroke="url(#paint25_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M283.113 68.817c-8.462-4.885-9.155-19.527-1.549-32.702 2.472-4.28 5.515-7.88 8.789-10.621"></path><ellipse cx="297.023" cy="45.456" stroke="url(#paint26_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" rx="22.46" ry="32.733" transform="matrix(.86603 .50006 -.49994 .86603 62.519 -142.439)"></ellipse><path stroke="url(#paint27_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M303.599 70.895c4.865-3.323 9.394-8.174 12.881-14.214 2.552-4.419 4.273-9.003 5.187-13.445m.77-6.506c.109-3.953-.478-7.649-1.741-10.838"></path><path stroke="url(#paint28_linear_6841_3001)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M320.016 34.875c.043.942.089 3.273-.261 5.08m-.765 3.93c-.435 1.721-1.728 6.818-5.695 13.088m-23.357 16.055a10.1 10.1 0 0 1-3.796-.369"></path><path fill="url(#paint29_linear_6841_3001)" d="M305.621 50.108a.9.9 0 0 1-.33.568l-13.58 10.544c-.173.135-.346.153-.467.083l-.907-.528 3.185-16.937a.9.9 0 0 1 .33-.569l13.144-11.151.903.525c.121.07.191.229.16.447zm-8.829-5.868c-.36.28-.456.848-.17 1.014l5.904 3.431c.285.166.732-.199.797-.65l1.29-9.016c.063-.435-.279-.634-.627-.364zm5.511-1.968c.574.334.634 1.303.134 2.164-.5.86-1.371 1.288-1.945.954l-.719-.417s1.493-2.52 1.833-3.105c0 0 .123.07.697.404"></path><path fill="url(#paint30_linear_6841_3001)" d="M304.731 49.59a.9.9 0 0 1-.33.567l-13.58 10.544c-.348.27-.689.072-.627-.364l2.437-17.018a.9.9 0 0 1 .331-.568l13.58-10.544c.347-.27.689-.072.627.364zm-8.829-5.87c-.361.28-.456.85-.171 1.016l5.904 3.43c.286.166.733-.198.797-.65l1.291-9.015c.062-.436-.28-.634-.627-.365zm5.511-1.966c.574.334.634 1.302.133 2.163-.5.86-1.371 1.288-1.945.954-.574-.333-.634-1.301-.134-2.162s1.372-1.289 1.946-.955"></path><path fill="#fff" d="M344.795 51.14c.37-.532 1.204-.3 1.246.347l.185 2.815c.013.2.112.384.272.504l2.252 1.692a.685.685 0 0 1-.342 1.23l-2.802.287a.7.7 0 0 0-.493.29l-1.61 2.318c-.37.533-1.204.3-1.246-.346l-.184-2.816a.7.7 0 0 0-.273-.503l-2.252-1.692a.686.686 0 0 1 .342-1.23l2.802-.288a.7.7 0 0 0 .493-.29z"></path><path fill="#fff" d="M241.458 72.891c-.943-.079-1.259-1.302-.472-1.828l3.423-2.286c.243-.162.402-.422.438-.712l.495-4.08c.109-.903 1.27-1.203 1.803-.465l2.408 3.33a1 1 0 0 0 .727.411l4.102.344c.943.08 1.259 1.303.472 1.828l-3.423 2.287a1 1 0 0 0-.438.711l-.495 4.08c-.109.904-1.27 1.203-1.803.466l-2.408-3.331a1 1 0 0 0-.727-.41z"></path><path fill="#fff" d="M263.201 87.47a.541.541 0 0 1-.716-.73l.986-1.999a.54.54 0 0 0 .013-.452l-.873-2.048a.542.542 0 0 1 .72-.706l2.031.91a.54.54 0 0 0 .452-.004l2.018-.95a.541.541 0 0 1 .716.73l-.987 2a.54.54 0 0 0-.012.451l.873 2.048a.542.542 0 0 1-.72.707l-2.031-.91a.54.54 0 0 0-.452.004z"></path><path fill="#fff" d="M274.882 22.757c.587.276 1.194-.341.907-.923l-1.248-2.53a.68.68 0 0 1-.016-.572l1.104-2.592a.685.685 0 0 0-.91-.894l-2.571 1.152a.7.7 0 0 1-.572-.006l-2.553-1.201c-.587-.276-1.194.341-.907.923l1.249 2.53c.088.18.094.389.016.572l-1.105 2.592a.686.686 0 0 0 .911.894l2.571-1.152a.7.7 0 0 1 .572.006z"></path><defs><linearGradient id="paint0_linear_6841_3001" x1="307.819" x2="343.183" y1="93.117" y2="72.516" gradientUnits="userSpaceOnUse"><stop offset="0.062" stop-color="#011B6A"></stop><stop offset="0.241" stop-color="#14338A"></stop><stop offset="1" stop-color="#6187F4"></stop></linearGradient><linearGradient id="paint1_linear_6841_3001" x1="338.269" x2="326.663" y1="72.192" y2="66.092" gradientUnits="userSpaceOnUse"><stop stop-color="#647BB4"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="paint2_linear_6841_3001" x1="330.077" x2="324.964" y1="79.581" y2="81.565" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="paint3_linear_6841_3001" x1="317.815" x2="309.078" y1="87.127" y2="89.793" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="paint4_linear_6841_3001" x1="305.744" x2="341.797" y1="93.065" y2="71.445" gradientUnits="userSpaceOnUse"><stop stop-color="#0A0C0D"></stop><stop offset="1" stop-color="#1C2639"></stop></linearGradient><linearGradient id="paint5_linear_6841_3001" x1="333.454" x2="307.989" y1="73.987" y2="83.106" gradientUnits="userSpaceOnUse"><stop stop-color="#043BA9"></stop><stop offset="1" stop-color="#275BC2"></stop></linearGradient><linearGradient id="paint6_linear_6841_3001" x1="319.541" x2="334.967" y1="78.442" y2="67.24" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="paint7_linear_6841_3001" x1="316.234" x2="316.408" y1="73.966" y2="79.068" gradientUnits="userSpaceOnUse"><stop stop-color="#001962"></stop><stop offset="1" stop-color="#07267E"></stop></linearGradient><linearGradient id="paint8_linear_6841_3001" x1="336.552" x2="301.469" y1="75.112" y2="83.885" gradientUnits="userSpaceOnUse"><stop stop-color="#9CB5FC"></stop><stop offset="1" stop-color="#5273D2"></stop></linearGradient><linearGradient id="paint9_linear_6841_3001" x1="265.493" x2="254.727" y1="59.273" y2="19.787" gradientUnits="userSpaceOnUse"><stop offset="0.062" stop-color="#011B6A"></stop><stop offset="0.241" stop-color="#14338A"></stop><stop offset="1" stop-color="#6187F4"></stop></linearGradient><linearGradient id="paint10_linear_6841_3001" x1="253.149" x2="244.259" y1="24.453" y2="34.088" gradientUnits="userSpaceOnUse"><stop stop-color="#647BB4"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="paint11_linear_6841_3001" x1="258.167" x2="258.762" y1="34.276" y2="39.726" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="paint12_linear_6841_3001" x1="262.295" x2="262.614" y1="48.07" y2="57.197" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="paint13_linear_6841_3001" x1="264.912" x2="253.34" y1="61.264" y2="20.85" gradientUnits="userSpaceOnUse"><stop stop-color="#0A0C0D"></stop><stop offset="1" stop-color="#1C2639"></stop></linearGradient><linearGradient id="paint14_linear_6841_3001" x1="265.256" x2="239.791" y1="38.837" y2="47.957" gradientUnits="userSpaceOnUse"><stop stop-color="#043BA9"></stop><stop offset="1" stop-color="#275BC2"></stop></linearGradient><linearGradient id="paint15_linear_6841_3001" x1="254.35" x2="247.514" y1="44.164" y2="26.367" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient><linearGradient id="paint16_linear_6841_3001" x1="248.036" x2="248.21" y1="38.817" y2="43.919" gradientUnits="userSpaceOnUse"><stop stop-color="#001962"></stop><stop offset="1" stop-color="#07267E"></stop></linearGradient><linearGradient id="paint17_linear_6841_3001" x1="255.524" x2="254.935" y1="26.87" y2="63.028" gradientUnits="userSpaceOnUse"><stop stop-color="#9CB5FC"></stop><stop offset="1" stop-color="#5273D2"></stop></linearGradient><linearGradient id="paint18_linear_6841_3001" x1="298.868" x2="308.656" y1="84.452" y2="12.352" gradientUnits="userSpaceOnUse"><stop stop-color="#011964"></stop><stop offset="0.5" stop-color="#3456B7"></stop><stop offset="1" stop-color="#678DFC"></stop></linearGradient><linearGradient id="paint19_linear_6841_3001" x1="316.733" x2="325.295" y1="59.041" y2="17.715" gradientUnits="userSpaceOnUse"><stop stop-color="#5074DD"></stop><stop offset="1" stop-color="#668BF9" stop-opacity="0"></stop></linearGradient><linearGradient id="paint20_linear_6841_3001" x1="316.449" x2="280.904" y1="58.367" y2="26.546" gradientUnits="userSpaceOnUse"><stop stop-color="#0D2E8C"></stop><stop offset="0.402" stop-color="#153694"></stop><stop offset="1" stop-color="#5481FF"></stop></linearGradient><linearGradient id="paint21_linear_6841_3001" x1="273.207" x2="304.799" y1="15" y2="82.914" gradientUnits="userSpaceOnUse"><stop offset="0.111" stop-color="#001961"></stop><stop offset="0.402" stop-color="#143593"></stop><stop offset="0.898" stop-color="#9FB2E7"></stop></linearGradient><linearGradient id="paint22_linear_6841_3001" x1="318.16" x2="273.722" y1="59.75" y2="33.589" gradientUnits="userSpaceOnUse"><stop offset="0.136" stop-color="#0A2967"></stop><stop offset="0.521" stop-color="#133492"></stop><stop offset="1" stop-color="#7E93CE"></stop></linearGradient><linearGradient id="paint23_linear_6841_3001" x1="300.911" x2="281.362" y1="22.153" y2="64.702" gradientUnits="userSpaceOnUse"><stop stop-color="#001962"></stop><stop offset="0.501" stop-color="#5273D1"></stop><stop offset="1" stop-color="#A1B9FF"></stop></linearGradient><linearGradient id="paint24_linear_6841_3001" x1="314.933" x2="295.007" y1="20.569" y2="71.742" gradientUnits="userSpaceOnUse"><stop stop-color="#001962"></stop><stop offset="0.501" stop-color="#4767C3"></stop><stop offset="1" stop-color="#A1BAFF"></stop></linearGradient><linearGradient id="paint25_linear_6841_3001" x1="287.517" x2="290.202" y1="35.502" y2="67.143" gradientUnits="userSpaceOnUse"><stop stop-color="#5E7ED8"></stop><stop offset="1" stop-color="#9EB7FD"></stop></linearGradient><linearGradient id="paint26_linear_6841_3001" x1="309.459" x2="271.548" y1="20.494" y2="59.842" gradientUnits="userSpaceOnUse"><stop stop-color="#00103C"></stop><stop offset="0.602" stop-color="#00103C"></stop><stop offset="1" stop-color="#001962"></stop></linearGradient><linearGradient id="paint27_linear_6841_3001" x1="302.02" x2="325.781" y1="69.984" y2="28.827" gradientUnits="userSpaceOnUse"><stop stop-color="#5375EC"></stop><stop offset="1" stop-color="#284198"></stop></linearGradient><linearGradient id="paint28_linear_6841_3001" x1="309.102" x2="320.746" y1="38.186" y2="45.034" gradientUnits="userSpaceOnUse"><stop stop-color="#688FFF"></stop><stop offset="1" stop-color="#5273D1"></stop></linearGradient><linearGradient id="paint29_linear_6841_3001" x1="301.447" x2="293.947" y1="43.746" y2="56.651" gradientUnits="userSpaceOnUse"><stop stop-color="#B84E00"></stop><stop offset="1" stop-color="#0D2142"></stop></linearGradient><linearGradient id="paint30_linear_6841_3001" x1="306.995" x2="290.448" y1="32.562" y2="60.497" gradientUnits="userSpaceOnUse"><stop stop-color="#FFA868"></stop><stop offset="0.361" stop-color="#FE7109"></stop><stop offset="0.851" stop-color="#003BFF"></stop></linearGradient></defs>`,
          }}
        />
      ),
    },
    {
      id: 'promo-2',
      title: 'Дарим акции на сумму до 100 $',
      cta: 'Узнать больше',
      theme: 'promo-purple',
      art: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="374"
          height="104"
          fill="none"
          viewBox="0 0 374 104"
          preserveAspectRatio="xMaxYMid slice"
          aria-hidden="true"
        >
          <g clipPath="url(#clip0_6887_1639)">
            <path
              fill="url(#paint0_linear_6887_1639)"
              d="m336.198 67.368-24.123-23.107-11.568 27.927 24.124 23.107z"
            />
            <path
              stroke="#4C29B7"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m336.198 67.368-24.123-23.107-11.568 27.927 24.124 23.107z"
            />
            <path
              fill="url(#paint1_linear_6887_1639)"
              d="m281.987 43.239 30.088 1.02-11.567 27.927-30.088-1.02z"
            />
            <path
              stroke="url(#paint2_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m281.987 43.239 30.088 1.02-11.567 27.927-30.088-1.02z"
            />
            <path
              fill="url(#paint3_radial_6887_1639)"
              d="M293.826 11.651 281.18 47.177l23.989 21.426 28.545.37 28.715-27.326c-17.847-13.637-43.021-29.307-68.603-29.996"
            />
            <ellipse
              cx="15.076"
              cy="21.072"
              fill="url(#paint4_linear_6887_1639)"
              rx="15.076"
              ry="21.072"
              transform="matrix(.90589 .43036 -.42644 .90128 307.115 31.255)"
            />
            <path
              fill="url(#paint5_linear_6887_1639)"
              d="M325.378 63.215c4.962-10.488 2.953-21.91-4.588-25.492a11 11 0 0 0-1.344-.534c8.726 6.615 5.552 19.156 2.895 24.583z"
            />
            <path
              fill="#D8A54D"
              d="m318.93 71.791-2.717-1.29c-1.806 1.849-5.576 3.76-6.617 4.43l2.322 1.103c1.699-.417 6.018-3.16 7.012-4.243"
            />
            <path
              stroke="#9E5221"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M317.986 36.498c.788.338 1.701.74 2.584 1.16 7.548 3.585 9.641 14.999 4.674 25.493-4.967 10.495-15.112 16.096-22.66 12.51l-2.024-.917"
            />
            <ellipse
              cx="14.46"
              cy="21.073"
              fill="url(#paint6_linear_6887_1639)"
              rx="14.46"
              ry="21.073"
              transform="matrix(.90589 .43036 -.42644 .90128 305.225 30.426)"
            />
            <ellipse
              cx="11.438"
              cy="17.759"
              fill="#C67807"
              rx="11.438"
              ry="17.759"
              transform="matrix(.9059 .43035 -.42645 .90128 306.488 34.407)"
            />
            <path
              fill="url(#paint7_linear_6887_1639)"
              d="M319.503 60.304c-4.083 8.628-11.528 13.658-16.629 11.235s-5.927-11.383-1.845-20.01c4.083-8.63 11.528-13.66 16.629-11.236s5.927 11.382 1.845 20.01"
            />
            <path
              stroke="#994C00"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M318.602 40.505c-5.721-3-13.652 2.76-17.715 11.344-3.55 7.5-2.833 16.592 1.804 19.832"
            />
            <ellipse
              cx="11.391"
              cy="17.736"
              stroke="url(#paint8_linear_6887_1639)"
              strokeLinecap="round"
              strokeLinejoin="round"
              rx="11.391"
              ry="17.736"
              transform="matrix(.9059 .43035 -.42645 .90128 306.471 34.444)"
            />
            <path
              stroke="url(#paint9_linear_6887_1639)"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M301.669 71.338c-5.702-2.708-6.937-12.063-2.757-20.895 1.358-2.87 3.12-5.33 5.077-7.253"
              opacity="0.5"
            />
            <ellipse
              cx="14.46"
              cy="21.073"
              stroke="url(#paint10_linear_6887_1639)"
              strokeLinecap="round"
              strokeLinejoin="round"
              rx="14.46"
              ry="21.073"
              transform="matrix(.90589 .43036 -.42644 .90128 305.226 30.425)"
            />
            <path
              fill="#9F5700"
              d="M314.37 48.004c.438.284.645.756.43 1.209l-.455.962c1.603 1.2 1.87 3.037 1.746 4.152a1.087 1.087 0 0 1-1.2.962c-.596-.067-1.819-.684-1.753-1.282.082-.735.657-1.79-.571-2.373-.651-.31-1.285-.312-1.773-.12-.473.188-.879.586-1.068 1.245-.18.628-.056 1.053.223 1.465.335.494.853.918 1.53 1.501 1.334 1.15 2.539 2.845 1.952 4.855-.359 1.232-1.185 2.233-2.353 2.723-.907.38-1.939.418-2.996.113l-.409.864a.904.904 0 0 1-1.205.431c-.22-.104-1.014-.418-1.095-.63-.084-.222.555-.346.665-.578l.405-.857c-1.777-1.255-1.934-3.29-1.907-4.355.015-.601-.189-1.48.41-1.465.6.015 1.783.638 1.761 1.52-.025 1.007.172 2.174 1.384 2.75.921.438 1.649.408 2.149.198.502-.21.911-.657 1.107-1.325.213-.73-.132-1.6-1.285-2.593-.567-.489-1.372-1.135-1.911-1.93-.594-.878-.892-1.963-.512-3.288.371-1.294 1.243-2.227 2.357-2.668.854-.339 1.806-.372 2.724-.115l.445-.94c.104-.22-.165-.83.046-.91.222-.085.94.337 1.159.479"
            />
            <path
              fill="url(#paint11_linear_6887_1639)"
              d="M313.458 47.682a.78.78 0 0 1 .369 1.036l-.513 1.084c1.619 1.157 1.888 2.97 1.766 4.07a.932.932 0 1 1-1.851-.207c.086-.775-.144-1.988-1.453-2.61-.686-.326-1.365-.333-1.896-.123-.519.206-.958.641-1.16 1.346-.195.678-.058 1.15.243 1.595.35.516.889.955 1.557 1.532 1.321 1.139 2.466 2.775 1.905 4.694-.348 1.191-1.144 2.153-2.264 2.623-.899.376-1.931.406-2.995.076l-.467.989a.776.776 0 1 1-1.403-.667l.464-.98c-1.792-1.204-1.955-3.213-1.928-4.284a.932.932 0 1 1 1.862.047c-.026 1.021.172 2.277 1.473 2.896.953.452 1.727.43 2.275.2.549-.23.989-.716 1.196-1.425.239-.82-.167-1.749-1.333-2.754-.575-.495-1.36-1.125-1.883-1.9-.572-.844-.858-1.883-.492-3.158.358-1.249 1.197-2.143 2.265-2.566.852-.338 1.808-.36 2.726-.081l.503-1.063a.776.776 0 0 1 1.034-.37"
            />
            <path
              fill="url(#paint12_linear_6887_1639)"
              d="M306.243 37.414c4.084-2.372 8.525-3.003 12.31-1.209q.14.069.278.14c.632.275 1.314.578 1.978.892 3.931 1.864 6.395 5.758 7.248 10.473q.126.699.204 1.422l-2.77-1.978-4.063.33-.233-1.314-21.345 3.51-.882 1.658-3.536-1.158q.203-.465.422-.93c2.525-5.325 6.302-9.463 10.389-11.836"
            />
            <path
              fill="url(#paint13_linear_6887_1639)"
              d="m306.11 66.35 30.088 1.021-11.568 27.927-30.088-1.021z"
            />
            <path fill="#4211D4" d="m294.909 93.918 18.727 1.402-15.589-8.95z" opacity="0.35" />
            <path
              stroke="url(#paint14_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m306.11 66.35 30.088 1.021-11.568 27.927-30.088-1.021z"
            />
            <path
              stroke="#D2C4FE"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m306.11 66.35 30.088 1.021-4.897 11.821"
            />
            <path
              fill="url(#paint15_linear_6887_1639)"
              d="m306.108 66.35-24.123-23.107-11.568 27.927 24.123 23.108z"
            />
            <path
              fill="#401BB1"
              d="M281.504 43.234a.55.55 0 0 1 .398-.33c.179-.038.497.094.629.22l5.135 4.918c-2.639 2.88-7.658 6.103-11.311 7.508z"
              opacity="0.35"
            />
            <path
              fill="#4211D4"
              d="m297.967 86.01-20.054-31.847-7.2 17.255 23.785 22.786z"
              opacity="0.35"
            />
            <path
              stroke="url(#paint16_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m306.108 66.35-24.123-23.107-11.568 27.927 24.123 23.108z"
            />
            <path
              stroke="#4C29B7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m281.984 43.243-11.567 27.926 12.061 11.554"
            />
            <path
              stroke="url(#paint17_linear_6887_1639)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m281.986 43.243 24.123 23.107 30.083 1.022"
            />
            <path
              stroke="url(#paint18_linear_6887_1639)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m306.109 66.352 15.041.51m-15.041-.51-7.945-7.61m7.945 7.61-4.417 10.662"
            />
            <path
              fill="url(#paint19_linear_6887_1639)"
              d="M315.322 79.046c-3.323 2.125-6.525 11.119-8.236 15.707l7.029.29c1.71-4.588 5.017-14.32 8.34-16.445q.222-.141.443-.272c.982.53 1.964 1.331 2.948 2.44 2.78 3.131 2.735 6.458 4.537 8.754.534.68 1.743 1.278 2.952 1.3q.293.007.583-.036l7.017-.433q.35-.038.684-.154c.993-.349 1.821-1.256 2.036-3.046.171-1.423-.935-2.728-1.873-2.796l-5.638.354c-.555-1.482-1.106-2.284-2.466-3.816-2.044-2.302-4.403-3.224-6.455-3.182l-6.919-.168a6 6 0 0 0-.621-.016c-1.441.038-2.892.58-4.361 1.52"
            />
            <path
              stroke="url(#paint20_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M333.335 90.82c-1.209-.022-2.418-.62-2.952-1.3-1.802-2.296-1.757-5.623-4.537-8.754-.984-1.109-1.966-1.91-2.948-2.44m10.437 12.494c1.446.027 2.892-.766 3.187-3.22.171-1.424-.935-2.73-1.874-2.797l1.496-.094m-2.809 6.111 7.6-.469q.35-.038.684-.154c.993-.349 1.821-1.256 2.036-3.046.171-1.423-.935-2.728-1.873-2.796l-5.638.354m-16.461-7.181c-1.441.037-2.892.578-4.361 1.518-3.323 2.125-6.525 11.119-8.236 15.707l7.029.29c1.71-4.588 5.017-14.32 8.34-16.445q.222-.141.443-.272m-3.215-.798 7.54.183c2.052-.042 4.411.88 6.455 3.182 1.36 1.532 1.911 2.334 2.466 3.816m-16.461-7.181c1.075-.029 2.146.223 3.215.798"
            />
            <path
              fill="url(#paint21_linear_6887_1639)"
              d="M334.648 84.803c.939.068 2.045 1.373 1.874 2.797-.256 2.122-1.372 3.003-2.604 3.184l-.583.036q.293.007.583-.036l7.017-.433q.35-.038.684-.154c.993-.349 1.821-1.256 2.036-3.046.171-1.423-.935-2.728-1.873-2.796l-5.638.354z"
            />
            <path
              fill="url(#paint22_linear_6887_1639)"
              d="M316.484 78.183c2.033-1.218 5.075-.383 6.343.187-.183.19-1.303.83-2.422 2.4-1.216 1.704-2.367 3.873-2.614 4.896-1.652-.595-5.261-.707-6.946.397 1.695-3.251 3.098-6.358 5.639-7.88"
            />
            <path
              stroke="url(#paint23_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M333.335 90.82c-1.209-.022-2.418-.62-2.952-1.3-1.802-2.296-1.757-5.623-4.537-8.754-.984-1.109-1.966-1.91-2.948-2.44m10.437 12.494c1.446.027 2.892-.766 3.187-3.22.171-1.424-.935-2.73-1.874-2.797l1.496-.094m-2.809 6.111 7.6-.469q.35-.038.684-.154c.993-.349 1.821-1.256 2.036-3.046.171-1.423-.935-2.728-1.873-2.796l-5.638.354m-16.461-7.181c-1.441.037-2.892.578-4.361 1.518-3.323 2.125-6.525 11.119-8.236 15.707l7.029.29c1.71-4.588 5.017-14.32 8.34-16.445q.222-.141.443-.272m-3.215-.798 7.54.183c2.052-.042 4.411.88 6.455 3.182 1.36 1.532 1.911 2.334 2.466 3.816m-16.461-7.181c1.075-.029 2.146.223 3.215.798"
            />
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M330.383 89.52c.534.68 1.743 1.278 2.952 1.3 1.446.027 2.892-.767 3.187-3.22.171-1.424-.935-2.73-1.874-2.797l1.496-.094 5.638-.355"
            />
            <path fill="#000" d="M285.61 86.493c.702-4.224 1.141-13.844-.09-18.975l-2.326 16.651z" opacity="0.2" />
            <path
              fill="url(#paint24_linear_6887_1639)"
              d="M284.782 65.788c1.812 3.502-.228 13.67-1.045 18.499l-5.437-5.468c.816-4.828 2.344-13.488.531-16.99q-.12-.235-.247-.458c-1.116-.034-2.367.169-3.774.636-3.974 1.319-5.6 4.221-8.31 5.307-.803.321-2.148.233-3.206-.353a3.1 3.1 0 0 1-1.164-1.076l-4.175-3.863a3 3 0 0 1-.515-.476c-.685-.8-.947-1.998-.237-3.656.564-1.318 2.175-1.894 3.021-1.483l3.911 3.68c1.222-1.006 3.093-2.018 5.037-2.664 2.921-.97 5.56-.34 7.314.722l5.281 4.144c1.228.755 2.213 1.95 3.015 3.498"
            />
            <path
              fill="url(#paint25_linear_6887_1639)"
              d="M265.169 61.095c-.846-.411-2.457.165-3.021 1.483-.614 1.431-.501 2.521-.018 3.307l1.164 1.076a3.1 3.1 0 0 1-1.164-1.076l-4.175-3.863a3 3 0 0 1-.515-.476c-.685-.8-.947-1.998-.237-3.656.564-1.318 2.175-1.894 3.021-1.483l3.911 3.68z"
            />
            <path
              fill="url(#paint26_linear_6887_1639)"
              d="M285.214 70.58c.142-4.931-2.264-8.096-5.907-8.704.821 2.173.584 5.287.522 6.542 2.03 2.012 4.141 6.981 4.721 9.155z"
            />
            <path
              stroke="url(#paint27_linear_6887_1639)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M263.294 66.961c1.058.586 2.403.674 3.206.353 2.71-1.086 4.336-3.988 8.31-5.307 1.407-.467 2.658-.67 3.774-.636m-15.29 5.59c-1.265-.7-1.21-2.671-.725-3.758.565-1.317 1.587-1.834 2.796-1.96l-1.223-1.164m-.848 6.882-5.339-4.94a3 3 0 0 1-.515-.475c-.685-.8-.947-1.998-.237-3.656.564-1.318 2.175-1.894 3.021-1.483l3.918 3.672m17.625 2.21c1.228.755 2.213 1.95 3.015 3.498 1.812 3.503-.228 13.671-1.045 18.5l-5.437-5.468c.816-4.828 2.344-13.488.531-16.99q-.12-.235-.247-.458m3.183.918-5.281-4.144c-1.754-1.063-4.393-1.691-7.314-.722-1.944.646-3.807 1.65-5.03 2.656m17.625 2.21c-.917-.563-1.97-.88-3.183-.918"
            />
            <path
              stroke="#FFF799"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M285.251 67.177c-.474-2.019-1.513-3.537-2.767-4.38-.937-.628-2.48-1.339-3.697-1.416-1.119-.07-2.454.077-4.034.627-3.732 1.298-5.613 4.031-7.773 5.046-.775.364-2.177.738-3.256.08-1.289-.786-2.034-2.314-1.093-4.181.644-1.277 1.919-1.726 2.787-1.684"
            />
            <path
              fill="url(#paint28_linear_6887_1639)"
              d="m273.963 50.281 32.702-10.26 16.248-26.818-6.516-8.036-16.127 26.797-32.701 10.26z"
            />
            <path fill="#4211D4" d="m273.998 50.072-5.86-7.439 35.776-5.23 2.317 2.737z" opacity="0.35" />
            <path
              fill="url(#paint29_linear_6887_1639)"
              d="m267.569 42.225 32.701-10.261 16.127-26.797-32.84 10.449z"
            />
            <path
              stroke="url(#paint30_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m300.27 31.964 6.395 8.056m-6.395-8.056-32.701 10.26m32.701-10.26 16.127-26.797m-9.732 34.853-32.702 10.261-6.394-8.056m39.096-2.205 16.248-26.817-6.516-8.036m-48.828 37.058 15.988-26.61 32.84-10.448"
            />
            <path
              stroke="#4C29B7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m273.962 50.282 32.702-10.26 16.248-26.818"
            />
            <path
              stroke="#E7DFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m316.396 5.167-16.127 26.797 3.485 4.402"
            />
            <path
              fill="url(#paint31_linear_6887_1639)"
              stroke="url(#paint32_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m309.918 15.644 6.81 8.566-4.088 6.726-6.935-8.345-32.825 10.205 4.391-7.137z"
            />
            <path fill="#fff" d="m305.241 22.476 3.904-6.341.821-.479.286.493-4.061 6.766z" />
            <path
              stroke="url(#paint33_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m309.918 15.644 6.81 8.566-4.088 6.726-6.935-8.345-32.825 10.205 4.391-7.137z"
            />
            <path
              fill="url(#paint34_linear_6887_1639)"
              d="m279.404 38.172 6.776 8.637 7.66-2.36-6.726-8.613 15.535-26.265-7.997 2.575z"
            />
            <path fill="url(#paint35_linear_6887_1639)" d="m287.147 35.749-7.763 2.433 6.797 8.627 7.66-2.36z" />
            <path fill="#913808" d="m290.102 39.534-8.418 1.129 4.458 6.05 7.66-2.33z" opacity="0.2" />
            <path fill="#fff" d="m287.948 35.268-8.074 2.735-.47.312.436.7 8.074-2.636-.665-.542z" />
            <path
              stroke="url(#paint36_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m279.404 38.172 6.776 8.637 7.66-2.36-6.726-8.613 15.535-26.265-7.997 2.575z"
            />
            <path
              stroke="url(#paint37_linear_6887_1639)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m302.651 9.57-15.535 26.266 6.726 8.613-7.661 2.36-3.574-4.603"
            />
            <path
              fill="url(#paint38_linear_6887_1639)"
              d="M298.204 12.338c-.158-1.7-1.259-3.15-3.064-5.005-.237-.53-.473-2.054.487-3.913.955-1.853 2.216-1.651 2.728-1.319 3.959 3.455 6.354 8.036 4.761 11.972-1.281 3.17-6.05 6.235-8.275 7.372l-1.076-2.54c1.558-1.323 4.598-4.86 4.439-6.567"
            />
            <path
              stroke="url(#paint39_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M294.63 7.583c.759.594 2.487 2.19 3.298 3.802 1.019 2.025-2.377 5.927-4.54 7.548"
            />
            <path
              fill="url(#paint40_linear_6887_1639)"
              d="M290.242 3.33c-1.961 3.049-1.431 11.997-.849 16.184l4.969.2c.525-7.666 1.21-12.303 1.791-14.965.463-2.118 1.577-2.639 2.077-2.636-.95-1.106-5.943-1.964-7.988 1.215z"
            />
            <path
              stroke="url(#paint41_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M289.44 19.832c-.243-1.592-.651-6.221-.355-12.023.365-7.154 4.122-6.745 5.302-6.732 1.35.015 3.492.782 3.964 1.033"
            />
            <path
              stroke="url(#paint42_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M294.375 19.671c.134-2.814.706-8.927 1.262-12.168.67-3.898 1.232-5.192 2.667-5.367.688-.083 5.14 5.556 5.265 8.378.125 2.84-.51 6.475-8.783 10.978"
            />
            <path
              fill="url(#paint43_radial_6887_1639)"
              d="M290.87 18.517c-1.789.717-2.903 2.684-2.486 4.397.419 1.72 2.221 2.534 4.024 1.81s2.913-2.705 2.481-4.42c-.431-1.708-2.229-2.506-4.019-1.787"
            />
            <path
              stroke="url(#paint44_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M290.87 18.517c-1.789.717-2.903 2.684-2.486 4.397.419 1.72 2.221 2.534 4.024 1.81s2.913-2.705 2.481-4.42c-.431-1.708-2.229-2.506-4.019-1.787Z"
            />
            <path
              fill="url(#paint45_linear_6887_1639)"
              d="M287.207 32.392c5.747-5.355 4.934-8.567 4.389-9.506-.868-.621-1.708-.112-2.057.186-1.039 4.17-4.404 6.425-6.322 7.033-.304.096-1.113.21.306 1.783 1.425 1.582 3.068.975 3.684.504"
            />
            <path
              stroke="url(#paint46_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M287.207 32.392c5.747-5.355 4.934-8.567 4.389-9.506-.868-.621-1.708-.112-2.057.186-1.039 4.17-4.404 6.425-6.322 7.033-.304.096-1.113.21.306 1.783 1.425 1.582 3.068.975 3.684.504Z"
            />
            <path
              fill="url(#paint47_linear_6887_1639)"
              d="M291.611 22.91c-1.35-2.997-6.299-5.003-9.413-5.396-3.944.058-4.434 4.747-2.461 4.253 1.975-.493 8.009 1.885 8.921 2.258.729.299 2.37-1.005 2.953-1.116"
            />
            <path
              stroke="url(#paint48_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M291.611 22.91c-1.35-2.997-6.299-5.003-9.413-5.396-3.944.058-4.434 4.747-2.461 4.253 1.975-.493 8.009 1.885 8.921 2.258.729.299 2.37-1.005 2.953-1.116Z"
            />
            <path
              fill="url(#paint49_linear_6887_1639)"
              d="M287.298 32.32c-1.476 1.104-3.133.579-5.364-5.191-2.201-5.689-1.354-9.588.486-9.568-.564-.185-2.145-.414-3.96.16-2.267.715-4.057 2.722-3.509 5.852.551 3.153 1.958 7.307 3.803 9.364 1.854 2.067 5.429 1.707 8.545-.616z"
            />
            <path
              stroke="url(#paint50_linear_6887_1639)"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M287.298 32.32c-1.476 1.104-3.133.579-5.364-5.191-2.201-5.689-1.354-9.588.486-9.568-.564-.185-2.145-.414-3.96.16-2.267.715-4.057 2.722-3.509 5.852.551 3.153 1.958 7.307 3.803 9.364 1.854 2.067 5.429 1.707 8.545-.616z"
            />
            <path
              fill="#fff"
              d="M345.886 72.169c-.115.638.639 1.064 1.126.636l2.121-1.86a.7.7 0 0 1 .549-.164l2.789.396a.686.686 0 0 0 .628-1.11l-1.778-2.186a.68.68 0 0 1-.143-.554l.5-2.777c.115-.638-.639-1.064-1.127-.636l-2.121 1.86a.68.68 0 0 1-.548.164l-2.789-.396a.686.686 0 0 0-.628 1.11l1.778 2.186a.7.7 0 0 1 .143.554z"
            />
            <path
              fill="#fff"
              d="M263.502 87.474a.484.484 0 0 0 .787-.465l-.389-1.954a.5.5 0 0 1 .094-.393l1.227-1.566a.484.484 0 0 0-.458-.777l-1.964.316a.48.48 0 0 1-.389-.108l-1.522-1.287a.485.485 0 0 0-.788.465l.389 1.954a.48.48 0 0 1-.093.393l-1.228 1.566a.484.484 0 0 0 .458.777l1.965-.316a.48.48 0 0 1 .389.108z"
              opacity="0.6"
            />
            <path
              fill="#fff"
              d="M241.882 54.048c-.943-.08-1.259-1.303-.472-1.828l3.424-2.287a1 1 0 0 0 .437-.711l.495-4.08c.109-.904 1.27-1.203 1.803-.466l2.408 3.33a1 1 0 0 0 .727.411l4.102.344c.944.08 1.259 1.303.472 1.828l-3.423 2.287a1 1 0 0 0-.437.711l-.495 4.08c-.11.904-1.27 1.203-1.803.466l-2.409-3.33a1 1 0 0 0-.726-.411z"
            />
            <path
              fill="#fff"
              d="M262.763 39.844a.484.484 0 0 0 .64-.653l-.882-1.787a.5.5 0 0 1-.011-.404l.78-1.83a.484.484 0 0 0-.643-.632l-1.816.814a.48.48 0 0 1-.404-.004l-1.803-.849a.484.484 0 0 0-.64.653l.882 1.787a.5.5 0 0 1 .011.404l-.78 1.83a.484.484 0 0 0 .643.631l1.816-.813a.48.48 0 0 1 .404.004z"
              opacity="0.6"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_6887_1639"
              x1="329.204"
              x2="307.462"
              y1="64.822"
              y2="80.794"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.034" stopColor="#7A55E9" />
              <stop offset="1" stopColor="#6034E6" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_6887_1639"
              x1="295.654"
              x2="300.371"
              y1="64.07"
              y2="39.672"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F1EDFE" />
              <stop offset="1" stopColor="#C1AEF8" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_6887_1639"
              x1="256.847"
              x2="276.651"
              y1="46.726"
              y2="12.084"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#7B56EA" />
              <stop offset="1" stopColor="#E2D9FE" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_6887_1639"
              x1="23.796"
              x2="17.316"
              y1="41.447"
              y2="-12.782"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.2" stopColor="#824500" />
              <stop offset="0.436" stopColor="#BA781E" />
              <stop offset="0.935" stopColor="#FFDF87" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_6887_1639"
              x1="322.722"
              x2="326.124"
              y1="63.328"
              y2="36.426"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DBA950" />
              <stop offset="1" stopColor="#DBA950" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint6_linear_6887_1639"
              x1="-2.782"
              x2="25.169"
              y1="13.79"
              y2="28.89"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE27B" />
              <stop offset="0.606" stopColor="#FFC625" />
              <stop offset="1" stopColor="#E5AC1A" />
            </linearGradient>
            <linearGradient
              id="paint7_linear_6887_1639"
              x1="311.789"
              x2="302.407"
              y1="68.867"
              y2="42.948"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DC8F00" />
              <stop offset="0.514" stopColor="#F6C339" />
              <stop offset="1" stopColor="#FFE89B" />
            </linearGradient>
            <linearGradient
              id="paint8_linear_6887_1639"
              x1="14.923"
              x2="-1.389"
              y1="33.777"
              y2="15.356"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFD06A" />
              <stop offset="1" stopColor="#D08F03" />
            </linearGradient>
            <linearGradient
              id="paint9_linear_6887_1639"
              x1="295.213"
              x2="307.686"
              y1="53.647"
              y2="69.199"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE39C" />
              <stop offset="1" stopColor="#FFEAB6" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint10_linear_6887_1639"
              x1="0.48"
              x2="24.258"
              y1="32.81"
              y2="8.581"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#C07512" />
              <stop offset="0.481" stopColor="#F8B342" />
              <stop offset="1" stopColor="#FFE39D" />
            </linearGradient>
            <linearGradient
              id="paint11_linear_6887_1639"
              x1="305.716"
              x2="312.322"
              y1="61.58"
              y2="47.676"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.016" stopColor="#fff" />
              <stop offset="1" stopColor="#FFEBB8" />
            </linearGradient>
            <linearGradient
              id="paint12_linear_6887_1639"
              x1="313.072"
              x2="308.952"
              y1="50.364"
              y2="34.109"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#882700" stopOpacity="0" />
              <stop offset="1" stopColor="#882700" />
            </linearGradient>
            <linearGradient
              id="paint13_linear_6887_1639"
              x1="294.588"
              x2="348.516"
              y1="91.446"
              y2="76.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7954EB" />
              <stop offset="0.5" stopColor="#A68DF6" />
              <stop offset="1" stopColor="#E9E3FD" />
            </linearGradient>
            <linearGradient
              id="paint14_linear_6887_1639"
              x1="303.484"
              x2="331.739"
              y1="93.525"
              y2="69.977"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6231F7" />
              <stop offset="0.501" stopColor="#8E6CF3" />
              <stop offset="1" stopColor="#C3B2F5" />
            </linearGradient>
            <linearGradient
              id="paint15_linear_6887_1639"
              x1="277.888"
              x2="307.24"
              y1="71.282"
              y2="55.011"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7A55E9" />
              <stop offset="1" stopColor="#6034E6" />
            </linearGradient>
            <linearGradient
              id="paint16_linear_6887_1639"
              x1="283.768"
              x2="263.594"
              y1="38.938"
              y2="67.862"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6639EC" />
              <stop offset="1" stopColor="#582BDF" />
            </linearGradient>
            <linearGradient
              id="paint17_linear_6887_1639"
              x1="281.445"
              x2="312.443"
              y1="44.547"
              y2="44.19"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#7B56EA" />
              <stop offset="1" stopColor="#E2D9FE" />
            </linearGradient>
            <linearGradient
              id="paint18_linear_6887_1639"
              x1="306.685"
              x2="299.81"
              y1="66.77"
              y2="81.767"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FBF9FF" />
              <stop offset="1" stopColor="#FBF9FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint19_linear_6887_1639"
              x1="327.919"
              x2="327.224"
              y1="78.237"
              y2="94.023"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCFDFF" />
              <stop offset="1" stopColor="#FFE17C" />
            </linearGradient>
            <linearGradient
              id="paint20_linear_6887_1639"
              x1="344.735"
              x2="311.409"
              y1="86.066"
              y2="94.678"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D6E7FF" />
              <stop offset="1" stopColor="#B9D9FF" />
            </linearGradient>
            <linearGradient
              id="paint21_linear_6887_1639"
              x1="337.805"
              x2="337.124"
              y1="85.512"
              y2="91.063"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFEFC8" />
              <stop offset="1" stopColor="#FFBE13" />
            </linearGradient>
            <linearGradient
              id="paint22_linear_6887_1639"
              x1="317.046"
              x2="316.541"
              y1="79.773"
              y2="85.179"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E3A500" />
              <stop offset="1" stopColor="#E2A900" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint23_linear_6887_1639"
              x1="316.674"
              x2="333.027"
              y1="88.352"
              y2="80.995"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#C67708" />
              <stop offset="1" stopColor="#FFF799" />
            </linearGradient>
            <linearGradient
              id="paint24_linear_6887_1639"
              x1="271.553"
              x2="271.145"
              y1="56.11"
              y2="66.775"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCFDFF" />
              <stop offset="1" stopColor="#FDD852" />
            </linearGradient>
            <linearGradient
              id="paint25_linear_6887_1639"
              x1="261.757"
              x2="258.096"
              y1="58.625"
              y2="63.347"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFEFC8" />
              <stop offset="1" stopColor="#E9AF1F" />
            </linearGradient>
            <linearGradient
              id="paint26_linear_6887_1639"
              x1="279.04"
              x2="274.626"
              y1="60.101"
              y2="63.931"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B97413" />
              <stop offset="1" stopColor="#FDD852" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint27_linear_6887_1639"
              x1="287.991"
              x2="262.863"
              y1="77.403"
              y2="77.38"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B56F0D" />
              <stop offset="0.501" stopColor="#D5810B" />
              <stop offset="1" stopColor="#E6BE58" />
            </linearGradient>
            <linearGradient
              id="paint28_linear_6887_1639"
              x1="334.715"
              x2="329.249"
              y1="11.286"
              y2="54.203"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E9E3FD" />
              <stop offset="0.615" stopColor="#A68DF6" />
              <stop offset="1" stopColor="#7954EB" />
            </linearGradient>
            <linearGradient
              id="paint29_linear_6887_1639"
              x1="284.553"
              x2="300.982"
              y1="6.821"
              y2="31.17"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F1EDFE" />
              <stop offset="1" stopColor="#C1AEF8" />
            </linearGradient>
            <linearGradient
              id="paint30_linear_6887_1639"
              x1="273.833"
              x2="316.969"
              y1="47.038"
              y2="4.719"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6231F7" />
              <stop offset="0.431" stopColor="#8E6CF3" />
              <stop offset="0.872" stopColor="#C3B2F5" />
            </linearGradient>
            <linearGradient
              id="paint31_linear_6887_1639"
              x1="315.522"
              x2="299.41"
              y1="25.267"
              y2="15.97"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#FFE289" />
            </linearGradient>
            <linearGradient
              id="paint32_linear_6887_1639"
              x1="287.557"
              x2="311.397"
              y1="5.256"
              y2="31.445"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AFCFFF" />
              <stop offset="1" stopColor="#79E7FF" />
            </linearGradient>
            <linearGradient
              id="paint33_linear_6887_1639"
              x1="287.691"
              x2="297.592"
              y1="40.931"
              y2="2.991"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#C67708" />
              <stop offset="1" stopColor="#FFF799" />
            </linearGradient>
            <linearGradient
              id="paint34_linear_6887_1639"
              x1="285.191"
              x2="288.031"
              y1="35.097"
              y2="45.689"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.035" stopColor="#FFF799" />
              <stop offset="0.308" stopColor="#FDC41C" />
            </linearGradient>
            <linearGradient
              id="paint35_linear_6887_1639"
              x1="280.588"
              x2="292.753"
              y1="31.083"
              y2="44.735"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFF7A3" />
              <stop offset="0.5" stopColor="#F5B700" />
              <stop offset="1" stopColor="#A35F00" />
            </linearGradient>
            <linearGradient
              id="paint36_linear_6887_1639"
              x1="310.014"
              x2="305.084"
              y1="40.861"
              y2="26.738"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#855108" />
              <stop offset="0.664" stopColor="#D5810B" />
              <stop offset="1" stopColor="#EEB825" />
            </linearGradient>
            <linearGradient
              id="paint37_linear_6887_1639"
              x1="286.878"
              x2="293.492"
              y1="36.56"
              y2="45.717"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#A97020" />
              <stop offset="1" stopColor="#613305" />
            </linearGradient>
            <linearGradient
              id="paint38_linear_6887_1639"
              x1="304.319"
              x2="293.093"
              y1="14.069"
              y2="8.123"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.208" stopColor="#FFF7A3" />
              <stop offset="0.5" stopColor="#F5B700" />
              <stop offset="0.984" stopColor="#A35F00" />
            </linearGradient>
            <linearGradient
              id="paint39_linear_6887_1639"
              x1="293.388"
              x2="294.087"
              y1="18.933"
              y2="6.847"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#855108" />
              <stop offset="0.501" stopColor="#D5810B" />
              <stop offset="1" stopColor="#F5D94A" />
            </linearGradient>
            <linearGradient
              id="paint40_linear_6887_1639"
              x1="292.295"
              x2="291.028"
              y1="4.761"
              y2="18.514"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCFDFF" />
              <stop offset="1" stopColor="#FFE17C" />
            </linearGradient>
            <linearGradient
              id="paint41_linear_6887_1639"
              x1="290.463"
              x2="286.276"
              y1="17.537"
              y2="7.068"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#C67708" />
              <stop offset="1" stopColor="#FFF799" />
            </linearGradient>
            <linearGradient
              id="paint42_linear_6887_1639"
              x1="303.934"
              x2="287.144"
              y1="33.808"
              y2="12.105"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#855108" />
              <stop offset="0.501" stopColor="#D5810B" />
              <stop offset="1" stopColor="#F5D94A" />
            </linearGradient>
            <linearGradient
              id="paint44_linear_6887_1639"
              x1="289.563"
              x2="286.523"
              y1="25.886"
              y2="16.358"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#855108" />
              <stop offset="0.501" stopColor="#D5810B" />
              <stop offset="1" stopColor="#F5D94A" />
            </linearGradient>
            <linearGradient
              id="paint45_linear_6887_1639"
              x1="291.093"
              x2="276.374"
              y1="23.927"
              y2="31.571"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFF7A3" />
              <stop offset="0.579" stopColor="#F5B700" />
              <stop offset="1" stopColor="#A35F00" />
            </linearGradient>
            <linearGradient
              id="paint46_linear_6887_1639"
              x1="285.514"
              x2="276.675"
              y1="41.712"
              y2="24.276"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#855108" />
              <stop offset="0.501" stopColor="#D5810B" />
              <stop offset="1" stopColor="#F5D94A" />
            </linearGradient>
            <linearGradient
              id="paint47_linear_6887_1639"
              x1="292.59"
              x2="282.582"
              y1="23.191"
              y2="25.48"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFF7A3" />
              <stop offset="0.5" stopColor="#F5B700" />
              <stop offset="1" stopColor="#A35F00" />
            </linearGradient>
            <linearGradient
              id="paint48_linear_6887_1639"
              x1="279.92"
              x2="288.879"
              y1="22.206"
              y2="32.516"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#855108" />
              <stop offset="0.501" stopColor="#D5810B" />
              <stop offset="1" stopColor="#F5D94A" />
            </linearGradient>
            <linearGradient
              id="paint49_linear_6887_1639"
              x1="279.367"
              x2="283.797"
              y1="18.347"
              y2="33.756"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCFDFF" />
              <stop offset="1" stopColor="#FFE17C" />
            </linearGradient>
            <linearGradient
              id="paint50_linear_6887_1639"
              x1="284.759"
              x2="282.739"
              y1="32.295"
              y2="20.521"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#C67708" />
              <stop offset="1" stopColor="#FFF799" />
            </linearGradient>
            <radialGradient
              id="paint3_radial_6887_1639"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(18.39714 -41.6037 47.18377 20.86465 309.78 62.627)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="paint43_radial_6887_1639"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(3.0288 4.91736 4.59215 -2.17011 290.384 18.313)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFF8AB" />
              <stop offset="0.504" stopColor="#FFC004" />
              <stop offset="1" stopColor="#A35400" />
            </radialGradient>
            <clipPath id="clip0_6887_1639">
              <path fill="#fff" d="M0 0h374v104H0z" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  const trendingItems = [
    { id: 'doge', name: 'DOGE', change: '4,83%', price: '8,26 ₽', icon: <IconDoge size={42} />, styleClass: 'doge', isPositive: true, sparklinePath: 'M2,40C2,40,4.093,36.517,5.167,34.854C6.205,33.246,7.219,31.567,8.333,30.177C9.341,28.92,10.34,27.528,11.5,26.819C12.481,26.22,13.694,26.522,14.667,25.901C15.843,25.15,16.892,23.815,17.833,22.264C19.094,20.189,19.862,14.291,21,14.219C21.993,14.156,22.838,19.118,24.167,19.998C25.09,20.609,26.387,20.748,27.333,20.314C28.579,19.744,29.319,16.917,30.5,15.799C31.471,14.88,32.568,14.057,33.667,13.829C34.685,13.617,35.906,14.748,36.833,14.295C38.147,13.654,38.75,9.975,40,8.709C40.945,7.751,42.143,6.765,43.167,6.857C44.258,6.955,45.404,9.788,46.333,9.567C47.637,9.257,48.409,2.031,49.5,2C50.524,1.97,51.37,8.117,52.667,8.49C53.598,8.758,54.88,6.292,55.833,6.523C57.058,6.819,57.756,11.453,59,11.806C59.946,12.075,61.24,9.86,62.167,10.167C63.484,10.602,64.277,14.489,65.333,16.647C66.388,18.801,67.157,21.887,68.5,23.101C69.421,23.934,70.595,24.134,71.667,24.277C72.707,24.416,73.838,23.68,74.833,23.991C75.967,24.346,78,26.637,78,26.637' },
    { id: 'cat', name: 'CATI', change: '-11,97%', price: '3,64 ₽', icon: <IconCati size={42} />, styleClass: 'cati', isPositive: false, sparklinePath: 'M2,8.577C2,8.577,3.866,13.186,5.167,14.239C6.097,14.992,7.436,14.366,8.333,15.219C9.831,16.644,10.099,23.463,11.5,23.896C12.41,24.177,13.566,21.796,14.667,21.625C15.684,21.467,16.798,22.207,17.833,22.651C18.911,23.112,20.018,23.554,21,24.367C22.158,25.326,23.185,26.747,24.167,28.252C25.324,30.027,26.254,32.458,27.333,34.455C28.367,36.368,29.526,40.083,30.5,40C31.673,39.9,32.212,32.951,33.667,31.299C34.569,30.275,35.794,30.275,36.833,29.667C37.906,29.04,38.932,28.228,40,27.583C41.043,26.953,42.074,26.104,43.167,25.835C44.189,25.584,45.413,26.446,46.333,25.906C47.679,25.115,48.36,21.67,49.5,19.914C50.492,18.387,51.71,17.517,52.667,15.88C53.883,13.797,54.389,9.433,55.833,8.212C56.737,7.448,58.07,8.176,59,7.488C60.3,6.529,60.877,2.506,62.167,2C63.1,1.634,64.374,2.306,65.333,2.98C66.542,3.831,67.356,6.055,68.5,7.19C69.489,8.17,70.55,9.246,71.667,9.528C72.673,9.782,73.862,8.729,74.833,9.079C76.012,9.505,78,12.563,78,12.563' },
    { id: 'link', name: 'LINK', change: '10,84%', price: '730,62 ₽', icon: <IconLink size={42} />, styleClass: 'link', isPositive: true, sparklinePath: 'M2,40C2,40,4.283,37.158,5.167,34.647C6.839,29.894,6.15,13.698,8.333,12.582C9.208,12.134,10.613,13.146,11.5,14.242C13.106,16.224,13.489,25.433,14.667,25.511C15.639,25.577,16.427,18.81,17.833,18.178C18.742,17.77,19.944,18.882,21,19.226C22.055,19.568,23.181,19.629,24.167,20.238C25.318,20.949,26.177,23.16,27.333,23.482C28.316,23.755,29.437,22.848,30.5,22.656C31.548,22.467,32.648,22.674,33.667,22.332C34.766,21.963,35.82,21.189,36.833,20.406C37.939,19.552,38.847,17.927,40,17.34C40.985,16.838,42.183,17.291,43.167,16.788C44.321,16.197,45.182,14.318,46.333,13.695C47.319,13.162,48.492,12.776,49.5,12.992C50.613,13.231,51.619,14.543,52.667,15.355C53.73,16.179,54.82,17.994,55.833,17.904C56.939,17.805,57.822,14.606,59,14.254C59.972,13.964,61.127,14.759,62.167,15.148C63.239,15.55,64.269,16.602,65.333,16.645C66.38,16.687,67.576,16.277,68.5,15.449C69.827,14.259,70.559,11.146,71.667,9.22C72.679,7.461,73.651,5.575,74.833,4.321C75.803,3.292,78,2,78,2' },
    { id: 'apt', name: 'APT', change: '15,07%', price: '93,65 ₽', icon: <IconApt size={42} />, styleClass: 'apt', isPositive: true, sparklinePath: 'M2,34.537C2,34.537,4.167,40.06,5.167,40C6.294,39.932,6.915,33.305,8.333,32.623C9.241,32.187,10.472,33.063,11.5,33.498C12.587,33.958,13.625,35.402,14.667,35.359C15.737,35.315,16.74,33.71,17.833,33.13C18.856,32.587,19.927,32.073,21,31.929C22.04,31.789,23.122,32.342,24.167,32.231C25.234,32.118,26.269,31.483,27.333,31.226C28.38,30.973,29.453,30.944,30.5,30.692C31.564,30.436,32.608,30.002,33.667,29.695C34.719,29.389,35.776,29.116,36.833,28.852C37.887,28.589,38.967,28.491,40,28.116C41.08,27.724,42.109,27.038,43.167,26.516C44.22,25.997,45.252,25.149,46.333,24.992C47.366,24.841,48.482,25.708,49.5,25.499C50.6,25.273,51.69,24.408,52.667,23.494C53.836,22.4,54.817,20.714,55.833,19.155C56.935,17.466,57.69,14.417,59,13.691C59.928,13.177,61.111,13.755,62.167,13.798C63.222,13.841,64.336,13.57,65.333,13.95C66.463,14.379,67.613,16.805,68.5,16.505C70.108,15.962,69.949,5.654,71.667,3.53C72.548,2.441,73.75,2.184,74.833,2C75.864,1.825,78,2.36,78,2.36' },
  ];

  const marketTickers = [
    { id: 'tsla', name: 'Tesla', code: 'TSLAx', change: '-2,13%', styleClass: 'tsla', icon: <IconTslax size={52} /> },
    { id: 'goog', name: 'Alphabet', code: 'GOOGLx', change: '-1,19%', styleClass: 'goog', icon: <IconGooglX size={52} /> },
    { id: 'nvda', name: 'NVIDIA', code: 'NVDAx', change: '-1,71%', styleClass: 'nvda', icon: <IconNvdaX size={52} /> },
    { id: 'aapl', name: 'Apple', code: 'AAPLx', change: '-1,17%', styleClass: 'aapl', icon: <IconAaplX size={52} /> },
    { id: 'coin', name: 'Coinbase', code: 'COINx', change: '-2,12%', styleClass: 'coin', icon: <IconCoinX size={52} /> },
    { id: 'hood', name: 'Robinhood', code: 'HOODx', change: '-2,96%', styleClass: 'hood', icon: <IconHoodX size={52} /> },
    {
      id: 'mcd',
      code: 'MCDx',
      change: '+0,02%',
      styleClass: 'mcd',
      icon: <IconMcdX size={52} />,
    },
    {
      id: 'cisco',
      code: 'CSCOx',
      change: '+0,12%',
      styleClass: 'cisco',
      icon: <IconCscoX size={52} />,
    },
  ];

  const fundTickers = [
    {
      id: 'spyx',
      code: 'SPYx',
      change: '+0,08%',
      styleClass: 'spyx',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet">
          <defs><clipPath id="SPYX_fund_clip"><rect width="40" height="40" rx="20" /></clipPath></defs>
          <g clipPath="url(#SPYX_fund_clip)">
            <path fill="#d6002a" d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20" />
            <path fill="#fff" d="M12.05 19.169q-1.063 0-1.795-.367a2.6 2.6 0 0 1-1.106-1.047q-.38-.675-.41-1.59l-.008-.234h2.044l.007.235q.022.41.183.688.162.27.432.418.27.146.638.146.351 0 .607-.14a.9.9 0 0 0 .396-.387q.14-.25.14-.579v-.015q0-.505-.309-.871-.3-.366-1.09-.777l-.777-.388q-1.077-.527-1.619-1.238-.534-.71-.535-1.787v-.014q0-.887.396-1.553a2.7 2.7 0 0 1 1.113-1.033q.718-.373 1.692-.373 1.026 0 1.714.38.689.375 1.04 1.048.36.667.38 1.545l.008.257h-2.029l-.007-.242a1.8 1.8 0 0 0-.154-.674.9.9 0 0 0-.373-.417q-.234-.147-.564-.147c-.33 0-.41.047-.571.14a.9.9 0 0 0-.367.38 1.26 1.26 0 0 0-.124.571v.015q0 .476.285.82.285.345.953.682l.776.395q.842.425 1.348.872.512.44.74.981.234.536.234 1.238v.015q0 .93-.403 1.618a2.67 2.67 0 0 1-1.135 1.055q-.733.366-1.75.374" />
            <path fill="#fff" d="m22.05 19-3.698-5.178q-.505-.718-.82-1.238a5 5 0 0 1-.462-.967 2.9 2.9 0 0 1-.146-.908v-.007q0-.71.315-1.253.315-.55.879-.857t1.325-.307q.747 0 1.297.307.556.3.857.835.307.528.307 1.216v.007q0 .594-.227 1.136a3.4 3.4 0 0 1-.71 1.047q-.483.505-1.297 1.018l-.798-1.113a5.2 5.2 0 0 0 .791-.696q.285-.323.396-.63.11-.315.11-.674v-.007q0-.307-.088-.55a.77.77 0 0 0-.25-.373.56.56 0 0 0-.38-.14q-.235 0-.403.147c-.168.147-.198.23-.256.396q-.081.25-.081.55v.007q0 .27.073.556.073.279.264.637.198.352.557.843l4.519 6.189V19zm-2.907.19q-.923 0-1.619-.359a2.7 2.7 0 0 1-1.076-1.017q-.381-.653-.381-1.502v-.015q0-.95.476-1.699.483-.747 1.414-1.362l.585-.381.85 1.223-.49.374q-.484.359-.682.798a2.2 2.2 0 0 0-.198.93v.007q0 .455.169.791a1.29 1.29 0 0 0 1.172.696q.38 0 .703-.154.33-.16.593-.46c.263-.3.327-.44.454-.719q.279-.564.403-1.267.132-.703.132-1.487v-.285h1.743v.373q0 1.245-.3 2.278a5 5 0 0 1-.886 1.78 3.5 3.5 0 0 1-1.319 1.084 4 4 0 0 1-1.743.373" />
            <path fill="#fff" d="M25.886 15.638v-1.684h1.816q.747 0 1.099-.47.358-.476.358-1.427v-.022q0-.966-.358-1.429-.352-.46-1.084-.461h-1.831V8.431h2.219q1.047 0 1.765.44.725.44 1.099 1.245.38.805.38 1.919v.014q0 1.113-.38 1.92-.374.797-1.1 1.237-.717.432-1.764.432zM24.809 19V8.431h2.153V19z" />
          </g>
        </svg>
      ),
    },
    {
      id: 'vtix',
      code: 'VTIx',
      change: '-0,13%',
      styleClass: 'vtix',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet">
          <defs><clipPath id="VTIX_fund_clip"><path fill="#fff" d="M0 0h56v56H0z" /></clipPath></defs>
          <g clipPath="url(#VTIX_fund_clip)">
            <path fill="#96151D" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" />
            <path fill="#fff" d="M9.76 24v.06c.74.26.46.93.46.93l-1.35 3.97-1.84-4.95H4.47v.07c.44.1.65.8.65.8l1.68 4.3c.47 1.2 1.34 1.44 1.34 1.44l1.08.38 2.58-7zM20 31h2.47v-.06s-.49-.01-.47-.82v-2.46c0-1.72-1.83-1.66-1.83-1.66-.77.02-1.15.46-1.27.58V26h-2.36v.07c.49.02.46.82.46.84v3.35h-.61c-.8-.05-.8-.81-.79-.83l-.02-1.54c0-1.1-.7-1.46-.68-1.47-1.32-.77-3.22-.24-3.22-.24s-.4 1.2-.41 1.2c2-.83 2.34-.01 2.33-.04a.34.34 0 0 1 .02.22c-.07.36-.76.45-.77.45-.83.14-1.27.29-1.27.29-1.27.4-1.1 1.42-1.1 1.43.21 1.3 2.08 1.27 2.08 1.27h.8l.4-.78c-.82.15-1.08-.27-1.08-.27-.35-.54.18-.86.18-.86.2-.15.85-.29.85-.29v.8c.07 1.45 1.72 1.4 1.77 1.4h3.87v-.06s-.33-.02-.35-.71v-2.26c-.02-.84.52-.85.52-.85.7 0 .48.6.48.72zm10.7-5h-5.46c-.64.03-1.36.15-1.93.67 0 0-.99.91-.14 2.07 0 0 .4.54 1.07.74h.01c.05 0-.48.06-.7.2-.14.07-.18.16-.14.37.03.22.23.91 1 .96.56.02 1.35-.07 1.77.22 0 0 .3.2.3.56 0 .26-.03.8-1.19.86-.05 0-.96 0-1.13-.62 0 0-.1-.52.43-.59 0 0-.7-.15-1.28 0-.8.21-1.04.9-.59 1.4 0 0 .65.74 2.42.73 1.79.04 3.58-.46 3.26-2.16 0 0-.22-1.22-2.15-1.21h-.95s-.41.03-.5-.16c0 0-.17-.27.4-.29l.1-.01s1.66-.2 2.18-.89c0 0 .79-.86-.02-1.85h1.31v2.36c0 1.71 1.87 1.64 1.87 1.64.8-.01 1.26-.48 1.36-.58V31h2.44v-.05c-.5-.02-.44-.8-.44-.82V26h-2.4v.07c.49.03.4.82.4.84v2.13c-.03.95-.66.84-.66.85-.66 0-.65-.69-.65-.69V26zm-5.38 2.72c-.05.02-.74-.04-.67-.95.01 0-.02-.82.67-.82 0 0 .62-.02.63.8 0 .02.09.97-.63.97M43 26.7V26h-2.51v.06c.5.03.51.86.51.88v3.32q-.255.009-.51 0c-.8-.04-.8-.8-.8-.82l-.03-1.53c.01-1.1-.7-1.45-.69-1.46-1.34-.77-3.27-.24-3.27-.24s-.4 1.2-.42 1.2c2.04-.83 2.38-.02 2.37-.05.03.09.04.16.02.22-.07.36-.78.45-.78.45-.85.14-1.29.29-1.29.29-1.3.4-1.12 1.41-1.12 1.42.22 1.3 2.11 1.26 2.11 1.26h.82l.4-.78c-.83.16-1.1-.26-1.1-.26-.35-.54.19-.86.19-.86.2-.15.87-.28.87-.28v.78c.07 1.45 1.74 1.4 1.8 1.4h3.82v-.06c-.02 0-.4.03-.39-.8v-2s-.15-1.13 1.47-.88v-1.22s-.94-.28-1.47.65zm7 3.45V24h-2.34v.06c.4 0 .34.8.34.82v1.52c-1.66-1-2.79.26-2.78.24-.78.72-.74 1.87-.75 1.86 0 1.2.75 1.82.75 1.82.98 1 2.17.6 2.17.6l.52-.86c-1.47.23-1.47-1.55-1.46-1.56 0-1.53.87-1.44.88-1.45.74 0 .67.81.67.78V31h2.47v-.06s-.48.04-.47-.8z" />
          </g>
        </svg>
      ),
    },
    {
      id: 'qqqx',
      code: 'QQQx',
      change: '-0,65%',
      styleClass: 'qqqx',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet">
          <g clipPath="url(#QQQX_clip0)">
            <path fill="#000AD2" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" />
            <path fill="#fff" d="m34.63 37.02-1.48 1.48-1.45-1.47-.77-2.28-2.2-.76-.01-1.42h-1.44l-.76 3.61.78 2.34L23.92 40l-1.03-1.47.71-1.47v-1.58l-2.2.01-2.92 3.06-2.2-.7-.02-3.05-3.84-.6-2.77 1.48-1.64-.7-.01-3.1 1.48-.72 5.9-2.91.86.7 2.2-2.18v-1.43l2.91-2.9 1.48-3.1 2.19-3.61 3.64-.72 1.49-.01v1.42l2.93 2.89.01 3.1 4.58 4.3 4.42 2.92 2.2.7.78 2.19L48 33.93l-1.48 1.48h-1.44v-1.47l-2.21-.7-3.7-3.6-2.93-1.46-3.14-4.35-1.44-1.42.7-2.34-2.2-2.18-1.49 1.43.01 3.1-1.43 1.42 2.93 2.89-1.48 1.47 2.99 2.89v1.47l1.45 2.9 1.48-.01 1.64-1.48-.77-.7-.88-2.19h1.64l1.44 2.88 1.5 1.47z" />
          </g>
          <defs><clipPath id="QQQX_clip0"><path fill="#fff" d="M0 0h56v56H0z" /></clipPath></defs>
        </svg>
      ),
    },
    {
      id: 'tqqqx',
      code: 'TQQQx',
      change: '-1,75%',
      styleClass: 'tqqqx',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet">
          <g clipPath="url(#TQQQX_clip0)">
            <path fill="#F0F3FA" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" />
            <path fill="#5D9732" d="M44 22.318c.083 2.137-1.509 4.042-2.315 4.727.29-.896-.137-2.603-.411-3.083-2.367-4.83-6.175-5.446-8.645-5.6s-9.005.463-8.902 4.88c.082 3.536 5.077 5.618 7.564 6.217-12.555-1.15-15.42-6.576-15.282-9.145-.052-2.585 2.294-7.665 12.092-7.295 12.246.463 15.797 6.628 15.9 9.3H44z" />
            <path fill="#005568" d="M17.369 38.168c.182-4.725 2.806-8.594 4.095-9.938-1.365 3.313-2.707 9.825 2.844 9.37 6.94-.567 9.078-7.494 9.272-10.733.137-2.272-1.08-3.635-1.706-4.033 4.14.5 4.952 4.654 4.857 6.547-1.195 12.778-10.854 15.367-13.447 15.603-1.877.17-6.143-.91-5.915-6.816" />
          </g>
          <defs><clipPath id="TQQQX_clip0"><path fill="#fff" d="M0 0h56v56H0z" /></clipPath></defs>
        </svg>
      ),
    },
  ];

  const topDay = [
    {
      id: 'llyx',
      code: 'LLYx',
      change: '+4,21%',
      styleClass: 'llyx',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g clipPath="url(#LLYX_clip0_4293_481)">
            <path fill="#ED1D24" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" />
            <path fill="#fff" d="M36.371 31.01c.255-.182.531-.394.788-.596 1.98-1.586 3.494-3.324 3.794-4.285a.7.7 0 0 0 .035-.191c0-.1-.047-.169-.137-.169-.91 0-3.827 2.907-4.533 5.26v.008zm-7.312-.334c2.757-2.085 5.655-5.12 5.964-6.365a.5.5 0 0 0 .017-.119c-.004-.082-.048-.155-.153-.155-.873 0-4.914 3.73-5.828 6.639m-16.933 1.832c-.728-.505-1.854-.947-2.86-.947-.976 0-1.6.384-1.6.868 0 .555.757.798 1.605.798 1.028 0 1.961-.278 2.855-.719m8.448-6.539c1.977-.634 3.852-1.96 5.252-3.345 1.292-1.281 2.327-2.802 2.327-3.556 0-.172-.123-.276-.28-.276-.598 0-1.733.795-3.262 2.327-1.19 1.193-2.576 2.823-4.037 4.85m29.43 4.783c-1.699 1.69-6.99 6.338-8.39 10.248l-1.734-.447c.567-1.62 2.274-4.139 4.176-6.082a3.4 3.4 0 0 1-1.166.21c-.514 0-.913-.156-1.154-.447-.172-.21-.26-.484-.26-.81 0-.071.006-.142.016-.223-1.67 1.018-3.014 1.478-4.33 1.478-1.025 0-1.887-.446-2.286-1.23-1.658.824-3.249 1.23-4.578 1.23-1.238 0-2.235-.49-2.693-1.383-1.677.943-3.104 1.383-4.239 1.383-.653 0-1.17-.18-1.503-.524-.245-.253-.374-.593-.393-.986-1.075.709-2.645 1.51-4.255 1.51-1.647 0-2.75-.565-3.608-1.126-1.368.758-2.872 1.127-4.463 1.127-1.202 0-3.141-.501-3.141-2.226-.002-1.392 1.45-2.335 3.392-2.335 1.652 0 3.243.697 4.241 1.42.948-.756 1.942-1.812 3.115-3.305q-.387.022-.758.021c-2.246 0-4.122-.662-5.146-1.822a3.18 3.18 0 0 1-.815-2.154c0-3.127 3.947-5.553 7.4-5.91.23.518.432.916.643 1.39-3.41.398-6.252 2.418-6.252 4.392 0 1.298 1.457 2.602 4.551 2.602.53 0 1.063-.052 1.587-.124C20.692 22.857 24.877 17 28.478 17c1.066 0 1.623.648 1.623 1.515 0 1.784-1.533 3.704-2.532 4.705-1.569 1.578-4.408 3.925-8.372 4.703-1.54 2.147-2.809 3.57-4.077 4.598.768.415 1.49.67 2.348.67 2.134 0 4.204-1.954 5.82-3.611l.057-.056 1.26.986-.058.07c-.715.82-1.373 1.687-1.373 2.172 0 .368.311.441.578.441.817 0 2.077-.53 3.56-1.44v-.013c.163-3.665 5.16-9.269 8.195-9.269.856 0 1.348.427 1.348 1.175 0 1.837-3.167 5.775-7.774 8.79v.002c.238.513.787.76 1.72.76.725 0 2.147-.324 3.837-1.208.195-1.898 1.27-3.937 2.634-5.39 1.37-1.456 2.902-2.401 4.228-2.401.818 0 1.3.45 1.3 1.157 0 1.602-1.859 4.342-6.338 7.21.2.385.583.627 1.181.627 1.335 0 3.685-1.424 5.515-3.176l1.315 1.021c-.562.682-1.13 1.43-1.11 1.861.004.14.098.234.32.234 1.348 0 3.471-1.782 5.063-3.355zm-24.42-3.675a1.078 1.078 0 0 1 .894 1.68 1.08 1.08 0 1 1-.895-1.68z" />
          </g>
          <defs>
            <clipPath id="LLYX_clip0_4293_481">
              <path fill="#fff" d="M0 0h56v56H0z" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'avgox',
      code: 'AVGOx',
      change: '+2,82%',
      styleClass: 'avgox',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g clipPath="url(#AVGOX_clip0_4293_420)">
            <path fill="#CC092F" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" />
            <path
              fill="#fff"
              d="M42.273 35.238C39.631 40.438 34.232 44 28 44s-11.631-3.563-14.273-8.762a8 8 0 0 1 1.22-.505 3.1 3.1 0 0 1 1.887.014c.546.183 1.039.495 1.524.802l.151.096h.002c1.007.636 2.15 1.355 3.602 1.355 2.154 0 3.666-1.29 4.149-3.538A732 732 0 0 0 28 25s1.365 6.72 1.738 8.462c.483 2.249 1.996 3.538 4.15 3.538 1.453 0 2.594-.72 3.602-1.354l.002-.001.15-.096c.486-.307.978-.619 1.525-.803a3.1 3.1 0 0 1 1.886-.013c.418.124.828.313 1.22.505m.953-2.308a18 18 0 0 0-1.128-.501c-1.83-.731-3.506-.486-5.185.534 0 0-.612.375-.795.49l-.012.008c-.778.489-1.512.95-2.218.95-.677 0-1.343-.181-1.625-1.494-.44-2.048-1.512-7.08-1.98-9.573-.275-1.465-.426-2.255-.582-2.791-.276-.943-.78-1.455-1.497-1.537 0 0-.113-.016-.204-.016s-.215.018-.215.018c-.71.085-1.211.598-1.485 1.535-.157.537-.308 1.326-.582 2.79-.468 2.493-1.54 7.526-1.98 9.574-.282 1.313-.948 1.495-1.625 1.495-.706 0-1.44-.462-2.219-.951l-.011-.008c-.183-.115-.796-.49-.796-.49-1.679-1.02-3.355-1.265-5.184-.534-.386.154-.766.327-1.129.501A16 16 0 0 1 12 28c0-8.837 7.163-16 16-16s16 7.163 16 16c0 1.72-.272 3.377-.774 4.93"
            />
          </g>
          <defs>
            <clipPath id="AVGOX_clip0_4293_420">
              <path fill="#fff" d="M0 0h56v56H0z" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'wlfi',
      code: 'WLFI',
      change: '+2,33%',
      styleClass: 'wlfi',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <circle cx="500" cy="500" r="500" fill="#1C1917" />
          <g fill="#EAAC08" fillRule="evenodd" clipPath="url(#WLFI_clip0_28330_8868)" clipRule="evenodd">
            <path d="M392.554 491.908c2.048.357 3.449 2.578 3.154 4.958-.313 2.38-2.213 4.026-4.261 3.669L282.839 481.08c11.658 16.5 29.458 30.105 47.59 34.666l125.91 24.989-159.149 93.846c19.386 9.301 41.318 7.496 59.321-4.681l3.302-2.38 58.676-42.421c1.623-1.17 3.781-.595 4.796 1.289 1.014 1.904.516 4.383-1.107 5.573l-60.889 44.028c16.785 8.071 35.876 5.454 50.522-6.684l46.354-41.548c1.513-1.369 3.708-1.031 4.87.734 1.18 1.765.885 4.303-.627 5.672l-47.313 42.401c16.472 2.102 38.201-3.233 51.74-14.815 15.66-14.557 35.212-35.777 52.33-45.455 10.606-5.989 22.411-9.044 37.186-6.842 10.072 4.046 20.678 5.969 31.321 5.652 7.009 1.388 13.152 6.128 16.97 12.99 2.214-11.027-1.881-23.818-11.215-27.091.129-4.006-1.531-7.714-4.279-9.896l-2.527-1.448-67.474-38.534c-31.672-18.087-63.343-36.193-95.014-54.28-14.222-7.695-29.07-13.724-44.306-17.988-9.223-2.578-17.339-3.967-26.728-5.712L125 390.625c12.525 18.583 29.07 28.796 48.789 32.426l161.012 29.708c2.047.377 3.431 2.598 3.099 4.978s-2.232 3.986-4.28 3.61l-127.81-23.581c9.445 14.616 23.297 24.473 38.736 27.626l2.453.437z" />
            <path d="m799.796 437.508-129.378 24.394c-1.992.357-3.855-1.25-4.15-3.629-.313-2.38 1.052-4.601 3.044-4.958l165.457-31.196c16.288-3.828 30.749-15.093 40.23-31.494l-236.473 45.991h-.019c-18.962 3.689-31.615 8.805-48.844 18.543l-77.102 43.571 63.969 36.154c36.153-7.595 69.356-12.851 105.528-20.447 17.302-4.204 32.501-16.579 42.056-34.409l-110.508 20.844c-1.992.357-3.855-1.249-4.15-3.629-.314-2.38 1.051-4.601 3.043-4.958l143.581-27.071c16.583-3.629 31.874-13.288 43.753-27.686z" />
          </g>
          <defs>
            <clipPath id="WLFI_clip0_28330_8868">
              <path fill="#fff" d="M125 390.625h750v250H125z" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'dhrx',
      code: 'DHRx',
      change: '+1,62%',
      styleClass: 'dhrx',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g clipPath="url(#DHRX_clip0_4293_449)">
            <path fill="#013C81" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" />
            <path fill="#fff" d="M47.823 20.76c-1.39-4.828-10.586-6.22-20.547-3.08-.482.148-.936.296-1.39.474 8.91-2.162 16.658-.74 17.879 3.523 1.362 4.68-5.648 10.987-15.609 14.126-.227.06-.454.148-.681.207l4.626-16.76h-.029l-1.22.088c-2.27.237-4.71.74-7.18 1.51-9.933 3.11-16.886 9.566-15.495 14.392 1.39 4.828 10.585 6.22 20.575 3.08.483-.148.937-.296 1.39-.474-8.91 2.162-16.658.74-17.878-3.523-1.334-4.68 5.647-10.987 15.608-14.126.199-.06.426-.12.625-.178l-4.57 16.732 1.22-.09c2.271-.236 4.712-.74 7.18-1.51 9.934-3.11 16.887-9.564 15.496-14.391" />
          </g>
          <defs>
            <clipPath id="DHRX_clip0_4293_449">
              <path fill="#fff" d="M0 0h56v56H0z" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'abbvx',
      code: 'ABBVx',
      change: '+1,32%',
      styleClass: 'abbvx',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g clipPath="url(#ABBVX_clip0_4293_408)">
            <path fill="#00003A" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" />
            <path fill="#fff" d="M51.84 31.678c0-.608-.293-.819-.782-.819h-3.675c-1.725 0-2.333-1.278-2.413-2.159h5.102c1.49 0 1.928-1.282 1.928-2.108 0-.881-.477-2.108-1.928-2.108h-2.756c-2.509 0-3.334 2.044-3.334 3.702 0 1.821.94 3.702 3.328 3.702h4.53zm-4.45-6.165h2.557c.882 0 1.094.657 1.094 1.079 0 .378-.193 1.079-1.094 1.079H44.97c.06-.734.575-2.158 2.42-2.158M36.985 31.42c-.264.43-.445.58-.675.58-.32 0-.443-.207-.67-.58-.555-.903-4.245-6.936-4.245-6.936h.57c.616 0 .793.26 1.049.687l3.32 5.6 3.337-5.628c.236-.4.419-.659 1.037-.659h.502zm-24.199.468c-.387 0-.63-.229-.705-.723l-.127-.804c-.208.464-.984 1.527-2.661 1.527H7.365C4.74 31.888 4 29.76 4 28.186c0-1.772.89-3.702 3.365-3.702h1.929c1.877 0 2.923 1.309 3.174 2.904.21 1.331.703 4.5.703 4.5zm-3.705-6.375H7.433c-1.852 0-2.482 1.41-2.482 2.673 0 1.277.63 2.673 2.482 2.673h1.649c1.933 0 2.497-1.469 2.497-2.673 0-1.074-.504-2.673-2.498-2.673m33.367-1.878c.274 0 .486-.202.486-.588v-.244c0-.39-.215-.59-.486-.59-.27 0-.488.197-.488.59v.244c0 .388.212.588.488.588m-.477.849h.227c.442 0 .725.237.725.955v6.449h-.237c-.484 0-.715-.314-.715-.936zm-27.35.962c.41-.464 1.135-.962 2.285-.962h1.928c2.625 0 3.367 2.128 3.367 3.702 0 1.771-.89 3.702-3.367 3.702h-1.928c-1.879 0-3.236-1.453-3.236-3.701V22h.294c.42 0 .657.258.657.73zm2.498 5.413h1.647c1.853 0 2.483-1.41 2.483-2.673 0-1.277-.63-2.673-2.483-2.673H17.12c-1.935 0-2.498 1.468-2.498 2.673 0 1.074.502 2.673 2.498 2.673zm6.995-5.413c.41-.464 1.134-.962 2.285-.962h1.93c2.623 0 3.366 2.128 3.366 3.702 0 1.771-.892 3.702-3.367 3.702H26.4c-1.878 0-3.236-1.453-3.236-3.701V22h.295c.42 0 .656.258.656.73zm2.497 5.413h1.65c1.85 0 2.48-1.41 2.48-2.673 0-1.277-.629-2.673-2.48-2.673h-1.65c-1.934 0-2.497 1.468-2.497 2.673 0 1.074.503 2.673 2.497 2.673" />
          </g>
          <defs>
            <clipPath id="ABBVX_clip0_4293_408">
              <path fill="#fff" d="M0 0h56v56H0z" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'mrkx',
      code: 'MRKx',
      change: '+1,21%',
      styleClass: 'mrkx',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <clipPath id="MRKX_circleClip" clipPathUnits="objectBoundingBox">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </clipPath>
          </defs>
          <g clipPath="url(#MRKX_circleClip)">
            <path fill="#009394" d="M0 0h56v56H0z" />
            <path fill="#fff" d="M28 12a8 8 0 0 0-8 8h16a8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 1 16 0H20a8 8 0 0 0 8 8c4.419 0 8-3.58 8-8a8 8 0 1 0 0-16 8 8 0 0 0-8-8m8 8" />
          </g>
        </svg>
      ),
    },
    {
      id: 'gmex',
      code: 'GMEx',
      change: '+1,00%',
      styleClass: 'gmex',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id="GMEX_paint0_linear" x1="10.418" x2="68.147" y1="9.712" y2="76.017" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A1E21" />
              <stop offset="1" stopColor="#06060A" />
            </linearGradient>
            <clipPath id="GMEX_circleClip" clipPathUnits="objectBoundingBox">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </clipPath>
          </defs>
          <g clipPath="url(#GMEX_circleClip)">
            <path fill="url(#GMEX_paint0_linear)" d="M0 0h56v56H0z" />
            <path fill="#fff" d="M9 27H7v-1.581c0-.332.001-1.035-.5-1.035-.456 0-.5.6-.5.909v4.522c0 .313.05.892.5.892.486 0 .5-.614.5-.958V29h-.257v-1.452H9V32H8l-.188-.667c-.27.404-.816.667-1.488.667-1.023 0-2.084-.553-2.256-1.615Q4 29.965 4 29.125v-3.033C4 24.246 4.54 23 6.5 23c2.046 0 2.5.974 2.5 2.805zm3 .83h-2c0-.547-.04-1.137.2-1.642.404-.842 1.49-1.188 2.322-1.188.912 0 2.12.29 2.365 1.384.08.354.113 1.081.113 2.184V32h-2v-.677c-.279.476-.697.677-1.308.677-.4 0-.767-.063-1.1-.263C9.986 31.376 10 30.49 10 29.88c0-1.08.732-1.33 1.675-1.654.75-.261 1.193-.452 1.246-.543q.08-.135.079-.553c0-.286-.063-.824-.478-.824-.43 0-.522.519-.522.824zm1 .914c-.366.238-.854.435-.912.596q-.088.241-.088.694c0 .305.096.809.522.809.4 0 .478-.43.478-.727zM18 25v.879c.354-.503.969-.879 1.595-.879.61 0 1.054.376 1.405.879.385-.503.883-.879 1.471-.879C23.711 25 24 26.075 24 27.176V32h-2v-4.432c0-.303 0-1.262-.5-1.262s-.5.945-.5 1.262V32h-2v-4.59c0-.305-.047-1.104-.5-1.104s-.5.67-.5.985V32h-2v-7zm12 3.699h-3v1.442c0 .287.114.714.5.714.456 0 .5-.504.5-.844V29h2c0 .477.035 1.108-.088 1.574-.284 1.075-1.334 1.462-2.328 1.462C26 32.036 25 31.181 25 29.493v-1.945c0-1.573.923-2.548 2.426-2.548C29.212 25 30 26.116 30 27.814zm-2-1.086v-.488c0-.252-.111-.819-.5-.819s-.5.504-.5.82v.487z" />
            <path fill="#FF4D44" d="M36 26h-2v-.833c0-.288-.13-.647-.499-.647-.286 0-.501.2-.501.622 0 .596.292 1.032.803 1.3 1.438.76 2.197 1.497 2.197 3.221C36 31.26 34.98 32 33.562 32 31.678 32 31 30.86 31 29h2v.804c0 .334.1.715.519.715.316 0 .481-.22.481-.655 0-.48-.132-.792-.28-.94-.15-.147-.42-.595-1.011-.94-1.071-.63-1.709-1.127-1.709-2.536C31 23.77 31.885 23 33.356 23c1.765 0 2.644.724 2.644 2.448zm3-2v1h1v1h-1v4.115c0 .439.155.613.206.663s.42.222.794.222v1h-.912q-.78 0-1.114-.058a1.25 1.25 0 0 1-.588-.266.87.87 0 0 1-.317-.478c-.041-.179-.069-.6-.069-1.264V26h-.485v-1H37v-1zm7 3.463v1.634C46 30.77 45.379 32 43.5 32c-1.68 0-2.5-.9-2.5-2.682v-1.71c0-1.613.772-2.608 2.5-2.608 1.639 0 2.5.86 2.5 2.463m-2-.503c0-.273-.106-.72-.5-.72-.398 0-.5.441-.5.72v3.011c0 .265.12.807.5.807.37 0 .5-.471.5-.741zM49 25v.569c.21-.31.54-.569 1.155-.569 1.356-.05 1.829.631 1.845 1.903v2.81c0 1.527-.973 2.909-2.48 2.068-.241-.117-.52-.492-.52-.63V33h-2v-8zm1 1.999c0-.306-.061-.863-.503-.863-.437 0-.497.563-.497.863v2.86c0 .304.073.808.52.808.41 0 .48-.523.48-.808V27z" />
          </g>
        </svg>
      ),
    },
    {
      id: 'pmx',
      code: 'PMx',
      change: '+0,50%',
      styleClass: 'pmx',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <clipPath id="PMX_circleClip" clipPathUnits="objectBoundingBox">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </clipPath>
          </defs>
          <g clipPath="url(#PMX_circleClip)">
            <path fill="#4BA0DA" d="M0 0h56v56H0z" />
            <path
              fill="#fff"
              d="M21.682 28.168c-.007.046.008.08-.016.1-.003-.021-.006-.018-.01-.053-.02-.275-.049-.94.05-1.235.135.319.027.801-.024 1.188m6.306-7.384c1.031 0 1.936.186 2.717.525l-.03-.455c-.783-.308-1.678-.475-2.687-.475-1.01 0-1.904.167-2.686.475l-.03.455c.78-.34 1.684-.525 2.716-.525"
            />
            <path fill="#fff" d="M28.028 20.041c1.013 0 1.914.157 2.708.447l.15-.488c-.84-.299-1.792-.46-2.858-.46-1.065 0-2.016.162-2.857.46l.15.488c.794-.29 1.695-.447 2.707-.447m3.84 15.803c.019-.023.074-.052.145-.095.381-.23 1.204-.143 1.544-.078.465.088.636-.086.764-.248.363-.46-.235-.982-.475-1.372l-.453-.55c.093-.287.361-.705.421-.791s.114-.005.091.083c-.023.086-.145.45-.069.698.038.15.194.288.324.357.063.22.205.44.413.55.351.03.482.477.53.743.087.49-.301.907-.462.968-.288.11-.884-.036-1.21-.075-.164-.02-1.451-.166-1.497-.175-.007-.001-.048-.005-.067-.015zm-9.037-2.266c.046.108.06.112.027.212-.171.526-.379.867-.553 1.047 0 0-.261-.31-.309-.604.184-.382.447-.723.502-1.16.1.168.245.306.333.505m1.567 2.463c-.032.01-.08-.005-.1.003-.318.115-2.122.23-2.445.282-.04.007-.288-.104-.324-.208s-.113-.365.041-.383c.289-.031.567-.033.743-.008.105.015.236.096.338.111.366.054 1.15-.155 1.582.1.076.044.133.061.165.103m22.057-8.645c-.02.033-.08.078-.12.114-.068.059-.299.113-.51.052-.4-.117-.606-.599-.631-.977-.012-.166-.015-.31.092-.238.034.022.102.075.187.142.028.022.197.082.16-.106-.104-.525.164-1.08.155-1.668.23.05.51-.024.613.223.127.658-.16 1.454-.284 1.873-.063.209.066.415.235.533q.048.034.103.052" />
          </g>
        </svg>
      ),
    },
  ];

  const topDayFall = [
    { id: 'ambrx', code: 'AMBRx', change: '-15,48%', styleClass: 'ambrx', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet"><circle cx="28" cy="28" r="28" fill="#F0F3FA" /><path fill="#CCC" d="m23.6 43.72-.16-.05-10.6-5.4c-1.12-.58-1.12-1.57 0-2.14l13.1-6.7c1.12-.57 3-.57 4.12 0l12.44 6.34.66.31c1.12.57 1.12 1.56 0 2.13l-10.4 5.35-.25.1c-3.36 1.93-5.55 1.62-8.92.06z" /><path fill="#E73B29" d="m40.56 14.65.56.3c1.01.5 1.01 1.3 0 1.8l-9.14 4.52-.2.1a3.4 3.4 0 0 0-1.78 2.9V37.3c0 1.1.92 1.6 1.93 1.1l9.24-4.66a3.56 3.56 0 0 0 1.83-2.9V17.8s0-1.93-1.78-2.9m-26.42 0c-1 .5-1 1.3 0 1.8l9.23 4.57.15.05c1.01.5 1.82 1.8 1.82 2.9V37.2c0 1.1-.81 1.6-1.82 1.1l-9.32-4.6A3.59 3.59 0 0 1 13 30.78V17.76s-.14-1.78 1.6-2.76m11.95 2.61-3.62-1.73c-.4-.19-.4-.48 0-.67l4.43-2.07a1.7 1.7 0 0 1 1.38 0l4.23 1.97.2.1c.41.2.41.48 0 .67l-3.51 1.68c-1.12.63-2 .53-3.11.05" /></svg>) },
    { id: 'crclx', code: 'CRCLx', change: '-9,76%', styleClass: 'crclx', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet"><g clipPath="url(#CRCLX_fall_clip)"><path fill="#F0F3FA" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" /><path fill="url(#CRCLX_fall_g0)" d="M33.77 16.98a12.36 12.36 0 0 0-14.53 2.2 12.33 12.33 0 0 0-3.66 9.4c.1 2.22.78 4.32 2.04 6.29.13.2.13.45 0 .71q-.861.873-1.73 1.74a.65.65 0 0 1-.48.19.7.7 0 0 1-.47-.18 3 3 0 0 1-.34-.53 16.4 16.4 0 0 1-2.57-9.79c.17-2.9 1.08-5.55 2.71-7.96a15.86 15.86 0 0 1 10.02-6.7 15.86 15.86 0 0 1 11.86 2.17c.47.3 1.1.77 1.9 1.4.25.19.39.34.42.46q.075.3-.06.6l-.04.04-6.67 6.67c-.22.22-.49.25-.8.09l-.76-.42a5 5 0 0 0-3.32-.64 5.32 5.32 0 0 0-4.42 6.7c.06.28.1.47.08.58a.8.8 0 0 1-.25.51l-1.6 1.6a.57.57 0 0 1-.37.16c-.34.03-.58-.1-.72-.4a8.85 8.85 0 0 1 6.5-12.64 8.94 8.94 0 0 1 4.61.45l.05-.01 2.61-2.62c.03-.02.03-.05 0-.07z" /><path fill="url(#CRCLX_fall_g1)" d="M40.38 18.53a.7.7 0 0 1 .53.04c.14.06.3.26.47.6l.39.67a16.07 16.07 0 0 1-1.16 18 16.04 16.04 0 0 1-8.36 5.58l-.12.04a15.98 15.98 0 0 1-12.75-1.98c-.46-.3-1.08-.74-1.86-1.36-.28-.21-.44-.38-.46-.5a.8.8 0 0 1 0-.45c.05-.11.14-.24.29-.39l6.27-6.26c.17-.2.34-.31.5-.36a.76.76 0 0 1 .6.1q.447.258.89.52a5.3 5.3 0 0 0 7.23-2.53c.5-1.07.62-2.16.39-3.28l-.15-.68c-.06-.32 0-.58.19-.77q.849-.841 1.7-1.68.435-.21.78 0c.14.08.28.3.43.66.52 1.28.75 2.56.7 3.85a8.78 8.78 0 0 1-3.95 7.04 8.8 8.8 0 0 1-8.05.93c-.02 0-.04 0-.05.02l-2.64 2.63c-.02.02-.01.03 0 .05 2.11 1.09 4.35 1.56 6.72 1.4l.12-.02a12.27 12.27 0 0 0 9.66-6.06 12.36 12.36 0 0 0-.19-13 1.3 1.3 0 0 1-.2-.48.74.74 0 0 1 .1-.46 1.358 1.358 0 1 1 1.97-1.87z" /></g><defs><linearGradient id="CRCLX_fall_g0" x1="36.58" x2="13.96" y1="15.9" y2="31.27" gradientUnits="userSpaceOnUse"><stop stopColor="#79EBC2" /><stop offset="1" stopColor="#6ADAF3" /></linearGradient><linearGradient id="CRCLX_fall_g1" x1="40.99" x2="19.37" y1="22.16" y2="41.37" gradientUnits="userSpaceOnUse"><stop stopColor="#66BBFE" /><stop offset="1" stopColor="#A994F6" /></linearGradient><clipPath id="CRCLX_fall_clip"><path fill="#fff" d="M0 0h56v56H0z" /></clipPath></defs></svg>) },
    { id: 'acnx', code: 'ACNx', change: '-8,43%', styleClass: 'acnx', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet"><g clipPath="url(#ACNX_fall_clip)"><path fill="#A100FF" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" /><path fill="#fff" d="M36.909 27.992 14 17.946V11l31 13.527v6.943L14 45v-6.94z" /></g><defs><clipPath id="ACNX_fall_clip"><path fill="#fff" d="M0 0h56v56H0z" /></clipPath></defs></svg>) },
    { id: 'crmx', code: 'CRMx', change: '-7,55%', styleClass: 'crmx', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="CRMX_fall_clip" clipPathUnits="objectBoundingBox"><circle cx="0.5" cy="0.5" r="0.5" /></clipPath></defs><g clipPath="url(#CRMX_fall_clip)"><path fill="#009CDB" d="M0 0h56v56H0z" /><path fill="#fff" fillRule="evenodd" d="m26.972 16.365.626-.23.659-.196a6.4 6.4 0 0 1 1.374-.142 6.74 6.74 0 0 1 5.864 3.396 8.4 8.4 0 0 1 3.318-.688c4.523 0 8.187 3.615 8.187 8.08 0 4.467-3.664 8.081-8.188 8.081a8.7 8.7 0 0 1-1.608-.152 6.01 6.01 0 0 1-5.227 3.003 6 6 0 0 1-2.625-.59C28.312 39.318 25.889 41 23.062 41c-2.937 0-5.45-1.813-6.41-4.368q-.637.13-1.308.131C11.837 36.763 9 33.957 9 30.495a6.25 6.25 0 0 1 3.172-5.427 7 7 0 0 1-.603-2.86c0-3.987 3.306-7.208 7.383-7.208a7.43 7.43 0 0 1 5.865 2.84 6.7 6.7 0 0 1 2.155-1.475m2.76 8.173.022-.142.044-.295.1-.262.124-.23.156-.185c.212-.219.525-.328.927-.328l.302.022.223.055c.023.01.067.032.045.076l-.168.448-.003.004c-.02.03-.033.05-.097.029l-.112-.022-.179-.022-.234.033a.4.4 0 0 0-.19.109.6.6 0 0 0-.157.23 2.5 2.5 0 0 0-.111.48h.704c.055 0 .067.021.067.065l-.079.448c-.022.065-.078.065-.078.065h-.726l-.491 2.741a3.4 3.4 0 0 1-.19.72 1.4 1.4 0 0 1-.29.481c-.112.12-.246.219-.403.273a1.6 1.6 0 0 1-.536.088c-.1 0-.201 0-.324-.033l-.2-.055c-.023-.01-.046-.043-.035-.087l.168-.437c.022-.054.078-.032.078-.032l.123.043.179.022a1 1 0 0 0 .257-.033.47.47 0 0 0 .2-.153c.057-.076.113-.174.157-.305.056-.142.1-.317.134-.535l.492-2.698h-.492c-.056 0-.067-.021-.067-.065l.078-.448c.023-.065.079-.065.079-.065h.502z" /></g></svg>) },
    { id: 'nvox', code: 'NVOx', change: '-7,10%', styleClass: 'nvox', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet">
          <defs><clipPath id="NVOX_fall_circleClip" clipPathUnits="objectBoundingBox"><circle cx="0.5" cy="0.5" r="0.5" /></clipPath></defs>
          <g clipPath="url(#NVOX_fall_circleClip)">
            <path fill="#00AAD9" d="M0 0h56v56H0z" />
            <path fill="#004F93" d="M18.614 9a4.587 4.587 0 0 0-4.589 4.584 4.586 4.586 0 0 0 4.589 4.583 4.586 4.586 0 0 0 4.588-4.583A4.586 4.586 0 0 0 18.614 9m3.597 8.768c-.111.09-.308.248-.576.426-.863.627-2.431 1.315-4.814.679-2.526-.675-3.382-3.023-3.589-3.59l-.004-.012c-.198-.545-.48-.585-.48.215 0 2.016.894 3.238 1.191 3.585.3.348.439.691.274.89l-.054.067c-.336.409-.765.93-.888 1.262-.024.066-.025.178-.026.279 0 .062-.001.12-.007.162-.051.35-.345.707-.738 1.182q-.16.194-.337.415c-.314.397-.123.82.143 1.112.119.13.241.276.355.41.192.23.358.428.442.474.28.159.522.16.76.16.166 0 .33 0 .506.054l.039.012c.426.134 1.047.33 1.476 1.096.174.31.351.668.543 1.055.515 1.038 1.133 2.282 2.04 3.366.548.651.553 1.82.555 2.238v.017c.034 3.412-1.73 6.577-2.891 8.662l-.06.106c-.276.495-.22.902.152.905.25.003.524.003.896.001l.93-.001c.529 0 .536-.207.544-.426a.6.6 0 0 1 .058-.286c.04-.067.113-.083.194-.101.164-.036.363-.08.399-.551.008-.12.018-.225.081-.681.392-2.82 1.77-7.019 2.626-7.561 1.264.825 2.78 2.194 3.23 4.98.137.852.218 1.61.137 2.335-.088.787-.156 1.158-.227 1.382-.237.755-.044.917.318.903 0 0 1.699.002 1.94 0 .516 0 .513-.208.51-.415-.001-.1-.003-.2.056-.276.043-.056.106-.08.169-.105.125-.05.248-.098.208-.392-.253-1.289-.717-2.476-1.18-3.665-.422-1.078-.843-2.157-1.109-3.315-.396-1.723.642-2.812 1.523-3.073 1.389-.413 3.291.27 3.535.408q.048.026.085.05c.15.088.19.112.342-.016 1.57-1.293 2.297-.663 2.337-.625.182.172.305 1.083.314 1.266.19 3.742-3.112 7.357-4.462 8.836a15 15 0 0 0-.448.503c-.339.415-.148.83.19.828h.396c.54 0 1.403 0 1.625-.006.489-.016.482-.208.476-.402-.004-.098-.007-.197.053-.275.042-.055.103-.07.17-.088.106-.027.225-.058.3-.257.58-1.55 1.778-4.526 4.269-6.537.217-.175.421-.612.605-1.604.06-.323.133-.571.214-.846l.04-.14c1.402 1.82 1.573 5.076-.8 9.358-.25.446-.094.794.19.794h.238c.437.004 1.307.01 1.624 0 .512-.018.501-.241.49-.47l-.002-.098v-.008c0-.123 0-.327.444-.327.164 0 .346.003.48.005l.167.002h.118c.277.003.882.008 1.119-.018.308-.035.338-.35.344-.763.006-.613.04-7.601.006-8.46-.009-.218-.01-.57-.01-1.01-.004-1.973-.011-5.721-.774-7.09-1.111-1.994-3.338-1.808-4.378-1.722l-.016.001c-.342.03-.747.072-1.203.12-1.38.147-3.23.343-5.236.35-3.282.013-6.715-1.057-7.822-1.402a11 11 0 0 0-.294-.09 20 20 0 0 1-2.578-.954c-.52-.245-.29-.359-.06-.472l.033-.017c1.19-.593 2.185-1.223 2.805-2.227.474-.768.295-1.011-.231-.585zm17.953 8.69q0-.151.002-.198c.032-.345.24-.315.414.166.47 1.32.324 6.3.298 7.2l-.004.138c.004.166-.2.29-.34.12-.126-.16-.373-1.536-.537-2.445l-.11-.599c-.091-.46-.017-.918.067-1.439.04-.246.081-.506.11-.788.104-1.087.101-1.817.1-2.155" />
            <path fill="#fff" d="M18.795 9.958a3.09 3.09 0 0 0-3.091 3.086 3.09 3.09 0 0 0 3.091 3.085 3.087 3.087 0 0 0 3.087-3.085 3.087 3.087 0 0 0-3.087-3.086m8.911 14.8.008.056c.102.796.088 1.678.084 1.954v.026c-.009.675.512.825.865.927l.043.012c.944.278 2.85.2 4.163-.414 1.025-.48.404-2.195.23-2.611-.18-.43-.53-.594-1.079-.546-.304.026-1.104.045-1.794.053-.37.004-.693-.015-1.13-.042-.233-.013-.498-.03-.82-.044-.658-.033-.622.241-.57.628zm8.024-.374c.528.583.841 1.543.907 1.957.067.412.625.253.694-.133.103-.574-.08-1.522-.502-2.03-.194-.235-.527-.339-.916-.265-.366.07-.466.156-.183.47zm-7.856 6.122.037-.012c.944-.319 2.731-.532 5.904-.247a7.7 7.7 0 0 1 3.62 1.24c.357.232 1.262.822 1.653-.976.103-.459.295-1.451.33-1.91l.01-.111c.078-.773.46-4.57-1.727-4.557-.35.002-.324.14-.232.294.099.17.219.438.304.778.258 1.039.05 1.594-.31 1.945-.37.36-1.1.393-1.238-.132-.438-1.62-1.011-2.947-2.29-2.776-.264.035-.286.255-.16.57.116.284.285 1.044.34 1.65.072.817-.293 1.2-.861 1.537-.97.573-3.334.943-5.03.478-1.028-.28-1.061-1.057-1.061-1.355 0-.07 0-.182.002-.317.004-.446.01-1.14-.01-1.355-.074-.766-.163-1.19-.664-1.238-.49-.047-.486.013-.465.311.008.11.018.253.006.435v.007c-.006.155-.101 2.898-2.138 2.84-.51-.01-.78-.48-.684-.895.178-.789.287-1.565.263-2.42l-.002-.1c-.013-.572-.017-.74-1.28-1.147l-.034-.011c-.745-.24-1.089-.35-1.35-.25-.224.088-.387.33-.69.78l-.102.149c-.469.693-1.088 1.96-1.387 2.767-.604 1.632-.069 2.69.326 3.38.245.431.916 1.077 1.69 1.537a39 39 0 0 1 4.006 2.706c.338.257.542.327.555-.398.043-2.358 2.26-3.067 2.67-3.197zm-8.95-8.855a50 50 0 0 1-1.227-.686l-.102-.06c-1.408-.82-2.133-1.243-2.675-.807-.58.467-1.018 1.103-1.098 1.326-.03.081-.043.204-.058.34-.027.236-.058.512-.184.666a6 6 0 0 0-.21.286c-.123.175-.275.39-.459.613-.356.434-.193.619.138.991q.09.102.196.227c.187.223.477.246.835.274.457.036 1.023.08 1.625.556.507.4.71.717 1.309 1.658l.131.206c.235.37.378.152.57-.352.271-.7 1.192-2.658 1.892-3.727l.043-.065c.228-.344.492-.74.077-.996-.186-.113-.47-.268-.804-.45zm-4.245.242c-.44-.746 1.168-.956 1.245-.726s-.805 1.473-1.245.726m9.266 4.417c.097-.45.276-1.289.191-2.28-.037-.44.052-.465.61-.373.563.09.566.236.571.556v.032c.029 1.403-.335 2.317-.816 2.582-.266.148-.605.075-.612-.198 0-.053.023-.162.056-.319" />
          </g>
        </svg>
      ) },
    { id: 'aznx', code: 'AZNx', change: '-6,54%', styleClass: 'aznx', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet">
          <defs><clipPath id="AZNX_fall_clip"><path fill="#fff" d="M0 0h56v56H0z" /></clipPath></defs>
          <g clipPath="url(#AZNX_fall_clip)">
            <path fill="#8A0051" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" />
            <path fill="#EAC102" d="M41.983 28.822a2 2 0 0 0-.033-.215 4 4 0 0 0-.13-.424 4 4 0 0 0-.208-.422 5 5 0 0 0-.283-.436 2 2 0 0 0-.197-.232 3 3 0 0 0-.247-.234c-.2-.16-.398-.324-.615-.458-.476-.295-.95-.602-1.46-.83-.616-.274-1.213-.6-1.848-.822l-4.285-1.505c0-.825.023-1.65 0-2.473a77 77 0 0 0-.179-3.665 33 33 0 0 0-.297-2.537c-.102-.656-.256-1.304-.4-1.951a4 4 0 0 0-.131-.436 6 6 0 0 0-.298-.722q-.146-.285-.336-.541a2.7 2.7 0 0 0-.527-.53 1.96 1.96 0 0 0-.934-.37 2 2 0 0 0-.206-.017 3 3 0 0 0-1.514.322 6.4 6.4 0 0 0-.84.532c-.239.18-.482.358-.7.564a91 91 0 0 0-2.632 2.604c-.458.473-.902.96-1.317 1.47-1.651 2.023-3.295 4.05-4.883 6.125-.705.92-1.339 1.893-1.992 2.85q-.244.36-.456.74c-.244.443-.473.894-.697 1.348q-.084.18-.148.367a4 4 0 0 0-.113.36c-.063.22-.088.449-.073.677.004.055.02.11.037.16q.03.084.073.163.05.084.109.16.063.084.134.159a4.5 4.5 0 0 0 .697.581c.223.148.454.286.683.422.1.059.207.11.309.164.036.018-.073-.04-.108-.06-.005 0-.016-.007-.013-.006l.018.01.17.089c1.41.745 2.827 1.48 4.232 2.238 1.411.76 2.823 1.524 4.217 2.317l3.135 1.782c-1.089.834-2.198 1.639-3.265 2.5a14.3 14.3 0 0 0-2.004 2.02 9 9 0 0 0-.589.837 6 6 0 0 0-.379.704 5 5 0 0 0-.214.568 3 3 0 0 0-.096.415c-.014.084-.017.17-.022.257-.001.03.004.059.004.088.002.078-.002.155.002.232.016.271.087.537.209.78.029.056.058.113.096.163.072.1.145.2.231.287a2.7 2.7 0 0 0 .594.44q.165.089.338.16c.115.05.231.1.353.128.438.098.879.187 1.324.248.217.03.439.043.657.025.758-.06 1.515-.138 2.266-.258a44 44 0 0 0 2.613-.517 76 76 0 0 0 3.056-.735c.716-.19 1.444-.36 2.129-.643.54-.222 1.085-.435 1.62-.668.12-.052.234-.12.347-.187q.154-.09.299-.195a2 2 0 0 0 .243-.198 1.5 1.5 0 0 0 .175-.2 1.1 1.1 0 0 0 .175-.394.9.9 0 0 0 .002-.37 1.2 1.2 0 0 0-.128-.334 1.7 1.7 0 0 0-.21-.294 2.7 2.7 0 0 0-.476-.425 4 4 0 0 0-.242-.16c-.558-.34-1.114-.687-1.676-1.022l-2.353-1.406c1.429-.98 2.871-1.943 4.288-2.944.605-.428 1.2-.87 1.775-1.34.492-.402.96-.833 1.419-1.272.218-.21.412-.44.61-.67q.134-.157.252-.328c.072-.102.145-.205.202-.318.184-.37.366-.742.52-1.126.061-.156.087-.325.122-.49q.039-.228.036-.458a4 4 0 0 0-.017-.218m-17.57-9.732c.798-.837 1.598-1.673 2.41-2.497.148-.15.312-.285.47-.425q.084-.072.172-.14.067-.053.138-.101a.7.7 0 0 1 .23-.095.6.6 0 0 1 .135-.005q.035.001.068.015a.4.4 0 0 1 .133.075q.075.064.128.147c.021.034.044.069.058.107q.06.15.1.312.055.226.09.46.087.57.153 1.14c.055.494.094.988.139 1.482l.242 2.63-2.896-.675-2.703-.45-.654-.05-.212-.006c.6-.642 1.193-1.288 1.799-1.924m-1.816 3.657.01-.016.016-.01.022-.001.035.005.101.03.262.1.357.16 2.76 1.195q.916.393 1.83.788l1.206.52.107.05c.065.963.144 1.926.194 2.89.04.754.056 1.509.074 2.263.002.096-.005.19-.012.285a2 2 0 0 1-.016.16 1 1 0 0 1-.034.157 1 1 0 0 1-.057.148 1 1 0 0 1-.089.127.7.7 0 0 1-.128.1.6.6 0 0 1-.174.062.9.9 0 0 1-.37-.02 1 1 0 0 1-.133-.04 2.6 2.6 0 0 1-.566-.326 4 4 0 0 1-.299-.245 5 5 0 0 1-.303-.292q-.315-.338-.608-.695c-.35-.432-.713-.857-1.02-1.32-.423-.64-.858-1.272-1.27-1.92-.245-.385-.498-.77-.702-1.181l-.93-1.863-.2-.594-.046-.177-.028-.17-.002-.123zm10.274 16.518c.251.16.503.318.75.483.319.212.639.424.948.65.222.162.435.338.645.518q.139.12.264.257c.068.075.127.156.188.238a.03.03 0 0 1 .003.018.2.2 0 0 1-.006.043l-.015.023a.1.1 0 0 1-.03.02.5.5 0 0 1-.113.023c-1.22.093-2.444.178-3.665.275l-4.772.38-.149.009.069-.075.3-.27c.62-.464 1.218-.958 1.857-1.396l2.702-1.853zm3.676-9.505a.8.8 0 0 1-.138.264q-.121.147-.26.28c-.2.184-.397.373-.617.53-.759.545-1.51 1.102-2.277 1.633-.528.366-1.073.708-1.613 1.058l-3.135 2.038-1.332-.772-5.678-3.283c-1.282-.775-2.572-1.537-3.846-2.326-.24-.15-.465-.321-.695-.486-.073-.053-.14-.113-.21-.168-.022-.017-.047-.033-.067-.051a2 2 0 0 1-.142-.14 1 1 0 0 1-.133-.213.6.6 0 0 1-.036-.13.5.5 0 0 1 0-.138.8.8 0 0 1 .107-.297q.18-.32.438-.58c.733-.762 1.478-1.515 2.215-2.276l1.988-2.051.094.33.242.584.016.035c.525.922 1.019 1.862 1.576 2.764.64 1.037 1.328 2.044 2.015 3.05q.484.706 1.014 1.38c.309.388.628.77.974 1.126.304.312.637.597.975.872.168.136.356.245.54.357q.386.22.82.316c.298.068.608.062.902-.02.173-.047.337-.126.481-.233a1.8 1.8 0 0 0 .415-.4q.102-.137.188-.284.224-.38.363-.796c.099-.305.193-.612.269-.925.1-.422.213-.845.258-1.278l.257-2.505c.587.277 1.188.528 1.762.83.56.297 1.098.639 1.642.965q.095.06.18.13.122.102.233.217.116.12.181.276.029.075.042.155.006.04.002.08a.3.3 0 0 1-.01.082" />
          </g>
        </svg>
      ) },
    { id: 'mstrx', code: 'MSTRx', change: '-6,43%', styleClass: 'mstrx', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet">
          <defs><clipPath id="MSTRX_fall_circleClip" clipPathUnits="objectBoundingBox"><circle cx="0.5" cy="0.5" r="0.5" /></clipPath></defs>
          <g clipPath="url(#MSTRX_fall_circleClip)">
            <path fill="#D9232E" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28" />
            <path fill="#fff" d="M18 18v16h4V24l6 10h4l6-10v10h4V18h-4l-6 9-6-9h-4z" />
          </g>
        </svg>
      ) },
    { id: 'orclx', code: 'ORCLx', change: '-6,40%', styleClass: 'orclx', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet">
          <defs><clipPath id="ORCLX_fall_circleClip" clipPathUnits="objectBoundingBox"><circle cx="0.5" cy="0.5" r="0.5" /></clipPath></defs>
          <g clipPath="url(#ORCLX_fall_circleClip)">
            <path fill="#F80000" d="M0 0h56v56H0z" />
            <path fill="#fff" d="M24.828 29H28l-1.783-2.698-3.078 4.667h-1.401l3.744-5.606a.9.9 0 0 1 .735-.363.88.88 0 0 1 .72.354l3.758 5.615h-1.4L28.71 30H25.5zM39 29.974V25h-1v5.403c0 .146.06.288.173.396s.266.17.434.17h5.506l.887-.995zm-19.393-.92c1.154 0 2.393-.96 2.393-2.064S20.761 25 19.607 25H15v5.97h1v-4.975h3.528c.552 0 1.298.203 1.298.995s-.746 1.025-1.298 1.025l-2.946-.004 3.143 2.958h1.727l-2.388-1.916h.543zM7.09 30.968C5.385 30.97 4 29.65 4 28.015c0-1.632 1.385-2.958 3.09-2.958l3.82-.005c1.706 0 3.09 1.326 3.09 2.959 0 1.632-1.384 2.954-3.09 2.954l-3.82.004zm3.739-1.047c1.105 0 2-.854 2-1.911s-.895-1.916-2-1.916l-3.66.005c-1.105 0-2 .858-2 1.915s.895 1.912 2 1.912zM33.872 31c-1.706 0-3.177-1.352-3.177-2.985s1.47-2.928 3.177-2.928l3.572-.03-.696 1.043-2.797.03c-1.105 0-2.086.828-2.086 1.885s.981 1.942 2.086 1.942l3.591-.03-.7 1.042zm13.842-1.073c-.913 0-1.688-.586-1.924-1.393h5.08l.7-1.043h-5.78c.236-.802 1.01-1.496 1.924-1.496H51.2l.705-.995h-4.271c-1.707 0-3.093 1.383-3.093 3.015s1.386 2.954 3.093 2.954H51.3l.7-1.043z" />
          </g>
        </svg>
      ) },
  ];

  const marketAssets = [
    { id: 'btc', name: 'Bitcoin', code: 'BTC', price: '6 027 825,43 ₽', change: '↑ 0,80%', icon: <IconBtc size={42} />, styleClass: 'bitcoin' },
    { id: 'eth', name: 'Ethereum', code: 'ETH', price: '176 661,52 ₽', change: '↓ 0,40%', icon: <IconEth size={42} />, styleClass: 'eth' },
    { id: 'usdt', name: 'Доллары', code: 'USDT', badge: '9% годовых', price: '76,93 ₽', change: '↓ 0,04%', icon: <IconDollar size={42} />, styleClass: 'dollar' },
    { id: 'xrp', name: 'XRP', code: 'XRP', price: '123,33 ₽', change: '↓ 0,50%', icon: <IconXrp size={42} />, styleClass: 'xrp' },
    { id: 'sol', name: 'Solana', code: 'SOL', price: '7 940,88 ₽', change: '↑ 0,23%', icon: <IconSol size={42} />, styleClass: 'sol' },
    { id: 'trx', name: 'TRON', code: 'TRX', price: '21,80 ₽', change: '↓ 0,14%', icon: <IconTrx size={42} />, styleClass: 'trx' },
    { id: 'doge', name: 'Dogecoin', code: 'DOGE', price: '8,23 ₽', change: '↑ 2,17%', icon: <IconDoge size={42} />, styleClass: 'doge' },
    { id: 'bch', name: 'Bitcoin Cash', code: 'BCH', price: '40 605,84 ₽', change: '↑ 1,84%', icon: <IconBch size={42} />, styleClass: 'bch' },
  ];

  const additionalMarketAssetsForSearch = [
    { id: 'ada', name: 'Cardano', code: 'ADA', price: '22,78 ₽', change: '↑ 1,35%', icon: <IconCardano size={42} />, styleClass: 'ada' },
    { id: 'link', name: 'Chainlink', code: 'LINK', price: '738,28 ₽', change: '↓ 0,17%', icon: <IconLink size={42} />, styleClass: 'link' },
    { id: 'xlm', name: 'Stellar', code: 'XLM', badge: '333% годовых', price: '13,57 ₽', change: '↓ 0,37%', icon: <IconStellar size={42} />, styleClass: 'xlm' },
    { id: 'ltc', name: 'Litecoin', code: 'LTC', price: '4 592,02 ₽', change: '↑ 0,66%', icon: <IconLitecoin size={42} />, styleClass: 'ltc' },
    { id: 'sui', name: 'Sui', code: 'SUI', price: '87,28 ₽', change: '↑ 0,65%', icon: <IconSui size={42} />, styleClass: 'sui' },
    { id: 'avax', name: 'Avalanche', code: 'AVAX', price: '773,39 ₽', change: '↑ 0,18%', icon: <IconAvalanche size={42} />, styleClass: 'avax' },
    { id: 'shib', name: 'Shiba Inu', code: 'SHIB', price: '0,000523 ₽', change: '↑ 0,93%', icon: <IconShibaInu size={42} />, styleClass: 'shib' },
    { id: 'hbar', name: 'Hedera', code: 'HBAR', price: '6,99 ₽', change: '↓ 0,40%', icon: <IconHedera size={42} />, styleClass: 'hbar' },
    { id: 'wlfi', name: 'World Liberty Financial', code: 'WLFI', price: '9,85 ₽', change: '↓ 0,47%', icon: <IconWorldLibertyFinancial size={42} />, styleClass: 'wlfi' },
    { id: 'ton', name: 'Toncoin', code: 'TON', badge: '7.75% годовых', price: '105,03 ₽', change: '↑ 1,23%', icon: <IconToncoin size={42} />, styleClass: 'ton' },
    { id: 'dot', name: 'Polkadot', code: 'DOT', price: '116,69 ₽', change: '↓ 0,61%', icon: <IconPolkadot size={42} />, styleClass: 'dot' },
    { id: 'uni', name: 'Uniswap', code: 'UNI', price: '298,23 ₽', change: '↓ 1,06%', icon: <IconUniswap size={42} />, styleClass: 'uni' },
    { id: 'xaut', name: 'Золото', code: 'XAUT', badge: '25% годовых', price: '378 576,60 ₽', change: '↑ 4,46%', icon: <IconGold size={42} />, styleClass: 'xaut' },
    { id: 'mnt', name: 'Mantle', code: 'MNT', price: '55,66 ₽', change: '↑ 1,98%', icon: <IconMantle size={42} />, styleClass: 'mnt' },
    { id: 'aave', name: 'Aave', code: 'AAVE', price: '9 761,38 ₽', change: '↓ 0,01%', icon: <IconAave size={42} />, styleClass: 'aave' },
    { id: 'pepe', name: 'Pepe', code: 'PEPE', price: '0,000321 ₽', change: '↑ 0,21%', icon: <IconPepe size={42} />, styleClass: 'pepe' },
    { id: 'near', name: 'NEAR Protocol', code: 'NEAR', price: '91,59 ₽', change: '↑ 0,38%', icon: <IconNearProtocol size={42} />, styleClass: 'near' },
    { id: 'aster', name: 'Aster', code: 'ASTER', price: '45,54 ₽', change: '↑ 6,24%', icon: <IconAster size={42} />, styleClass: 'aster' },
    { id: 'etc', name: 'Ethereum Classic', code: 'ETC', price: '744,56 ₽', change: '↑ 0,88%', icon: <IconEtheriumClassic size={42} />, styleClass: 'etc' },
    { id: 'icp', name: 'Internet Computer', code: 'ICP', price: '205,47 ₽', change: '↓ 0,19%', icon: <IconInternetComputer size={42} />, styleClass: 'icp' },
    { id: 'sky', name: 'Sky', code: 'SKY', price: '4,76 ₽', change: '↑ 2,00%', icon: <IconSky size={42} />, styleClass: 'sky' },
    { id: 'pi', name: 'Pi', code: 'PI', price: '12,17 ₽', change: '↑ 1,34%', icon: <IconPi size={42} />, styleClass: 'pi' },
    { id: 'ondo', name: 'Ondo', code: 'ONDO', price: '21,61 ₽', change: '↑ 0,51%', icon: <IconOnd size={42} />, styleClass: 'ondo' },
    { id: 'pol', name: 'POL (prev. MATIC)', code: 'POL', price: '8,96 ₽', change: '↑ 12,64%', icon: <IconPol size={42} />, styleClass: 'pol' },
    { id: 'wld', name: 'Worldcoin', code: 'WLD', price: '31,12 ₽', change: '↑ 0,75%', icon: <IconWorldCoin size={42} />, styleClass: 'wld' },
    { id: 'ena', name: 'Ethena', code: 'ENA', price: '10,59 ₽', change: '↓ 0,95%', icon: <IconEthena size={42} />, styleClass: 'ena' },
  ];
  const searchStocks = marketTickers.map((t) => ({
    ...t,
    name: t.code.replace(/x$/i, ''),
    price: '—',
    category: 'stocks',
  }));
  const searchFunds = fundTickers.map((t) => ({
    ...t,
    name: t.code.replace(/x$/i, ''),
    price: '—',
    category: 'funds',
  }));
  const mergeAssetWithLive = (asset) => {
    const live = livePrices[asset.id];
    if (!live) return asset;
    const pct = live.percent || '';
    const arrow = pct.startsWith('-') ? '↓' : '↑';
    const changeVal = pct.replace(/^[+-]/, '').replace('.', ',');
    return {
      ...asset,
      price: live.price ?? asset.price,
      change: changeVal ? `${arrow} ${changeVal}` : asset.change,
    };
  };

  const marketAssetsWithLive = marketAssets.map(mergeAssetWithLive);
  const additionalMarketAssetsWithLive = additionalMarketAssetsForSearch.map(mergeAssetWithLive);

  const allMarketAssetsForSearch = [
    ...marketAssetsWithLive.map((a) => ({ ...a, category: 'crypto' })),
    ...additionalMarketAssetsWithLive.map((a) => ({ ...a, category: 'crypto' })),
    ...searchStocks,
    ...searchFunds,
  ];

  const tonAssets = [
    {
      id: 'usdt-ton',
      code: 'USDT',
      change: '1,07%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <rect width="40" height="40" fill="#28C281" rx="20"></rect>
          <path
            fill="#fff"
            d="M20.014 32.05c-.739 0-1.217-.464-1.217-1.243v-1.381c-2.899-.342-4.908-1.832-5.496-3.733a2.2 2.2 0 0 1-.137-.752c0-.86.588-1.435 1.531-1.435.793 0 1.245.465 1.532 1.107.546 1.395 1.832 2.16 3.91 2.16 2.2 0 3.61-.875 3.61-2.501 0-1.381-1.259-2.092-3.35-2.584l-1.86-.438c-3.117-.71-5.181-2.488-5.181-5.072 0-3.09 2.378-4.95 5.44-5.332V9.45c0-.78.48-1.244 1.218-1.244s1.217.465 1.217 1.244v1.395c2.68.328 4.62 1.777 5.222 3.787.069.26.123.506.123.765 0 .793-.601 1.272-1.476 1.272-.793 0-1.217-.383-1.559-1.04-.615-1.435-1.682-2.132-3.514-2.132-2.091 0-3.35.93-3.35 2.393 0 1.257 1.231 2.037 3.05 2.447l1.777.41c3.514.807 5.51 2.516 5.51 5.195 0 3.364-2.68 5.168-5.783 5.51v1.354c0 .779-.479 1.244-1.217 1.244"
          ></path>
        </svg>
      ),
    },
    {
      id: 'googlx',
      code: 'GOOGLx',
      change: '0,90%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g clipPath="url(#GOOGLX_clip0_4293_456)">
            <path fill="#F0F3FA" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28"></path>
            <path fill="#F71603" d="M23.47 18.43c-.5-1.04-.9-1.86-1.21-2.47a27 27 0 0 0-1.37-2.32 16.07 16.07 0 0 1 13.75-.14q2.475 1.17 4.47 3.12c.05.05.05.09 0 .13l-3.74 3.77h-.05a10.41 10.41 0 0 0-8.75-2.99c-1.08.14-2.11.44-3.1.9"></path>
            <path fill="url(#GOOGLX_paint0_linear_4293_456)" d="M20.89 13.63c.46.7.92 1.48 1.37 2.33.31.6.72 1.43 1.2 2.46a10.64 10.64 0 0 0-5.32 5.67c-1.68-.63-3.35-1.31-5.01-2.03a15.94 15.94 0 0 1 7.76-8.43"></path>
            <path fill="url(#GOOGLX_paint1_linear_4293_456)" d="M18.14 24.1a10.67 10.67 0 0 0-.14 7.4c-1.68.66-3.39 1.25-5.12 1.77a16.06 16.06 0 0 1 .25-11.2c1.66.7 3.33 1.39 5.01 2.02z"></path>
            <path fill="#108CED" d="M43.81 28.13c-1.32.62-2.64 1.24-3.96 1.88-.63.3-1.26.8-1.87.99H28v-5h15.97c.02 0 .03.02.03.04l-.19 2.1z"></path>
            <path fill="url(#GOOGLX_paint2_linear_4293_456)" d="M43.81 28.13c-.1 2.37-.62 4.59-1.58 6.66a16.1 16.1 0 0 1-4.1 5.46 20 20 0 0 0-2.4-2.94l-1.16-1.16a10.77 10.77 0 0 0 3.17-4.77c.06-.18.04-.14.14-.38.61-.18 1.34-.69 1.97-1a316 316 0 0 1 3.96-1.87"></path>
            <path fill="url(#GOOGLX_paint3_linear_4293_456)" d="M18 31.5a10.6 10.6 0 0 0 3.7 5.01c-.6.66-1.44 1.67-2.53 3.02l-.95 1.17a15.9 15.9 0 0 1-5.34-7.43c1.73-.52 3.44-1.11 5.12-1.76z"></path>
            <path fill="url(#GOOGLX_paint4_linear_4293_456)" d="m34.57 36.15 1.15 1.16c.9.9 1.7 1.88 2.42 2.94a15.83 15.83 0 0 1-19.91.45l.94-1.17a64 64 0 0 1 2.54-3.02 10.67 10.67 0 0 0 6.5 2.04 10.27 10.27 0 0 0 6.36-2.4"></path>
            <path fill="#000" d="M17.16 39.13c-.03 0-.06.01-.06.04 0 .02.02.05.05.05s.06-.01.07-.04c0-.02-.02-.05-.06-.05"></path>
          </g>
          <defs>
            <linearGradient id="GOOGLX_paint0_linear_4293_456" x1="23.9" x2="20.18" y1="18.38" y2="25.45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F71603"></stop>
              <stop offset="0.47" stopColor="#FA6702"></stop>
              <stop offset="1" stopColor="#FFA001"></stop>
            </linearGradient>
            <linearGradient id="GOOGLX_paint1_linear_4293_456" x1="16.62" x2="15.05" y1="23.67" y2="33.26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFA001"></stop>
              <stop offset="0.99" stopColor="#FBCC07"></stop>
            </linearGradient>
            <linearGradient id="GOOGLX_paint2_linear_4293_456" x1="36.27" x2="38.96" y1="37.35" y2="30.68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#03B58F"></stop>
              <stop offset="1" stopColor="#108CED"></stop>
            </linearGradient>
            <linearGradient id="GOOGLX_paint3_linear_4293_456" x1="14.31" x2="17.33" y1="33.31" y2="40.68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBC205"></stop>
              <stop offset="1" stopColor="#00BC43"></stop>
            </linearGradient>
            <linearGradient id="GOOGLX_paint4_linear_4293_456" x1="28.6" x2="37.46" y1="40.75" y2="38.61" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00BC43"></stop>
              <stop offset="1" stopColor="#03B58F"></stop>
            </linearGradient>
            <clipPath id="GOOGLX_clip0_4293_456">
              <path fill="#fff" d="M0 0h56v56H0z"></path>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'nvdax',
      code: 'NVDAx',
      change: '0,78%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g clipPath="url(#NVDAX_clip0_4293_510)">
            <path fill="url(#NVDAX_paint0_linear_4293_510)" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28"></path>
            <path fill="#76B900" d="M12.087 26.332s3.692-4.799 10.913-5.3v-1.994C15.002 19.62 8 26 8 26s3.998 10.245 15 11.187V35.32c-8.073-.921-10.913-8.99-10.913-8.99zM23 31.61v1.709c-6.102-.986-7.871-6.738-7.871-6.738S18.134 23.477 23 23v2.035c-.004 0 .003 0 0 0-2.554-.278-4.634 1.886-4.634 1.886S19.56 30.562 23 31.61M23 16v3.038c.235-.017.394-.03.63-.038 9.093-.278 15.018 6.962 15.018 6.962s-6.805 7.503-13.894 7.503c-.65 0-1.183-.054-1.754-.146v2.001c.489.056.92.091 1.448.091 6.597 0 11.368-3.056 15.988-6.672.766.557 3.902 1.91 4.546 2.502-4.392 3.335-14.63 6.023-20.433 6.023-.56 0-1.02-.031-1.549-.077V40h25V16zm0 7v-1.967c.232-.015.391-.026.63-.033 6.539-.186 10.829 5.055 10.829 5.055S29.969 32 25 32c-.715 0-1.423-.214-2-.39v-6.575c2.546.28 2.982 1.3 4.513 3.613l3.403-2.602S28.19 23 24 23c-.455 0-.572-.041-1 0"></path>
          </g>
          <defs>
            <linearGradient id="NVDAX_paint0_linear_4293_510" x1="10.418" x2="68.147" y1="9.712" y2="76.017" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A1E21"></stop>
              <stop offset="1" stopColor="#06060A"></stop>
            </linearGradient>
            <clipPath id="NVDAX_clip0_4293_510">
              <path fill="#fff" d="M0 0h56v56H0z"></path>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'major-ton',
      code: 'MAJOR',
      change: '0,67%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="52" height="52" fill="none" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <image
            xlinkHref="data:image/webp;base64,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"
            width="100%"
            height="100%"
            clipPath="inset(0% round 50%)"
          />
        </svg>
      ),
    },
    {
      id: 'aaplx',
      code: 'AAPLx',
      change: '0,58%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g clipPath="url(#AAPLX_clip0_4293_401)">
            <path fill="url(#AAPLX_paint0_linear_4293_401)" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28"></path>
            <path
              fill="#fff"
              d="M41 32.988q-.258.727-.544 1.392a16.2 16.2 0 0 1-1.661 2.9q-1.309 1.815-2.137 2.51-1.279 1.145-2.748 1.176-1.055.002-2.538-.588-1.484-.588-2.732-.587-1.308-.001-2.81.587-1.502.59-2.427.62-1.409.06-2.81-1.207-.894-.76-2.236-2.6-1.438-1.965-2.364-4.566Q15 29.817 15 27.185q0-3.016 1.342-5.197a7.77 7.77 0 0 1 2.812-2.764 7.7 7.7 0 0 1 3.8-1.043c.746 0 1.724.225 2.94.665q1.818.666 2.332.667c.255 0 1.12-.262 2.585-.785q2.078-.727 3.515-.607 3.897.305 5.845 2.992-3.482 2.053-3.448 5.74c.021 1.915.735 3.509 2.139 4.774A7.1 7.1 0 0 0 41 32.988M34.468 11q.03.3.03.6c0 1.5-.563 2.902-1.686 4.198-1.357 1.542-2.998 2.432-4.778 2.292a5 5 0 0 1-.036-.569c0-1.44.645-2.982 1.791-4.242q.859-.957 2.18-1.592 1.324-.626 2.499-.687"
            ></path>
          </g>
          <defs>
            <linearGradient id="AAPLX_paint0_linear_4293_401" x1="10.418" x2="68.147" y1="9.712" y2="76.017" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A1E21"></stop>
              <stop offset="1" stopColor="#06060A"></stop>
            </linearGradient>
            <clipPath id="AAPLX_clip0_4293_401">
              <path fill="#fff" d="M0 0h56v56H0z"></path>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'amznx',
      code: 'AMZNx',
      change: '0,45%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g clipPath="url(#AMZNX_clip0_4293_417)">
            <path fill="#FE5300" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28"></path>
            <path
              fill="#fff"
              d="M8.37 23.7c.21 0 .5.14.86.4.16.11.44.32.82.63l.88.68a24.1 24.1 0 0 0 7.61 3.63 34.3 34.3 0 0 0 9.58 1.28c3.2-.02 6.39-.47 9.55-1.36a25 25 0 0 0 4.92-2.03c.44-.23.76-.25.95-.05.35.36.2.86-.44 1.5a17.1 17.1 0 0 1-5.27 3.48c-1.86.82-3.87 1.4-6.03 1.77-4.267.698-8.637.4-12.77-.87a22.3 22.3 0 0 1-5.84-2.8 18.9 18.9 0 0 1-4.72-4.57c-.2-.29-.35-.57-.42-.84-.1-.37-.04-.64.18-.8a.2.2 0 0 1 .14-.05m32 .77a6.84 6.84 0 0 1 6.11-1.21c.65.17 1.08.4 1.29.72.2.31.27.82.2 1.51a7.54 7.54 0 0 1-3.17 5.62c-.2.14-.39.17-.58.1-.2-.09-.29-.26-.28-.51.01-.22.12-.5.32-.83.63-1.04 1.1-2.12 1.4-3.23.04-.18.07-.37.08-.57.02-.25-.01-.43-.08-.54-.07-.1-.23-.2-.46-.27-.18-.05-.36-.1-.54-.1-1.1-.1-2.22 0-3.37.27-.36.08-.65.09-.84.02-.24-.07-.35-.22-.36-.45 0-.21.09-.39.28-.53"
            ></path>
          </g>
          <defs>
            <clipPath id="AMZNX_clip0_4293_417">
              <path fill="#fff" d="M0 0h56v56H0z"></path>
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 'tac',
      code: 'TAC',
      change: '0,45%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 73 72" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <circle cx="36.5" cy="36" r="35.944" fill="#91019B"></circle>
          <path fill="#fff" d="M37.96 60.941V26.753c0-.83.673-1.501 1.504-1.501H58.23c1.916 0 3.1 2.086 2.118 3.728L40.754 61.711c-.783 1.308-2.794.754-2.794-.77"></path>
          <path fill="#fff" d="M35.068 45.224V11.036c0-1.524-2.01-2.079-2.793-.77L12.68 42.995c-.983 1.643.202 3.73 2.118 3.73h18.766c.83 0 1.503-.673 1.503-1.502"></path>
        </svg>
      ),
    },
    {
      id: 'qqqx',
      code: 'QQQx',
      change: '0,44%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 56 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g clipPath="url(#QQQX_clip0_4293_520)">
            <path fill="#000AD2" d="M0 28C0 12.536 12.536 0 28 0s28 12.536 28 28-12.536 28-28 28S0 43.464 0 28"></path>
            <path fill="#fff" d="m34.63 37.02-1.48 1.48-1.45-1.47-.77-2.28-2.2-.76-.01-1.42h-1.44l-.76 3.61.78 2.34L23.92 40l-1.03-1.47.71-1.47v-1.58l-2.2.01-2.92 3.06-2.2-.7-.02-3.05-3.84-.6-2.77 1.48-1.64-.7-.01-3.1 1.48-.72 5.9-2.91.86.7 2.2-2.18v-1.43l2.91-2.9 1.48-3.1 2.19-3.61 3.64-.72 1.49-.01v1.42l2.93 2.89.01 3.1 4.58 4.3 4.42 2.92 2.2.7.78 2.19L48 33.93l-1.48 1.48h-1.44v-1.47l-2.21-.7-3.7-3.6-2.93-1.46-3.14-4.35-1.44-1.42.7-2.34-2.2-2.18-1.49 1.43.01 3.1-1.43 1.42 2.93 2.89-1.48 1.47 2.99 2.89v1.47l1.45 2.9 1.48-.01 1.64-1.48-.77-.7-.88-2.19h1.64l1.44 2.88 1.5 1.47z"></path>
          </g>
          <defs>
            <clipPath id="QQQX_clip0_4293_520">
              <path fill="#fff" d="M0 0h56v56H0z"></path>
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  const bonusItems = [
    { id: 'mon', name: 'MON', rate: '20.01% годовых', icon: '⬡', styleClass: 'mon' },
    { id: 'ton', name: 'TON', rate: '7.78% годовых', icon: '◈', styleClass: 'ton' },
    { id: 'usdt', name: 'Доллары', rate: '2.6% годовых', icon: '$', styleClass: 'dollar' },
    { id: 'usdt-2', name: 'Доллары', rate: '9% годовых', icon: '$', styleClass: 'dollar' },
    { id: 'gold', name: 'Золото', rate: '25% годовых', icon: '✦', styleClass: 'gold' },
    { id: 'adi', name: 'ADI', rate: '25% годовых', icon: '△', styleClass: 'adi' },
    { id: 'xlm', name: 'XLM', rate: '333% годовых', icon: '✺', styleClass: 'xlm' },
  ];

  const completedBonusItems = [
    { id: 'btc-flr', name: 'BTC × FLR', rate: '30% годовых', icon: '₿', styleClass: 'bitcoin' },
    { id: 'usd-flr', name: 'Доллары × FLR', rate: '40% годовых', icon: '$', styleClass: 'dollar' },
    { id: 'flr', name: 'FLR', rate: '25% годовых', icon: 'F', styleClass: 'flr' },
    { id: 'ton-flr', name: 'TON × FLR', rate: '50% годовых', icon: '◈', styleClass: 'ton' },
    { id: 'ton-xlm', name: 'TON × XLM', rate: '56% годовых', icon: '✺', styleClass: 'ton' },
    { id: 'ton-gold', name: 'TON × Золото', rate: '10% годовых', icon: '✦', styleClass: 'ton' },
    { id: 'tac', name: 'TAC', rate: '30% годовых', icon: 'T', styleClass: 'tac' },
    { id: 'dogs', name: 'DOGS', rate: '5% годовых', icon: '🐶', styleClass: 'dogs' },
    { id: 'major', name: 'MAJOR', rate: '5% годовых', icon: '★', styleClass: 'major' },
    { id: 'dogs-2', name: 'DOGS', rate: '110% годовых', icon: '🐺', styleClass: 'dogs' },
  ];

  const historyItems = [
    { id: 'h1', type: 'out', title: 'Вывод: UQ...bDGj', time: '25 дек. 2025 г. в 19:31', amount: '3,6764 TON', status: 'Отправлено' },
    { id: 'h2', type: 'in', title: 'Покупка: P2P', time: '25 дек. 2025 г. в 19:27', amount: '+3,6764 TON', status: 'Получено' },
    { id: 'h3', type: 'out', title: 'Вывод: UQ...ZRvi', time: '20 дек. 2025 г. в 02:20', amount: '5,64 USDT', status: 'Отправлено' },
    { id: 'h4', type: 'in', title: 'Покупка: P2P', time: '20 дек. 2025 г. в 02:17', amount: '+5,64 USDT', status: 'Получено' },
    { id: 'h5', type: 'out', title: 'Вывод: UQ...ZRvi', time: '29 нояб. 2025 г. в 19:30', amount: '5,7 USDT', status: 'Отправлено' },
    { id: 'h6', type: 'in', title: 'Покупка: P2P', time: '29 нояб. 2025 г. в 19:26', amount: '+5,7 USDT', status: 'Получено' },
    { id: 'h7', type: 'out', title: 'Вывод: UQ...ZRvi', time: '27 нояб. 2025 г. в 20:45', amount: '5,88 USDT', status: 'Отправлено' },
    { id: 'h8', type: 'in', title: 'Покупка: P2P', time: '27 нояб. 2025 г. в 20:36', amount: '+5,88 USDT', status: 'Получено' },
    { id: 'h9', type: 'out', title: 'Вывод: UQ...bDGj', time: '27 нояб. 2025 г. в 19:30', amount: '5,88 USDT', status: 'Отправлено' },
    { id: 'h10', type: 'in', title: 'Покупка: P2P', time: '27 нояб. 2025 г. в 19:22', amount: '+5,88 USDT', status: 'Получено' },
    { id: 'h11', type: 'out', title: 'Вывод: UQ...ZRvi', time: '14 нояб. 2025 г. в 19:09', amount: '5,46 USDT', status: 'Отправлено' },
    { id: 'h12', type: 'in', title: 'Покупка: P2P', time: '14 нояб. 2025 г. в 19:06', amount: '+5,46 USDT', status: 'Получено' },
    { id: 'h13', type: 'in', title: 'Отмена P2P объявления', time: '12 нояб. 2025 г. в 16:22', amount: '+0,0001 USDT', status: 'Возвращено' },
    { id: 'h14', type: 'out', title: 'Объявление P2P', time: '12 нояб. 2025 г. в 16:18', amount: '21,14 USDT', status: 'В резерве' },
    { id: 'h15', type: 'in', title: 'Обмен: BTC на USDT', time: '12 нояб. 2025 г. в 16:16', amount: '+21,14 USDT', status: 'Получено' },
    { id: 'h16', type: 'in', title: 'Покупка: P2P', time: '12 нояб. 2025 г. в 15:49', amount: '+0,0002039 BTC', status: 'Получено' },
    { id: 'h17', type: 'in', title: 'Илюха', time: '2 дек. 2024 г. в 23:11', amount: '+0,1 MAJOR', status: 'Получено' },
    { id: 'h18', type: 'in', title: 'Илюха', time: '2 дек. 2024 г. в 23:10', amount: '+0,1 MAJOR', status: 'Получено' },
    { id: 'h19', type: 'out', title: 'Продажа: P2P', time: '5 июн. 2024 г. в 16:35', amount: '1,6782 TON', status: 'Отправлено' },
    { id: 'h20', type: 'in', title: 'Илюха', time: '5 июн. 2024 г. в 16:31', amount: '+1,6782 TON', status: 'Получено' },
    { id: 'h21', type: 'out', title: 'Продажа: P2P', time: '30 мая 2024 г. в 23:57', amount: '12,11 USDT', status: 'Отправлено' },
    { id: 'h22', type: 'out', title: 'Продажа: P2P', time: '30 мая 2024 г. в 23:41', amount: '12,11 USDT', status: 'Отменено' },
    { id: 'h23', type: 'in', title: 'Семчик', time: '30 мая 2024 г. в 23:37', amount: '+12 USDT', status: 'Получено' },
    { id: 'h24', type: 'out', title: 'Продажа: P2P', time: '24 мая 2024 г. в 22:29', amount: '1,6726 TON', status: 'Отправлено' },
    { id: 'h25', type: 'in', title: 'Покупка: P2P', time: '24 мая 2024 г. в 21:45', amount: '+0,8665 TON', status: 'Получено' },
    { id: 'h26', type: 'in', title: 'Возврат: P2P', time: '24 мая 2024 г. в 02:17', amount: '+0,11 USDT', status: 'Получено' },
    { id: 'h27', type: 'out', title: 'Вывод: UQ...9m8v', time: '23 мая 2024 г. в 19:45', amount: '0,5636 TON', status: 'Отправлено' },
    { id: 'h28', type: 'in', title: 'Покупка: P2P', time: '23 мая 2024 г. в 19:16', amount: '+0,9902 TON', status: 'Получено' },
    { id: 'h29', type: 'in', title: 'Обмен: USDT на TON', time: '23 мая 2024 г. в 19:02', amount: '+0,3795 TON', status: 'Получено' },
  ];

  const openAsset = (asset) => {
    setPrevScreen(screen);
    setSelectedAsset(asset);
    setScreen('asset');
  };

  const handleTabChange = (tab) => {
    if (tab === 'wallet') {
      setScreen('home');
      return;
    }

    if (tab === 'trade') {
      setScreen('trade');
      return;
    }

    if (tab === 'bonus') {
      setScreen('bonus');
      return;
    }

    if (tab === 'history') {
      setScreen('history');
      return;
    }

    setScreen(tab);
  };

  // Сброс скролла при переключении вкладок — страница всегда с верха
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    mainRef.current?.scrollTo?.(0, 0);
  }, [screen]);

  // Сброс скролла при переключении разделов — страница всегда сверху
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [screen]);

  return (
    <div className="ios-scroll-root">
      <div className="app">
      <main
        ref={mainRef}
        className={`content ${screen === 'history' ? 'screen-history' : ''} ${
          screen === 'bonus' ? 'screen-bonus' : ''
        } ${screen === 'asset' ? 'screen-asset' : ''} ${screen === 'transfer' ? 'screen-transfer' : ''} ${
          screen === 'buyCrypto' ? 'screen-buy-crypto' : ''
        } ${screen === 'buyCryptoDeposit' ? 'screen-buy-crypto' : ''
        } ${screen === 'buyCryptoNetwork' ? 'screen-buy-crypto' : ''
        } ${screen === 'buyCryptoAddress' ? 'screen-buy-crypto' : ''
        } ${screen === 'withdraw' ? 'screen-withdraw' : ''} ${screen === 'home' ? 'screen-home' : ''} ${
          screen === 'trade' ? 'screen-trade' : ''
        }`}
      >
        {screen === 'home' && (
          <HomeScreen
            assets={assets}
            walletStats={walletStats}
            cashAsset={cashAsset}
            cryptoTotal={cryptoTotal}
            promoSlides={promoSlides}
            trendingItems={trendingItems}
            onOpenAsset={openAsset}
            onOpenTrade={() => setScreen('trade')}
            onTransfer={() => {
              setPrevScreen(screen);
              setScreen('transfer');
            }}
            onAddDeposit={() => {
              setPrevScreen(screen);
              setScreen('buyCrypto');
            }}
            onWithdraw={() => {
              setPrevScreen(screen);
              setScreen('withdraw');
            }}
            onSwap={() => {
              setPrevScreen(screen);
              setScreen('exchange');
            }}
          />
        )}
        {screen === 'asset' && (
          <AssetScreen
            selectedAsset={selectedAsset}
            activity={activity}
            assetDetails={(() => {
              const merged = {};
              for (const [id, d] of Object.entries(assetDetails)) {
                const live = livePrices[id] || {};
                merged[id] = { ...d, ...live };
                if (live.percent != null && merged[id].overview?.capitalization) {
                  merged[id] = {
                    ...merged[id],
                    overview: {
                      ...merged[id].overview,
                      capitalization: {
                        ...merged[id].overview.capitalization,
                        change: live.percent,
                        isPositive: !String(live.percent).startsWith('-'),
                      },
                    },
                  };
                }
              }
              for (const [id, p] of Object.entries(livePrices)) {
                if (!merged[id]) {
                  const desc = (id in { tsla:1, goog:1, nvda:1, aapl:1, coin:1, hood:1, mcd:1, cisco:1, amzn:1 }) ? 'токенизированная акция для переводов и расчётов.' : 'криптовалюта для переводов и расчётов.';
                  merged[id] = { ...p, description: `${id.toUpperCase()} — ${desc}`, features: ['Получайте и отправляйте кому угодно (с комиссией).', 'Подходит для расчётов в сети.'], overview: { capitalization: { value: '—', change: p.percent || '—', isPositive: !String(p.percent || '').startsWith('-') }, volume: { value: '—', change: '—', isPositive: true }, inCirculation: { value: '—' } } };
                }
              }
              return merged;
            })()}
          />
        )}
        {screen === 'trade' && (
          <MarketScreen
            marketTickers={marketTickers}
            fundTickers={fundTickers}
            topDay={topDay}
            topDayFall={topDayFall}
            assets={marketAssetsWithLive}
            searchAssets={allMarketAssetsForSearch}
            tonAssets={tonAssets}
            onOpenAsset={openAsset}
          />
        )}
        {screen === 'bonus' && (
          <BonusScreen activeItems={bonusItems} completedItems={completedBonusItems} />
        )}
        {screen === 'history' && <HistoryScreen items={historyItems} />}
        {screen === 'transfer' && (
          <TransferScreen
            onSelectContact={() => {
              /* TODO: интеграция с Telegram для выбора контакта */
            }}
          />
        )}
        {screen === 'buyCrypto' && (
          <BuyCryptoScreen
            onSelectMethod={(id) => {
              if (id === 'deposit') {
                setPrevScreen('buyCrypto');
                setSelectedDepositAsset(null);
                setSelectedDepositNetwork(null);
                setScreen('buyCryptoDeposit');
              }
            }}
          />
        )}
        {screen === 'buyCryptoDeposit' && (
          <ExchangeCurrencyPicker
            cryptoAssets={allMarketAssetsForSearch.filter((a) => a.category === 'crypto')}
            showPriceAndChange={false}
            showYieldBadge={false}
            onSelect={(asset) => {
              const assetCode = String(asset?.code || '').toUpperCase();
              setSelectedDepositAsset(asset);
              if (assetCode === 'USDT') {
                setSelectedDepositNetwork(null);
                setPrevScreen('buyCryptoDeposit');
                setScreen('buyCryptoNetwork');
                return;
              }

              const defaultNetworkByAsset = {
                BTC: { id: 'btc', title: 'BTC' },
                TON: { id: 'ton', title: 'TON' },
                ETH: { id: 'erc20', title: 'ERC20' },
              };

              setSelectedDepositNetwork(
                defaultNetworkByAsset[assetCode] || {
                  id: assetCode.toLowerCase(),
                  title: assetCode,
                }
              );
              setPrevScreen('buyCryptoDeposit');
              setScreen('buyCryptoAddress');
            }}
            onClose={() => setScreen('buyCrypto')}
          />
        )}
        {screen === 'buyCryptoNetwork' && (
          <BuyCryptoNetworkScreen
            asset={selectedDepositAsset}
            cryptoAssets={allMarketAssetsForSearch.filter((a) => a.category === 'crypto')}
            onSelectNetwork={(network) => {
              setSelectedDepositNetwork(network);
              setPrevScreen('buyCryptoNetwork');
              setScreen('buyCryptoAddress');
            }}
          />
        )}
        {screen === 'buyCryptoAddress' && (
          <BuyCryptoAddressScreen
            asset={selectedDepositAsset}
            network={selectedDepositNetwork}
          />
        )}
        {screen === 'withdraw' && <WithdrawScreen />}
        {screen === 'exchange' && (
          <ExchangeScreen
            onNavigateToDeposit={() => setScreen('buyCrypto')}
            onBack={() => setScreen(prevScreen || 'home')}
            cryptoAssets={allMarketAssetsForSearch.filter((a) => a.category === 'crypto')}
          />
        )}
      </main>

      {screen !== 'asset' && screen !== 'transfer' && screen !== 'buyCrypto' && screen !== 'buyCryptoDeposit' && screen !== 'buyCryptoNetwork' && screen !== 'buyCryptoAddress' && screen !== 'withdraw' && screen !== 'exchange' && (
        <TabBar
          activeTab={
            screen === 'trade'
              ? 'trade'
              : screen === 'bonus'
              ? 'bonus'
              : screen === 'history'
              ? 'history'
              : 'wallet'
          }
          onChange={handleTabChange}
        />
      )}
      </div>
    </div>
  );
}

export default App;
