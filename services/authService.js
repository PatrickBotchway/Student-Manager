const bcrypt = require('bcrypt');
const { checkEmail, create } = require('../models/authModel')

const addUser = async (name, email, password) => {
    const found = await checkEmail(email);
    if (found) {
        throw new Error('The email provided has already been used');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await create(name, email, hashedPassword)
}

module.exports = { addUser };
