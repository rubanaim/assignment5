
const authService = require('./auth.service');

async function register(req,res,next){
    try{
      const {name,email,password}=req.body;
      const createdUser = await authService.register(email,password,name);
      return res.status(201).json({
        message :'User created successfully',
        success: true,
        data: createdUser
      })
    }catch(error){
       next(error); //remember this goes to global error handller
    }
}

async function login(req,res,next) {
    try{
       const {email,password} = req.body;
       const token = await authService.login(email,password);
       return res.status(200).json({
        message: "User Login Successfully",
        success: true,
        data: token
       })
    }catch(error){
      next(error); //remember this goes to global error handller
    }
}

module.exports={register,login};