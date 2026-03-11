/**
 * Загрузка исторических данных для графиков.
 * Приоритет: CoinMarketCap (если есть API ключ). Fallback: CoinGecko.
 */

const CMC_IDS = {
  btc: 1,
  eth: 1027,
  usdt: 825,
  xrp: 52,
  sol: 5426,
  trx: 1958,
  doge: 74,
  bch: 1831,
  link: 877,
  apt: 26455,
  ada: 2010,
  xlm: 512,
  ltc: 2,
  sui: 26375,
  avax: 5805,
  shib: 11941,
  dot: 6636,
  uni: 7083,
  near: 6535,
  pepe: 29850,
  aave: 7278,
  etc: 1321,
  icp: 8916,
  mnt: 27075,
  pol: 3890,
  wld: 28752,
  xaut: 6232,
  ton: 11419,
  hbar: 4642,
  ena: 28752,
  ondo: 28673,
  aster: 1,
  sky: 1611,
  pi: 1,
  wlfi: 1,
  cat: 1,
  major: 1,
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
  pol: 'polygon',
  wld: 'worldcoin',
  xaut: 'pax-gold',
  hbar: 'hedera-hashgraph',
  ena: 'ethena',
  ondo: 'ondo-finance',
  aster: 'bitcoin',
  sky: 'skycoin',
  pi: 'pi-network',
  wlfi: 'bitcoin',
  cat: 'bitcoin',
  major: 'bitcoin',
};

const PERIOD_TO_DAYS = {
  '1Д': 1,
  '7Д': 7,
  '1М': 30,
  '1Г': 365,
  'Все': 365,
};

