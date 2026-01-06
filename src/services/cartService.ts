import { db } from '../libs/firebase';
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { FirestoreCart, FirestoreCartItem, Product, CartItem } from '../types';

const CARTS_COLLECTION = 'carts';

// Cookie 相關常數
const CART_CACHE_KEY = 'petshop_cart_cache';
const CART_CACHE_EXPIRY = 5 * 60 * 1000; // 5分鐘

// 獲取購物車（帶緩存）
export const getCart = async (userId: string): Promise<CartItem[]> => {
  // 從 Firestore 獲取（跳過緩存直接讀取最新數據）
  const cartRef = doc(db, CARTS_COLLECTION, userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const firestoreCart = cartSnap.data() as FirestoreCart;
    const cartItems = await convertFirestoreCartToCartItems(firestoreCart.items);
    
    // 緩存到 localStorage
    saveCartToCache(userId, cartItems);
    
    return cartItems;
  }

  return [];
};

// 添加商品到購物車
export const addToCart = async (
  userId: string,
  product: Product,
  quantity: number = 1
): Promise<void> => {
  try {
    console.log('cartService.addToCart called:', { userId, productId: product.id, quantity });
    
    const cartRef = doc(db, CARTS_COLLECTION, userId);
    const cartSnap = await getDoc(cartRef);

    let items: FirestoreCartItem[] = [];

    if (cartSnap.exists()) {
      const cart = cartSnap.data() as FirestoreCart;
      items = cart.items || [];
    }

    // 檢查商品是否已存在
    const existingIndex = items.findIndex(item => item.productId === product.id);

    if (existingIndex >= 0) {
      // 更新數量
      items[existingIndex].quantity += quantity;
      console.log('Updated existing item quantity:', items[existingIndex]);
    } else {
      // 添加新商品 - 儲存完整商品資料
      items.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        imageUrl: product.images[0] || '',
        category: product.category,
        quantity,
        addedAt: Timestamp.now(),
      });
      console.log('Added new item to cart');
    }

    // 保存到 Firestore
    console.log('Saving to Firestore...');
    await setDoc(cartRef, {
      userId,
      items,
      updatedAt: serverTimestamp(),
    });
    console.log('Successfully saved to Firestore');

    // 清除緩存
    clearCartCache(userId);
  } catch (error) {
    console.error('Error in cartService.addToCart:', error);
    throw error;
  }
};

// 更新購物車商品數量
export const updateCartItemQuantity = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<void> => {
  const cartRef = doc(db, CARTS_COLLECTION, userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cart = cartSnap.data() as FirestoreCart;
    let items = cart.items || [];

    if (quantity <= 0) {
      // 移除商品
      items = items.filter(item => item.productId !== productId);
    } else {
      // 更新數量
      const index = items.findIndex(item => item.productId === productId);
      if (index >= 0) {
        items[index].quantity = quantity;
      }
    }

    await setDoc(cartRef, {
      userId,
      items,
      updatedAt: serverTimestamp(),
    });

    // 清除緩存
    clearCartCache(userId);
  }
};

// 移除購物車商品
export const removeFromCart = async (userId: string, productId: string): Promise<void> => {
  await updateCartItemQuantity(userId, productId, 0);
};

// 清空購物車
export const clearCart = async (userId: string): Promise<void> => {
  const cartRef = doc(db, CARTS_COLLECTION, userId);
  await deleteDoc(cartRef);
  clearCartCache(userId);
};

// ==================== Helper Functions ====================

// 將 Firestore 購物車格式轉換為 CartItem
async function convertFirestoreCartToCartItems(
  items: FirestoreCartItem[]
): Promise<CartItem[]> {
  const cartItems: CartItem[] = [];

  for (const item of items) {
    // 使用儲存的商品資料，不需要從 Firestore 讀取
    cartItems.push({
      product: {
        id: item.productId,
        name: item.productName,
        price: item.price,
        category: item.category as 'food' | 'toy' | 'accessory' | 'brush',
        images: [item.imageUrl],
        description: '', // 購物車不需要完整描述
        reactionType: 'neutral', // 購物車不需要反應類型
        stock: 999, // 購物車不需要庫存資訊
      },
      quantity: item.quantity,
      addedAt: item.addedAt,
    });
  }

  return cartItems;
}

// 從 localStorage 獲取緩存
// 保存到 localStorage 緩存
function saveCartToCache(userId: string, items: CartItem[]): void {
  try {
    const cacheData = {
      items,
      expiry: Date.now() + CART_CACHE_EXPIRY,
    };
    localStorage.setItem(`${CART_CACHE_KEY}_${userId}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to cache cart:', error);
  }
}

// 清除緩存
function clearCartCache(userId: string): void {
  try {
    localStorage.removeItem(`${CART_CACHE_KEY}_${userId}`);
  } catch (error) {
    console.error('Failed to clear cart cache:', error);
  }
}
