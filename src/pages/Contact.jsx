import { useState } from 'react';
import './Legal.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="container legal">
      <h1>お問い合わせ</h1>
      <p className="subtitle">ご質問・ご意見・不具合のご報告はこちらからお送りください。</p>

      {sent ? (
        <div className="sent-msg">お問い合わせありがとうございます。内容を確認次第、ご連絡いたします。</div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>お名前</label>
            <input type="text" placeholder="山田 太郎" required />
          </div>
          <div className="form-group">
            <label>メールアドレス</label>
            <input type="email" placeholder="example@email.com" required />
          </div>
          <div className="form-group">
            <label>件名</label>
            <input type="text" placeholder="お問い合わせ件名" required />
          </div>
          <div className="form-group">
            <label>メッセージ</label>
            <textarea rows={6} placeholder="お問い合わせ内容をご記入ください" required />
          </div>
          <button type="submit" className="submit-btn">送信する</button>
        </form>
      )}
    </main>
  );
}
