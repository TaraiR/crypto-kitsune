import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Glossary from './pages/Glossary';
import Portfolio from './pages/Portfolio';
import Converter from './pages/Converter';
import Compare from './pages/Compare';
import ScrollToTop from './components/ScrollToTop';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { dark, toggle } = useTheme();
  return (
    <BrowserRouter>
      <Header dark={dark} onToggleTheme={toggle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  );
}
