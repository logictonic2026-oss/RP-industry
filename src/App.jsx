import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import { Header, Footer, RoutePosition } from './site/Layout';
import { HomePage, AboutPage, OverviewPage, ServiceDetailPage, SectorsPage, ApplicationsPage, NotFoundPage } from './site/Pages';
import { ContactPage, QuotePage } from './site/Forms';
import './site/site.css';

export default function App() {
  return (
    <SmoothScroll>
      <BrowserRouter>
        <RoutePosition />
        <div id="top" />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sectors" element={<SectorsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/rfq" element={<QuotePage />} />
            <Route path="/rp-industries" element={<OverviewPage arm="rp" />} />
            <Route path="/rp-industries/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/tryco" element={<OverviewPage arm="thry" />} />
            <Route path="/tryco/portfolio" element={<ApplicationsPage />} />
            <Route path="/tryco/:serviceId" element={<ServiceDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </SmoothScroll>
  );
}
