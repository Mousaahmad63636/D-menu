import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
      setLoading(true);
      const response = await fetch(`/api/menu-items?restaurantId=${restaurant}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Restaurant not found');
          return;
        }
        throw new Error('Failed to load menu');
      }

      const items = await response.json();
      setMenuItems(items);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(items.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading menu:', error);
      setError('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  if (restaurantLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-menu-accent-500"></div>
      </div>
    );
  }

  if (error || !currentRestaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Restaurant Not Found</h1>
          <p className="text-gray-600 mb-8">
            {error || 'The restaurant you\'re looking for doesn\'t exist.'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-menu-accent-500 text-white rounded-md hover:bg-menu-accent-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{currentRestaurant.name} - Menu</title>
        <meta name="description" content={`View the menu for ${currentRestaurant.name}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Restaurant Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {currentRestaurant.name}
              </h1>
              {currentRestaurant.description && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {currentRestaurant.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-menu-accent-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Items
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-menu-accent-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Menu Items */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No menu items available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-lg font-bold text-menu-accent-600">
                        ${item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 mb-3">{item.description}</p>
                    )}
                    {item.description2 && (
                      <p className="text-gray-500 text-sm mb-3">{item.description2}</p>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {item.isVegetarian && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                          Vegetarian
                        </span>
                      )}
                      {item.popular && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                          Popular
                        </span>
                      )}
                      {item.ageRestricted && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                          21+
                        </span>
                      )}
                    </div>
                    {item.allergens && item.allergens.length > 0 && (
                      <div className="mt-3 text-xs text-gray-500">
                        <strong>Allergens:</strong> {item.allergens.join(', ')}
                      </div>
                    )}
                    {item.prepTime && (
                      <div className="mt-2 text-xs text-gray-500">
                        <strong>Prep time:</strong> {item.prepTime}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
