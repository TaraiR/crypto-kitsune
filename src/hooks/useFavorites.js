import { useState } from 'react';

const KEY = 'crypto_tarai_favorites';

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
};

export function useFavorites() {
  const [favorites, setFavorites] = useState(load);

  const toggle = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const isFav = (id) => favorites.includes(id);

  return { favorites, toggle, isFav };
}
