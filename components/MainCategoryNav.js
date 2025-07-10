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

  // Professional SVG icons for each category
  const getCategoryIcon = (categoryId, className) => {
    const iconMap = {
      'food': (
        // Chef's hat icon
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18h12V8.5a2.5 2.5 0 00-2.5-2.5h-7A2.5 2.5 0 006 8.5V18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18h12l1 2H5l1-2zM8 12h8M9 15h6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 6c0-1.1.9-2 2-2s2 .9 2 2M12 6c0-1.1.9-2 2-2s2 .9 2 2M14 6c0-1.1.9-2 2-2s2 .9 2 2" />
        </svg>
      ),
      'beverages': (
        // Wine glass icon
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12V7a1 1 0 011-1h12a1 1 0 011 1v5M5 12l2 7h10l2-7M5 12h14" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V2M9 2h6" />
        </svg>
      ),
      'desserts': (
        // Layered cake icon
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3L12 3z" />
        </svg>
      ),
      'tobacco': (
        // Professional cigar icon
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M6 8h12a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4a2 2 0 012-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 8v8M21 10v4" />
        </svg>
      )
    };
    return iconMap[categoryId] || iconMap['food'];
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
                <div className="flex flex-col items-center space-y-1">
                  {getCategoryIcon(category.id, "w-5 h-5 stroke-current")}
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