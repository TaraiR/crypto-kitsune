import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="container notfound">
      <div className="notfound-inner">
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">ページが見つかりません</h1>
        <p className="notfound-desc">お探しのページは存在しないか、移動した可能性があります。</p>
        <Link to="/" className="notfound-btn">← トップページへ戻る</Link>
      </div>
    </main>
  );
}
