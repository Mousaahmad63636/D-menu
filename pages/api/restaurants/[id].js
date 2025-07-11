import { getFirestoreDb } from '../../../lib/firebase';

const RESTAURANTS_COLLECTION = 'restaurants';

export default async function handler(req, res) {
  const { id } = req.query;
  const db = getFirestoreDb();
  
  switch (req.method) {
    case 'GET':
      try {
        const doc = await db.collection(RESTAURANTS_COLLECTION).doc(id).get();
        
        if (!doc.exists) {
          return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        res.status(200).json({
          id: doc.id,
          ...doc.data()
        });
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ error: 'Failed to fetch restaurant' });
      }
      break;
      
    case 'PUT':
      try {
        const updateData = {
          ...req.body,
          updatedAt: new Date().toISOString()
        };
        
        // Remove id from update data if it exists
        delete updateData.id;
        
        const doc = await db.collection(RESTAURANTS_COLLECTION).doc(id).get();
        if (!doc.exists) {
          return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        await db.collection(RESTAURANTS_COLLECTION).doc(id).update(updateData);
        
        res.status(200).json({
          id,
          ...updateData
        });
      } catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ error: 'Failed to update restaurant' });
      }
      break;
      
    case 'DELETE':
      try {
        const doc = await db.collection(RESTAURANTS_COLLECTION).doc(id).get();
        if (!doc.exists) {
          return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        await db.collection(RESTAURANTS_COLLECTION).doc(id).delete();
        
        res.status(200).json({ success: true, message: 'Restaurant deleted' });
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ error: 'Failed to delete restaurant' });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
