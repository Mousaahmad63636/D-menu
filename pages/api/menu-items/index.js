import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { fetchMenuItems, addMenuItem } from '../../../services/firestoreService';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Public access for menu viewing
      try {
        const items = await fetchMenuItems();
        res.status(200).json(items);
      } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
      }
      break;
      
    case 'POST':
      // Require authentication for modifications
      const session = await getServerSession(req, res, authOptions);
      
      if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      try {
        const result = await addMenuItem(req.body);
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
