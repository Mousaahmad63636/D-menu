import React from 'react';

const MenuHeader = ({ restaurant }) => {
  return (
    <header className="bg-white shadow-sm border-b border-menu-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-menu-accent-500 rounded-full flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>
        
        {/* Restaurant name on the right */}
        <div className="text-right">
          <h1 className="text-lg font-bold text-menu-gray-900">
            {restaurant.name}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;