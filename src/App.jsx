import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from './components/Header';
import Footer from './components/Footer';

// Admin
import { AuthProvider } from './admin/AuthContext';
import ProtectedRoute, { PublicOnlyRoute } from './admin/ProtectedRoute';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import BlogForm from './admin/BlogForm';

// Public blog pages
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';

import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Academics from './pages/Academics';
import Boarding from './pages/Boarding';
import Facilities from './pages/Facilities';
import LifeAtAmatir from './pages/LifeAtAmatir';
import Blog from './pages/Blog';
import Blog2 from './pages/Blog2';
import Blog3 from './pages/Blog3';
import Blog4 from './pages/Blog4';
import Blog5 from './pages/Blog5';
import CampusVisit from './pages/CampusVisit';
import Careers from './pages/Careers';
import CoCurricular from './pages/CoCurricular';
import EssentialInformation from './pages/EssentialInformation';
import Contact from './pages/Contact';
import PaidPage from './pages/PaidPage.jsx';
import PaidPageMeta from './pages/PaidPageMeta.jsx';
import ParentLogin from './pages/ParentLogin';
import Enquire from './pages/Enquire';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import ThankYou from './pages/ThankYou';
import Admissions2526 from './pages/Admissions2526';
import Vidyashri from './pages/Vidyashri';

import MobileHome from './pages/mobile/Home';
import MobileAbout from './pages/mobile/About';
import MobileAdmissions from './pages/mobile/Admissions';
import MobileAcademics from './pages/mobile/Academics';
import MobileBoarding from './pages/mobile/Boarding';
import MobileFacilities from './pages/mobile/Facilities';
import MobileLifeAtAmatir from './pages/mobile/LifeAtAmatir';
import MobileBlog from './pages/mobile/Blog';
import MobileBlog2 from './pages/mobile/Blog2';
import MobileBlog3 from './pages/mobile/Blog3';
import MobileBlog4 from './pages/mobile/Blog4';
import MobileBlog5 from './pages/mobile/Blog5';
import MobileCampusVisit from './pages/mobile/CampusVisit';
import MobileCareers from './pages/mobile/Careers';
import MobileCoCurricular from './pages/mobile/CoCurricular';
import MobileEssentialInformation from './pages/mobile/EssentialInformation';
import MobileContact from './pages/mobile/Contact';
import MobilePaidPage from './pages/mobile/PaidPage';
import MobilePaidPageMeta from './pages/mobile/PaidPageMeta';
import MobileParentLogin from './pages/mobile/ParentLogin';
import MobileEnquire from './pages/mobile/Enquire';
import MobilePrivacy from './pages/mobile/Privacy';
import MobileTerms from './pages/mobile/Terms';
import MobileCookies from './pages/mobile/Cookies';

function ResponsivePage({ DesktopComponent, MobileComponent }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <MobileComponent /> : <DesktopComponent />;
}

function ScrollToHashOnLoad() {
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    const targetId = decodeURIComponent(hash.replace('#', ''));
    if (!targetId) return;

    let attempts = 0;
    const maxAttempts = 15;
    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
      if (attempts < maxAttempts) {
        attempts += 1;
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 100);
  }, [location]);
  return null;
}

function ScrollToTopOnRouteChange() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);
  return null;
}

function PageViewTracking() {
  const location = useLocation();
  useEffect(() => {
    if (typeof fbq === 'function') fbq('track', 'PageView');
  }, [location.pathname]);
  return null;
}

function EnquirePageWrapper() {
  useEffect(() => {
    if (typeof fbq === 'function') fbq('track', 'Lead');
  }, []);
  return <Enquire />;
}

function MobileEnquirePageWrapper() {
  useEffect(() => {
    if (typeof fbq === 'function') fbq('track', 'Lead');
  }, []);
  return <MobileEnquire />;
}

