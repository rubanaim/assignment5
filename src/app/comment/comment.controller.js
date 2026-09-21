
const commentService = require('./comment.service');

async function createComments(req, res, next){
    try{
        const {comments} = req.body;
        const result = await commentService.createComments(comments);

        res.status(201).json({
            message : "Comments created Successfully",
            success: true,
            data: result
        });
    }catch(error){
         next(error);
    }
}

async function updateCommentById(req, res,next){
    try{
      const {id} = req.params;
      const{userId, content} = req.body;
      const result = await commentService.updateCommentById(userId,id,content);
      res.status(201).json({
        message : "comment updated",
        success : true,
        data : result
      });
    }catch(error){
      next(error);
    }
}

async function findorcreateComment(req,res,next){
    try{
       const { postId, userId, content } = req.body;
       const comment = await commentService.findorcreateComment(postId, userId, content);
       res.status(201).json({
        success : true,
        data : comment
       })
    }catch(error){
    next(error);
    }
}

async function findCommentsWithSpecificWord(req,res,next){
    try{
       const word = req.query.word;
       const {count,comments} = await commentService.findCommentsWithSpecificWord(word);
       res.status(201).json({
        data : {
            count,
            comments
        }
       })
    }catch(error){
       next(error);
    }
}

async function getNewestComments(req,res,next){
    try{
      const {postId} = req.params;
      const comments = await commentService.getNewestComment(postId);
      res.status(201).json({
        comments
      })
    }catch(error){
       next(error)
    }
} 
async function getCommentWithUserPost(req,res,next){
    try{
      const {id} = req.params;
      const comment = await commentService.getCommentWithUserPost(id);
      res.status(201).json({
        comment
      })
    }catch(error){
       next(error)
    }
}

module.exports = {
    createComments,
    updateCommentById,
    findorcreateComment,
    findCommentsWithSpecificWord,
    getNewestComments,
    getCommentWithUserPost
};