import { useEffect, useState } from 'react';
import { getGlobalData } from '../services/coingecko';
import './GlobalStats.css';

const fmt = (n) =>
  n >= 1e12 ? `¥${(n / 1e12).toFixed(2)}兆` :
  n >= 1e8  ? `¥${(n / 1e8).toFixed(2)}億` :
  `¥${n.toLocaleString('ja-JP')}`;

export default function GlobalStats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getGlobalData().then(setData).catch(() => {});
  }, []);

  if (!data) return null;

  const totalMcap = data.total_market_cap?.jpy ?? 0;
  const totalVol  = data.total_volume?.jpy ?? 0;
  const btcDom    = data.market_cap_percentage?.btc ?? 0;
  const ethDom    = data.market_cap_percentage?.eth ?? 0;
  const chg       = data.market_cap_change_percentage_24h_usd ?? 0;

  return (
    <div className="global-stats">
      <div className="gs-item">
        <span className="gs-label">総時価総額</span>
        <span className="gs-value">{fmt(totalMcap)}</span>
        <span className={`gs-chg ${chg >= 0 ? 'up' : 'down'}`}>
          {chg >= 0 ? '▲' : '▼'}{Math.abs(chg).toFixed(2)}%
        </span>
      </div>
      <div className="gs-item">
        <span className="gs-label">24h出来高</span>
        <span className="gs-value">{fmt(totalVol)}</span>
      </div>
      <div className="gs-item">
        <span className="gs-label">BTC優位性</span>
        <span className="gs-value">{btcDom.toFixed(1)}%</span>
        <div className="gs-bar">
          <div className="gs-fill btc" style={{ width: `${btcDom}%` }} />
          <div className="gs-fill eth" style={{ width: `${ethDom}%` }} />
        </div>
        <span className="gs-sub">ETH {ethDom.toFixed(1)}%</span>
      </div>
      <div className="gs-item">
        <span className="gs-label">取引所数</span>
        <span className="gs-value">{data.markets?.toLocaleString()}</span>
      </div>
      <div className="gs-item">
        <span className="gs-label">コイン数</span>
        <span className="gs-value">{data.active_cryptocurrencies?.toLocaleString()}</span>
      </div>
    </div>
  );
}
