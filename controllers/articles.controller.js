// controllers/article.controller.js

import { QUERY } from '../models/query';

/**
 * Kullanıcı gönderilerini yükler
 * @param {String} identifier Kullanıcı kimliği veya kullanıcı adı
 * @param {String} type Kimlik türü: 'id' veya 'username'
 * @param {String} lastId Son makale kimliği
 * @param {Number} limit Yüklenecek makale sayısı
 * @returns {Object[]} Kullanıcının gönderilerini içeren dizi
 */
const loadUsersArticles = async (identifier, type = 'id', lastId = false, limit = 25) => {
    try {
        let query = `
        SELECT
            articles.title,
            articles.content,
            articles.created_at,
            articles.updated_at,
            users.profile_photo,
            users.username,
            users.name
        FROM
            articles
        JOIN
            users ON articles.user_id = users.id
        WHERE
    `;

        if (type === 'id') {
            query += ' users.id = ?';
        } else if (type === 'username') {
            query += ' users.username = ?';
        }

        let values = [identifier];

        if (lastId) {
            query += ' AND articles.id < ?';
            values.push(lastId);
        }

        query += ' ORDER BY articles.id DESC LIMIT ?';
        values.push(limit);

        const articles = await QUERY(query, values);

        return articles;
    } catch (error) {
        console.error('Error fetching user articles:', error.message);
        throw new Error('Error fetching user articles');
    }
};

export default {
    loadUsersArticles,
};
