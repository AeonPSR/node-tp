const fs = require('fs');
const filter = process.argv[2];

fs.readFile('articles.json', 'utf-8', (err, data) => {
  if (err) throw err;
  const articles = JSON.parse(data);
  const filtered = articles.filter(a =>
    a.tags.includes(filter) || a.author === filter
  );
  console.log(filtered);
});
