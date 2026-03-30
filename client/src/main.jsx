import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({ duration: 800, once: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

const Products = () => (
  <>
    <Helmet>
      <title>GameStore | جميع المنتجات</title>
      <meta name="description" content="أحدث وأقوى الألعاب بأسعار تنافسية. تسوق الآن واستمتع بأفضل العروض." />
    </Helmet>
    {/* باقي المحتوى */}
  </>
);