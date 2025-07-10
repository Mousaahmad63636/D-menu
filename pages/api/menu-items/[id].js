import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { fetchSheetData, updateMenuItem, deleteMenuItem } from '../../../services/googleSheetsService';
import { fetchCsvData, updateCsvMenuItem, deleteCsvMenuItem } from '../../../services/csvService';
import { fetchMemoryData, updateMemoryMenuItem, deleteMemoryMenuItem } from '../../../services/memoryStoreService';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { id } = req.query;
  
  switch (req.method) {
    case 'GET':
      try {
        // Try Google Sheets first, then CSV, finally memory store
        let allItems;
        try {
          allItems = await fetchSheetData();
        } catch (sheetsError) {
          console.log('Google Sheets failed, trying CSV fallback:', sheetsError.message);
          try {
            allItems = await fetchCsvData();
          } catch (csvError) {
            console.log('CSV failed, using memory store:', csvError.message);
            allItems = await fetchMemoryData();
          }
        }
        
        const item = allItems.find(item => item.id === id);
        
        if (!item) {
          return res.status(404).json({ error: 'Item not found' });
        }
        
        res.status(200).json(item);
      } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to fetch menu item' });
      }
      break;
      
    case 'PUT':
      try {
        // Try Google Sheets first, then CSV, finally memory store
        let result;
        try {
          const allItems = await fetchSheetData();
          const itemIndex = allItems.findIndex(item => item.id === id);
          
          if (itemIndex === -1) {
            return res.status(404).json({ error: 'Item not found' });
          }
          
          // Row index in Google Sheets is 1-based and includes header row
          const rowIndex = itemIndex + 2;
          
          result = await updateMenuItem(rowIndex, req.body);
        } catch (sheetsError) {
          console.log('Google Sheets failed, trying CSV fallback:', sheetsError.message);
          try {
            result = await updateCsvMenuItem(id, req.body);
          } catch (csvError) {
            console.log('CSV failed, using memory store:', csvError.message);
            result = await updateMemoryMenuItem(id, req.body);
          }
        }
        
        res.status(200).json({ success: true, ...result });
      } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to update menu item' });
      }
      break;
      
    case 'DELETE':
      try {
        // Try Google Sheets first, then CSV, finally memory store
        let result;
        try {
          const allItems = await fetchSheetData();
          const itemIndex = allItems.findIndex(item => item.id === id);
          
          if (itemIndex === -1) {
            return res.status(404).json({ error: 'Item not found' });
          }
          
          // Row index in Google Sheets is 1-based and includes header row
          const rowIndex = itemIndex + 2;
          
          result = await deleteMenuItem(rowIndex);
        } catch (sheetsError) {
          console.log('Google Sheets failed, trying CSV fallback:', sheetsError.message);
          try {
            result = await deleteCsvMenuItem(id);
          } catch (csvError) {
            console.log('CSV failed, using memory store:', csvError.message);
            result = await deleteMemoryMenuItem(id);
          }
        }
        
        res.status(200).json({ success: true, ...result });
      } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to delete menu item' });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
