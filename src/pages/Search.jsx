import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchCoins } from '../services/coingecko';
import { getCoinsByIds } from '../services/coingecko';
import './Search.css';

const fmtPrice = (n) =>
  !n ? '-' :
  n >= 1 ? `¥${n.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}` :
  `¥${n.toFixed(6)}`;

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setCoins([]);
    searchCoins(query).then(async (results) => {
      if (!results.length) { setLoading(false); return; }
      const ids = results.map(r => r.id);
      try {
        const detailed = await getCoinsByIds(ids);
        setCoins(detailed);
      } catch {
        // 詳細取得失敗時はsearch結果のみ表示
        setCoins(results.map(r => ({ id: r.id, name: r.name, symbol: r.symbol, image: r.large })));
      }
      setLoading(false);
    });
  }, [query]);

  return (
    <main className="container search-page">
      <h1 className="page-title">
        「{query}」の検索結果
        {!loading && coins.length > 0 && <span className="result-count"> {coins.length}件</span>}
      </h1>

      {loading && <div className="loading">検索中...</div>}

      {!loading && coins.length === 0 && query && (
        <div className="no-result">
          <p>「{query}」に一致するコインが見つかりませんでした。</p>
          <Link to="/" className="go-back">← ランキングへ戻る</Link>
        </div>
      )}

      {coins.length > 0 && (
        <div className="table-wrap">
          <table className="coin-table">
            <thead>
              <tr>
                <th>コイン</th>
                <th>価格（円）</th>
                <th>24h変動</th>
                <th>時価総額</th>
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
                        <span className="symbol">{c.symbol?.toUpperCase()}</span>
                      </Link>
                    </td>
                    <td className="num">{fmtPrice(c.current_price)}</td>
                    <td className={`num ${chg >= 0 ? 'up' : 'down'}`}>
                      {chg != null ? `${chg >= 0 ? '▲' : '▼'} ${Math.abs(chg).toFixed(2)}%` : '-'}
                    </td>
                    <td className="num">
                      {c.market_cap
                        ? c.market_cap >= 1e12 ? `¥${(c.market_cap / 1e12).toFixed(2)}兆`
                        : c.market_cap >= 1e8  ? `¥${(c.market_cap / 1e8).toFixed(2)}億`
                        : `¥${c.market_cap.toLocaleString('ja-JP')}`
                        : '-'}
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