function AppLayout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin-login') || location.pathname.startsWith('/dashboard');

  // All route-aware hooks must live inside the Router tree
  // so we embed them here alongside the layout switch.
  return (
    <>
      <ScrollToHashOnLoad />
      <ScrollToTopOnRouteChange />
      <PageViewTracking />
      {isAdmin ? (
        <>{children}</>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}

function App() {
  useEffect(() => {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    if (typeof fbq === 'function') {
      fbq('init', '838447832070170');
      fbq('track', 'PageView');
    }

    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-KDHQ2FK4QK';
    document.head.appendChild(gtagScript);

    const gtagInline = document.createElement('script');
    gtagInline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-KDHQ2FK4QK');
    `;
    document.head.appendChild(gtagInline);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<ResponsivePage DesktopComponent={Home} MobileComponent={MobileHome} />} />
            <Route path="/about" element={<ResponsivePage DesktopComponent={About} MobileComponent={MobileAbout} />} />
            <Route
              path="/admissions"
              element={<ResponsivePage DesktopComponent={Admissions} MobileComponent={MobileAdmissions} />}
            />
            <Route
              path="/academics"
              element={<ResponsivePage DesktopComponent={Academics} MobileComponent={MobileAcademics} />}
            />
            <Route
              path="/boarding"
              element={<ResponsivePage DesktopComponent={Boarding} MobileComponent={MobileBoarding} />}
            />
            <Route
              path="/facilities"
              element={<ResponsivePage DesktopComponent={Facilities} MobileComponent={MobileFacilities} />}
            />
            <Route
              path="/life-at-amatir"
              element={<ResponsivePage DesktopComponent={LifeAtAmatir} MobileComponent={MobileLifeAtAmatir} />}
            />
            <Route path="/blog" element={<ResponsivePage DesktopComponent={Blog} MobileComponent={MobileBlog} />} />
            <Route path="/blog2" element={<ResponsivePage DesktopComponent={Blog2} MobileComponent={MobileBlog2} />} />
            <Route path="/blog3" element={<ResponsivePage DesktopComponent={Blog3} MobileComponent={MobileBlog3} />} />
            <Route path="/blog4" element={<ResponsivePage DesktopComponent={Blog4} MobileComponent={MobileBlog4} />} />
            <Route path="/blog5" element={<ResponsivePage DesktopComponent={Blog5} MobileComponent={MobileBlog5} />} />
            <Route
              path="/campus-visit"
              element={<ResponsivePage DesktopComponent={CampusVisit} MobileComponent={MobileCampusVisit} />}
            />
            <Route
              path="/careers"
              element={<ResponsivePage DesktopComponent={Careers} MobileComponent={MobileCareers} />}
            />
            <Route
              path="/co-curricular"
              element={<ResponsivePage DesktopComponent={CoCurricular} MobileComponent={MobileCoCurricular} />}
            />
            <Route
              path="/essential-information"
              element={
                <ResponsivePage DesktopComponent={EssentialInformation} MobileComponent={MobileEssentialInformation} />
              }
            />
            <Route
              path="/contact"
              element={<ResponsivePage DesktopComponent={Contact} MobileComponent={MobileContact} />}
            />
            <Route
              path="/reachout"
              element={<ResponsivePage DesktopComponent={PaidPage} MobileComponent={MobilePaidPage} />}
            />
            <Route
              path="/reachout_meta"
              element={<ResponsivePage DesktopComponent={PaidPageMeta} MobileComponent={MobilePaidPageMeta} />}
            />
            <Route
              path="/parent-login"
              element={<ResponsivePage DesktopComponent={ParentLogin} MobileComponent={MobileParentLogin} />}
            />
            <Route
              path="/thank-you"
              element={<ResponsivePage DesktopComponent={ThankYou} MobileComponent={ThankYou} />}
            />
            <Route
              path="/enquire"
              element={
                <ResponsivePage DesktopComponent={EnquirePageWrapper} MobileComponent={MobileEnquirePageWrapper} />
              }
            />
            <Route
              path="/privacy"
              element={<ResponsivePage DesktopComponent={Privacy} MobileComponent={MobilePrivacy} />}
            />
            <Route path="/terms" element={<ResponsivePage DesktopComponent={Terms} MobileComponent={MobileTerms} />} />
            <Route
              path="/cookies"
              element={<ResponsivePage DesktopComponent={Cookies} MobileComponent={MobileCookies} />}
            />
            <Route path="/admissions2526" element={<Admissions2526 />} />
            <Route path="/vidyashri" element={<Vidyashri />} />

            {/* ── New dynamic blog pages ── */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />

            {/* ── Admin routes (no Header/Footer) ── */}
            <Route
              path="/admin-login"
              element={
                <PublicOnlyRoute>
                  <AdminLogin />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/blogs"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/blogs/new"
              element={
                <ProtectedRoute>
                  <BlogForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/blogs/edit/:id"
              element={
                <ProtectedRoute>
                  <BlogForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
