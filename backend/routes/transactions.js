const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all transactions
router.get('/', (req, res) => {
  db.query('SELECT * FROM transactions', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST a new transaction
router.post('/', (req, res) => {
  const { title, amount, category, date } = req.body;
  db.query(
    'INSERT INTO transactions (title, amount, category, date) VALUES (?, ?, ?, ?)',
    [title, amount, category, date],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, title, amount, category, date });
    }
  );
});

// UPDATE a transaction
router.put('/:id', (req, res) => {
  const { title, amount, category, date } = req.body;
  db.query(
    'UPDATE transactions SET title = ?, amount = ?, category = ?, date = ? WHERE id = ?',
    [title, amount, category, date, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// DELETE a transaction
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM transactions WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;
