const http = require('http');
const fs = require('fs/promises');

http.createServer(async (req, res) => {
  try {
    const html = await fs.readFile('index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } catch (err) {
    res.writeHead(500);
    res.end('Erreur serveur');
  }
}).listen(3000);
