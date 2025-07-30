import React, { useState } from 'react';

const MenuSection = ({ categories, activeCategory, onCategoryChange }) => {
  const [menuType, setMenuType] = useState('DINE IN');

  const categoryIcons = {
    margherita: (
      <svg className="w-8 h-8 text-menu-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l10 20-10-5-10 5L12 2z" />
      </svg>
    ),
    specialty: (
      <svg className="w-8 h-8 text-menu-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    spaghetti: (
      <svg className="w-8 h-8 text-menu-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
    penne: (
      <svg className="w-8 h-8 text-menu-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 6h8M8 12h8M8 18h8" />
      </svg>
    ),
    ravioli: (
      <svg className="w-8 h-8 text-menu-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16v2H4zM6 10h12v8H6z" />
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