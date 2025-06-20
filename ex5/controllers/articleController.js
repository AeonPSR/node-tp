const fs = require('fs');
const path = './articles.json';

function loadArticles() {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

function saveArticles(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

exports.getAll = (req, res) => {
  let articles = loadArticles();
  const { tag, author } = req.query;

  if (tag) articles = articles.filter(a => a.tags.includes(tag));
  if (author) articles = articles.filter(a => a.author === author);

  res.json(articles);
};

exports.getOne = (req, res) => {
  const articles = loadArticles();
  const article = articles.find(a => a.id == req.params.id);
  if (!article) return res.status(404).send('Not found');
  res.json(article);
};

exports.create = (req, res) => {
  const articles = loadArticles();
  const { title, tags, author } = req.body;

  if (!title || !tags || !author) return res.status(400).send('Invalid data');

  const id = Math.max(...articles.map(a => a.id), 0) + 1;
  const article = { id, title, tags, author };
  articles.push(article);
  saveArticles(articles);
  res.status(201).json(article);
};

exports.update = (req, res) => {
  const articles = loadArticles();
  const index = articles.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).send('Not found');

  articles[index] = { ...articles[index], ...req.body };
  saveArticles(articles);
  res.json(articles[index]);
};

exports.remove = (req, res) => {
  const articles = loadArticles();
  const index = articles.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).send('Not found');

  const deleted = articles.splice(index, 1);
  saveArticles(articles);
  res.json(deleted[0]);
};
