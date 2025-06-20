require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
app.use(express.json());
app.use('/articles', articleRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
