require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const transactionsRoutes = require('./routes/transactions');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.use('/api/transactions', transactionsRoutes);

// Root route (optional): Returns all transactions
app.get('/', (req, res) => {
  db.query('SELECT * FROM transactions', (err, results) => {
    if (err) return res.status(500).send(err);
    const formattedResults = results.map((row) => ({
      ...row,
      date: row.date.toISOString().split('T')[0],
    }));
    res.json(formattedResults);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
