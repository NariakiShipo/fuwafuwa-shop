import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks';
import { createOrder } from '../services/orderService';
import { CreateOrderData, Address } from '../types';
import './OrderPage.css';

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: '',
    phone: '',
    postalCode: '',
    city: '',
    district: '',
    address: '',
  });

  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cash_on_delivery'>('credit_card');

  // 計算金額
  const subtotal = cart.total;
  const tax = Math.round(subtotal * 0.05); // 5% 稅
  const shipping = subtotal > 1000 ? 0 : 100; // 滿1000免運
  const total = subtotal + tax + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('請先登入');
      return;
    }

    if (cart.items.length === 0) {
      setError('購物車是空的');
      return;
    }

    // 驗證地址
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address) {
      setError('請填寫完整的配送地址');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData: CreateOrderData = {
        items: cart.items,
        shippingAddress,
        notes,
        paymentMethod,
      };

      const orderId = await createOrder(user.uid, orderData);
      
      // 清空購物車
      await clearCart();
      
      // 跳轉到訂單成功頁面
      navigate(`/order-success/${orderId}`);
    } catch (err) {
      console.error('Failed to create order:', err);
      setError('訂單創建失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="order-page">
        <div className="order-container">
          <h2>請先登入</h2>
          <button onClick={() => navigate('/login')}>前往登入</button>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="order-page">
        <div className="order-container">
          <h2>購物車是空的</h2>
          <button onClick={() => navigate('/')}>繼續購物</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-container">
        <h1>訂單確認</h1>

        <form onSubmit={handleSubmit}>
          {/* 商品列表 */}
          <section className="order-section">
            <h2>訂單商品</h2>
            <div className="order-items">
              {cart.items.map((item) => (
                <div key={item.product.id} className="order-item">
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div className="order-item-info">
                    <h3>{item.product.name}</h3>
                    <p>單價: NT$ {item.product.price}</p>
                    <p>數量: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    NT$ {item.product.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 配送地址 */}
          <section className="order-section">
            <h2>配送地址</h2>
            <div className="address-form">
              <div className="form-row">
                <div className="form-group">
                  <label>收件人姓名 *</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>聯絡電話 *</label>
                  <input
                    type="tel"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>郵遞區號</label>
                  <input
                    type="text"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>城市</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>區域</label>
                  <input
                    type="text"
                    value={shippingAddress.district}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, district: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>詳細地址 *</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* 付款方式 */}
          <section className="order-section">
            <h2>付款方式</h2>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'credit_card')}
                />
                <span>信用卡</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cash_on_delivery"
                  checked={paymentMethod === 'cash_on_delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'cash_on_delivery')}
                />
                <span>貨到付款</span>
              </label>
            </div>
          </section>

          {/* 備註 */}
          <section className="order-section">
            <h2>訂單備註</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="有任何特殊需求請在這裡說明..."
              rows={4}
            />
          </section>

          {/* 金額摘要 */}
          <section className="order-section order-summary">
            <h2>訂單摘要</h2>
            <div className="summary-row">
              <span>商品小計</span>
              <span>NT$ {subtotal}</span>
            </div>
            <div className="summary-row">
              <span>稅金 (5%)</span>
              <span>NT$ {tax}</span>
            </div>
            <div className="summary-row">
              <span>運費 {subtotal > 1000 && '(免運)'}</span>
              <span>NT$ {shipping}</span>
            </div>
            <div className="summary-row total">
              <span>訂單總計</span>
              <span>NT$ {total}</span>
            </div>
          </section>

          {error && <div className="error-message">{error}</div>}

          <div className="order-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/cart')}
              disabled={loading}
            >
              返回購物車
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? '處理中...' : '確認訂單'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
