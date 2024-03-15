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

const isProduction = process.env.NODE_ENV.toLowerCase() === 'production';

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err);
        if (isProduction) {
            process.exit(1);
        }
    } else {
        console.log('Veritabanı bağlantısı başarılı');
    }
});

app.use('/', mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
