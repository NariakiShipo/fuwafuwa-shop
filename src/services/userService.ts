import { db } from '../libs/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { UserProfile, Address } from '../types';

const USERS_COLLECTION = 'users';

// 創建或更新用戶資料
export const createOrUpdateUser = async (
  uid: string,
  email: string,
  displayName: string,
  photoURL?: string
): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // 創建新用戶
    const newUser: UserProfile = {
      uid,
      email,
      displayName,
      photoURL,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      totalOrders: 0,
      totalSpent: 0,
    };
    await setDoc(userRef, newUser);
  } else {
    // 更新最後登入時間
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
};

// 獲取用戶資料
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};

// 更新用戶資料
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// 更新用戶地址
export const updateUserAddress = async (uid: string, address: Address): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(userRef, {
    address,
    updatedAt: serverTimestamp(),
  });
};

// 更新用戶訂單統計
export const updateUserOrderStats = async (
  uid: string,
  orderTotal: number
): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data() as UserProfile;
    await updateDoc(userRef, {
      totalOrders: (userData.totalOrders || 0) + 1,
      totalSpent: (userData.totalSpent || 0) + orderTotal,
      updatedAt: serverTimestamp(),
    });
  }
};
