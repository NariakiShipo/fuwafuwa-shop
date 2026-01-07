import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import { NavigationBar } from './components/Layout/NavigationBar';
import { LanguageProvider, useLanguage } from './i18n';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageSwitcher } from './components/Common/LanguageSwitcher';
import './assets/styles/globals.css';
import './App.css';

function AppContent() {
  const { t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const isProductDetail = location.pathname.startsWith('/product/');
    if (isProductDetail) {
      document.body.classList.add('product-detail-body');
    } else {
      document.body.classList.remove('product-detail-body');
    }
    return () => {
      document.body.classList.remove('product-detail-body');
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      alert(t.login.logoutSuccess || '登出成功');
    } catch (error) {
      console.error('Logout error:', error);
      alert(t.login.logoutError || '登出失敗');
    }
  };

  return (
    <div className="app app-body">
      {/* Navigation Bar */}
      <NavigationBar
        languageSwitcher={
          <>
            <LanguageSwitcher />
            {currentUser && (
              <div style={{ 
                marginLeft: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                fontSize: '14px',
                color: '#666'
              }}>
                <span>👤 {currentUser.displayName || currentUser.email}</span>
                <button 
                  onClick={handleLogout}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {t.login.logout}
                </button>
              </div>
            )}
          </>
        }
      />

      {/* Routes */}
      <main className="app__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/order/:orderId" element={<OrderDetailPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
