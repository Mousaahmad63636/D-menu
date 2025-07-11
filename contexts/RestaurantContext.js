import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const RestaurantContext = createContext({});

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};

export const RestaurantProvider = ({ children }) => {
  const [currentRestaurant, setCurrentRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Get restaurant from URL path
  const getRestaurantFromPath = () => {
    const path = router.asPath;
    if (path.startsWith('/admin/')) {
      // Admin path: /admin/restaurant-id
      const segments = path.split('/');
      return segments[2] || null;
    } else {
      // Public path: /restaurant-id
      const segments = path.split('/');
      return segments[1] || null;
    }
  };

  useEffect(() => {
    const restaurantId = getRestaurantFromPath();
    if (restaurantId && restaurantId !== currentRestaurant?.id) {
      // Load restaurant data
      loadRestaurant(restaurantId);
    } else {
      setLoading(false);
    }
  }, [router.asPath]);

  const loadRestaurant = async (restaurantId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/restaurants/${restaurantId}`);
      if (response.ok) {
        const restaurant = await response.json();
        setCurrentRestaurant(restaurant);
      } else {
        setCurrentRestaurant(null);
      }
    } catch (error) {
      console.error('Error loading restaurant:', error);
      setCurrentRestaurant(null);
    } finally {
      setLoading(false);
    }
  };

  const loadRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      }
    } catch (error) {
      console.error('Error loading restaurants:', error);
    }
  };

  const createRestaurant = async (restaurantData) => {
    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantData)
      });
      if (response.ok) {
        const newRestaurant = await response.json();
        setRestaurants(prev => [...prev, newRestaurant]);
        return newRestaurant;
      }
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
    return null;
  };

  const value = {
    currentRestaurant,
    restaurants,
    loading,
    loadRestaurants,
    createRestaurant,
    setCurrentRestaurant
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
