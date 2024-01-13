const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://niteshnagar1142002:WqmYZATrn2H8P6qm@cluster0.h7rsur3.mongodb.net/current-bill", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});
