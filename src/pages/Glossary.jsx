import { useState } from 'react';
import './Glossary.css';

const TERMS = [
  {
    term: 'ビットコイン（BTC）',
    category: '基礎',
    desc: '2009年にサトシ・ナカモトによって作られた世界初の仮想通貨。発行上限は2100万枚で、分散型のブロックチェーン技術を使用している。',
  },
  {
    term: 'イーサリアム（ETH）',
    category: '基礎',
    desc: 'スマートコントラクト機能を持つブロックチェーンプラットフォーム。DeFiやNFTの基盤として広く使われている。',
  },
  {
    term: 'ブロックチェーン',
    category: '技術',
    desc: 'データをブロック単位で管理し、それをチェーン状につなげた分散型台帳技術。改ざんが極めて困難な仕組みになっている。',
  },
  {
    term: 'ウォレット',
    category: '基礎',
    desc: '仮想通貨を保管・送受信するためのソフトウェアやハードウェア。秘密鍵と公開鍵のペアで管理される。',
  },
  {
    term: '秘密鍵',
    category: '技術',
    desc: '仮想通貨の所有権を証明するための暗号鍵。絶対に他人に教えてはいけない。紛失するとウォレットにアクセスできなくなる。',
  },
  {
    term: 'DeFi（分散型金融）',
    category: 'トレンド',
    desc: 'ブロックチェーン上に構築された金融サービス。銀行などの仲介機関なしに、貸し借りや取引が可能。',
  },
  {
    term: 'NFT（非代替性トークン）',
    category: 'トレンド',
    desc: 'ブロックチェーン上で発行されるデジタル資産の所有証明。アート・ゲーム・音楽など様々な分野で活用されている。',
  },
  {
    term: 'ステーキング',
    category: '投資',
    desc: '仮想通貨をネットワークに預けることで報酬を得る仕組み。銀行の預金利息に近いイメージ。',
  },
  {
    term: '時価総額',
    category: '投資',
    desc: '現在の価格 × 流通枚数で計算される仮想通貨の市場規模。市場全体の規模感を把握するのに使われる。',
  },
  {
    term: 'ガス代',
    category: '技術',
    desc: 'イーサリアムなどのブロックチェーンでトランザクションを処理する際に支払う手数料。ネットワークの混雑度によって変動する。',
  },
  {
    term: 'ハードウォレット',
    category: '基礎',
    desc: 'USBのような物理デバイスに秘密鍵を保管するウォレット。オフラインで管理するためハッキングリスクが低い。',
  },
  {
    term: 'アルトコイン',
    category: '基礎',
    desc: 'ビットコイン以外の仮想通貨の総称。イーサリアム・XRP・ソラナなど数千種類が存在する。',
  },
  {
    term: 'ステーブルコイン',
    category: '基礎',
    desc: '米ドルなどの法定通貨に価値を連動させた仮想通貨。USDT・USDCが代表例。価格変動リスクを抑えられる。',
  },
  {
    term: 'マイニング',
    category: '技術',
    desc: 'コンピューターで複雑な計算を行い、ブロックチェーンの取引を承認する作業。報酬として仮想通貨が得られる。',
  },
  {
    term: 'レバレッジ取引',
    category: '投資',
    desc: '証拠金を担保に、自分の資金以上の取引を行う方法。利益も損失も倍増するためハイリスク・ハイリターン。',
  },
  {
    term: 'HODL',
    category: '投資',
    desc: '仮想通貨を売らずに長期保有する戦略。2013年のフォーラムの誤字「hold」が語源で、コミュニティのスラングになった。',
  },
];

const CATEGORIES = ['すべて', '基礎', '技術', '投資', 'トレンド'];

export default function Glossary() {
  const [cat, setCat] = useState('すべて');
  const [query, setQuery] = useState('');

  const filtered = TERMS.filter(t =>
    (cat === 'すべて' || t.category === cat) &&
    (t.term.includes(query) || t.desc.includes(query))
  );

  return (
    <main className="container glossary">
      <h1 className="page-title">仮想通貨 用語集</h1>
      <p className="page-sub">仮想通貨・ブロックチェーンの基本用語をわかりやすく解説。</p>

      <div className="glossary-controls">
        <div className="cat-tabs">
          {CATEGORIES.map(c => (
            <button key={c} className={cat === c ? 'active' : ''} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <input
          className="glossary-search"
          placeholder="用語を検索..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="terms-list">
        {filtered.map(t => (
          <div key={t.term} className="term-card">
            <div className="term-header">
              <h2 className="term-name">{t.term}</h2>
              <span className="term-cat">{t.category}</span>
            </div>
            <p className="term-desc">{t.desc}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="no-result">該当する用語が見つかりませんでした。</p>}
      </div>
    </main>
  );
}
