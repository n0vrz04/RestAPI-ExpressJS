const pool = require('../config/db')
const UserLoginDTO = require('../models/users/userLogin')
const { USERNAME_DOESNT_EXIST, USERNAME_DEACTIVE, PASSWORD_INCORRECT, USER_SUCCESSFULLY } = require('../utils/constants/userMessages')
const { ErrorResult, SuccessResult } = require('../utils/results/result')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userService = require('./user-service')
const AccessToken = require('../utils/auth/access-token')

/**
 * @param {UserLoginDTO} userLoginDto
 */



const loginUser = async (userLoginDto) => {
    try {
        const userResult = await userService.getUserByUsername(userLoginDto.username);
        
        if (!userResult.success || !userResult.data) {
            return new ErrorResult('User not found');
        }

        const user = userResult.data;
        const isPasswordValid = await bcrypt.compare(userLoginDto.password, user.password);

        if (!isPasswordValid) {
            return new ErrorResult('Invalid password');
        }

        return new SuccessResult('Login successful', user);
    } catch (error) {
        return new ErrorResult(error.message);
    }
};

module.exports = { loginUser };
