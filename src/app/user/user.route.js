const {Router} = require('express');
const userRouter = Router();
const userController = require('./user.controller');
const authGuard = require('../../../common/auth/guard');

userRouter.put('/:id',  userController.upsertUser);
userRouter.get('/by-email', userController.getUserByEmail);
userRouter.get('/:id', userController.getUserById);

module.exports=userRouter;