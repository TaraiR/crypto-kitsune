import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-logo">🦊 CryptoKitsune</span>
        <nav className="footer-links">
          <Link to="/privacy">プライバシーポリシー</Link>
          <Link to="/contact">お問い合わせ</Link>
        </nav>
        <p className="footer-note">© 2026 CryptoKitsune. 当サイトの情報は投資助言ではありません。</p>
      </div>
    </footer>
  );
}
