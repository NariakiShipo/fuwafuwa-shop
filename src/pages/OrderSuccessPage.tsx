import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../services/orderService';
import { Order } from '../types';
import './OrderSuccessPage.css';

const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        navigate('/');
        return;
      }

      try {
        const orderData = await getOrder(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Failed to load order:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="order-success-page">
        <div className="loading">載入中...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-success-page">
        <div className="error-container">
          <h2>找不到訂單</h2>
          <button onClick={() => navigate('/')}>返回首頁</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>訂單已成功建立！</h1>
        <p className="success-message">感謝您的購買，我們將盡快為您處理訂單</p>

        <div className="order-info">
          <div className="info-row">
            <span className="label">訂單編號：</span>
            <span className="value">{order.orderNumber}</span>
          </div>
          <div className="info-row">
            <span className="label">訂單金額：</span>
            <span className="value amount">NT$ {order.total}</span>
          </div>
          <div className="info-row">
            <span className="label">付款方式：</span>
            <span className="value">
              {order.paymentMethod === 'credit_card' ? '信用卡' : '貨到付款'}
            </span>
          </div>
        </div>

        <div className="order-items">
          <h2>訂單商品</h2>
          {order.items.map((item, index) => (
            <div key={index} className="item-row">
              <img src={item.imageUrl} alt={item.productName} />
              <div className="item-info">
                <h3>{item.productName}</h3>
                <p>數量: {item.quantity}</p>
              </div>
              <div className="item-price">NT$ {item.subtotal}</div>
            </div>
          ))}
        </div>

        <div className="shipping-info">
          <h2>配送資訊</h2>
          <p><strong>收件人：</strong>{order.shippingAddress.fullName}</p>
          <p><strong>電話：</strong>{order.shippingAddress.phone}</p>
          <p>
            <strong>地址：</strong>
            {order.shippingAddress.postalCode} {order.shippingAddress.city}
            {order.shippingAddress.district} {order.shippingAddress.address}
          </p>
        </div>

        {order.notes && (
          <div className="order-notes">
            <h2>訂單備註</h2>
            <p>{order.notes}</p>
          </div>
        )}

        <div className="action-buttons">
          <button className="btn-primary" onClick={() => navigate('/my-orders')}>
            查看我的訂單
          </button>
          <button className="btn-secondary" onClick={() => navigate('/')}>
            繼續購物
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
