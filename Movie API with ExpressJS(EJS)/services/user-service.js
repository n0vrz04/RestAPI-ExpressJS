const pool = require('../config/db')
const { DATA_GET_SUCCESSFULLY, DUPLICATE_USER, DATA_ADDED_SUCCESSFULLY, DATA_DELETED_SUCCESSFULLY, DATA_UPDATED_SUCCESSFULLY } = require('../utils/constants/messages')
const { SuccessResult, ErrorResult } = require('../utils/results/result')
const UserValidation = require('../validations/user')
const bcrypt = require('bcrypt')

const getAllUsers = async () =>{
    try {
        const res = await pool.query('select * from users u where u.deleted = 0')
        return new SuccessResult(DATA_GET_SUCCESSFULLY , res.rows)
    } catch (error) {
        return new ErrorResult(error.message)
    }
}

const getUserByUsername = async username => {
    try {
        const res = await pool.query('select * from users u where u.deleted = 0 and u.username = $1',[username])
        return new SuccessResult(DATA_GET_SUCCESSFULLY , res.rows[0])
    } catch (error) {
        return new ErrorResult(error.message)
    }
}

const getOneUser = async id =>{
    try {
        const res = await pool.query('select * from users u where u.deleted = 0 and u.id = $1',[id])
        return new SuccessResult(DATA_GET_SUCCESSFULLY , res.rows[0])
    } catch (error) {
        return new ErrorResult(error.message)
    }
}

const getUsersByActiveStatus = async status =>{
    try {
        const res = await pool.query('select * from users u where u.deleted = 0 and u.isactive = $1',[status])
        return new SuccessResult(DATA_GET_SUCCESSFULLY , res.rows)
    } catch (error) {
        return new ErrorResult(error.message)
    }
}

const getOneUserByActiveStatus = async (id,status) =>{
    try {
        const res = await pool.query('select * from users u where u.deleted = 0 and u.id = $1 and u.isactive = $2',[id,status])
        return new SuccessResult(DATA_GET_SUCCESSFULLY , res.rows[0])
    } catch (error) {
        return new ErrorResult(error.message)
    }
}

const addUser = async user =>{
    try {
        const validator = new UserValidation(user)
        const validationResult = validator.validate()

        if(!validationResult.isValid){
            return new ErrorResult(validationResult.toString())
        }
        const businessResult = await checkDuplicateUser(user)
        if(!businessResult.success){
            return businessResult
        }

        user.password = await bcrypt.hash(user.password,10)
        const res = pool.query('insert into users (username,password,isactive) values($1,$2,$3)',[user.username,user.password,user.isactive])
        const addedUser = await getUserByUsername(user.username)
        return new SuccessResult(DATA_ADDED_SUCCESSFULLY,addedUser.data)

    } catch (error) {
        console.error("Error in addUser:", error);
        return new ErrorResult(error.message)
    }
}

const updateUser = async user =>{
    try {
        const res = await pool.query('update users set username = $2,password = $3,isactive = $4 where id=$1 returning *',
            [user.id,user.username,user.password,user.isactive])
        return new SuccessResult(DATA_UPDATED_SUCCESSFULLY,res.rows[0])
    } catch (error) {
        return new ErrorResult(error.message)
    }
}

const deleteUser = async id =>{
    try {
        const res = await pool.query('delete from users where id = $1 returning *',[id])
        return new SuccessResult(DATA_DELETED_SUCCESSFULLY,res.rows[0])

    } catch (error) {
        return new ErrorResult(error.message)
    }
}

const checkDuplicateUser = async user =>{
    const isExistingUser = await getUserByUsername(user.username)
    if(isExistingUser.data){
        return new ErrorResult(DUPLICATE_USER)
    }
    return new SuccessResult()
}

module.exports = {
    getAllUsers,
    getOneUser,
    getOneUserByActiveStatus,
    getUsersByActiveStatus,
    getUserByUsername,
    addUser,
    updateUser,
    deleteUser
}
