
const {Router} = require('express');
const postRouter = Router();
const postController = require('./post.controller');
const authGuard = require('../../../common/auth/guard')

postRouter.post('/',authGuard,postController.createPost);
postRouter.delete('/:postId', authGuard, postController.deletePost);
postRouter.get('/details',postController.retrieveAll);
postRouter.get('/comment-count', postController.retrieveAllCount);

module.exports= postRouter;