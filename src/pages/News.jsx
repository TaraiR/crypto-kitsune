import { useEffect, useState } from 'react';
import { getNews } from '../services/coingecko';
import './News.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getNews()
      .then(data => { setNews(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <main className="container news-page">
      <h1 className="page-title">仮想通貨 ニュース</h1>

      {loading && <div className="loading">読み込み中...</div>}
      {error && <div className="loading">ニュースの取得に失敗しました。</div>}

      <div className="news-grid">
        {news.map((item, i) => (
          <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="news-card">
            {item.thumb_2x && (
              <img src={item.thumb_2x} alt={item.title} className="news-img" />
            )}
            <div className="news-body">
              <div className="news-meta">
                <span className="news-source">{item.news_site}</span>
                <span className="news-date">{new Date(item.created_at * 1000).toLocaleDateString('ja-JP')}</span>
              </div>
              <h2 className="news-title">{item.title}</h2>
              <p className="news-desc">{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
