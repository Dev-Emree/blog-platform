const express = require('express');
const router = express.Router();

// Makalelerin listelenmesi
router.get('/', (req, res) => {
    // Tüm makaleleri listele
});

// Makale detayı
router.get('/:id', (req, res) => {
    // Belirli bir makalenin detaylarını göster
});

// Makale oluşturma formu
router.get('/create', (req, res) => {
    // Makale oluşturma formunu göster
});

// Makale oluşturma işlemi
router.post('/create', (req, res) => {
    // Makaleyi oluştur
});

// Makale düzenleme formu
router.get('/:id/edit', (req, res) => {
    // Belirli bir makaleyi düzenleme formunu göster
});

// Makale güncelleme işlemi
router.put('/:id', (req, res) => {
    // Belirli bir makaleyi güncelle
});

module.exports = router;
