
const postRepository = require('./post.repository');

async function createPost(title, content, userId){
    //1.create new post 
    const createdPost = await postRepository.createPost(title, content, userId);
    if(!createdPost){
        throw new Error('Failed to create post');
    }
    //2. return post-data
    return createdPost;
}

async function deletePost(postId,userId){
    //1. check post id
    const post = await postRepository.findPostById(postId);
    //2. if no --> throw error
    if(!post) throw new Error('Post Not Found');
    //3.check userId
    if(post.userId!=userId) throw new Error('You are not authorized to delete this post');
    //4.return deleted post
    return await postRepository.deletePost(postId);
}

async function retrieveAll(limit,offset){
  const posts = await postRepository.retrieveAll(limit,offset);
  if(!posts) throw new Error('no posts');
  return posts;
}

async function retrieveAllCount(limit,offset){
    const posts = await postRepository.retrieveAllCount(limit,offset);
    if(!posts) throw new Error('no posts');
     return posts.map(post=>({
        id : post.id,
        title: post.title,
        commetCount: post._count.comments
     }));
}

module.exports={
    createPost,
    deletePost,
    retrieveAll,
    retrieveAllCount
}