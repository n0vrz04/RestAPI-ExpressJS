const userController = require('../controllers/user-controller')

const express = require('express')
const router = express.Router()

router.get('/', userController.getUserView);
router.get('/add', userController.getUserAddView);
router.post('/add',userController.addUser);
router.get('/:id/edit', userController.getUserUpdateView);
router.put('/:id', userController.updateUser); 
router.delete('/:id', userController.deleteUser); 


module.exports = router