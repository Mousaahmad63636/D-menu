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
      <div className="px-2 py-3">
        <div className="flex justify-evenly items-center overflow-x-auto scrollbar-hide">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onMainCategoryChange(category.id)}
              onKeyDown={(e) => handleKeyDown(e, category.id)}
              className={`px-2 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-menu-accent-600 flex-1 max-w-24 ${
                activeMainCategory === category.id
                  ? 'bg-white text-menu-accent-700 shadow-lg transform scale-105'
                  : 'bg-menu-accent-500/50 text-white hover:bg-menu-accent-400/60 hover:scale-102'
              }`}
              aria-current={activeMainCategory === category.id ? 'page' : undefined}
            >
              <div className="flex flex-col items-center space-y-0.5">
                <span className="text-base">{category.icon}</span>
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