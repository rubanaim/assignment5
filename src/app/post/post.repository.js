
const prisma = require('../../../common/db/prisma');

//Create new Post (using new instance and save)
//  (Get the post data from the body).
async function createPost(title, content,userId){
    const post = await prisma.post.create({
        data: {
            title:title,
            content:content,
            userId: userId
        }
    })
    return post;
}

//Delete a post by its id (Ensure that only the owner of the post can perform this action)
async function findPostById(postId){
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    return post;
}

async function deletePost(postId){
    return await prisma.post.delete({
        where: {
            id : postId
        }
    });
}

//Retrieve all posts, including the details of the user who created each post and the associated comments. (Show
//only for the post the “id, title”, and for user “id, name”, and for the comments “id, content”)
//limit-->take     offset-->skip
//what difference between include(get normal files of the main model plus plus related data)
// select(choose exactly which fields you want to return, including field from relations)
async function retrieveAll(limit,offset){
   const posts = await prisma.post.findMany({
    take : +(limit),
    skip : +(offset),
    select:{
        id: true,
        title: true,
        user:{
            select:{
                id: true,
                name: true
            }
        },
        comments:{
            select:{
                id: true,
                content: true
            }
        }
    }
   });
   return posts;
}
// Retrieve all posts and count the number of comments associated with each post.
//_count is special Prisma keyword for counting related records
async function retrieveAllCount(limit,offset){
    const posts = await prisma.post.findMany({
        take: +(limit),
        skip: +(offset),
        select :{
            id: true,
            title: true,
            _count :{
                select : {
                    comments: true
                }
            }
        }
    });
    return posts;
}

module.exports ={
    createPost,
    findPostById,
    deletePost,
    retrieveAll,
    retrieveAllCount
}