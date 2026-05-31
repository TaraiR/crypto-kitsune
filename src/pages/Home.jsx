import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMarkets } from '../services/coingecko';
import { useFavorites } from '../hooks/useFavorites';
import { TableSkeleton } from '../components/Skeleton';
import FearGreed from '../components/FearGreed';
import './Home.css';

const fmt = (n) =>
  !n ? '-' :
  n >= 1e12 ? `¥${(n / 1e12).toFixed(2)}兆` :
  n >= 1e8  ? `¥${(n / 1e8).toFixed(2)}億` :
  `¥${n.toLocaleString('ja-JP')}`;

const fmtPrice = (n) =>
  !n ? '-' :
  n >= 1 ? `¥${n.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}` :
  `¥${n.toFixed(6)}`;

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { toggle, isFav } = useFavorites();

  useEffect(() => {
    setLoading(true);
    getMarkets(page).then(data => {
      setCoins(data);
      setLoading(false);
    });
  }, [page]);

  return (
    <main className="container home">
      <h1 className="page-title">仮想通貨 ランキング</h1>

      <div className="home-top">
        <FearGreed />
      </div>

      {/* 広告枠 */}
      <div className="ad-banner">広告スペース（AdSense）</div>

      {loading ? (
        <TableSkeleton rows={10} />
      ) : (
        <div className="table-wrap">
          <table className="coin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>コイン</th>
                <th>価格（円）</th>
                <th>24h変動</th>
                <th>時価総額</th>
                <th>24h出来高</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coins.map((c, i) => {
                const chg = c.price_change_percentage_24h;
                return (
                  <tr key={c.id}>
                    <td className="rank">{(page - 1) * 50 + i + 1}</td>
                    <td>
                      <Link to={`/coin/${c.id}`} className="coin-name">
                        <img src={c.image} alt={c.name} width={24} height={24} />
                        <span>{c.name}</span>
                        <span className="symbol">{c.symbol.toUpperCase()}</span>
                      </Link>
                    </td>
                    <td className="num">{fmtPrice(c.current_price)}</td>
                    <td className={`num ${chg >= 0 ? 'up' : 'down'}`}>
                      {chg >= 0 ? '▲' : '▼'} {Math.abs(chg).toFixed(2)}%
                    </td>
                    <td className="num">{fmt(c.market_cap)}</td>
                    <td className="num">{fmt(c.total_volume)}</td>
                    <td>
                      <button className={`fav-btn ${isFav(c.id) ? 'active' : ''}`} onClick={() => toggle(c.id)}>
                        {isFav(c.id) ? '★' : '☆'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← 前</button>
        <span>{page}ページ</span>
        <button onClick={() => setPage(p => p + 1)}>次 →</button>
      </div>
    </main>
  );
}
