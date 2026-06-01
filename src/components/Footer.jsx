import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-logo">📈 Crypto Tarai</span>
        <nav className="footer-links">
          <Link to="/about">サイトについて</Link>
          <Link to="/privacy">プライバシーポリシー</Link>
          <Link to="/contact">お問い合わせ</Link>
        </nav>
        <p className="footer-note">© 2026 Crypto Tarai. 当サイトの情報は投資助言ではありません。</p>
      </div>
    </footer>
  );
}
