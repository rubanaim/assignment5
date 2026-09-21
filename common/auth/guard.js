//Check whether the request contains a valid JWT token. 
// If valid → allow the request to continue, If invalid → return an error.
const jwt = require('jsonwebtoken');

function authGuard(req,res,next){
      try{
         const authorization = req.headers.authorization;
         if(!authorization) throw new Error('unauthorized');
         const token =authorization.split(' ')[1]; //Barier-token
         const payload = jwt.verify(token, process.env.JWT_SECRET);
         req.user= payload; // the req doesn't contain user
         next();
      }catch(error){
        next(error);
      }
}

module.exports = authGuard;