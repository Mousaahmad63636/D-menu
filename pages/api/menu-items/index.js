import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { fetchSheetData, addMenuItem } from '../../../services/googleSheetsService';
import { fetchCsvData, addCsvMenuItem } from '../../../services/csvService';
import { fetchMemoryData, addMemoryMenuItem } from '../../../services/memoryStoreService';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  switch (req.method) {
    case 'GET':
      try {
        // Try Google Sheets first, then CSV, finally memory store
        let items;
        try {
          items = await fetchSheetData();
        } catch (sheetsError) {
          console.log('Google Sheets failed, trying CSV fallback:', sheetsError.message);
          try {
            items = await fetchCsvData();
          } catch (csvError) {
            console.log('CSV failed, using memory store:', csvError.message);
            items = await fetchMemoryData();
          }
        }
        res.status(200).json(items);
      } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
      }
      break;
      
    case 'POST':
      try {
        // Try Google Sheets first, then CSV, finally memory store
        let result;
        try {
          result = await addMenuItem(req.body);
        } catch (sheetsError) {
          console.log('Google Sheets failed, trying CSV fallback:', sheetsError.message);
          try {
            result = await addCsvMenuItem(req.body);
          } catch (csvError) {
            console.log('CSV failed, using memory store:', csvError.message);
            result = await addMemoryMenuItem(req.body);
          }
        }
        res.status(201).json({ success: true, ...result });
      } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to add menu item' });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
