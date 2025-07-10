import Papa from 'papaparse';
import { menuData } from '../data/menuData';

const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/d/1SJ0ooxxlc74FsvBlSoStuDus0nh4MEDeLpvtYQAf6Iw/export?format=csv&gid=0";

// Transform CSV data to hierarchical menu structure
const transformMenuData = (csvData) => {
  // Group items by category
  const categorizedItems = csvData.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    
    // Transform item to match expected structure
    acc[category].push({
      id: item.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown',
      name: item.name || 'Unknown Item',
      description: item.description || '',
      description2: item.description2 || '',
      price: item.price ? parseFloat(item.price).toFixed(2) : '0.00',
      image: item.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      allergens: item.allergens ? item.allergens.split(';').filter(a => a && a !== 'none') : [],
      dietary: [],
      isVegetarian: item.isvegetarian === 'yes',
      prepTime: item.preptime || '',
      popular: item.popular === 'yes',
      ageRestricted: item.agerestricted === 'yes'
    });
    
    return acc;
  }, {});

  // Map categories to main categories structure
  const mainCategories = [
    {
      id: "food",
      name: "Food",
      description: "Delicious meals and appetizers",
      icon: "🍽️",
      subcategories: []
    },
    {
      id: "beverages",
      name: "Beverages",
      description: "Refreshing drinks to complement your meal",
      icon: "🥤",
      subcategories: []
    },
    {
      id: "desserts",
      name: "Desserts",
      description: "Sweet endings to your dining experience",
      icon: "🍰",
      subcategories: []
    },
    {
      id: "tobacco",
      name: "Tobacco",
      description: "Premium tobacco products",
      icon: "🚬",
      subcategories: []
    }
  ];

  // Populate subcategories based on CSV data
  Object.keys(categorizedItems).forEach(categoryName => {
    const subcategory = {
      id: categoryName.toLowerCase().replace(/\s+/g, '-'),
      name: categoryName,
      description: `Delicious ${categoryName.toLowerCase()} prepared with care`,
      items: categorizedItems[categoryName]
    };

    // Determine which main category this subcategory belongs to
    const lowerCategoryName = categoryName.toLowerCase();
    if (lowerCategoryName.includes('appetizer') || lowerCategoryName.includes('main') || lowerCategoryName.includes('side') || lowerCategoryName.includes('soup') || lowerCategoryName.includes('salad')) {
      mainCategories[0].subcategories.push(subcategory); // Food
    } else if (lowerCategoryName.includes('drink') || lowerCategoryName.includes('beverage') || lowerCategoryName.includes('coffee') || lowerCategoryName.includes('tea') || lowerCategoryName.includes('juice') || lowerCategoryName.includes('wine') || lowerCategoryName.includes('cocktail')) {
      mainCategories[1].subcategories.push(subcategory); // Beverages
    } else if (lowerCategoryName.includes('dessert') || lowerCategoryName.includes('cake') || lowerCategoryName.includes('ice') || lowerCategoryName.includes('sweet')) {
      mainCategories[2].subcategories.push(subcategory); // Desserts
    } else if (lowerCategoryName.includes('tobacco') || lowerCategoryName.includes('cigarette') || lowerCategoryName.includes('cigar') || lowerCategoryName.includes('smoke')) {
      mainCategories[3].subcategories.push(subcategory); // Tobacco
    } else {
      // Default to food if uncertain
      mainCategories[0].subcategories.push(subcategory);
    }
  });

  // Filter out empty main categories
  const filteredMainCategories = mainCategories.filter(cat => cat.subcategories.length > 0);

  return {
    restaurant: {
      name: "Bella Vista Restaurant",
      description: "Fresh, locally-sourced ingredients crafted into memorable dining experiences",
      location: "Downtown District"
    },
    mainCategories: filteredMainCategories
  };
};

export const fetchMenuData = async (useStaticData = true) => {
  // Option to use static data instead of CSV
  if (useStaticData) {
    return new Promise((resolve) => {
      // Simulate async behavior
      setTimeout(() => {
        resolve(menuData);
      }, 100);
    });
  }

  // Original CSV fetching logic
  try {
    const response = await fetch(GOOGLE_SHEETS_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.toLowerCase().trim(),
        complete: (results) => {
          if (results.errors.length > 0) {
            console.warn('CSV parsing warnings:', results.errors);
          }
          
          try {
            const menuData = transformMenuData(results.data);
            resolve(menuData);
          } catch (error) {
            reject(new Error(`Failed to transform menu data: ${error.message}`));
          }
        },
        error: (error) => {
          reject(new Error(`CSV parsing failed: ${error.message}`));
        }
      });
    });
  } catch (error) {
    throw new Error(`Failed to fetch menu data: ${error.message}`);
  }
};