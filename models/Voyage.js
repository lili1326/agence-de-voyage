const mongoose = require('mongoose');

const voyageSchema = new mongoose.Schema({
  titre: String,
  description: String,
  prix: Number,
  pays: String,
  datesDisponibles: [Date],
  placesDispo: Number
});

module.exports = mongoose.model('Voyage', voyageSchema);
