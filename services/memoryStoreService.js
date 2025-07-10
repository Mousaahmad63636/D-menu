// In-memory data store for Vercel deployment
// This provides full CRUD functionality but data resets on deployment
// Perfect for demo purposes

import { fetchCsvData } from './csvService';

// In-memory store
let memoryStore = null;
let isInitialized = false;

// Initialize store with CSV data
const initializeStore = async () => {
  if (!isInitialized) {
    try {
      memoryStore = await fetchCsvData();
      isInitialized = true;
      console.log(`Memory store initialized with ${memoryStore.length} items`);
    } catch (error) {
      console.error('Failed to initialize memory store:', error);
      // Fallback to empty store
      memoryStore = [];
      isInitialized = true;
    }
  }
  return memoryStore;
};

// Fetch all items from memory store
export const fetchMemoryData = async () => {
  await initializeStore();
  return [...memoryStore]; // Return copy to prevent direct manipulation
};

// Add new item to memory store
export const addMemoryMenuItem = async (item) => {
  await initializeStore();
  
  // Generate ID if not present
  if (!item.id) {
    item.id = item.name?.toLowerCase().replace(/\s+/g, '-') || `item-${Date.now()}`;
  }
  
  // Transform item to consistent format
  const memoryItem = {
    id: item.id,
    name: item.name,
    description: item.description,
    description2: item.description2 || '',
    price: parseFloat(item.price) || 0,
    category: item.category,
    image: item.image || '',
    allergens: Array.isArray(item.allergens) ? item.allergens : [],
    isvegetarian: Boolean(item.isvegetarian),
    preptime: item.preptime || '',
    popular: Boolean(item.popular),
    agerestricted: Boolean(item.agerestricted)
  };
  
  memoryStore.push(memoryItem);
  console.log(`Added item: ${item.id}`);
  
  return { id: item.id };
};

// Update item in memory store
export const updateMemoryMenuItem = async (itemId, updatedItem) => {
  await initializeStore();
  
  const itemIndex = memoryStore.findIndex(item => item.id === itemId);
  
  if (itemIndex === -1) {
    throw new Error('Item not found');
  }
  
  // Transform updated item to consistent format
  const memoryItem = {
    id: itemId,
    name: updatedItem.name,
    description: updatedItem.description,
    description2: updatedItem.description2 || '',
    price: parseFloat(updatedItem.price) || 0,
    category: updatedItem.category,
    image: updatedItem.image || '',
    allergens: Array.isArray(updatedItem.allergens) ? updatedItem.allergens : [],
    isvegetarian: Boolean(updatedItem.isvegetarian),
    preptime: updatedItem.preptime || '',
    popular: Boolean(updatedItem.popular),
    agerestricted: Boolean(updatedItem.agerestricted)
  };
  
  memoryStore[itemIndex] = memoryItem;
  console.log(`Updated item: ${itemId}`);
  
  return { id: itemId };
};

// Delete item from memory store
export const deleteMemoryMenuItem = async (itemId) => {
  await initializeStore();
  
  const originalLength = memoryStore.length;
  memoryStore = memoryStore.filter(item => item.id !== itemId);
  
  if (memoryStore.length === originalLength) {
    throw new Error('Item not found');
  }
  
  console.log(`Deleted item: ${itemId}`);
  
  return { success: true };
};

// Reset store (useful for testing)
export const resetMemoryStore = () => {
  memoryStore = null;
  isInitialized = false;
  console.log('Memory store reset');
};

// Get store statistics
export const getMemoryStoreStats = async () => {
  await initializeStore();
  
  return {
    totalItems: memoryStore.length,
    categories: [...new Set(memoryStore.map(item => item.category))],
    lastInitialized: new Date().toISOString(),
    isDemo: true // Flag to indicate this is demo data
  };
};
