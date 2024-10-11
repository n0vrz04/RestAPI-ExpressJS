const pool = require('../config/db')
const UserLoginDTO = require('../models/userLogin')
const { USERNAME_DOESNT_EXIST, USERNAME_DEACTIVE, PASSWORD_INCORRECT, USER_SUCCESSFULLY } = require('../utils/constants/userMessages')
const { ErrorResult, SuccessResult } = require('../utils/results/result')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userService = require('./user-service')
const AccessToken = require('../utils/auth/access-token')

/**
 * @param {UserLoginDTO} userLoginDto
 */

const loginUser = async(userLoginDto) =>{
    const userExists = await userService.getUserByUsername(userLoginDto.username)
    if(!userExists.data){
        return new ErrorResult(USERNAME_DOESNT_EXIST)
    }

    if(!userExists.data.isactive){
        return new ErrorResult(USERNAME_DEACTIVE)
    }

    const passwordCheck = await bcrypt.compare(userLoginDto.password,userExists.data.password)

    if(!passwordCheck){
        return new ErrorResult(PASSWORD_INCORRECT)
    }


    const token = await jwt.sign({username: userExists.data.username},process.env.JWT_SECRET_KEY,{expiresIn:'30d'})

    const expireDate = new Date()
    expireDate.setDate(expireDate.getDay()+30)
    const accessToken = new AccessToken(token,expireDate.toString())
    return new SuccessResult(USER_SUCCESSFULLY,accessToken)

}

module.exports = {
    loginUser
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5vdnJ1eiIsImlhdCI6MTcyMTEyNDE4OCwiZXhwIjoxNzIzNzE2MTg4fQ.-6lu3RzN1MBm0CLbN4WI0d9exeL79QYvDejHAs8GVgY