import { useState } from 'react';
import './Legal.css';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="container legal">
      <h1>お問い合わせ</h1>
      <p className="subtitle">ご質問・ご意見・不具合のご報告はこちらからお送りください。</p>

      {status === 'sent' ? (
        <div className="sent-msg">お問い合わせありがとうございます。内容を確認次第、ご連絡いたします。</div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>お名前</label>
            <input type="text" name="name" placeholder="山田 太郎" required />
          </div>
          <div className="form-group">
            <label>メールアドレス</label>
            <input type="email" name="email" placeholder="example@email.com" required />
          </div>
          <div className="form-group">
            <label>件名</label>
            <input type="text" name="subject" placeholder="お問い合わせ件名" required />
          </div>
          <div className="form-group">
            <label>メッセージ</label>
            <textarea name="message" rows={6} placeholder="お問い合わせ内容をご記入ください" required />
          </div>
          {status === 'error' && (
            <p style={{ color: 'var(--down)', fontSize: 14 }}>送信に失敗しました。時間をおいて再度お試しください。</p>
          )}
          <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            {status === 'sending' ? '送信中...' : '送信する'}
          </button>
        </form>
      )}
    </main>
  );
}
