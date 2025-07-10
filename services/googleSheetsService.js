// This file contains only server-side functions and should only be imported by API routes
// It should never be imported in client-side code or React components

import { getGoogleSheetsClient, transformRowToItem, transformItemToRow } from '../lib/google-sheets';

// Fetch all data from sheet
export const fetchSheetData = async () => {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    
    // First get the header row
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!1:1',
    });
    
    const headers = headerResponse.data.values[0].map(h => h.toLowerCase().trim());
    
    // Then get all data rows
    const dataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!2:1000', // Adjust range as needed
    });
    
    const rows = dataResponse.data.values || [];
    
    // Transform rows to items
    const items = rows.map(row => transformRowToItem(row, headers)).filter(Boolean);
    
    return items;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw new Error('Failed to fetch menu data from Google Sheets');
  }
};

// Add a new menu item
export const addMenuItem = async (item) => {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    
    // Get headers first
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!1:1',
    });
    
    const headers = headerResponse.data.values[0].map(h => h.toLowerCase().trim());
    
    // Generate ID if not present
    if (!item.id) {
      item.id = item.name?.toLowerCase().replace(/\s+/g, '-') || `item-${Date.now()}`;
    }
    
    // Transform item to row format
    const row = transformItemToRow(item, headers);
    
    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A2', // Start appending after header row
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [row]
      }
    });
    
    return { id: item.id };
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw new Error('Failed to add menu item to Google Sheets');
  }
};

// Update an existing menu item
export const updateMenuItem = async (rowIndex, item) => {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    
    // Get headers first
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!1:1',
    });
    
    const headers = headerResponse.data.values[0].map(h => h.toLowerCase().trim());
    
    // Transform item to row format
    const row = transformItemToRow(item, headers);
    
    // Update row in sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!A${rowIndex}:${String.fromCharCode(65 + headers.length - 1)}${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [row]
      }
    });
    
    return { id: item.id };
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw new Error('Failed to update menu item in Google Sheets');
  }
};

// Delete a menu item
export const deleteMenuItem = async (rowIndex) => {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    
    // Get sheet ID first
    const sheetResponse = await sheets.spreadsheets.get({
      spreadsheetId,
      ranges: ['Sheet1!A1:A1'],
      fields: 'sheets.properties'
    });
    
    const sheetId = sheetResponse.data.sheets[0].properties.sheetId;
    
    // Delete row from sheet
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: 'ROWS',
                startIndex: rowIndex - 1, // 0-based index
                endIndex: rowIndex // exclusive end index
              }
            }
          }
        ]
      }
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw new Error('Failed to delete menu item from Google Sheets');
  }
};
