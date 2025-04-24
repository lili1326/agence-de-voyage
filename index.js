const express = require('express');
const mongoose = require('mongoose');
const Voyage = require('./models/Voyage');
require('dotenv').config();

const app = express();
app.use(express.json());

// 👉 Ajouter cette ligne pour servir les fichiers HTML/CSS/JS
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Mongo connecté"))
  .catch(err => console.error("❌ Mongo erreur:", err));

// Routes de base
app.get('/voyages', async (req, res) => {
  const voyages = await Voyage.find();
  res.json(voyages);
});

app.post('/voyages', async (req, res) => {
  const voyage = new Voyage(req.body);
  await voyage.save();
  res.status(201).json(voyage);
});

app.delete('/voyages/:id', async (req, res) => {
  await Voyage.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(3000, () => console.log("🚀 API sur http://localhost:3000"));
