import { useEffect, useState } from 'react';
import axios from 'axios';
import './FearGreed.css';

const getColor = (v) =>
  v <= 25 ? '#ff1744' :
  v <= 45 ? '#ff6d00' :
  v <= 55 ? '#ffd600' :
  v <= 75 ? '#76ff03' : '#00c853';

const getLabel = (v) =>
  v <= 25 ? '極度の恐怖' :
  v <= 45 ? '恐怖' :
  v <= 55 ? '中立' :
  v <= 75 ? '強欲' : '極度の強欲';

export default function FearGreed() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://api.alternative.me/fng/')
      .then(r => setData(r.data.data[0]))
      .catch(() => {});
  }, []);

  if (!data) return null;

  const value = parseInt(data.value);
  const color = getColor(value);

  return (
    <div className="fg-card">
      <div className="fg-title">Fear & Greed インデックス</div>
      <div className="fg-gauge">
        <svg viewBox="0 0 200 110" className="fg-svg">
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border)" strokeWidth="16" strokeLinecap="round" />
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${value * 2.51} 251`}
          />
          <text x="100" y="90" textAnchor="middle" fontSize="32" fontWeight="700" fill={color}>{value}</text>
        </svg>
      </div>
      <div className="fg-label" style={{ color }}>{getLabel(value)}</div>
      <div className="fg-updated">更新：{data.time_until_update ? `${Math.floor(parseInt(data.time_until_update) / 3600)}時間後` : '最新'}</div>
    </div>
  );
}
