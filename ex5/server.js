const express = require('express');
const app = express();
const articleRoutes = require('./routes/articleRoutes');

app.use(express.json());
app.use('/articles', articleRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
