import React from 'react';

const MainCategoryNav = ({ mainCategories, activeMainCategory, onMainCategoryChange }) => {
  const handleKeyDown = (e, categoryId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onMainCategoryChange(categoryId);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-menu-accent-600 to-menu-accent-700 text-white shadow-lg">
      <div className="px-4 py-4">
        <div className="flex justify-center space-x-2 overflow-x-auto scrollbar-hide">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onMainCategoryChange(category.id)}
              onKeyDown={(e) => handleKeyDown(e, category.id)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-menu-accent-600 ${
                activeMainCategory === category.id
                  ? 'bg-white text-menu-accent-700 shadow-lg transform scale-105'
                  : 'bg-menu-accent-500/50 text-white hover:bg-menu-accent-400/60 hover:scale-102'
              }`}
              aria-current={activeMainCategory === category.id ? 'page' : undefined}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg">{category.icon}</span>
                <span className="text-xs font-medium">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainCategoryNav;