import { useEffect, useState } from 'react';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      ▲
    </button>
  );
}
