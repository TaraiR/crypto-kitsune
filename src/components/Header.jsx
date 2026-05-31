import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { searchCoins } from '../services/coingecko';
import './Header.css';

export default function Header({ dark, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length < 2) { setResults([]); return; }
    const coins = await searchCoins(val);
    setResults(coins);
  };

  const go = (id) => {
    setQuery('');
    setResults([]);
    navigate(`/coin/${id}`);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="/" className="logo">📈 Crypto Tarai</a>
        <nav className="header-nav">
          <Link to="/">ランキング</Link>
          <Link to="/portfolio">計算機</Link>
          <Link to="/converter">変換</Link>
          <Link to="/compare">比較</Link>
          <Link to="/glossary">用語集</Link>
        </nav>
        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="コインを検索..."
            value={query}
            onChange={handleSearch}
          />
          {results.length > 0 && (
            <ul className="search-dropdown">
              {results.map(c => (
                <li key={c.id} onClick={() => go(c.id)}>
                  {c.thumb && <img src={c.thumb} alt="" width={18} height={18} />}
                  <span>{c.name}</span>
                  <span className="ticker">{c.symbol.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="theme-btn" onClick={onToggleTheme} title="テーマ切替">
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
