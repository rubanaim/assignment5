
const express = require('express');
const postRouter = require('./app/post/post.route.js');
const authRouter = require('./app/auth/auth.route.js');
const userRouter = require('./app/user/user.route.js');
const commentRouter = require('./app/comment/comment.route.js');
const app = express();

//to parse req body to object
app.use(express.json());

//routes
app.use('/post', postRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/comment',commentRouter);

//globle error handler
app.use((err,req,res,next)=>{
    res.json({
        message : err.message,
        sucess:false,
        stack: err.stack //the error + where/how it happened
    })
})


app.listen(3000,()=> console.log('Server started on port 3000'));