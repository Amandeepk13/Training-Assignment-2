require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const viewRoutes = require('./routes/viewRoutes');


const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', viewRoutes);
app.use('/api', userRoutes);
app.use('/api', classRoutes);

app.listen(3000, () => {
  console.log(`Server is running on 3000`);
});