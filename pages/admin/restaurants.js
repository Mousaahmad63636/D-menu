import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import AuthGuard from '../../components/AuthGuard';

export default function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data);
      }
    } catch (error) {
      console.error('Error loading restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <Head>
        <title>Select Restaurant - Admin</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, {user?.email}</p>
              </div>
              <Link
                href="/restaurant-signup"
                className="px-4 py-2 bg-menu-accent-500 text-white rounded-md hover:bg-menu-accent-600"
              >
                Add New Restaurant
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-menu-accent-500"></div>
            </div>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No restaurants found</h2>
              <p className="text-gray-600 mb-8">Create your first restaurant to get started.</p>
              <Link
                href="/restaurant-signup"
                className="px-6 py-3 bg-menu-accent-500 text-white rounded-md hover:bg-menu-accent-600"
              >
                Create Restaurant
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Restaurant to Manage</h2>
                <p className="text-gray-600">Choose a restaurant to manage its menu and settings.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                  <Link key={restaurant.id} href={`/admin/${restaurant.id}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      {restaurant.image && (
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {restaurant.name}
                        </h3>
                        {restaurant.description && (
                          <p className="text-gray-600 mb-3 text-sm line-clamp-2">{restaurant.description}</p>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            /{restaurant.id}
                          </span>
                          <div className="text-menu-accent-600 font-medium text-sm">
                            Manage →
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
