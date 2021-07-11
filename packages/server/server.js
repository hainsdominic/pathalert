const express = require('express');
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true);
}

// Load env variables
dotenv.config({ path: './config/config.env' });

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Enable CORS
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Prevent http param pollution
app.use(hpp());

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.green.bold
  )
);
