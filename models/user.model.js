const { QUERY } = require('./query');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const createUser = async (username, email, phone_number, password) => {
    try {
        // UUID oluştur
        const userId = uuidv4();

        // Şifreyi hash'le
        const hashedPassword = await bcrypt.hash(password, 10);

        // Users tablosuna kullanıcıyı ekle
        const insertUserQuery = `
            INSERT INTO Users (id, username, created_at, updated_at)
            VALUES (?, ?, NOW(), NOW())
        `;
        const insertUserValues = [userId, username];
        await QUERY(insertUserQuery, insertUserValues);

        // User Auth tablosuna kullanıcı kimlik bilgilerini ekle
        const insertUserAuthQuery = `
            INSERT INTO UserAuth (id, email, phone_number, password, username)
            VALUES (?, ?, ?, ?, ?)
        `;
        const insertUserAuthValues = [userId, email, phone_number, hashedPassword, username];
        await QUERY(insertUserAuthQuery, insertUserAuthValues);

        // Oluşturulan kullanıcı nesnesini döndür
        return {
            id: userId,
            username: username,
            email: email,
            phone_number: phone_number
        };
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw new Error('Error creating user');
    }
};

module.exports = {
    createUser,
};
