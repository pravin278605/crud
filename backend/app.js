const express       = require('express');
const cors          = require('cors');
const session       = require('express-session');
const bodyParser    = require('body-parser');
const userRoutes    = require('./routes/studentRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(bodyParser.json());

app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 } // 1 hour

}));

app.use('/', userRoutes);

app.listen(3000, () => console.log('Node App running at http://localhost:3000'));

module.exports = app;
