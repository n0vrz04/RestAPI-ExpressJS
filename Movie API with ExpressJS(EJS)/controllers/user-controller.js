const UserAddDTO = require('../models/users/userAdd')
const UserUpdateDTO = require('../models/users/userUpdate')
const userService = require('../services/user-service')



const getUserView = async (req, res) => {
    const result = await userService.getAllUsers();
    if (result.success) {
        res.render('users/index', { data: result.data });
    } else {
        res.render('users/index');
    }
};

const getUserAddView = async (req, res) => {
    res.render('users/addUser');
};

const getUserUpdateView = async (req, res) => {
    const id = req.params.id;
    const result = await userService.getOneUser(id);
    if (result.success) {
        res.render('users/updateUser', { user: result.data });
    } else {
        res.status(404).send('User not found');
    }
};

const addUser = async (req, res) => {
    const userAddDto = new UserAddDTO(req.body);
    const result = await userService.addUser(userAddDto);
    if (result.success) {
        res.redirect('/users');
    } else {
        res.status(400).send('Failed to add user');
    }
};

const updateUser = async (req, res) => {
    const userUpdateDto = new UserUpdateDTO(req.body);
    userUpdateDto.id = req.params.id;
    const result = await userService.updateUser(userUpdateDto);
    if (result.success) {
        res.redirect('/users');
    } else {
        res.status(400).send('Failed to update user');
    }
};

const deleteUser = async (req, res) => {
    const result = await userService.deleteUser(req.params.id);
    if (result.success) {
        res.redirect('/users');
    } else {
        res.status(404).send('User not found');
    }
};

module.exports = {
    addUser,
    getUserView,
    getUserAddView,
    getUserUpdateView,
    updateUser,
    deleteUser
}

