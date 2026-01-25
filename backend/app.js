const express     = require('express');
const cors        = require('cors');
const session     = require('express-session');
const userRoutes  = require('./routes/studentRoutes');
const app         = express();
const fs          = require('fs');
const path        = require('path')

app.use(express.json()); // parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // parses form data
// ✅ Middleware: always before routes
app.use(cors({
  origin: 'http://localhost:3001', // your React app
  credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// ✅ Session configuration
app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 } // 1 hour
}));

// ✅ Define routes
app.use('/', userRoutes);

// ✅ Start the server
app.listen(3000, () => {
  console.log('🚀 Node App running at http://localhost:3000');
});

module.exports = app;