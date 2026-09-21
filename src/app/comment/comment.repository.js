
const prisma = require('../../../common/db/prisma');

//Create a bulk of Comments.
async function createComments(comments){
    const createdComments = await prisma.comment.createMany({
        data : comments

    });
  return createdComments;
}
//Update the content of a specific comment by its ID.
//1. find Comment By is
async function getComment(commentId){
    return await prisma.comment.findUnique({
        where :{
            id : Number(commentId)
        }
    });
    
}
//2.update
async function updateCommentById(commentId,content){
    const updatedComment = await prisma.comment.update({
        where : {
            id: Number(commentId)
        },
        data : {
            content 
        }
    });
    return updatedComment;
}

// find a comment for a specific post, user, and content. If the comment exists, return it, otherwise, create a new
//comment with the given details.
//find or create 
async function findComment(postId, userId, content){
    return await prisma.comment.findFirst({
        where: {
            postId : postId,
            userId : userId,
            content : content
        }
    });
}

async function createComment(postId, userId, content){
    return await prisma.comment.create({
        data:{
            postId,
            userId,
            content
        }
    })
}
//Retrieve all comments that contain a specific word in their content and return the number of comments matched
//(use find and count).
async function findCommentsWithSpecificWord(word){
    const count = await prisma.comment.count({
        where : {
            content : {
                contains : word
            }
        }
    });
    const comments = await prisma.comment.findMany({
        where : {
            content :{
                contains : word
            }
        }
    });

    return { count, comments}
}

//Retrieve the 3 most recent comments for a specific post,
// ordered by creation date.

async function getNewestComments(postId){
    const comments = prisma.comment.findMany({
        where :{
            postId : Number(postId)
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 3
    });
    return comments;
};

//Get Specific Comment By PK with User and Post Information.
async function getCommentWithUserPost(id){
  const comment = await prisma.comment.findUnique({
    where : {
        id : +(id)
    },
    include :{
        user : {
            omit:{
                password:true
            }
        },
        post: true
    }

  });
  return comment;
};



module.exports = {
    createComments,
    getComment,
    updateCommentById,
    findComment,
    createComment,
    findCommentsWithSpecificWord,
    getNewestComments,
    getCommentWithUserPost
};