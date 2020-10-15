const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');

const itemsRoutes = require('./routes/items.routes');
const usersRoutes = require('./routes/users.routes');
const auth = require('./middleware/auth')

const app = express();

/* MIDDLEWARE */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', itemsRoutes);
app.use('/api', auth.jwtCheck, usersRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

/* MONGOOSE */
const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.MDBUser}:${process.env.MDBPassword}@cluster0-utnpw.mongodb.net/NewShop?retryWrites=true&w=majority` : 'mongodb://localhost:27017/test_DB';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
