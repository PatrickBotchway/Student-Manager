const { addUser } = require('../services/authService');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        await addUser(name, email, password)
        return res.status(201).json({
            success: true,
            data: {
                name: name,
                email: email
            },
            message: 'User was created successfully'
        })
    }
    
    catch (err) {
        console.log(err);

        if (err.message = 'The email provided has already been used') {
            return res.status(409).json({
                success: false,
                message: err.message
            })
        }

        res.status(500).json({
            success: false,
            message: 'Error registering user'
        })
    }

}

module.exports = { registerUser }