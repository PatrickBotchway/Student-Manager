const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkEmail, create, findByEmail } = require('../models/authModel')

const addUser = async (name, email, password) => {
    const found = await checkEmail(email);
    if (found) {
        throw new Error('The email provided has already been used');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await create(name, email, hashedPassword);
}

const authUser = async (email, password) => {
    const found = await checkEmail(email);
    if (!found) {
        throw new Error('The email or password is incorrect');
    }

    const user = await findByEmail(email);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('The email or password is incorrect')
    }

    const token = jwt.sign({
        id: user.user_id,
        role: user.role
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}, 
        
    )
    return token;
}
module.exports = { addUser, authUser };
