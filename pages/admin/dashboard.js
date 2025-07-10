import AdminLayout from '../../components/AdminLayout';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-menu-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-menu-gray-900">
            Menu Management System
          </h3>
          <div className="mt-2 max-w-xl text-sm text-menu-gray-500">
            <p>
              Welcome to the menu administration dashboard. Use the options below to manage your menu items.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-menu-accent-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-menu-accent-800 truncate">
                    Menu Items
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-menu-accent-900">
                    {/* This would be dynamic in a real implementation */}
                    37
                  </dd>
                </dl>
                <div className="mt-4">
                  <Link href="/admin/menu-items" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-menu-accent-600 hover:bg-menu-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-menu-accent-500">
                      View All
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-green-800 truncate">
                    Categories
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-green-900">
                    {/* This would be dynamic in a real implementation */}
                    8
                  </dd>
                </dl>
                <div className="mt-4">
                  <Link href="/admin/menu-items" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Manage Categories
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm font-medium text-amber-800 truncate">
                    Add New Item
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-amber-900">
                    <span className="text-2xl">+</span>
                  </dd>
                </dl>
                <div className="mt-4">
                  <Link href="/admin/add-item" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                      Create New
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
