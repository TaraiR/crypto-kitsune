import axios from 'axios';

const BASE = 'https://api.coingecko.com/api/v3';

export const getMarkets = (page = 1) =>
  axios.get(`${BASE}/coins/markets`, {
    params: {
      vs_currency: 'jpy',
      order: 'market_cap_desc',
      per_page: 50,
      page,
      sparkline: false,
      price_change_percentage: '24h',
    },
  }).then(r => r.data);

export const getCoinDetail = (id) =>
  axios.get(`${BASE}/coins/${id}`, {
    params: { localization: false, tickers: false, community_data: false, developer_data: false },
  }).then(r => r.data);

export const getMarketChart = (id, days = 7) =>
  axios.get(`${BASE}/coins/${id}/market_chart`, {
    params: { vs_currency: 'jpy', days },
  }).then(r => r.data);

export const searchCoins = (query) =>
  axios.get(`${BASE}/search`, { params: { query } }).then(r => r.data.coins.slice(0, 10));
