import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = {
  testimonials: [{ id: 1, name: 'Demo User', quote: 'Loved the experience.' }],
  properties: [{ id: 1, name: 'Reef Bay Haven', price: '$3,750,000', status: 'for-sale' }],
  rentals: [{ id: 1, name: 'Maho Bay Escape', weekly: '$6,800' }],
  gallery: [{ id: 1, url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' }],
};

const buildCrudRoutes = (path, key) => {
  app.get(path, (req, res) => res.json(db[key]));

  app.post(path, (req, res) => {
    const item = { id: Date.now(), ...req.body };
    db[key].push(item);
    res.status(201).json(item);
  });

  app.put(`${path}/:id`, (req, res) => {
    const id = Number(req.params.id);
    db[key] = db[key].map((item) => (item.id === id ? { ...item, ...req.body } : item));
    res.json({ ok: true });
  });

  app.delete(`${path}/:id`, (req, res) => {
    const id = Number(req.params.id);
    db[key] = db[key].filter((item) => item.id !== id);
    res.json({ ok: true });
  });
};

buildCrudRoutes('/api/testimonials', 'testimonials');
buildCrudRoutes('/api/properties', 'properties');
buildCrudRoutes('/api/rentals', 'rentals');
buildCrudRoutes('/api/gallery', 'gallery');

app.get('/', (req, res) => {
  res.json({ status: 'Placeholder API ready', notes: 'Swap with Firebase or production database when ready.' });
});

app.listen(port, () => {
  console.log(`Mock API running on http://localhost:${port}`);
});
