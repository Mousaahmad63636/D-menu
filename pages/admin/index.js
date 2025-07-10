import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import AdminLayout from '../../components/admin/Layout';
import { fetchMenuItems, getCategories } from '../../lib/google-sheets';

export default function AdminDashboard({ initialItems, initialCategories }) {
  const [menuItems, setMenuItems] = useState(initialItems || []);
  const [categories, setCategories] = useState(initialCategories || []);
  const [isLoading, setIsLoading] = useState(!initialItems);
  const router = useRouter();

  useEffect(() => {
    if (!initialItems) {
      const loadData = async () => {
        try {
          setIsLoading(true);
          const items = await fetchMenuItems();
          const cats = await getCategories();
          setMenuItems(items);
          setCategories(cats);
        } catch (error) {
          console.error('Error loading dashboard data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadData();
    }
  }, [initialItems]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-menu-accent-500"></div>
        </div>
      </AdminLayout>
    );
  }

  // Calculate some stats for the dashboard
  const totalItems = menuItems.length;
  const itemsByCategory = categories.map(category => ({
    name: category,
    count: menuItems.filter(item => item.category === category).length
  }));

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard - Menu Management</title>
      </Head>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-menu-gray-900">Dashboard</h1>
          <Link
            href="/admin/items/new"
            className="px-4 py-2 bg-menu-accent-500 text-white rounded-md hover:bg-menu-accent-600 transition-colors"
          >
            Add New Item
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-menu-gray-700">Total Menu Items</h2>
            <p className="text-3xl font-bold text-menu-accent-500 mt-2">{totalItems}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-menu-gray-700">Categories</h2>
            <p className="text-3xl font-bold text-menu-accent-500 mt-2">{categories.length}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-menu-gray-700">Most Recent Update</h2>
            <p className="text-menu-gray-600 mt-2">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-menu-gray-200">
            <h2 className="text-lg font-semibold text-menu-gray-700">Items by Category</h2>
          </div>
          <div className="divide-y divide-menu-gray-200">
            {itemsByCategory.map(category => (
              <div key={category.name} className="px-6 py-4 flex justify-between items-center">
                <span className="text-menu-gray-700">{category.name}</span>
                <span className="bg-menu-accent-100 text-menu-accent-800 px-2 py-1 rounded-full text-sm">
                  {category.count} items
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-menu-gray-200">
            <h2 className="text-lg font-semibold text-menu-gray-700">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/items"
              className="flex items-center justify-center px-4 py-3 bg-menu-gray-50 hover:bg-menu-gray-100 rounded-md transition-colors"
            >
              <span className="text-menu-gray-700">View All Items</span>
            </Link>
            <Link
              href="/admin/items/new"
              className="flex items-center justify-center px-4 py-3 bg-menu-gray-50 hover:bg-menu-gray-100 rounded-md transition-colors"
            >
              <span className="text-menu-gray-700">Add New Item</span>
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center px-4 py-3 bg-menu-gray-50 hover:bg-menu-gray-100 rounded-md transition-colors"
            >
              <span className="text-menu-gray-700">View Menu Frontend</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Server-side props to check authentication and pre-fetch data
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/login?callbackUrl=/admin',
        permanent: false,
      },
    };
  }

  // Pre-fetch data for the dashboard
  try {
    const initialItems = await fetchMenuItems();
    const initialCategories = await getCategories();

    return {
      props: {
        session,
        initialItems,
        initialCategories,
      },
    };
  } catch (error) {
    console.error('Error pre-fetching dashboard data:', error);
    return {
      props: {
        session,
        initialItems: null,
        initialCategories: null,
      },
    };
  }
}