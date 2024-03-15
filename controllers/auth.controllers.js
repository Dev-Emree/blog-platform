const { createUser } = require('../models/user.model');
const { QUERY } = require('../models/query');
const bcrypt = require('bcrypt');

/**
 * Kullanıcının giriş yapmasını sağlar
 * @param {String} identifier Kullanıcının giriş yapmak için kullandığı kimlik (telefon numarası, e-posta veya kullanıcı adı)
 * @param {String} password Kullanıcının şifresi
 * @returns {Object} Kullanıcının bilgilerini içeren nesne veya null
 */
const loginUser = async (identifier, password) => {
    try {
        // Kullanıcının kullandığı kimlik türünü belirle
        const identifierType = determineIdentifierType(identifier);

        // Kimlik türüne göre veritabanında arama yap
        let query, values;
        switch (identifierType) {
            case 'email':
                query = 'SELECT id FROM `User Auth` WHERE email = ?';
                values = [identifier];
                break;
            case 'phone':
                query = 'SELECT id FROM `User Auth` WHERE phone_number = ?';
                values = [identifier];
                break;
            case 'username':
                query = 'SELECT id FROM `User Auth` WHERE username = ?';
                values = [identifier];
                break;
            default:
                throw new Error('Invalid identifier type');
        }

        // Kullanıcıyı bul
        const [user] = await QUERY(query, values);

        // Kullanıcı yoksa veya şifre eşleşmiyorsa null döndür
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }

        // Kullanıcıyı döndür
        return {
            id: user.id
        };
    } catch (error) {
        console.error('Error logging in:', error.message);
        throw new Error('Error logging in');
    }
};

/**
 * Kullanıcının giriş yapmak için kullandığı kimlik türünü belirler
 * @param {String} identifier Kullanıcının giriş yapmak için kullandığı kimlik (telefon numarası, e-posta veya kullanıcı adı)
 * @returns {String} Kimlik türü ('phone', 'email' veya 'username')
 */
const determineIdentifierType = (identifier) => {
    // Eğer verilen kimlik bir e-posta adresine benziyorsa, 'email' olarak belirler
    if (identifier.includes('@')) {
        return 'email';
    }
    // Eğer verilen kimlik sadece sayılardan oluşuyorsa, 'phone' olarak belirler
    else if (/^\d+$/.test(identifier)) {
        return 'phone';
    }
    // Diğer durumlarda, 'username' olarak belirler
    else {
        return 'username';
    }
};

// Kullanıcı oluşturma işlemi
const registerUser = async (req, res) => {
    const { username, email, phone_number, password } = req.body;

    try {
        // Kullanıcıyı oluştur
        const newUser = await createUser(username, email, phone_number, password);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering user'
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};
