import { db } from '../libs/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { UserPet } from '../types';

const USER_PETS_COLLECTION = 'userPets';

// 創建或初始化寵物狀態
export const createOrInitPet = async (userId: string, petName?: string): Promise<UserPet> => {
  const petRef = doc(db, USER_PETS_COLLECTION, userId);
  const petSnap = await getDoc(petRef);

  if (!petSnap.exists()) {
    const newPet: UserPet = {
      userId,
      petName: petName || '我的寵物',
      happiness: 50,
      hunger: 50,
      energy: 50,
      totalInteractions: 0,
      updatedAt: serverTimestamp(),
    };
    await setDoc(petRef, newPet);
    return newPet;
  }
  
  return petSnap.data() as UserPet;
};

// 獲取寵物狀態
export const getPetState = async (userId: string): Promise<UserPet | null> => {
  const petRef = doc(db, USER_PETS_COLLECTION, userId);
  const petSnap = await getDoc(petRef);

  if (petSnap.exists()) {
    return petSnap.data() as UserPet;
  }
  return null;
};

// 更新寵物狀態
export const updatePetState = async (
  userId: string,
  updates: {
    happiness?: number;
    hunger?: number;
    energy?: number;
  }
): Promise<void> => {
  const petRef = doc(db, USER_PETS_COLLECTION, userId);
  await updateDoc(petRef, {
    ...updates,
    totalInteractions: increment(1),
    updatedAt: serverTimestamp(),
  });
};

// 餵食寵物
export const feedPet = async (userId: string, hungerIncrease: number = 20): Promise<UserPet> => {
  const petRef = doc(db, USER_PETS_COLLECTION, userId);
  const petSnap = await getDoc(petRef);

  if (petSnap.exists()) {
    const pet = petSnap.data() as UserPet;
    const updatedData = {
      hunger: Math.min(100, (pet.hunger || 0) + hungerIncrease),
      happiness: Math.min(100, (pet.happiness || 0) + 5),
      lastFedAt: serverTimestamp(),
      totalInteractions: increment(1),
      updatedAt: serverTimestamp(),
    };
    await updateDoc(petRef, updatedData);
    
    // 返回更新後的寵物狀態
    const updatedSnap = await getDoc(petRef);
    return updatedSnap.data() as UserPet;
  }
  throw new Error('Pet not found');
};

// 與寵物玩耍
export const playWithPet = async (
  userId: string,
  happinessIncrease: number = 20
): Promise<UserPet> => {
  const petRef = doc(db, USER_PETS_COLLECTION, userId);
  const petSnap = await getDoc(petRef);

  if (petSnap.exists()) {
    const pet = petSnap.data() as UserPet;
    await updateDoc(petRef, {
      happiness: Math.min(100, (pet.happiness || 0) + happinessIncrease),
      energy: Math.max(0, (pet.energy || 100) - 10),
      hunger: Math.max(0, (pet.hunger || 100) - 5),
      lastPlayedAt: serverTimestamp(),
      totalInteractions: increment(1),
      updatedAt: serverTimestamp(),
    });
    
    const updatedSnap = await getDoc(petRef);
    return updatedSnap.data() as UserPet;
  }
  throw new Error('Pet not found');
};

// 梳毛（增加快樂度）
export const brushPet = async (userId: string): Promise<UserPet> => {
  const petRef = doc(db, USER_PETS_COLLECTION, userId);
  const petSnap = await getDoc(petRef);

  if (petSnap.exists()) {
    const pet = petSnap.data() as UserPet;
    await updateDoc(petRef, {
      happiness: Math.min(100, (pet.happiness || 0) + 15),
      totalInteractions: increment(1),
      updatedAt: serverTimestamp(),
    });
    
    const updatedSnap = await getDoc(petRef);
    return updatedSnap.data() as UserPet;
  }
  throw new Error('Pet not found');
};

// 更新寵物名稱
export const updatePetName = async (userId: string, petName: string): Promise<void> => {
  const petRef = doc(db, USER_PETS_COLLECTION, userId);
  await updateDoc(petRef, {
    petName,
    updatedAt: serverTimestamp(),
  });
};
