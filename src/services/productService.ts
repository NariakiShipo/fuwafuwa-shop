import { db } from '../libs/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { Product } from '../types';

const PRODUCTS_COLLECTION = 'products';

// 獲取所有商品
export const getAllProducts = async (): Promise<Product[]> => {
  const productsQuery = query(
    collection(db, PRODUCTS_COLLECTION),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(productsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// 獲取單個商品
export const getProduct = async (productId: string): Promise<Product | null> => {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    // 增加瀏覽次數
    await updateDoc(productRef, {
      viewCount: increment(1),
    });

    return { id: productSnap.id, ...productSnap.data() } as Product;
  }
  return null;
};

// 根據分類獲取商品
export const getProductsByCategory = async (
  category: 'food' | 'toy' | 'accessory'
): Promise<Product[]> => {
  const productsQuery = query(
    collection(db, PRODUCTS_COLLECTION),
    where('isActive', '==', true),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(productsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// 獲取熱門商品（根據銷售量）
export const getPopularProducts = async (limitCount: number = 10): Promise<Product[]> => {
  const productsQuery = query(
    collection(db, PRODUCTS_COLLECTION),
    where('isActive', '==', true),
    orderBy('salesCount', 'desc'),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(productsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

// 更新商品庫存（訂單完成後調用）
export const updateProductStock = async (
  productId: string,
  quantitySold: number
): Promise<void> => {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  await updateDoc(productRef, {
    stock: increment(-quantitySold),
    salesCount: increment(quantitySold),
  });
};

// 檢查商品庫存
export const checkProductStock = async (
  productId: string,
  quantity: number
): Promise<boolean> => {
  const product = await getProduct(productId);
  if (!product) return false;
  return product.stock >= quantity;
};
