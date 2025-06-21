const fs = require('fs');
const arg = process.argv[2];

if (!arg) {
  console.log('Usage: node lecteur.js <tag>@<author>');
  process.exit(1);
}

const [tagFilter, authorFilter] = arg.split('@');

fs.readFile('articles.json', 'utf-8', (err, data) => {
  if (err) throw err;

  const articles = JSON.parse(data);
  const filtered = articles.filter(article => {
    const tagMatch = tagFilter ? article.tags.includes(tagFilter) : true;
    const authorMatch = authorFilter ? article.author === authorFilter : true;
    return tagMatch && authorMatch;
  });

  console.log(filtered);
});