async function fetchChartFromCMC(assetId, days) {
  const cmcId = CMC_IDS[assetId];
  const key = process.env.REACT_APP_CMC_API_KEY;
  if (!key || !cmcId) return null;

  const timeEnd = new Date();
  const timeStart = new Date();
  timeStart.setDate(timeStart.getDate() - days);

  const params = new URLSearchParams({
    id: String(cmcId),
    time_start: timeStart.toISOString().slice(0, 19) + 'Z',
    time_end: timeEnd.toISOString().slice(0, 19) + 'Z',
    convert: 'RUB',
  });

  try {
    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/ohlcv/historical?${params}`,
      { headers: { 'X-CMC_PRO_API_KEY': key } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const quotes = data?.data?.quotes ?? [];
    if (quotes.length < 2) return null;

    return quotes.map((q) => {
      const rub = q.quote?.RUB;
      const ts = new Date(q.time_open).getTime();
      const price = rub?.close ?? rub?.high ?? rub?.low ?? rub?.open ?? 0;
      return [ts, price];
    });
  } catch (err) {
    console.warn('[chartService] CMC fetch failed:', err.message);
    return null;
  }
}

async function fetchWithRetry(url, options = {}, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, options);
    if (res.status === 429 && i < retries) {
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
      continue;
    }
    return res;
  }
  return fetch(url, options);
}

async function fetchChartFromCoinGecko(assetId, days) {
  const cgId = COINGECKO_IDS[assetId];
  if (!cgId) return null;

  const url = `https://api.coingecko.com/api/v3/coins/${cgId}/market_chart?vs_currency=rub&days=${days}`;
  const headers = {};
  const cgKey = process.env.REACT_APP_COINGECKO_API_KEY;
  if (cgKey) headers['x-cg-demo-api-key'] = cgKey;

  try {
    const res = await fetchWithRetry(url, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const prices = data?.prices ?? [];
    if (prices.length < 2) return null;

    return prices.map(([ts, p]) => [ts, p]);
  } catch (err) {
    console.warn('[chartService] CoinGecko fetch failed:', err.message);
    return null;
  }
}

export async function fetchChartData(assetId, period) {
  const days = PERIOD_TO_DAYS[period] ?? 7;

  try {
    let points = await fetchChartFromCMC(assetId, days);
    if (points && points.length >= 2) return points;

    points = await fetchChartFromCoinGecko(assetId, days);
    if (points && points.length >= 2) return points;

    return null;
  } catch (err) {
    console.warn('[chartService] fetch failed:', err.message);
    return null;
  }
}

const CHART_PADDING = { top: 30, right: 72, bottom: 30, left: 0 };
const CHART_WIDTH = 814;
const CHART_HEIGHT = 456;
const CHART_AREA_WIDTH = CHART_WIDTH - CHART_PADDING.right;
const GRID_TICKS = 3;

export { CHART_AREA_WIDTH, CHART_HEIGHT };

function formatAxisLabel(value) {
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  return value.toFixed(2);
}

function getChartScale(points) {
  if (!points || points.length < 2) return null;
  const prices = points.map(([, p]) => p);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;
  const minTime = points[0][0];
  const maxTime = points[points.length - 1][0];
  const timeRange = maxTime - minTime || 1;
  const chartW = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
  const chartH = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;
  return {
    minPrice, maxPrice, priceRange, minTime, maxTime, timeRange,
    chartW, chartH, padding: CHART_PADDING,
    x: (ts) => CHART_PADDING.left + ((ts - minTime) / timeRange) * chartW,
    y: (price) => CHART_PADDING.top + chartH - ((price - minPrice) / priceRange) * chartH,
  };
}

/**
 * Преобразует массив точек [[timestamp, price], ...] в SVG path.
 */
export function buildChartPath(points, width = CHART_WIDTH, height = CHART_HEIGHT, padding = CHART_PADDING) {
  const scale = getChartScale(points);
  if (!scale) return '';

  return points
    .map(([ts, price], i) => `${i === 0 ? 'M' : 'L'}${scale.x(ts).toFixed(2)},${scale.y(price).toFixed(2)}`)
    .join(' ');
}

/**
 * Возвращает горизонтальные линии сетки и подписи оси Y справа.
 */
export function buildChartGridAndAxis(points) {
  const scale = getChartScale(points);
  if (!scale) return { gridLines: [], axisLabels: [] };

  const { minPrice, maxPrice, chartW, chartH } = scale;
  const gridLines = [];
  const axisLabels = [];
  const x2 = CHART_WIDTH - CHART_PADDING.right;

  for (let i = 0; i <= GRID_TICKS; i++) {
    const t = i / GRID_TICKS;
    const price = minPrice + (maxPrice - minPrice) * t;
    const y = CHART_PADDING.top + chartH - t * chartH;
    gridLines.push({
      x1: CHART_PADDING.left,
      y1: y,
      x2,
      y2: y,
    });
    axisLabels.push({
      x: CHART_WIDTH - 12,
      y: y + 5,
      text: formatAxisLabel(price),
    });
  }

  return { gridLines, axisLabels };
}

/**
 * Создаёт точки для fallback-графика по проценту изменения (например "2.16" или "-1.5").
 */
export function createFallbackChartPoints(percentChange = 0, seedSource = "asset") {
  const now = Date.now();
  const dayMs = 86400000;
  const basePrice = 100;

  let change = 0;
  if (typeof percentChange === 'string') {
    const isNeg = percentChange.includes('↓') || percentChange.startsWith('-');
    const num = parseFloat(percentChange.replace(',', '.').replace(/[^\d.-]/g, '')) || 0;
    change = isNeg ? -Math.abs(num) : num;
  } else {
    change = Number(percentChange) || 0;
  }

  // Deterministic pseudo-random for stable chart shape per asset/period.
  let seed = 0;
  const key = String(seedSource || "asset");
  for (let i = 0; i < key.length; i++) seed = (seed * 31 + key.charCodeAt(i)) >>> 0;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const pointsCount = 72;
  const endPrice = basePrice * (1 + change / 100);
  const trendDelta = endPrice - basePrice;
  const amplitude = Math.max(0.9, Math.abs(trendDelta) * 0.35);
  const freqA = 2.2 + rand() * 2.4;
  const freqB = 5.5 + rand() * 3.5;
  const phaseA = rand() * Math.PI * 2;
  const phaseB = rand() * Math.PI * 2;
  const noiseAmp = amplitude * 0.38;

  const points = [];
  for (let i = 0; i <= pointsCount; i++) {
    const progress = i / pointsCount;
    const t = now - dayMs + (dayMs * i) / pointsCount;
    const trend = basePrice + trendDelta * progress;

    const wave =
      Math.sin(progress * Math.PI * freqA + phaseA) * amplitude +
      Math.sin(progress * Math.PI * freqB + phaseB) * (amplitude * 0.42);
    const noise = (rand() * 2 - 1) * noiseAmp;

    // Fade volatility near edges so first/last points stay close to trend.
    const edgeFade = Math.sin(progress * Math.PI);
    const price = Math.max(0.0001, trend + (wave + noise) * edgeFade);
    points.push([t, price]);
  }

  // Preserve exact start/end trend direction.
  points[0][1] = basePrice;
  points[points.length - 1][1] = endPrice;
  return points;
}
