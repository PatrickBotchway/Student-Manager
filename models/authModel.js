const db = require('../config/db');

const checkEmail = async (email) => {
    const [ rows ] = await db.execute('SELECT user_id FROM users WHERE email = ?', [ email ]);
    return rows[0];
}

const create = async (name, email, password) => {
    await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password])
}

module.exports = { checkEmail, create };