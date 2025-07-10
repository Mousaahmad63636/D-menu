import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const CSV_FILE_PATH = path.join(process.cwd(), 'content of the menu.csv');

// Read menu data from CSV file
export const fetchCsvData = async () => {
  try {
    const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf8');
    
    const result = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().trim()
    });
    
    if (result.errors && result.errors.length > 0) {
      console.warn('CSV parsing warnings:', result.errors);
    }
    
    // Transform and clean data
    const items = result.data.map((row, index) => ({
      id: row.id || `item-${index + 1}`,
      name: row.name || '',
      description: row.description || '',
      description2: row.description2 || '',
      price: parseFloat(row.price) || 0,
      category: row.category || 'Uncategorized',
      image: row.image || '',
      allergens: row.allergens ? row.allergens.split(';').filter(a => a && a !== 'none') : [],
      isvegetarian: row.isvegetarian === 'yes',
      preptime: row.preptime || '',
      popular: row.popular === 'yes',
      agerestricted: row.agerestricted === 'yes'
    })).filter(item => item.name); // Filter out empty rows
    
    return items;
  } catch (error) {
    console.error('Error reading CSV file:', error);
    throw new Error('Failed to fetch menu data from CSV');
  }
};

// Add new item to CSV file
export const addCsvMenuItem = async (item) => {
  try {
    const existingData = await fetchCsvData();
    
    // Generate ID if not present
    if (!item.id) {
      item.id = item.name?.toLowerCase().replace(/\s+/g, '-') || `item-${Date.now()}`;
    }
    
    // Transform item to CSV format
    const csvItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      description2: item.description2 || '',
      price: item.price,
      category: item.category,
      image: item.image || '',
      allergens: Array.isArray(item.allergens) ? item.allergens.join(';') : (item.allergens || ''),
      isvegetarian: item.isvegetarian ? 'yes' : 'no',
      preptime: item.preptime || '',
      popular: item.popular ? 'yes' : 'no',
      agerestricted: item.agerestricted ? 'yes' : 'no'
    };
    
    existingData.push(csvItem);
    
    // Convert back to CSV
    const csv = Papa.unparse(existingData, {
      header: true
    });
    
    fs.writeFileSync(CSV_FILE_PATH, csv, 'utf8');
    
    return { id: item.id };
  } catch (error) {
    console.error('Error adding item to CSV:', error);
    throw new Error('Failed to add menu item to CSV');
  }
};

// Update item in CSV file
export const updateCsvMenuItem = async (itemId, updatedItem) => {
  try {
    const existingData = await fetchCsvData();
    const itemIndex = existingData.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }
    
    // Transform updated item to CSV format
    const csvItem = {
      id: itemId,
      name: updatedItem.name,
      description: updatedItem.description,
      description2: updatedItem.description2 || '',
      price: updatedItem.price,
      category: updatedItem.category,
      image: updatedItem.image || '',
      allergens: Array.isArray(updatedItem.allergens) ? updatedItem.allergens.join(';') : (updatedItem.allergens || ''),
      isvegetarian: updatedItem.isvegetarian ? 'yes' : 'no',
      preptime: updatedItem.preptime || '',
      popular: updatedItem.popular ? 'yes' : 'no',
      agerestricted: updatedItem.agerestricted ? 'yes' : 'no'
    };
    
    existingData[itemIndex] = csvItem;
    
    // Convert back to CSV
    const csv = Papa.unparse(existingData, {
      header: true
    });
    
    fs.writeFileSync(CSV_FILE_PATH, csv, 'utf8');
    
    return { id: itemId };
  } catch (error) {
    console.error('Error updating item in CSV:', error);
    throw new Error('Failed to update menu item in CSV');
  }
};

// Delete item from CSV file
export const deleteCsvMenuItem = async (itemId) => {
  try {
    const existingData = await fetchCsvData();
    const filteredData = existingData.filter(item => item.id !== itemId);
    
    if (filteredData.length === existingData.length) {
      throw new Error('Item not found');
    }
    
    // Convert back to CSV
    const csv = Papa.unparse(filteredData, {
      header: true
    });
    
    fs.writeFileSync(CSV_FILE_PATH, csv, 'utf8');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting item from CSV:', error);
    throw new Error('Failed to delete menu item from CSV');
  }
};