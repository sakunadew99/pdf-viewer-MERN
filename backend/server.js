const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('./config/winston');
const morgan = require('morgan');

const dotenv = require('dotenv');


const app = express();

dotenv.config();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(morgan('combined', { stream: winston.stream }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pdfs', require('./routes/pdfs'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
