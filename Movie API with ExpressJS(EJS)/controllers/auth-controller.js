const UserLoginDTO = require('../models/users/userLogin');
const authService = require('../services/auth-service');

const loginUser = async (req, res) => {
    const userLoginDto = new UserLoginDTO(req.body);
    const result = await authService.loginUser(userLoginDto);

    if (!result.success) {
        if (result.message === 'User not found') {
            res.status(404).send('User not found');
        } else {
            res.status(400).json(result);
        }
    } else {
        res.render('indexNew');
    }
};

module.exports = { loginUser };
