import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCoinDetail, getMarketChart, getMarkets } from '../services/coingecko';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useFavorites } from '../hooks/useFavorites';
import './CoinDetail.css';

const PERIODS = [
  { label: '1日', days: 1 },
  { label: '7日', days: 7 },
  { label: '1ヶ月', days: 30 },
  { label: '1年', days: 365 },
];

const fmtPrice = (n) =>
  n >= 1 ? `¥${n.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}` : `¥${n.toFixed(6)}`;

const fmt = (n) =>
  n >= 1e12 ? `¥${(n / 1e12).toFixed(2)}兆` :
  n >= 1e8  ? `¥${(n / 1e8).toFixed(2)}億` :
  `¥${n.toLocaleString('ja-JP')}`;

export default function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chart, setChart] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const { toggle, isFav } = useFavorites();

  useEffect(() => {
    setLoading(true);
    setCoin(null);
    Promise.all([getCoinDetail(id), getMarketChart(id, days)]).then(([detail, chartData]) => {
      setCoin(detail);
      setChart(chartData.prices.map(([ts, price]) => ({
        time: new Date(ts).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
        price,
      })));
      setLoading(false);
      // 関連コイン：同カテゴリ周辺の上位コインを取得
      getMarkets(1).then(markets => {
        const others = markets.filter(c => c.id !== id).slice(0, 6);
        setRelated(others);
      });
    });
  }, [id]);

  if (loading) return <div className="loading container">読み込み中...</div>;
  if (!coin) return null;

  const chg = coin.market_data.price_change_percentage_24h;
  const isUp = chg >= 0;

  return (
    <main className="container detail">
      {/* 広告枠 */}
      <div className="ad-banner">広告スペース（AdSense）</div>

      <div className="detail-header">
        <img src={coin.image.large} alt={coin.name} width={48} height={48} />
        <div>
          <h1>{coin.name} <span className="symbol-tag">{coin.symbol.toUpperCase()}</span></h1>
          <div className="rank-tag">時価総額 #{coin.market_cap_rank}</div>
        </div>
        <button className={`fav-btn-detail ${isFav(id) ? 'active' : ''}`} onClick={() => toggle(id)}>
          {isFav(id) ? '★ お気に入り済み' : '☆ お気に入り追加'}
        </button>
      </div>

      <div className="price-row">
        <span className="big-price">{fmtPrice(coin.market_data.current_price.jpy)}</span>
        <span className={`change-badge ${isUp ? 'up' : 'down'}`}>
          {isUp ? '▲' : '▼'} {Math.abs(chg).toFixed(2)}%
        </span>
      </div>

      <div className="period-tabs">
        {PERIODS.map(p => (
          <button
            key={p.days}
            className={days === p.days ? 'active' : ''}
            onClick={() => setDays(p.days)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chart}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isUp ? '#00c853' : '#ff1744'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isUp ? '#00c853' : '#ff1744'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fill: '#8b949e', fontSize: 11 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis domain={['auto', 'auto']} tick={{ fill: '#8b949e', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `¥${v.toLocaleString()}`} width={90} />
            <Tooltip
              contentStyle={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 8 }}
              labelStyle={{ color: '#8b949e' }}
              itemStyle={{ color: isUp ? '#00c853' : '#ff1744' }}
              formatter={v => fmtPrice(v)}
            />
            <Area type="monotone" dataKey="price" stroke={isUp ? '#00c853' : '#ff1744'} strokeWidth={2} fill="url(#grad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="stats-grid">
        {[
          ['時価総額', fmt(coin.market_data.market_cap.jpy)],
          ['24h出来高', fmt(coin.market_data.total_volume.jpy)],
          ['24h 最高値', fmtPrice(coin.market_data.high_24h.jpy)],
          ['24h 最安値', fmtPrice(coin.market_data.low_24h.jpy)],
          ['流通枚数', coin.market_data.circulating_supply ? coin.market_data.circulating_supply.toLocaleString('ja-JP') : '-'],
          ['最大供給量', coin.market_data.max_supply ? coin.market_data.max_supply.toLocaleString('ja-JP') : '無制限'],
        ].map(([label, val]) => (
          <div key={label} className="stat-card">
            <div className="stat-label">{label}</div>
            <div className="stat-val">{val}</div>
          </div>
        ))}
      </div>

      {coin.description?.ja && (
        <div className="description">
          <h2>概要</h2>
          <p dangerouslySetInnerHTML={{ __html: coin.description.ja.split('. ').slice(0, 3).join('. ') + '.' }} />
        </div>
      )}

      {related.length > 0 && (
        <div className="related">
          <h2 className="related-title">関連コイン</h2>
          <div className="related-grid">
            {related.map(c => {
              const chg = c.price_change_percentage_24h;
              return (
                <Link key={c.id} to={`/coin/${c.id}`} className="related-card">
                  <img src={c.image} alt={c.name} width={28} height={28} />
                  <div className="related-info">
                    <span className="related-name">{c.name}</span>
                    <span className="related-symbol">{c.symbol.toUpperCase()}</span>
                  </div>
                  <div className="related-right">
                    <span className="related-price">
                      {c.current_price >= 1
                        ? `¥${c.current_price.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}`
                        : `¥${c.current_price.toFixed(4)}`}
                    </span>
                    <span className={`related-chg ${chg >= 0 ? 'up' : 'down'}`}>
                      {chg >= 0 ? '▲' : '▼'}{Math.abs(chg).toFixed(2)}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
