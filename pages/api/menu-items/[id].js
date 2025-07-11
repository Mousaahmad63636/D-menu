import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getMenuItem, updateMenuItem, deleteMenuItem } from '../../../services/firestoreService';
import { fetchCsvData, updateCsvMenuItem, deleteCsvMenuItem } from '../../../services/csvService';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { id } = req.query;
  
  switch (req.method) {
    case 'GET':
      try {
        // Try Firestore first, fallback to CSV
        let item;
        try {
          item = await getMenuItem(id);
        } catch (firestoreError) {
          console.log('Firestore failed, using CSV fallback:', firestoreError.message);
          const allItems = await fetchCsvData();
          item = allItems.find(item => item.id === id);
        }
        
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
        // Try Firestore first, fallback to CSV
        let result;
        try {
          result = await updateMenuItem(id, req.body);
        } catch (firestoreError) {
          console.log('Firestore failed, using CSV fallback:', firestoreError.message);
          result = await updateCsvMenuItem(id, req.body);
        }
        
        res.status(200).json({ success: true, ...result });
      } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to update menu item' });
      }
      break;
      
    case 'DELETE':
      try {
        // Try Firestore first, fallback to CSV
        let result;
        try {
          result = await deleteMenuItem(id);
        } catch (firestoreError) {
          console.log('Firestore failed, using CSV fallback:', firestoreError.message);
          result = await deleteCsvMenuItem(id);
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
