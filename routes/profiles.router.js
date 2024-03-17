// routes/profiles.router.js
const express = require('express');
const router = express.Router();

// Kullanıcı profili
router.get('/:username', (req, res) => {
    // Belirli bir kullanıcının tüm makalelerini listele
    res.render("views/profile", {});
});

module.exports = router;
