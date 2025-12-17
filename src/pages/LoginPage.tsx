import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  const { t } = useLanguage();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code: string) => {
    switch (code) {
      case 'auth/invalid-email':
        return t.login.errors?.invalidEmail || '電子郵件格式無效';
      case 'auth/user-disabled':
        return t.login.errors?.userDisabled || '此帳號已被停用';
      case 'auth/user-not-found':
        return t.login.errors?.userNotFound || '找不到此用戶';
      case 'auth/wrong-password':
        return t.login.errors?.wrongPassword || '密碼錯誤';
      case 'auth/invalid-credential':
        return t.login.errors?.invalidCredential || '帳號或密碼錯誤';
      case 'auth/popup-closed-by-user':
        return t.login.errors?.popupClosed || '登入視窗已關閉';
      default:
        return t.login.errors?.default || '登入失敗，請稍後再試';
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Logo 區域 */}
          <div className="login-header">
            <div className="login-logo">🐾</div>
            <h1 className="login-title">{t.login.title}</h1>
            <p className="login-subtitle">{t.login.subtitle}</p>
          </div>

          {/* 登入表單 */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t.login.email}
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder={t.login.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                {t.login.password}
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder={t.login.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  disabled={loading}
                />
                <span>{t.login.rememberMe}</span>
              </label>
              <a href="#" className="forgot-password">
                {t.login.forgotPassword}
              </a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? t.login.loggingIn : t.login.loginButton}
            </button>
          </form>

          {/* 分隔線 */}
          <div className="divider">
            <span>{t.login.or}</span>
          </div>

          {/* Google 登入 */}
          <div className="social-login">
            <button 
              type="button"
              className="social-button google"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <span className="social-icon">G</span>
              {t.login.loginWithGoogle}
            </button>
          </div>

          {/* 註冊連結 */}
          <div className="signup-link">
            {t.login.noAccount}{' '}
            <a href="#" className="signup-link-button">
              {t.login.signUp}
            </a>
          </div>

          {/* 返回按鈕 */}
          <button onClick={() => navigate('/')} className="back-button">
            {t.login.backToHome}
          </button>
        </div>
      </div>
    </div>
  );
};
