import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Order, OrderStatus } from '../types';
import {
  getUserOrders,
  getUserOrdersByStatus,
  getOrder,
  getOrderStats,
  updateOrderStatus,
  cancelOrder,
} from '../services/orderService';

export const useOrders = () => {
  const { currentUser: user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    completed: 0,
    cancelled: 0,
    totalSpent: 0,
  });

  // 加載所有訂單
  const loadOrders = useCallback(async () => {
    if (!user) {
      setOrders([]);
      return;
    }

    setLoading(true);
    try {
      const userOrders = await getUserOrders(user.uid);
      setOrders(userOrders);

      // 同時加載統計數據
      const orderStats = await getOrderStats(user.uid);
      setStats(orderStats);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // 用戶登入後加載訂單
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // 根據狀態過濾訂單
  const loadOrdersByStatus = useCallback(
    async (status: OrderStatus) => {
      if (!user) return;

      setLoading(true);
      try {
        const filteredOrders = await getUserOrdersByStatus(user.uid, status);
        setOrders(filteredOrders);
      } catch (error) {
        console.error('Failed to load orders by status:', error);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // 獲取單個訂單
  const fetchOrder = useCallback(async (orderId: string) => {
    setLoading(true);
    try {
      const order = await getOrder(orderId);
      return order;
    } catch (error) {
      console.error('Failed to fetch order:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 取消訂單
  const cancel = useCallback(
    async (orderId: string) => {
      try {
        await cancelOrder(orderId);
        await loadOrders(); // 重新加載訂單列表
      } catch (error) {
        console.error('Failed to cancel order:', error);
      }
    },
    [loadOrders]
  );

  // 更新訂單狀態（管理員功能）
  const updateStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      try {
        await updateOrderStatus(orderId, status);
        await loadOrders();
      } catch (error) {
        console.error('Failed to update order status:', error);
      }
    },
    [loadOrders]
  );

  return {
    orders,
    stats,
    loading,
    loadOrders,
    loadOrdersByStatus,
    fetchOrder,
    cancelOrder: cancel,
    updateStatus,
  };
};
