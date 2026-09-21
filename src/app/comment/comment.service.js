const commentRepository = require('./comment.repository');

async function createComments(comments){
    if(!comments || comments.length ==0 ) throw new Error("No comments to create");

    const createdComments = commentRepository.createComments(comments);
    if(!createdComments) throw new Error('something went wrong');

    return createdComments;

}

async function updateCommentById(userId, commentId, content){
    const comment = await commentRepository.getComment(commentId);
    if(!comment) throw new Error('comment not found');

    if(comment.id!=commentId) throw new Error('You are not authorized to update this comment');

    const updatedComment = await commentRepository.updateCommentById(commentId,content);
    return updatedComment;
}

async function findorcreateComment(postId, userId, content){
    //check comment exists
    const comment = await commentRepository.findComment(postId, userId, content);
   //if yes find if no create
    if(comment) return comment;
     
    //create comment
    return await commentRepository.createComment(postId, userId, content);
}

async function findCommentsWithSpecificWord(word){
    const {count, comments} = await commentRepository.findCommentsWithSpecificWord(word);
    if(!comments || count==0 ) throw new Error('no comments found');

    return {count,comments};
}

async function getNewestComment(postId){
    const comments = await commentRepository.getNewestComments(postId);
    return comments;
}

   
async function  getCommentWithUserPost(id){
    const comment = await commentRepository.getCommentWithUserPost(id);
    if(!comment) throw new Error('no comment found');
    return comment;
}

module.exports ={
    createComments,
    updateCommentById,
    findorcreateComment,
    findCommentsWithSpecificWord,
    getNewestComment,
    getCommentWithUserPost
};