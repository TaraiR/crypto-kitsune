import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrending } from '../services/coingecko';
import './Trending.css';

export default function Trending() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    getTrending().then(setCoins).catch(() => {});
  }, []);

  if (!coins.length) return null;

  return (
    <div className="trending-wrap">
      <div className="trending-label">🔥 トレンド</div>
      <div className="trending-list">
        {coins.map(({ item }) => (
          <Link key={item.id} to={`/coin/${item.id}`} className="trending-item">
            <img src={item.thumb} alt={item.name} width={18} height={18} />
            <span>{item.symbol}</span>
            <span className="trending-rank">#{item.market_cap_rank}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
