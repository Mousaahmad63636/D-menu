import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MenuHeader from '../components/MenuHeader';
import MenuSection from '../components/MenuSection';
import MenuNav from '../components/MenuNav';
import MenuCategory from '../components/MenuCategory';
import { menuData } from '../data/menuData';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-menu-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-menu-accent-500 mx-auto mb-4"></div>
          <p className="text-menu-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{menuData.restaurant.name} - Mobile Menu</title>
        <meta name="description" content={menuData.restaurant.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      
      <div className="min-h-screen bg-menu-gray-50">
        <MenuHeader restaurant={menuData.restaurant} />
        
        <MenuSection
          categories={menuData.categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <MenuNav
          categories={menuData.categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <main className="pb-8">
          {menuData.categories.map((category) => (
            <MenuCategory
              key={category.id}
              category={category}
              isVisible={activeCategory === category.id}
            />
          ))}
        </main>
        
        <footer className="bg-white border-t border-menu-gray-200 p-4">
          <div className="text-center text-menu-gray-600">
            <p className="text-sm">&copy; 2024 {menuData.restaurant.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
