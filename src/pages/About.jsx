import { Link } from 'react-router-dom';
import './Legal.css';

export default function About() {
  return (
    <main className="container legal">
      <h1>Crypto Taraiについて</h1>
      <p className="updated">運営者情報・サイトの目的</p>

      <section>
        <h2>1. サイトの目的</h2>
        <p>Crypto Taraiは、仮想通貨・暗号資産の価格情報・チャート・ランキングを無料で提供する情報サイトです。ビットコイン・イーサリアムをはじめとする主要な仮想通貨のリアルタイム価格を日本円換算で確認できます。</p>
      </section>

      <section>
        <h2>2. 提供するコンテンツ</h2>
        <ul>
          <li>仮想通貨のリアルタイム価格・時価総額・出来高</li>
          <li>価格チャート（日足・週足・月足・年足）</li>
          <li>仮想通貨ランキング（時価総額順）</li>
          <li>ポートフォリオ計算機</li>
          <li>価格変換ツール（仮想通貨⇔日本円）</li>
          <li>コイン比較機能</li>
          <li>仮想通貨用語集</li>
          <li>重要イベントカレンダー</li>
        </ul>
      </section>

      <section>
        <h2>3. データの出典</h2>
        <p>当サイトの価格データは <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">CoinGecko</a> のAPIを利用して取得しています。データの正確性・完全性については保証できません。</p>
      </section>

      <section>
        <h2>4. 免責事項</h2>
        <p>当サイトに掲載する情報は参考目的のみであり、<strong>投資の勧誘・助言を目的としたものではありません。</strong>仮想通貨への投資はご自身の判断と責任において行ってください。当サイトの情報に基づく投資行為・取引によって生じた損害・損失について、当サイトは一切の責任を負いません。</p>
        <p>仮想通貨は価格変動リスクが非常に高く、投資元本を割り込む可能性があります。投資を行う際は十分にリスクを理解した上でご判断ください。</p>
      </section>

      <section>
        <h2>5. 著作権</h2>
        <p>当サイトのコンテンツ（文章・デザイン・構成など）の著作権は運営者に帰属します。無断転載・複製はお断りします。</p>
      </section>

      <section>
        <h2>6. お問い合わせ</h2>
        <p>当サイトに関するお問い合わせは<Link to="/contact">お問い合わせページ</Link>からお願いします。</p>
      </section>
    </main>
  );
}
