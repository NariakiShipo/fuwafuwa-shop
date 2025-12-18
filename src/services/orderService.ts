import { db } from '../libs/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { Order, OrderStatus, CreateOrderData, OrderItem } from '../types';
import { updateUserOrderStats } from './userService';
import { clearCart } from './cartService';

const ORDERS_COLLECTION = 'orders';

// 生成訂單號碼
function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${year}${month}${day}-${random}`;
}

// 創建訂單
export const createOrder = async (
  userId: string,
  orderData: CreateOrderData
): Promise<string> => {
  const { items, shippingAddress, notes, paymentMethod } = orderData;

  // 計算金額
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.05); // 5% 稅
  const shipping = subtotal > 1000 ? 0 : 100; // 滿1000免運
  const total = subtotal + tax + shipping;

  // 轉換為訂單項目格式
  const orderItems: OrderItem[] = items.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    subtotal: item.product.price * item.quantity,
    category: item.product.category,
    imageUrl: item.product.images[0],
  }));

  // 創建訂單
  const newOrder: Omit<Order, 'orderId'> = {
    userId,
    orderNumber: generateOrderNumber(),
    status: 'pending',
    items: orderItems,
    subtotal,
    tax,
    shipping,
    total,
    shippingAddress,
    notes,
    paymentMethod,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const orderRef = await addDoc(collection(db, ORDERS_COLLECTION), newOrder);

  // 更新用戶統計
  await updateUserOrderStats(userId, total);

  // 清空購物車
  await clearCart(userId);

  return orderRef.id;
};

// 獲取單個訂單
export const getOrder = async (orderId: string): Promise<Order | null> => {
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  const orderSnap = await getDoc(orderRef);

  if (orderSnap.exists()) {
    return { orderId: orderSnap.id, ...orderSnap.data() } as Order;
  }
  return null;
};

// 根據用戶ID和訂單ID獲取訂單
export const getOrderById = async (userId: string, orderId: string): Promise<Order | null> => {
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  const orderSnap = await getDoc(orderRef);

  if (orderSnap.exists()) {
    const orderData = { orderId: orderSnap.id, ...orderSnap.data() } as Order;
    // 確認訂單屬於該用戶
    if (orderData.userId === userId) {
      return orderData;
    }
  }
  return null;
};

// 獲取用戶的所有訂單
export const getUserOrders = async (
  userId: string,
  limitCount: number = 50
): Promise<Order[]> => {
  const ordersQuery = query(
    collection(db, ORDERS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(ordersQuery);
  return querySnapshot.docs.map(doc => ({
    orderId: doc.id,
    ...doc.data(),
  })) as Order[];
};

// 獲取用戶特定狀態的訂單
export const getUserOrdersByStatus = async (
  userId: string,
  status: OrderStatus
): Promise<Order[]> => {
  const ordersQuery = query(
    collection(db, ORDERS_COLLECTION),
    where('userId', '==', userId),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(ordersQuery);
  return querySnapshot.docs.map(doc => ({
    orderId: doc.id,
    ...doc.data(),
  })) as Order[];
};

// 更新訂單狀態
export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
): Promise<void> => {
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  const updateData: any = {
    status,
    updatedAt: serverTimestamp(),
  };

  // 如果狀態是已完成，記錄完成時間
  if (status === 'completed') {
    updateData.completedAt = serverTimestamp();
  }

  await updateDoc(orderRef, updateData);
};

// 取消訂單
export const cancelOrder = async (orderId: string): Promise<void> => {
  await updateOrderStatus(orderId, 'cancelled');
};

// 獲取訂單統計
export const getOrderStats = async (userId: string) => {
  const orders = await getUserOrders(userId);
  
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalSpent: orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0),
  };

  return stats;
};
