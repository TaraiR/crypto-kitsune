import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { searchCoins } from '../services/coingecko';
import { translateJaQuery } from '../services/jaMap';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: 'ランキング' },
  { to: '/portfolio', label: '計算機' },
  { to: '/converter', label: '変換' },
  { to: '/compare', label: '比較' },
  { to: '/favorites', label: '★お気に入り' },
  { to: '/events', label: 'イベント' },
  { to: '/glossary', label: '用語集' },
];

export default function Header({ dark, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length < 2) { setResults([]); return; }
    const translated = translateJaQuery(val);
    const coins = await searchCoins(translated);
    setResults(coins);
  };

  const go = (id) => {
    setQuery('');
    setResults([]);
    setMenuOpen(false);
    navigate(`/coin/${id}`);
  };

  const goSearch = () => {
    if (!query.trim()) return;
    setResults([]);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') goSearch();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="/" className="logo">📈 Crypto Tarai</a>

        {/* PC用ナビ */}
        <nav className="header-nav desktop-nav">
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''}>{l.label}</Link>
          ))}
        </nav>

        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="コインを検索... (Enter)"
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" onClick={goSearch}>🔍</button>
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

        {/* ハンバーガーボタン（スマホのみ） */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="メニュー">
          <span className={menuOpen ? 'bar open' : 'bar'} />
          <span className={menuOpen ? 'bar open' : 'bar'} />
          <span className={menuOpen ? 'bar open' : 'bar'} />
        </button>
      </div>

      {/* スマホ用ドロワー */}
      {menuOpen && (
        <nav className="mobile-nav">
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''} onClick={closeMenu}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
