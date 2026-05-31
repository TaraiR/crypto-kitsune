import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Glossary from './pages/Glossary';
import Portfolio from './pages/Portfolio';
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
