const Article = require('../models/Article');

// GET all
exports.getAll = async (req, res) => {
  const { tag, author } = req.query;
  const query = {};

  if (tag) query.tags = tag;
  if (author) query.author = author;

  const articles = await Article.find(query);
  res.json(articles);
};

// GET one
exports.getOne = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).send('Not found');
  res.json(article);
};

// POST create
exports.create = async (req, res) => {
  const { title, tags, author } = req.body;
  if (!title || !tags || !author) return res.status(400).send('Missing fields');

  const article = new Article({ title, tags, author });
  await article.save();
  res.status(201).json(article);
};

// PUT update
exports.update = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!article) return res.status(404).send('Not found');
  res.json(article);
};

// DELETE remove
exports.remove = async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) return res.status(404).send('Not found');
  res.json(article);
};
