import axios from 'axios';

const BASE = 'https://api.coingecko.com/api/v3';

// メモリキャッシュ（TTL: 5分）
const cache = {};
const TTL = 5 * 60 * 1000;

const cached = (key, fetcher) => {
  const now = Date.now();
  if (cache[key] && now - cache[key].ts < TTL) {
    return Promise.resolve(cache[key].data);
  }
  return fetcher().then(data => {
    cache[key] = { data, ts: now };
    return data;
  });
};

export const getMarkets = (page = 1) =>
  cached(`markets_${page}`, () =>
    axios.get(`${BASE}/coins/markets`, {
      params: {
        vs_currency: 'jpy',
        order: 'market_cap_desc',
        per_page: 50,
        page,
        sparkline: false,
        price_change_percentage: '24h',
      },
    }).then(r => r.data)
  );

export const getCoinDetail = (id) =>
  cached(`detail_${id}`, () =>
    axios.get(`${BASE}/coins/${id}`, {
      params: { localization: false, tickers: false, community_data: false, developer_data: false },
    }).then(r => r.data)
  );

export const getMarketChart = (id, days = 7) =>
  cached(`chart_${id}_${days}`, () =>
    axios.get(`${BASE}/coins/${id}/market_chart`, {
      params: { vs_currency: 'jpy', days },
    }).then(r => r.data)
  );

export const searchCoins = (query) =>
  axios.get(`${BASE}/search`, { params: { query } }).then(r => r.data.coins.slice(0, 10));

export const getGlobalData = () =>
  cached('global', () =>
    axios.get(`${BASE}/global`).then(r => r.data.data)
  );

export const getTrending = () =>
  cached('trending', () =>
    axios.get(`${BASE}/search/trending`).then(r => r.data.coins.slice(0, 7))
  );

export const getCoinsByIds = (ids) =>
  axios.get(`${BASE}/coins/markets`, {
    params: {
      vs_currency: 'jpy',
      ids: ids.join(','),
      order: 'market_cap_desc',
      sparkline: false,
      price_change_percentage: '24h',
    },
  }).then(r => r.data);

