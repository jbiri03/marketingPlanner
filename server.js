require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/scripts', express.static('scripts'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1 AS ok');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.post('/tasks', async (req, res) => {
  try {
    const { title, status } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO tasks (title, status) VALUES (?, ?)',
      [title, status || 'pending']
    );

    res.status(201).json({
      message: 'Task created',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tasks ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});