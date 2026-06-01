// 日本語（カタカナ・ひらがな・漢字）→ 英語コイン名マッピング
const JA_MAP = {
  // ビットコイン
  'ビットコイン': 'bitcoin',
  'びっとこいん': 'bitcoin',
  'BTC': 'bitcoin',

  // イーサリアム
  'イーサリアム': 'ethereum',
  'イーサ': 'ethereum',
  'えーてる': 'ethereum',
  'ETH': 'ethereum',

  // リップル
  'リップル': 'ripple',
  'りっぷる': 'ripple',
  'XRP': 'ripple',

  // ソラナ
  'ソラナ': 'solana',
  'そらな': 'solana',
  'SOL': 'solana',

  // バイナンスコイン
  'バイナンス': 'binancecoin',
  'バイナンスコイン': 'binancecoin',
  'BNB': 'binancecoin',

  // ドージコイン
  'ドージコイン': 'dogecoin',
  'ドージ': 'dogecoin',
  'どーじ': 'dogecoin',
  'DOGE': 'dogecoin',

  // カルダノ
  'カルダノ': 'cardano',
  'エイダ': 'cardano',
  'ADA': 'cardano',

  // ポルカドット
  'ポルカドット': 'polkadot',
  'DOT': 'polkadot',

  // アバランチ
  'アバランチ': 'avalanche-2',
  'AVAX': 'avalanche-2',

  // チェーンリンク
  'チェーンリンク': 'chainlink',
  'LINK': 'chainlink',

  // ポリゴン
  'ポリゴン': 'matic-network',
  'マティック': 'matic-network',
  'MATIC': 'matic-network',

  // ユニスワップ
  'ユニスワップ': 'uniswap',
  'UNI': 'uniswap',

  // ライトコイン
  'ライトコイン': 'litecoin',
  'LTC': 'litecoin',

  // ビットコインキャッシュ
  'ビットコインキャッシュ': 'bitcoin-cash',
  'BCH': 'bitcoin-cash',

  // ステラ
  'ステラ': 'stellar',
  'XLM': 'stellar',

  // コスモス
  'コスモス': 'cosmos',
  'ATOM': 'cosmos',

  // アルゴランド
  'アルゴランド': 'algorand',
  'ALGO': 'algorand',

  // テザー
  'テザー': 'tether',
  'USDT': 'tether',

  // USD コイン
  'USDコイン': 'usd-coin',
  'USDC': 'usd-coin',

  // シバイヌ
  'シバイヌ': 'shiba-inu',
  'シブ': 'shiba-inu',
  'SHIB': 'shiba-inu',

  // トロン
  'トロン': 'tron',
  'TRX': 'tron',

  // モネロ
  'モネロ': 'monero',
  'XMR': 'monero',

  // イーサリアムクラシック
  'イーサリアムクラシック': 'ethereum-classic',
  'ETC': 'ethereum-classic',

  // ファイルコイン
  'ファイルコイン': 'filecoin',
  'FIL': 'filecoin',

  // アプトス
  'アプトス': 'aptos',
  'APT': 'aptos',

  // アービトラム
  'アービトラム': 'arbitrum',
  'ARB': 'arbitrum',

  // オプティミズム
  'オプティミズム': 'optimism',
  'OP': 'optimism',

  // ニアプロトコル
  'ニア': 'near',
  'NEAR': 'near',

  // インターネットコンピュータ
  'インターネットコンピュータ': 'internet-computer',
  'ICP': 'internet-computer',

  // ヘデラ
  'ヘデラ': 'hedera-hashgraph',
  'HBAR': 'hedera-hashgraph',
};

/**
 * 日本語クエリを英語コイン名に変換する
 * マッチしたらそのID、しなければ元のクエリを返す
 */
export function translateJaQuery(query) {
  const trimmed = query.trim();
  // 完全一致
  if (JA_MAP[trimmed]) return JA_MAP[trimmed];
  // 部分一致（前方一致）
  const key = Object.keys(JA_MAP).find(k => k.startsWith(trimmed) || trimmed.startsWith(k));
  if (key) return JA_MAP[key];
  return trimmed;
}
