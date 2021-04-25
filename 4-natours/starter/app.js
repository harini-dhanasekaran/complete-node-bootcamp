const express = require('express');
const morgan = require('morgan'); //to get info about status and routes
const app = express();

//middleware for getting additonal information
app.use(morgan('dev')); // can also use tiny
app.use(express.json()); //used to get body of the reqest body parser

//user defined middleware
app.use((req, res, next) =>{
  req.reqestTime= new Date().toISOString();
  next();
});

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//middleware for routing
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
