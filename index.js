require('dotenv').config();

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mysql = require('mysql');
const mainRouter = require('./routes/main.router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.set('view engine', 'ejs');


app.use('/', mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
