import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getOrderById } from '../services/orderService';
import { Order, OrderStatus } from '../types';
import './OrderDetailPage.css';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (!user || !orderId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const orderData = await getOrderById(user.uid, orderId);
        setOrder(orderData);
        setError(null);
      } catch (err) {
        console.error('Failed to load order:', err);
        setError('無法載入訂單資料');
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [user, orderId]);

  const getStatusText = (status: OrderStatus): string => {
    const statusMap: Record<OrderStatus, string> = {
      pending: '待處理',
      processing: '處理中',
      shipped: '已出貨',
      completed: '已完成',
      cancelled: '已取消',
    };
    return statusMap[status];
  };

  const getStatusClass = (status: OrderStatus): string => {
    return `status-${status}`;
  };

  if (!user) {
    return (
      <div className="order-detail-page">
        <div className="detail-container">
          <h2>請先登入</h2>
          <button onClick={() => navigate('/login')}>前往登入</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="order-detail-page">
        <div className="loading">載入中...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-detail-page">
        <div className="detail-container">
          <div className="error-message">{error || '訂單不存在'}</div>
          <button onClick={() => navigate('/my-orders')}>返回我的訂單</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <button className="back-button" onClick={() => navigate('/my-orders')}>
            ← 返回我的訂單
          </button>
          <h1>訂單詳情</h1>
        </div>

        {/* 訂單狀態卡片 */}
        <div className="order-status-card">
          <div className="status-header">
            <div className="order-number">
              <span className="label">訂單編號</span>
              <span className="value">{order.orderNumber}</span>
            </div>
            <div className={`order-status ${getStatusClass(order.status)}`}>
              {getStatusText(order.status)}
            </div>
          </div>
          <div className="order-date">
            訂單日期：{order.createdAt?.toDate?.()?.toLocaleString('zh-TW') || '未知'}
          </div>
        </div>

        {/* 訂單進度 */}
        <div className="order-progress">
          <h2>訂單進度</h2>
          <div className="progress-steps">
            <div className={`step ${['pending', 'processing', 'shipped', 'completed'].includes(order.status) ? 'active' : ''}`}>
              <div className="step-icon">📝</div>
              <div className="step-text">訂單已成立</div>
            </div>
            <div className={`step ${['processing', 'shipped', 'completed'].includes(order.status) ? 'active' : ''}`}>
              <div className="step-icon">📦</div>
              <div className="step-text">處理中</div>
            </div>
            <div className={`step ${['shipped', 'completed'].includes(order.status) ? 'active' : ''}`}>
              <div className="step-icon">🚚</div>
              <div className="step-text">已出貨</div>
            </div>
            <div className={`step ${order.status === 'completed' ? 'active' : ''}`}>
              <div className="step-icon">✅</div>
              <div className="step-text">已完成</div>
            </div>
          </div>
          {order.status === 'cancelled' && (
            <div className="cancelled-notice">
              ❌ 此訂單已取消
            </div>
          )}
        </div>

        {/* 商品清單 */}
        <div className="order-items-section">
          <h2>訂單商品</h2>
          <div className="items-list">
            {order.items.map((item, index) => (
              <div key={index} className="item-row">
                <img src={item.imageUrl} alt={item.productName} className="item-image" />
                <div className="item-info">
                  <h3>{item.productName}</h3>
                  <p className="item-description">
                    {item.category === 'food' && '🍖 寵物食品'}
                    {item.category === 'toy' && '🎾 寵物玩具'}
                    {item.category === 'accessory' && '🎀 寵物配件'}
                  </p>
                </div>
                <div className="item-price">
                  <div className="unit-price">NT$ {item.price}</div>
                  <div className="quantity">x {item.quantity}</div>
                </div>
                <div className="item-subtotal">NT$ {item.subtotal}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 配送資訊 */}
        <div className="shipping-info-section">
          <h2>配送資訊</h2>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">收件人：</span>
              <span className="info-value">{order.shippingAddress.fullName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">聯絡電話：</span>
              <span className="info-value">{order.shippingAddress.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">配送地址：</span>
              <span className="info-value">
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
                {order.shippingAddress.district} {order.shippingAddress.address}
              </span>
            </div>
            {order.notes && (
              <div className="info-row">
                <span className="info-label">備註：</span>
                <span className="info-value">{order.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* 付款資訊 */}
        <div className="payment-info-section">
          <h2>付款資訊</h2>
          <div className="payment-details">
            <div className="payment-row">
              <span>付款方式：</span>
              <span>
                {order.paymentMethod === 'credit_card' ? '💳 信用卡' : '💵 貨到付款'}
              </span>
            </div>
            <div className="payment-row">
              <span>商品小計：</span>
              <span>NT$ {order.subtotal}</span>
            </div>
            <div className="payment-row">
              <span>運費：</span>
              <span>NT$ {order.shipping}</span>
            </div>
            <div className="payment-row">
              <span>稅金：</span>
              <span>NT$ {order.tax}</span>
            </div>
            <div className="payment-row total">
              <span>訂單總額：</span>
              <span>NT$ {order.total}</span>
            </div>
          </div>
        </div>

        {/* 操作按鈕 */}
        <div className="action-buttons">
          <button className="btn-secondary" onClick={() => navigate('/my-orders')}>
            返回訂單列表
          </button>
          <button className="btn-primary" onClick={() => navigate('/')}>
            繼續購物
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
