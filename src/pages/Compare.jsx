import { useEffect, useState } from 'react';
import { getMarkets, getMarketChart } from '../services/coingecko';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Compare.css';

const PERIODS = [
  { label: '7日', days: 7 },
  { label: '1ヶ月', days: 30 },
  { label: '1年', days: 365 },
];

const fmtPrice = (n) =>
  !n ? '-' :
  n >= 1 ? `¥${n.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}` :
  `¥${n.toFixed(6)}`;

const fmt = (n) =>
  !n ? '-' :
  n >= 1e12 ? `¥${(n / 1e12).toFixed(2)}兆` :
  n >= 1e8  ? `¥${(n / 1e8).toFixed(2)}億` :
  `¥${n.toLocaleString('ja-JP')}`;

export default function Compare() {
  const [coins, setCoins] = useState([]);
  const [coinA, setCoinA] = useState('bitcoin');
  const [coinB, setCoinB] = useState('ethereum');
  const [days, setDays] = useState(7);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getMarkets(1).then(setCoins); }, []);

  useEffect(() => {
    if (!coinA || !coinB) return;
    setLoading(true);
    Promise.all([getMarketChart(coinA, days), getMarketChart(coinB, days)]).then(([a, b]) => {
      const merged = a.prices.map(([ts, priceA], i) => ({
        time: new Date(ts).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
        A: priceA,
        B: b.prices[i]?.[1] ?? null,
      }));
      setChartData(merged);
      setLoading(false);
    });
  }, [coinA, coinB, days]);

  const cA = coins.find(c => c.id === coinA);
  const cB = coins.find(c => c.id === coinB);

  const STATS = [
    ['現在価格', c => fmtPrice(c.current_price)],
    ['24h変動', c => {
      const v = c.price_change_percentage_24h;
      return <span className={v >= 0 ? 'up' : 'down'}>{v >= 0 ? '▲' : '▼'}{Math.abs(v).toFixed(2)}%</span>;
    }],
    ['時価総額', c => fmt(c.market_cap)],
    ['24h出来高', c => fmt(c.total_volume)],
    ['24h高値', c => fmtPrice(c.high_24h)],
    ['24h安値', c => fmtPrice(c.low_24h)],
  ];

  return (
    <main className="container compare">
      <h1 className="page-title">コイン比較</h1>
      <p className="page-sub">2つのコインを並べてパフォーマンスを比較できます。</p>

      <div className="compare-selects">
        <select value={coinA} onChange={e => setCoinA(e.target.value)} className="coin-select">
          {coins.map(c => <option key={c.id} value={c.id}>{c.name} ({c.symbol.toUpperCase()})</option>)}
        </select>
        <span className="vs">VS</span>
        <select value={coinB} onChange={e => setCoinB(e.target.value)} className="coin-select">
          {coins.map(c => <option key={c.id} value={c.id}>{c.name} ({c.symbol.toUpperCase()})</option>)}
        </select>
      </div>

      <div className="period-tabs">
        {PERIODS.map(p => (
          <button key={p.days} className={days === p.days ? 'active' : ''} onClick={() => setDays(p.days)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="chart-wrap">
        {loading ? <div className="loading">読み込み中...</div> : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" tick={{ fill: '#8b949e', fontSize: 11 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
              <YAxis yAxisId="A" orientation="left" tick={{ fill: '#00e5ff', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `¥${v.toLocaleString()}`} width={90} />
              <YAxis yAxisId="B" orientation="right" tick={{ fill: '#f7931a', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `¥${v.toLocaleString()}`} width={90} />
              <Tooltip contentStyle={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 8 }} labelStyle={{ color: '#8b949e' }} />
              <Legend />
              <Line yAxisId="A" type="monotone" dataKey="A" name={cA?.symbol.toUpperCase()} stroke="#00e5ff" strokeWidth={2} dot={false} />
              <Line yAxisId="B" type="monotone" dataKey="B" name={cB?.symbol.toUpperCase()} stroke="#f7931a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {cA && cB && (
        <div className="stats-compare">
          <div className="stats-col">
            <div className="stats-coin-header">
              <img src={cA.image} width={28} height={28} alt="" />
              <span>{cA.name}</span>
            </div>
            {STATS.map(([label, fn]) => (
              <div key={label} className="stat-row">
                <span className="stat-label">{label}</span>
                <span className="stat-val">{fn(cA)}</span>
              </div>
            ))}
          </div>
          <div className="stats-col">
            <div className="stats-coin-header">
              <img src={cB.image} width={28} height={28} alt="" />
              <span>{cB.name}</span>
            </div>
            {STATS.map(([label, fn]) => (
              <div key={label} className="stat-row">
                <span className="stat-label">{label}</span>
                <span className="stat-val">{fn(cB)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
