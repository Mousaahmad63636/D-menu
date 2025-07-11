import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { migrateMenuItems } from '../../services/firestoreService';

export default async function handler(req, res) {
  // Require authentication for migration
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const result = await migrateMenuItems();
    res.status(200).json(result);
  } catch (error) {
    console.error('Migration API error:', error);
    res.status(500).json({ error: 'Failed to migrate menu items' });
  }
}
