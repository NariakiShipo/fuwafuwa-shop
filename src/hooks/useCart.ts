import { useState, useCallback, useEffect } from 'react';
import { Product, Cart } from '../types';
import { useAuth } from '../contexts/AuthContext';
import {
  getCart,
  addToCart as addToCartService,
  updateCartItemQuantity,
  removeFromCart,
  clearCart as clearCartService,
} from '../services/cartService';

export const useCart = () => {
  const { currentUser: user } = useAuth();
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  // 從 Firestore 加載購物車
  const loadCart = useCallback(async () => {
    if (!user) {
      setCart({ items: [], total: 0 });
      return;
    }

    setLoading(true);
    try {
      const items = await getCart(user.uid);
      const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setCart({ items, total });
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // 用戶登入後加載購物車
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = useCallback(
    async (product: Product, quantity: number = 1): Promise<boolean> => {
      if (!user) {
        console.warn('Please login to add items to cart');
        return false;
      }

      try {
        console.log('Adding to cart:', { userId: user.uid, product, quantity });
        await addToCartService(user.uid, product, quantity);
        await loadCart(); // 重新加載購物車
        console.log('Successfully added to cart');
        return true;
      } catch (error) {
        console.error('Failed to add to cart:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
        return false;
      }
    },
    [user, loadCart]
  );

  const updateQuantity = useCallback(
    async (productId: string, newQuantity: number) => {
      if (!user) return;

      try {
        await updateCartItemQuantity(user.uid, productId, newQuantity);
        await loadCart();
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    },
    [user, loadCart]
  );

  const removeItem = useCallback(
    async (productId: string) => {
      if (!user) return;

      try {
        await removeFromCart(user.uid, productId);
        await loadCart();
      } catch (error) {
        console.error('Failed to remove item:', error);
      }
    },
    [user, loadCart]
  );

  const clearCart = useCallback(async () => {
    if (!user) return;

    try {
      await clearCartService(user.uid);
      setCart({ items: [], total: 0 });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }, [user]);

  const getItemCount = useCallback(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart.items]);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getItemCount,
    loading,
  };
};
