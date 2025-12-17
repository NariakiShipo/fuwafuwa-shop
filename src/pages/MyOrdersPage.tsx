import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../hooks/useOrders';
import { OrderStatus } from '../types';
import './MyOrdersPage.css';

const MyOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const { orders, stats, loading, cancelOrder } = useOrders();

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

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('確定要取消此訂單嗎？')) {
      await cancelOrder(orderId);
    }
  };

  if (!user) {
    return (
      <div className="my-orders-page">
        <div className="orders-container">
          <h2>請先登入</h2>
          <button onClick={() => navigate('/login')}>前往登入</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="my-orders-page">
        <div className="loading">載入中...</div>
      </div>
    );
  }

  return (
    <div className="my-orders-page">
      <div className="orders-container">
        <h1>我的訂單</h1>

        {/* 訂單統計 */}
        <div className="order-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">總訂單數</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">待處理</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.processing}</div>
            <div className="stat-label">處理中</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.shipped}</div>
            <div className="stat-label">已出貨</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">已完成</div>
          </div>
          <div className="stat-card highlight">
            <div className="stat-number">NT$ {stats.totalSpent}</div>
            <div className="stat-label">總消費金額</div>
          </div>
        </div>

        {/* 訂單列表 */}
        {orders.length === 0 ? (
          <div className="empty-orders">
            <p>您還沒有任何訂單</p>
            <button onClick={() => navigate('/')}>開始購物</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div className="order-header">
                  <div className="order-number">
                    <span className="label">訂單編號：</span>
                    <span className="value">{order.orderNumber}</span>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.imageUrl} alt={item.productName} />
                      <div className="item-details">
                        <h3>{item.productName}</h3>
                        <p>單價: NT$ {item.price} × {item.quantity}</p>
                      </div>
                      <div className="item-subtotal">NT$ {item.subtotal}</div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-info">
                    <div className="info-item">
                      <span className="label">訂單日期：</span>
                      <span className="value">
                        {order.createdAt?.toDate?.()?.toLocaleDateString() || '未知'}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">付款方式：</span>
                      <span className="value">
                        {order.paymentMethod === 'credit_card' ? '信用卡' : '貨到付款'}
                      </span>
                    </div>
                  </div>

                  <div className="order-total">
                    <span className="label">訂單總額：</span>
                    <span className="amount">NT$ {order.total}</span>
                  </div>
                </div>

                <div className="order-actions">
                  <button
                    className="btn-details"
                    onClick={() => navigate(`/order/${order.orderId}`)}
                  >
                    查看詳情
                  </button>
                  {order.status === 'pending' && (
                    <button
                      className="btn-cancel"
                      onClick={() => handleCancelOrder(order.orderId)}
                    >
                      取消訂單
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
