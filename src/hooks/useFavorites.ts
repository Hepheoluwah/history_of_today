import { useState, useEffect } from 'react';
import { HistoricalEvent } from '@/types/history';

const FAVORITES_KEY = 'history-of-today-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<HistoricalEvent[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (event: HistoricalEvent) => {
    const isAlreadyFavorite = favorites.some(
      fav => fav.year === event.year && 
             fav.title === event.title && 
             fav.type === event.type
    );
    
    if (!isAlreadyFavorite) {
      setFavorites(prev => [...prev, event]);
    }
  };

  const removeFromFavorites = (event: HistoricalEvent) => {
    setFavorites(prev => 
      prev.filter(fav => !(
        fav.year === event.year && 
        fav.title === event.title && 
        fav.type === event.type
      ))
    );
  };

  const isFavorite = (event: HistoricalEvent) => {
    return favorites.some(
      fav => fav.year === event.year && 
             fav.title === event.title && 
             fav.type === event.type
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
}
