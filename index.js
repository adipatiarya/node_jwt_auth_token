// Main start of app
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const cors = require('cors');

// DB setup
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/auth');

// App setup
app.use(morgan('combined', true));
app.use(cors());
app.use(bodyParser.json());
router(app);

// Server setup
const port = process.env.port || 8080;
app.listen(port);
console.log('Server listening on: ', port);
