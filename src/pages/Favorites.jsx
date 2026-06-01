import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCoinsByIds } from '../services/coingecko';
import { useFavorites } from '../hooks/useFavorites';
import './Favorites.css';

const fmtPrice = (n) =>
  !n ? '-' :
  n >= 1 ? `¥${n.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}` :
  `¥${n.toFixed(6)}`;

const fmt = (n) =>
  !n ? '-' :
  n >= 1e12 ? `¥${(n / 1e12).toFixed(2)}兆` :
  n >= 1e8  ? `¥${(n / 1e8).toFixed(2)}億` :
  `¥${n.toLocaleString('ja-JP')}`;

export default function Favorites() {
  const { favorites, toggle, isFav } = useFavorites();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!favorites.length) { setCoins([]); return; }
    setLoading(true);
    getCoinsByIds(favorites).then(data => { setCoins(data); setLoading(false); });
  }, [favorites]);

  return (
    <main className="container favorites">
      <h1 className="page-title">⭐ お気に入り</h1>

      {favorites.length === 0 ? (
        <div className="empty">
          <p>お気に入りがまだありません。</p>
          <p>ランキング画面の ☆ ボタンでコインを追加できます。</p>
          <Link to="/" className="go-ranking">ランキングへ →</Link>
        </div>
      ) : loading ? (
        <div className="loading">読み込み中...</div>
      ) : (
        <div className="table-wrap">
          <table className="coin-table">
            <thead>
              <tr>
                <th>コイン</th>
                <th>価格（円）</th>
                <th>24h変動</th>
                <th>時価総額</th>
                <th>24h出来高</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coins.map(c => {
                const chg = c.price_change_percentage_24h;
                return (
                  <tr key={c.id}>
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
                      <button className="fav-btn active" onClick={() => toggle(c.id)}>★</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
