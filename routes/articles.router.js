// routes/articles.router.js
const express = require('express');
const router = express.Router();
const { loadUsersArticles, loadArticle } = require("../controllers/articles.controller");

// Profildeki postları devamlı olarak çekmek için
router.post('/:username/:article_id', async (req, res) => {
    var articles = await loadUsersArticles(
        identifier = req.params.username,
        type = 'username',
    );

    // DEBUG
    console.log(articles);

    res.json(articles);
});

// Makale detayı
router.get('/:username/article/:article_id', async (req, res) => {
    // Belirli bir kullanıcının belirli bir makalesinin detaylarını göster
    var article = await loadArticle(
        req.params.article_id,
        req.params.username
    );

    // DEBUG
    console.log(article);

    res.render("", {article});
});

// Makale oluşturma formu
router.get('/create', (req, res) => {
    // Makale oluşturma formunu göster
});

// Makale oluşturma işlemi
router.post('/:username/create', (req, res) => {
    // Belirli bir kullanıcı için makale oluştur
});

// Makale düzenleme formu
router.get('/:username/:id/edit', (req, res) => {
    // Belirli bir kullanıcının belirli bir makalesini düzenleme formunu göster
});

// Makale güncelleme işlemi
router.put('/:username/:id', (req, res) => {
    // Belirli bir kullanıcının belirli bir makalesini güncelle
});

module.exports = router;
