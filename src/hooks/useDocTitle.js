import { useEffect } from 'react';

export function useDocTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | Crypto Tarai` : 'Crypto Tarai - 仮想通貨ランキング';
    return () => { document.title = prev; };
  }, [title]);
}
