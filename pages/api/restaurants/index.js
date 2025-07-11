import { getFirestoreDb } from '../../../lib/firebase';

const RESTAURANTS_COLLECTION = 'restaurants';

export default async function handler(req, res) {
  const db = getFirestoreDb();
  
  switch (req.method) {
    case 'GET':
      try {
        const snapshot = await db.collection(RESTAURANTS_COLLECTION).get();
        const restaurants = [];
        
        snapshot.forEach(doc => {
          restaurants.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        res.status(200).json(restaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Failed to fetch restaurants' });
      }
      break;
      
    case 'POST':
      try {
        const restaurantData = {
          ...req.body,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Create restaurant with custom ID (slug)
        const restaurantId = req.body.id || req.body.slug;
        if (!restaurantId) {
          return res.status(400).json({ error: 'Restaurant ID/slug is required' });
        }
        
        // Check if restaurant already exists
        const existingDoc = await db.collection(RESTAURANTS_COLLECTION).doc(restaurantId).get();
        if (existingDoc.exists) {
          return res.status(409).json({ error: 'Restaurant with this ID already exists' });
        }
        
        await db.collection(RESTAURANTS_COLLECTION).doc(restaurantId).set(restaurantData);
        
        res.status(201).json({
          id: restaurantId,
          ...restaurantData
        });
      } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Failed to create restaurant' });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
