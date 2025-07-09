import React, { useState } from 'react';

const MenuSection = ({ categories, activeCategory, onCategoryChange }) => {
  const [menuType, setMenuType] = useState('DINE IN');

  const categoryIcons = {
    appetizers: (
      <svg className="w-8 h-8 text-menu-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    mains: (
      <svg className="w-8 h-8 text-menu-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    desserts: (
      <svg className="w-8 h-8 text-menu-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.704 2.704 0 003 15.546V6.454c.523 0 1.046-.151 1.5-.454a2.704 2.704 0 013 0 2.704 2.704 0 003 0 2.704 2.704 0 013 0 2.704 2.704 0 003 0 2.704 2.704 0 013 0c.454.303.977.454 1.5.454v9.092z" />
      </svg>
    ),
    beverages: (
      <svg className="w-8 h-8 text-menu-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 11l4-4m0 0l4 4m-4-4v12" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m6 0h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v12" />
      </svg>
    )
  };

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className="bg-menu-gray-50 px-4 py-6">
      {/* Our Menus Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-menu-gray-700 mb-4">Our Menus</h2>
        
        {/* Dine In / Take Out Toggle */}
        <div className="flex bg-white rounded-lg p-1 shadow-sm max-w-xs mx-auto">
          <button
            onClick={() => setMenuType('DINE IN')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
              menuType === 'DINE IN'
                ? 'bg-menu-accent-500 text-white'
                : 'text-menu-gray-600 hover:text-menu-gray-900'
            }`}
          >
            DINE IN
          </button>
          <button
            onClick={() => setMenuType('TAKE OUT')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
              menuType === 'TAKE OUT'
                ? 'bg-menu-accent-500 text-white'
                : 'text-menu-gray-600 hover:text-menu-gray-900'
            }`}
          >
            TAKE OUT
          </button>
        </div>
      </div>

      {/* Category Preview Grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`bg-white rounded-lg p-4 shadow-sm border-2 transition-all duration-200 ${
              activeCategory === category.id
                ? 'border-menu-accent-500 bg-menu-accent-50'
                : 'border-menu-gray-200 hover:border-menu-gray-300'
            }`}
          >
            <div className="flex flex-col items-center">
              <div className={`mb-2 ${activeCategory === category.id ? 'text-menu-accent-600' : 'text-menu-gray-600'}`}>
                {categoryIcons[category.id]}
              </div>
              <span className={`text-sm font-medium ${
                activeCategory === category.id ? 'text-menu-accent-700' : 'text-menu-gray-700'
              }`}>
                {category.name}
              </span>
              <span className="text-xs text-menu-gray-500 mt-1">
                {category.items.length} items
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;