import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BasketVisualizer } from '../components/Cart/BasketVisualizer';
import { useLanguage } from '../i18n';
import { useCart } from '../hooks';
import './CartPage.css';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { cart, updateQuantity, removeItem } = useCart();
  
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      {/* Header */}
      <div className="cart-page__header">
        <button className="cart-page__back-btn" onClick={() => navigate('/')}>
          {t.product.back}
        </button>
        <h1 className="cart-page__title">{t.cart.title}</h1>
      </div>

      {/* Cart Items List */}
      <div className="cart-page__items">
        {cart.items.length === 0 ? (
          <div className="cart-page__empty">
            <p>{t.cart.empty}</p>
            <img src="/images/dog.png" alt="Empty" className="cart-page__empty-icon" />
          </div>
        ) : (
          <>
            {cart.items.map((item) => (
              <div key={item.product.id} className="cart-page__item">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="cart-page__item-image"
                />
                <div className="cart-page__item-info">
                  <h3 className="cart-page__item-name">{item.product.name}</h3>
                  <p className="cart-page__item-price">¥{item.product.price}</p>
                </div>
                <div className="cart-page__item-controls">
                  <div className="cart-page__item-quantity">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-page__item-remove"
                    onClick={() => removeItem(item.product.id)}
                  >
                    {t.cart.remove}
                  </button>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="cart-page__summary">
              <div className="cart-page__summary-row">
                <span>{t.cart.subtotal}:</span>
                <span className="cart-page__summary-value">¥{subtotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="cart-page__checkout-btn"
              onClick={() => navigate('/order')}
            >
              <img src="/images/checkout.png" alt="Proceed to checkout" />
            </button>
          </>
        )}
      </div>

      {/* Basket Visualizer at Bottom */}
      {cart.items.length > 0 && <BasketVisualizer cartItems={cart.items} />}
    </div>
  );
};
