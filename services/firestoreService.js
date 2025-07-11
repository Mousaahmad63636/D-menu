// Firestore service - server-side only
import { getFirestoreDb, MENU_ITEMS_COLLECTION } from '../lib/firebase';

// Fetch all menu items from Firestore, optionally filtered by restaurant
export const fetchMenuItems = async (restaurantId = null) => {
  try {
    const db = getFirestoreDb();
    let query = db.collection(MENU_ITEMS_COLLECTION);
    
    // Filter by restaurant ID if provided
    if (restaurantId) {
      query = query.where('restaurantId', '==', restaurantId);
    }
    
    const snapshot = await query.get();
    
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
    
    // Use the formatted ID as the document ID
    await db.collection(MENU_ITEMS_COLLECTION).doc(item.id).set(formattedItem);
    
    return { 
      id: item.id,
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
  
  // Ensure restaurantId is present
  if (!formatted.restaurantId) {
    throw new Error('restaurantId is required for menu items');
  }
  
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

// Migration function to fix existing items with auto-generated IDs
export const migrateMenuItems = async () => {
  try {
    const db = getFirestoreDb();
    const snapshot = await db.collection(MENU_ITEMS_COLLECTION).get();
    
    const migrations = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      const firestoreId = doc.id;
      
      // Check if this looks like an auto-generated ID (long random string)
      if (firestoreId.length > 10 && !firestoreId.includes('-')) {
        // Generate proper name-based ID
        const nameBasedId = data.name?.toLowerCase().replace(/\s+/g, '-') || `item-${Date.now()}`;
        
        migrations.push({
          oldId: firestoreId,
          newId: nameBasedId,
          data: data
        });
      }
    });
    
    console.log(`Found ${migrations.length} items to migrate`);
    
    // Perform migrations
    for (const migration of migrations) {
      // Create new document with name-based ID
      await db.collection(MENU_ITEMS_COLLECTION).doc(migration.newId).set({
        ...migration.data,
        id: migration.newId
      });
      
      // Delete old document
      await db.collection(MENU_ITEMS_COLLECTION).doc(migration.oldId).delete();
      
      console.log(`Migrated ${migration.data.name}: ${migration.oldId} → ${migration.newId}`);
    }
    
    return { 
      success: true, 
      migratedCount: migrations.length,
      migrations: migrations.map(m => ({ name: m.data.name, oldId: m.oldId, newId: m.newId }))
    };
  } catch (error) {
    console.error('Error migrating menu items:', error);
    throw new Error('Failed to migrate menu items');
  }
};
