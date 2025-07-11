import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useRestaurant } from '../../contexts/RestaurantContext';
import AuthGuard from '../../components/AuthGuard';

export default function RestaurantAdminDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { restaurant } = router.query;
  const { currentRestaurant, loading: restaurantLoading } = useRestaurant();

  useEffect(() => {
    if (restaurant && !restaurantLoading) {
      loadMenuItems();
    }
  }, [restaurant, restaurantLoading]);

  const loadMenuItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/menu-items?restaurantId=${restaurant}`);
      
      if (response.ok) {
        const items = await response.json();
        setMenuItems(items);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(items.map(item => item.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (restaurantLoading || isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-menu-accent-500"></div>
        </div>
      </AuthGuard>
    );
  }

  if (!currentRestaurant) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurant Not Found</h1>
            <Link
              href="/admin/restaurants"
              className="px-4 py-2 bg-menu-accent-500 text-white rounded-md hover:bg-menu-accent-600"
            >
              Back to Restaurants
            </Link>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const totalItems = menuItems.length;
  const itemsByCategory = categories.map(category => ({
    name: category,
    count: menuItems.filter(item => item.category === category).length
  }));

  return (
    <AuthGuard>
      <Head>
        <title>{currentRestaurant.name} - Admin Dashboard</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <Link 
                  href="/admin/restaurants"
                  className="text-menu-accent-600 hover:text-menu-accent-700 text-sm font-medium mb-2 inline-block"
                >
                  ← Back to Restaurants
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">{currentRestaurant.name}</h1>
                <p className="text-gray-600">Restaurant Management Dashboard</p>
              </div>
              <div className="flex space-x-3">
                <Link
                  href={`/${restaurant}`}
                  target="_blank"
                  className="px-4 py-2 text-menu-accent-600 border border-menu-accent-600 rounded-md hover:bg-menu-accent-50"
                >
                  View Menu
                </Link>
                <Link
                  href={`/admin/${restaurant}/add-item`}
                  className="px-4 py-2 bg-menu-accent-500 text-white rounded-md hover:bg-menu-accent-600"
                >
                  Add Menu Item
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Total Menu Items</h3>
              <p className="text-3xl font-bold text-menu-accent-500 mt-2">{totalItems}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Categories</h3>
              <p className="text-3xl font-bold text-menu-accent-500 mt-2">{categories.length}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Public URL</h3>
              <p className="text-sm text-gray-600 mt-2 truncate">
                /{restaurant}
              </p>
            </div>
          </div>

          {/* Categories Breakdown */}
          {categories.length > 0 && (
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">Items by Category</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {itemsByCategory.map(category => (
                  <div key={category.name} className="px-6 py-4 flex justify-between items-center">
                    <span className="text-gray-700">{category.name}</span>
                    <span className="bg-menu-accent-100 text-menu-accent-800 px-2 py-1 rounded-full text-sm">
                      {category.count} items
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700">Quick Actions</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/admin/${restaurant}/menu-items`}
                className="flex items-center justify-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span className="text-gray-700">Manage Menu Items</span>
              </Link>
              <Link
                href={`/admin/${restaurant}/add-item`}
                className="flex items-center justify-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span className="text-gray-700">Add New Item</span>
              </Link>
              <Link
                href={`/${restaurant}`}
                target="_blank"
                className="flex items-center justify-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span className="text-gray-700">Preview Menu</span>
              </Link>
              <Link
                href={`/admin/${restaurant}/settings`}
                className="flex items-center justify-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span className="text-gray-700">Restaurant Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
