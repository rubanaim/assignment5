
const postService = require('./post.service');

async function createPost(req,res,next){
    try{
       const {title,content,userId} = req.body;
      
       const createdPost = await postService.createPost(title,content,userId);
       res.status(201).json({
        message: "Post created sccessfylly",
        success: true,
        data :createPost
       })

    }catch(error){
        next(error);
    }
}

async function deletePost(req,res,next){
     try{
       const {id} = req.params;
       const userId = req.user.id;
       await postService.deletePost(Number(id), userId);

       res.status(200).json({
        message : "Post deleted successfully",
        success: true
       })
     }catch(error){
       next(error);
     }

}
 
async function retrieveAll(req,res,next){
  try{
     const {limit,offset} = req.query;
     const posts =await postService.retrieveAll(limit,offset);
     console.log(posts);
     
     res.status(201).json({
      posts
     })
  }catch(error){
    next(error);
  }


}

async function retrieveAllCount(req,res,next){
   try{
     const {limit,offset} = req.query;
     const posts = await postService.retrieveAllCount(limit,offset);
     res.status(201).json({
      posts
     })
   }catch(error){
    next(error);
   }
}

module.exports={
    createPost,
    deletePost,
    retrieveAll,
    retrieveAllCount
}