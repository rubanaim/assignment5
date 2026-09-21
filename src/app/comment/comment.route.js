
const {Router} = require('express');
const commentRouter = Router();

const commentController = require('./comment.controller');

commentRouter.post('/', commentController.createComments);
commentRouter.patch('/:id',commentController.updateCommentById);
commentRouter.post('/find-or-create',commentController.findorcreateComment);
commentRouter.get('/search',commentController.findCommentsWithSpecificWord);
commentRouter.get('/newest/:postId', commentController.getNewestComments);
commentRouter.get('/details/:id', commentController.getCommentWithUserPost);

module.exports = commentRouter;