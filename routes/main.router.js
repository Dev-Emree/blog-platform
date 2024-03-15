const express = require('express');
const router = express.Router();

const articlesRouter = require('./articles.router');
const authRouter = require('./auth.router');

router.use('/articles', articlesRouter);
router.use('/auth', authRouter);

module.exports = router;
