require('express-async-errors');
const express = require('express');
const app = express();
const morgan = require("morgan");
const helment = require("helmet");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const connectDB = require('./database/db');

connectDB();

if (process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(helment());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const userRouter = require('./routes/users');
const quizRouter = require('./routes/quiz'); 

// map URL starts:
app.use('/users', userRouter); // all URLs will start with '/users'
app.use('/quiz', quizRouter); // all URLs will start with '/quiz'


/* app.use('/auth', auth); */

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

module.exports = app;