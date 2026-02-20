/**
 * Подтягивание реальных цен: CoinMarketCap или CoinGecko (крипто) + Finnhub (акции).
 * Графики остаются статичными.
 * Для крипто: REACT_APP_CMC_API_KEY (бесплатно на coinmarketcap.com/api)
 * Для акций: REACT_APP_FINNHUB_KEY (бесплатный ключ на finnhub.io)
 */

const CMC_SYMBOLS = {
  btc: 'BTC',
  eth: 'ETH',
  ton: 'TON',
  usdt: 'USDT',
  xrp: 'XRP',
  sol: 'SOL',
  trx: 'TRX',
  doge: 'DOGE',
  bch: 'BCH',
  link: 'LINK',
  apt: 'APT',
  ada: 'ADA',
  xlm: 'XLM',
  ltc: 'LTC',
  sui: 'SUI',
  avax: 'AVAX',
  shib: 'SHIB',
  dot: 'DOT',
  uni: 'UNI',
  near: 'NEAR',
  pepe: 'PEPE',
  aave: 'AAVE',
  etc: 'ETC',
  icp: 'ICP',
  mnt: 'MNT',
  pol: 'POL',
  wld: 'WLD',
  xaut: 'PAXG',
};

const COINGECKO_IDS = {
  btc: 'bitcoin',
  eth: 'ethereum',
  ton: 'the-open-network',
  usdt: 'tether',
  xrp: 'ripple',
  sol: 'solana',
  trx: 'tron',
  doge: 'dogecoin',
  bch: 'bitcoin-cash',
  link: 'chainlink',
  apt: 'aptos',
  ada: 'cardano',
  xlm: 'stellar',
  ltc: 'litecoin',
  sui: 'sui',
  avax: 'avalanche-2',
  shib: 'shiba-inu',
  dot: 'polkadot',
  uni: 'uniswap',
  near: 'near',
  pepe: 'pepe',
  aave: 'aave',
  etc: 'ethereum-classic',
  icp: 'internet-computer',
  mnt: 'mantle',
  pol: 'polygon-ecosystem-token',
  wld: 'worldcoin',
  xaut: 'pax-gold',
};

const FINNHUB_SYMBOLS = {
  tsla: 'TSLA',
  goog: 'GOOGL',
  nvda: 'NVDA',
  aapl: 'AAPL',
  coin: 'COIN',
  hood: 'HOOD',
  mcd: 'MCD',
  cisco: 'CSCO',
  amzn: 'AMZN',
};

function formatPriceRub(value) {
  if (value == null || typeof value !== 'number') return null;
  const formatted = value.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  });
  return `${formatted} ₽`;
}

function formatDelta(price, changePercent) {
  if (price == null || changePercent == null) return null;
  const delta = (price * changePercent) / 100;
  const sign = delta >= 0 ? '+' : '-';
  return `${sign}${formatPriceRub(Math.abs(delta))}`;
}

async function fetchCryptoPricesFromCMC() {
  const key = process.env.REACT_APP_CMC_API_KEY;
  if (!key) return null;

  const symbols = [...new Set(Object.values(CMC_SYMBOLS))].join(',');
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}&convert=RUB`;

  try {
    const res = await fetch(url, {
      headers: { 'X-CMC_PRO_API_KEY': key },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json?.data;
    if (!data) return {};

    const symbolToOurId = {};
    for (const [ourId, sym] of Object.entries(CMC_SYMBOLS)) {
      symbolToOurId[sym.toUpperCase()] = ourId;
    }

    const result = {};
    for (const item of Object.values(data)) {
      const sym = (item.symbol || '').toUpperCase();
      const ourId = symbolToOurId[sym];
      if (!ourId) continue;

      const quote = item.quote?.RUB;
      if (!quote || quote.price == null) continue;

      const price = quote.price;
      const change = quote.percent_change_24h ?? 0;

      result[ourId] = {
        price: formatPriceRub(price),
        percent: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        delta: formatDelta(price, change),
        period: '24 ч',
      };
    }
    return result;
  } catch (err) {
    console.warn('[priceService] CoinMarketCap fetch failed:', err.message);
    return null;
  }
}

async function fetchCryptoPricesFromCoinGecko() {
  const ids = Object.values(COINGECKO_IDS).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=rub&include_24hr_change=true`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const result = {};
    for (const [ourId, cgId] of Object.entries(COINGECKO_IDS)) {
      const item = data[cgId];
      if (!item || item.rub == null) continue;

      const price = item.rub;
      const change = item.rub_24h_change ?? 0;

      result[ourId] = {
        price: formatPriceRub(price),
        percent: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        delta: formatDelta(price, change),
        period: '24 ч',
      };
    }
    return result;
  } catch (err) {
    console.warn('[priceService] CoinGecko fetch failed:', err.message);
    return {};
  }
}

async function fetchCryptoPrices() {
  const cmc = await fetchCryptoPricesFromCMC();
  if (cmc && Object.keys(cmc).length > 0) return cmc;
  return fetchCryptoPricesFromCoinGecko();
}

async function fetchUsdRubRate() {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data?.rates?.RUB ?? 100;
  } catch {
    return 100;
  }
}

async function fetchStockPrices(usdRub) {
  const key = process.env.REACT_APP_FINNHUB_KEY;
  if (!key) return {};

  const result = {};
  for (const [ourId, symbol] of Object.entries(FINNHUB_SYMBOLS)) {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`
      );
      if (!res.ok) continue;
      const q = await res.json();
      if (q.c == null || q.c === 0) continue;

      const priceRub = q.c * usdRub;
      const change = q.dp ?? 0;

      result[ourId] = {
        price: formatPriceRub(priceRub),
        percent: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        delta: formatDelta(priceRub, change),
        period: '24 ч',
      };
    } catch {
      // skip
    }
  }
  return result;
}

export async function fetchAllPrices() {
  const [crypto, usdRub] = await Promise.all([
    fetchCryptoPrices(),
    fetchUsdRubRate(),
  ]);
  const stocks = await fetchStockPrices(usdRub);
  return { ...crypto, ...stocks };
}
