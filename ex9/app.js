require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/articles', articleRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

module.exports = app;
