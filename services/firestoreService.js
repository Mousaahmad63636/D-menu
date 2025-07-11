// Firestore service - server-side only
import { getFirestoreDb, MENU_ITEMS_COLLECTION } from '../lib/firebase';

// Fetch all menu items from Firestore
export const fetchMenuItems = async () => {
  try {
    const db = getFirestoreDb();
    const snapshot = await db.collection(MENU_ITEMS_COLLECTION).get();
    
    const items = [];
    snapshot.forEach(doc => {
      items.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return items;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw new Error('Failed to fetch menu items from Firestore');
  }
};

// Add a new menu item
export const addMenuItem = async (item) => {
  try {
    const db = getFirestoreDb();
    
    // Generate ID if not present
    if (!item.id) {
      item.id = item.name?.toLowerCase().replace(/\s+/g, '-') || `item-${Date.now()}`;
    }
    
    // Format item data
    const formattedItem = formatItemForFirestore(item);
    
    // Add to Firestore
    const docRef = await db.collection(MENU_ITEMS_COLLECTION).add(formattedItem);
    
    return { 
      id: docRef.id,
      ...formattedItem
    };
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw new Error('Failed to add menu item to Firestore');
  }
};

// Update an existing menu item
export const updateMenuItem = async (id, item) => {
  try {
    const db = getFirestoreDb();
    
    // Format item data
    const formattedItem = formatItemForFirestore(item);
    
    // Update in Firestore
    await db.collection(MENU_ITEMS_COLLECTION).doc(id).update(formattedItem);
    
    return { 
      id,
      ...formattedItem
    };
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw new Error('Failed to update menu item in Firestore');
  }
};

// Delete a menu item
export const deleteMenuItem = async (id) => {
  try {
    const db = getFirestoreDb();
    
    // Delete from Firestore
    await db.collection(MENU_ITEMS_COLLECTION).doc(id).delete();
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw new Error('Failed to delete menu item from Firestore');
  }
};

// Get a single menu item by ID
export const getMenuItem = async (id) => {
  try {
    const db = getFirestoreDb();
    const doc = await db.collection(MENU_ITEMS_COLLECTION).doc(id).get();
    
    if (!doc.exists) {
      return null;
    }
    
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error getting menu item:', error);
    throw new Error('Failed to get menu item from Firestore');
  }
};

// Format item data for Firestore storage
const formatItemForFirestore = (item) => {
  const formatted = { ...item };
  
  // Ensure price is a number
  if (formatted.price) {
    formatted.price = parseFloat(formatted.price);
  }
  
  // Ensure allergens is an array
  if (typeof formatted.allergens === 'string') {
    formatted.allergens = formatted.allergens.split(';').filter(a => a && a !== 'none');
  } else if (!Array.isArray(formatted.allergens)) {
    formatted.allergens = [];
  }
  
  // Ensure boolean fields are proper booleans
  formatted.isVegetarian = Boolean(formatted.isVegetarian);
  formatted.popular = Boolean(formatted.popular);
  formatted.ageRestricted = Boolean(formatted.ageRestricted);
  
  // Add timestamp
  formatted.updatedAt = new Date();
  if (!formatted.createdAt) {
    formatted.createdAt = new Date();
  }
  
  return formatted;
};
