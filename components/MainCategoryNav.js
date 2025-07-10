import React from 'react';

const MainCategoryNav = ({ mainCategories, activeMainCategory, onMainCategoryChange }) => {
  const handleKeyDown = (e, categoryId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onMainCategoryChange(categoryId);
    }
  };

  // Define unique colors for each main category button (not background)
  const getCategoryColors = (categoryId) => {
    const colorMap = {
      'food': {
        active: 'bg-orange-500 text-white border-orange-500',
        inactive: 'bg-white text-orange-600 border-orange-200 hover:bg-orange-50 hover:border-orange-300'
      },
      'beverages': {
        active: 'bg-blue-500 text-white border-blue-500',
        inactive: 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300'
      },
      'desserts': {
        active: 'bg-pink-500 text-white border-pink-500',
        inactive: 'bg-white text-pink-600 border-pink-200 hover:bg-pink-50 hover:border-pink-300'
      },
      'tobacco': {
        active: 'bg-gray-600 text-white border-gray-600',
        inactive: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
      }
    };
    return colorMap[categoryId] || colorMap['food'];
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="px-3 py-4">
        <div className="flex justify-center items-center space-x-3 overflow-x-auto scrollbar-hide">
          {mainCategories.map((category) => {
            const categoryColors = getCategoryColors(category.id);
            const isActive = activeMainCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onMainCategoryChange(category.id)}
                onKeyDown={(e) => handleKeyDown(e, category.id)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-1 max-w-24 border-2 ${
                  isActive
                    ? `${categoryColors.active} shadow-lg transform scale-105 focus:ring-white`
                    : `${categoryColors.inactive} hover:scale-102 focus:ring-gray-300`
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex flex-col items-center space-y-0.5">
                  <span className="text-base">{category.icon}</span>
                  <span className="text-xs font-medium">{category.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MainCategoryNav;