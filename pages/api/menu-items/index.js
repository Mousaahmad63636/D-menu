import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { fetchSheetData, addMenuItem } from '../../../services/googleSheetsService';
import { fetchCsvData, addCsvMenuItem } from '../../../services/csvService';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  switch (req.method) {
    case 'GET':
      try {
        // Try Google Sheets first, fallback to CSV
        let items;
        try {
          items = await fetchSheetData();
        } catch (sheetsError) {
          console.log('Google Sheets failed, using CSV fallback:', sheetsError.message);
          items = await fetchCsvData();
        }
        res.status(200).json(items);
      } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
      }
      break;
      
    case 'POST':
      try {
        // Try Google Sheets first, fallback to CSV
        let result;
        try {
          result = await addMenuItem(req.body);
        } catch (sheetsError) {
          console.log('Google Sheets failed, using CSV fallback:', sheetsError.message);
          result = await addCsvMenuItem(req.body);
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
