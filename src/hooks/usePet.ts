import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserPet } from '../types';
import {
  createOrInitPet,
  feedPet as feedPetService,
  playWithPet as playWithPetService,
  brushPet as brushPetService,
} from '../services/petService';

export const usePet = () => {
  const { currentUser: user } = useAuth();
  const [pet, setPet] = useState<UserPet | null>(null);
  const [loading, setLoading] = useState(false);

  // 加載寵物數據
  const loadPet = useCallback(async () => {
    if (!user) {
      setPet(null);
      return;
    }

    setLoading(true);
    try {
      const petData = await createOrInitPet(user.uid);
      setPet(petData);
    } catch (error) {
      console.error('Failed to load pet:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // 用戶登入後加載寵物
  useEffect(() => {
    loadPet();
  }, [loadPet]);

  // 餵食寵物
  const feed = useCallback(async () => {
    if (!user || !pet) return;

    try {
      const updatedPet = await feedPetService(user.uid);
      setPet(updatedPet);
    } catch (error) {
      console.error('Failed to feed pet:', error);
    }
  }, [user, pet]);

  // 與寵物玩耍
  const play = useCallback(async () => {
    if (!user || !pet) return;

    try {
      const updatedPet = await playWithPetService(user.uid);
      setPet(updatedPet);
    } catch (error) {
      console.error('Failed to play with pet:', error);
    }
  }, [user, pet]);

  // 梳理寵物
  const brush = useCallback(async () => {
    if (!user || !pet) return;

    try {
      const updatedPet = await brushPetService(user.uid);
      setPet(updatedPet);
    } catch (error) {
      console.error('Failed to brush pet:', error);
    }
  }, [user, pet]);

  return {
    pet,
    loading,
    feed,
    play,
    brush,
    reload: loadPet,
  };
};
