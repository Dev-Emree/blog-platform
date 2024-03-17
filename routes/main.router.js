const express = require('express');
const router = express.Router();

const profilesRouter = require('./profiles.router');
const articlesRouter = require('./articles.router');
const authRouter = require('./auth.router');

router.use('/', profilesRouter);
router.use('/', articlesRouter);
router.use('/', authRouter);

module.exports = router;
