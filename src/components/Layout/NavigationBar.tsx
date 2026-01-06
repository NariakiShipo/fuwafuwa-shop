import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../hooks/useCart';
import './NavigationBar.css';

interface NavigationBarProps {
  languageSwitcher?: React.ReactNode;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  languageSwitcher,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cart } = useCart();
  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navigation-bar">
      {/* Language Switcher */}
      <div className="navigation-bar__left">
        {languageSwitcher}
      </div>
      <div className="navigation-bar__center">
        <button
          onClick={() => navigate('/')}
          className="navigation-bar__logo-button"
        >
          <img
            src="/images/fuwa_title.png"
            alt="FUWA FUWA Shop"
            className="navigation-bar__logo"
          />
        </button>
      </div>
      <div className="navigation-bar__right">
        {currentUser && (
          <button
            className="navigation-bar__btn navigation-bar__btn--orders"
            onClick={() => navigate('/my-orders')}
            title="我的訂單"
          >
            <span>📦</span>
          </button>
        )}
        {!currentUser && (
          <button
            className="navigation-bar__btn navigation-bar__btn--login"
            onClick={() => navigate('/login')}
          >
            <span>👤</span>
          </button>
        )}
        <button
          className="navigation-bar__btn navigation-bar__btn--cart"
          onClick={() => navigate('/cart')}
        >
          <img src="/images/shopping-cart-icon.png" alt="購物車" />
          {cartItemCount > 0 && (
            <span className="navigation-bar__badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
};
