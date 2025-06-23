require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
app.use(express.json());

const logger = require('./middlewares/logger');
app.use(logger);

app.use('/articles', articleRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});


const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);
