import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function RestaurantSignup() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    cuisine: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate ID from name
    if (name === 'name') {
      const id = value.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
      
      setFormData(prev => ({
        ...prev,
        id: id
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.id) {
      setError('Restaurant name is required');
      setIsLoading(false);
      return;
    }

    if (formData.id.length < 3) {
      setError('Restaurant ID must be at least 3 characters');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError('This restaurant name/ID is already taken. Please choose a different name.');
        } else {
          setError(result.error || 'Failed to create restaurant');
        }
        return;
      }

      setSuccess('Restaurant created successfully!');
      
      // Redirect to the new restaurant's menu after a delay
      setTimeout(() => {
        router.push(`/${formData.id}`);
      }, 2000);

    } catch (error) {
      console.error('Error creating restaurant:', error);
      setError('Failed to create restaurant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add Your Restaurant - Digital Menu Platform</title>
        <meta name="description" content="Add your restaurant to our digital menu platform" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add Your Restaurant</h1>
            <p className="text-gray-600 mt-2">Create a digital menu for your restaurant</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-menu-accent-500 focus:border-menu-accent-500"
                  placeholder="Enter your restaurant name"
                  required
                />
              </div>

              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
                  Menu URL
                </label>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm">yourmenuapp.vercel.app/</span>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className="flex-1 ml-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-menu-accent-500 focus:border-menu-accent-500"
                    placeholder="restaurant-name"
                    pattern="[a-z0-9-]+"
                    title="Only lowercase letters, numbers, and dashes allowed"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This will be your restaurant's menu URL. Auto-generated from name.
                </p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-menu-accent-500 focus:border-menu-accent-500"
                  placeholder="Brief description of your restaurant"
                />
              </div>

              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisine Type
                </label>
                <input
                  type="text"
                  id="cuisine"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-menu-accent-500 focus:border-menu-accent-500"
                  placeholder="e.g., Italian, Asian, American"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Image URL (Optional)
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-menu-accent-500 focus:border-menu-accent-500"
                  placeholder="https://example.com/restaurant-image.jpg"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <p className="text-green-600 text-sm">{success}</p>
                  <p className="text-green-600 text-xs mt-1">Redirecting to your menu...</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-menu-accent-500 text-white font-medium rounded-md hover:bg-menu-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-menu-accent-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Restaurant...' : 'Create Restaurant'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have a restaurant?{' '}
                <a href="/admin/firebase-login" className="text-menu-accent-600 hover:text-menu-accent-700 font-medium">
                  Sign in to manage your menu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
