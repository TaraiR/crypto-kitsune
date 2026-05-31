import { useEffect, useState } from 'react';
import { getMarkets } from '../services/coingecko';
import './Portfolio.css';

const fmt = (n) =>
  n >= 1e8 ? `¥${(n / 1e8).toFixed(2)}億` :
  `¥${Math.round(n).toLocaleString('ja-JP')}`;

export default function Portfolio() {
  const [coins, setCoins] = useState([]);
  const [rows, setRows] = useState([{ coinId: '', amount: '' }]);

  useEffect(() => {
    getMarkets(1).then(setCoins);
  }, []);

  const addRow = () => setRows(r => [...r, { coinId: '', amount: '' }]);
  const removeRow = (i) => setRows(r => r.filter((_, idx) => idx !== i));
  const updateRow = (i, key, val) =>
    setRows(r => r.map((row, idx) => idx === i ? { ...row, [key]: val } : row));

  const results = rows.map(row => {
    const coin = coins.find(c => c.id === row.coinId);
    const amount = parseFloat(row.amount) || 0;
    const value = coin ? coin.current_price * amount : 0;
    return { coin, amount, value };
  });

  const total = results.reduce((sum, r) => sum + r.value, 0);

  return (
    <main className="container portfolio">
      <h1 className="page-title">ポートフォリオ計算機</h1>
      <p className="page-sub">保有枚数を入力して、現在の評価額を計算できます。</p>

      <div className="portfolio-table">
        <div className="portfolio-header">
          <span>コイン</span>
          <span>保有枚数</span>
          <span>評価額（円）</span>
          <span></span>
        </div>

        {rows.map((row, i) => {
          const coin = coins.find(c => c.id === row.coinId);
          const amount = parseFloat(row.amount) || 0;
          const value = coin ? coin.current_price * amount : 0;
          const chg = coin?.price_change_percentage_24h;

          return (
            <div key={i} className="portfolio-row">
              <select
                value={row.coinId}
                onChange={e => updateRow(i, 'coinId', e.target.value)}
                className="coin-select"
              >
                <option value="">コインを選択</option>
                {coins.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.symbol.toUpperCase()})
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="0.00"
                value={row.amount}
                onChange={e => updateRow(i, 'amount', e.target.value)}
                className="amount-input"
              />

              <div className="value-cell">
                <span className="value-jpy">{value > 0 ? fmt(value) : '-'}</span>
                {coin && chg != null && (
                  <span className={`value-chg ${chg >= 0 ? 'up' : 'down'}`}>
                    {chg >= 0 ? '▲' : '▼'}{Math.abs(chg).toFixed(2)}%
                  </span>
                )}
              </div>

              <button className="remove-btn" onClick={() => removeRow(i)} disabled={rows.length === 1}>✕</button>
            </div>
          );
        })}
      </div>

      <button className="add-btn" onClick={addRow}>＋ コインを追加</button>

      <div className="total-card">
        <span className="total-label">合計評価額</span>
        <span className="total-value">{total > 0 ? fmt(total) : '¥0'}</span>
      </div>

      {results.filter(r => r.value > 0).length > 1 && (
        <div className="breakdown">
          <h2>内訳</h2>
          {results.filter(r => r.value > 0).map((r, i) => (
            <div key={i} className="breakdown-row">
              <div className="breakdown-bar-wrap">
                <span className="breakdown-name">
                  {r.coin?.image && <img src={r.coin.image} width={16} height={16} alt="" />}
                  {r.coin?.name}
                </span>
                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{ width: `${(r.value / total * 100).toFixed(1)}%` }}
                  />
                </div>
                <span className="breakdown-pct">{(r.value / total * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
