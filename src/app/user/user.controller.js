
const userService = require('./user.service');


async function upsertUser(req,res,next){
    try{
     const {id} = req.params;
      const { name, email,password,role}= req.body;
      const user = await userService.upsertUser({
        id,
        name,
        email,
        password,
        role
      });
 
      res.status(200).json({
        message : "User created or updated successfully"
      });

    }catch(error){
     next(error);
    }
}

async function getUserByEmail(req,res,next){
  try{
    const {email} = req.query;
    const user = await userService.getUserByEmail(email);

    res.status(200).json({
      user
    })
  }catch(error){
     next(error);
  }
}
async function getUserById(req,res,next){
  try{
    const {id} = req.params;
    const user = await userService.getUserById(id);

    res.status(200).json({
      user
    })
  }catch(error){
     next(error);
  }
}

module.exports={upsertUser,getUserByEmail,getUserById};