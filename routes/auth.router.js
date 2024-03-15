const express = require('express');
const router = express.Router();

// Kullanıcı kayıt formu
router.get('/register', (req, res) => {
    // Kullanıcı kayıt formunu göster
});

// Kullanıcı kayıt işlemi
router.post('/register', (req, res) => {
    // Kullanıcıyı kaydet
});

// Kullanıcı giriş formu
router.get('/login', (req, res) => {
    // Kullanıcı giriş formunu göster
});

// Kullanıcı giriş işlemi
router.post('/login', (req, res) => {
    // Kullanıcı giriş yap
});

module.exports = router;
