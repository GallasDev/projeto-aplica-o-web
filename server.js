const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/produtos', (req, res) => {
  const { nome, preco, descricao } = req.body;
  const sql = 'INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)';
  db.run(sql, [nome, preco, descricao], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ id: this.lastID });
  });
});

app.get('/api/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
