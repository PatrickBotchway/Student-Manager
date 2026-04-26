const { addUser, authUser } = require('../services/authService');

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

        if (err.message === 'The email provided has already been used') {
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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authUser(email, password)

        res.status(200).json({
            success: true,
            data: {token: token},
            message: 'User authentication was successful. Token sent'
        })
    }

    catch (err) {
        console.log(err)

        if (err.message === 'The email or password is incorrect') {
            return res.status(401).json({
                success: false,
                message: err.message
            })
        }

        return res.status(500).json({
            success: false,
            message: 'Error logging user in'
        })
    }
}



module.exports = { registerUser, loginUser }