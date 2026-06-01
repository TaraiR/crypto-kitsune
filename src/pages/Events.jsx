import './Events.css';

const EVENTS = [
  {
    date: '2024-04-20',
    title: 'ビットコイン第4回半減期',
    coin: 'BTC',
    type: '半減期',
    desc: 'マイニング報酬が6.25BTCから3.125BTCに半減。過去3回の半減期後はいずれも大幅な価格上昇が起きた。',
    done: true,
  },
  {
    date: '2022-09-15',
    title: 'イーサリアム The Merge',
    coin: 'ETH',
    type: 'アップデート',
    desc: 'PoW（プルーフオブワーク）からPoS（プルーフオブステーク）への移行。エネルギー消費が約99.95%削減された。',
    done: true,
  },
  {
    date: '2024-01-10',
    title: 'ビットコイン現物ETF承認',
    coin: 'BTC',
    type: '規制',
    desc: '米SECがビットコイン現物ETFを承認。BlackRock・Fidelityなど大手運用会社が参入し機関投資家の流入が加速。',
    done: true,
  },
  {
    date: '2024-05-23',
    title: 'イーサリアム現物ETF承認',
    coin: 'ETH',
    type: '規制',
    desc: '米SECがイーサリアム現物ETFを承認。ビットコインに続く大きな規制上の節目となった。',
    done: true,
  },
  {
    date: '2025-03-01',
    title: 'イーサリアム Pectra アップデート',
    coin: 'ETH',
    type: 'アップデート',
    desc: 'アカウント抽象化・ステーキングの上限引き上げなどを含む大型アップデート。ユーザー体験の大幅改善が期待された。',
    done: true,
  },
  {
    date: '2028-04-01',
    title: 'ビットコイン第5回半減期（予定）',
    coin: 'BTC',
    type: '半減期',
    desc: 'マイニング報酬が3.125BTCから1.5625BTCに半減予定。約4年ごとに訪れる最大の需給イベント。',
    done: false,
  },
];

const TYPE_COLOR = {
  '半減期': '#f7931a',
  'アップデート': '#627eea',
  '規制': '#00c853',
};

export default function Events() {
  const past = EVENTS.filter(e => e.done).reverse();
  const upcoming = EVENTS.filter(e => !e.done);

  const Card = ({ e }) => (
    <div className={`event-card ${e.done ? 'done' : 'upcoming'}`}>
      <div className="event-header">
        <span className="event-type" style={{ background: `${TYPE_COLOR[e.type]}22`, color: TYPE_COLOR[e.type], borderColor: `${TYPE_COLOR[e.type]}55` }}>
          {e.type}
        </span>
        <span className="event-coin">{e.coin}</span>
        <span className="event-date">{new Date(e.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <h2 className="event-title">{e.title}</h2>
      <p className="event-desc">{e.desc}</p>
      {e.done && <span className="event-badge">完了</span>}
    </div>
  );

  return (
    <main className="container events">
      <h1 className="page-title">仮想通貨 重要イベント</h1>
      <p className="page-sub">半減期・大型アップデート・規制など市場に影響を与えた/与える主要イベントを掲載。</p>

      {upcoming.length > 0 && (
        <section>
          <h2 className="section-title">📅 今後の予定</h2>
          {upcoming.map((e, i) => <Card key={i} e={e} />)}
        </section>
      )}

      <section>
        <h2 className="section-title">📋 過去のイベント</h2>
        {past.map((e, i) => <Card key={i} e={e} />)}
      </section>
    </main>
  );
}
