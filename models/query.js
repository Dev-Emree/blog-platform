const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const QUERY = async (query, values = [], results=true) => {
    if (typeof query != "string" || typeof values != "object") {
        throw new Error("QUERY fonksiyonunda parametreler hatalı!");
    }
    try {
        const [results, fields] = await pool.execute(query, values);
        if (results) {
            return results;
        }
        return {
            results,
            fields,
        };
    } catch (e) {
        console.error("Error fetching data:", e.message);
        return false;
    }
};

module.exports = {
    QUERY,
};
