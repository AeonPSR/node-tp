const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const filePath = './articles.json';

function loadArticles() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function saveArticles(articles) {
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
}

// GET /articles – list all articles with optional filtering
app.get('/articles', (req, res) => {
  let articles = loadArticles();
  const { tag, author } = req.query;

  if (tag) articles = articles.filter(a => a.tags.includes(tag));
  if (author) articles = articles.filter(a => a.author === author);

  res.json(articles);
});

// GET /articles/:id
app.get('/articles/:id', (req, res) => {
  const articles = loadArticles();
  const article = articles.find(a => a.id == req.params.id);
  if (!article) return res.status(404).send('Not found');
  res.json(article);
});

// POST /articles
app.post('/articles', (req, res) => {
  const articles = loadArticles();
  const { title, tags, author } = req.body;
  const id = Math.max(...articles.map(a => a.id), 0) + 1;
  const article = { id, title, tags, author };
  articles.push(article);
  saveArticles(articles);
  res.status(201).json(article);
});

// PUT /articles/:id
app.put('/articles/:id', (req, res) => {
  const articles = loadArticles();
  const index = articles.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).send('Not found');

  articles[index] = { ...articles[index], ...req.body };
  saveArticles(articles);
  res.json(articles[index]);
});

// DELETE /articles/:id
app.delete('/articles/:id', (req, res) => {
  let articles = loadArticles();
  const index = articles.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).send('Not found');

  const deleted = articles.splice(index, 1);
  saveArticles(articles);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
