'use strict';

const express = require ('express');
const app = express();

const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');

const authRouter = require('./routes/auth');
const studentRouter = require('./routes/student');
const sportRouter = require('./routes/sport');

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(authRouter);
app.use(studentRouter);
app.use(sportRouter);

app.get ('/', (req, res, next) => {
  res.status(200).send('Welcome to the School-House-Talk server');
});

app.use('/*', notFound);
app.use(errorHandler);

function start () {
  app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
}

module.exports = {app, start};
