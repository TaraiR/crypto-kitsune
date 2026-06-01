import { useEffect, useState } from 'react';
import { getMarkets } from '../services/coingecko';
import { useDocTitle } from '../hooks/useDocTitle';
import './Converter.css';

export default function Converter() {
  useDocTitle('価格変換ツール');
  const [coins, setCoins] = useState([]);
  const [coinId, setCoinId] = useState('bitcoin');
  const [amount, setAmount] = useState('1');
  const [mode, setMode] = useState('crypto');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMarkets(1)
      .then(data => { setCoins(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const coin = coins.find(c => c.id === coinId);
  const price = coin?.current_price ?? 0;
  const num = parseFloat(amount) || 0;

  const result = mode === 'crypto'
    ? `¥${(num * price).toLocaleString('ja-JP', { maximumFractionDigits: 0 })}`
    : `${price > 0 ? (num / price).toFixed(8) : '-'} ${coin?.symbol.toUpperCase() ?? ''}`;

  const inputLabel = mode === 'crypto' ? coin?.symbol.toUpperCase() ?? '' : 'JPY（円）';
  const outputLabel = mode === 'crypto' ? '円（JPY）' : coin?.symbol.toUpperCase() ?? '';

  return (
    <main className="container converter">
      <h1 className="page-title">価格変換ツール</h1>
      <p className="page-sub">仮想通貨と日本円をかんたんに変換できます。</p>

      {loading && <div className="loading">コイン情報を読み込み中...</div>}
      {!loading && coins.length === 0 && (
        <div className="loading">データの取得に失敗しました。ページを再読み込みしてください。</div>
      )}

      {!loading && coins.length > 0 && (
      <div className="converter-card">
        <div className="form-group">
          <label>コイン</label>
          <select value={coinId} onChange={e => setCoinId(e.target.value)} className="coin-select">
            {coins.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.symbol.toUpperCase()})</option>
            ))}
          </select>
        </div>

        <div className="mode-tabs">
          <button className={mode === 'crypto' ? 'active' : ''} onClick={() => setMode('crypto')}>
            {coin?.symbol.toUpperCase() ?? 'コイン'} → 円
          </button>
          <button className={mode === 'jpy' ? 'active' : ''} onClick={() => setMode('jpy')}>
            円 → {coin?.symbol.toUpperCase() ?? 'コイン'}
          </button>
        </div>

        <div className="convert-row">
          <div className="convert-input-wrap">
            <label>{inputLabel}</label>
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="convert-input"
            />
          </div>
          <div className="convert-arrow">→</div>
          <div className="convert-result-wrap">
            <label>{outputLabel}</label>
            <div className="convert-result">{result}</div>
          </div>
        </div>

        {coin && (
          <div className="current-price">
            現在のレート：1 {coin.symbol.toUpperCase()} = ¥{coin.current_price.toLocaleString('ja-JP', { maximumFractionDigits: 0 })}
            <span className={coin.price_change_percentage_24h >= 0 ? 'up' : 'down'}>
              　{coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        )}
      </div>
      )}
    </main>
  );
}
