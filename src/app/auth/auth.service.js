
const authRepository = require('./auth.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//register + login 

//1.register : check email exists --> yes -->throw error
//           --> No-->hash password --> save user to db --> return user

async function register(email,password,name){
    //1.check user exists
    const userExists = await authRepository.checkUserExitByEmail(email);
    //2.if yes - throw error
    if(userExists) throw new Error('Email already exists');
    //3. hash password
    const hashedPassword = await bcrypt.hash(password,10);
    //4. save user to database
    const createdUser = await authRepository.saveUser({
        email : email,
        password : hashedPassword,
        name : name
    });
    ///5.check returned user
    if(!createdUser) throw new Error('Fail to create new user');
    //6. return user
    return createdUser;
}

//2.login --> check user exists --> if no --> throw error 
// --> if yes --> compare password --> generate access token -->return token

async function login(email,password){
     //1. check user exists 
     const userExists = await authRepository.checkUserExitByEmail(email);
     if(!userExists) throw new Error('invalid email or password');
     //2.compare password
     const isMatch = await bcrypt.compare(password,userExists.password);
     if(!isMatch) throw new Error('invalid email or password');
     //3.generate token
     const accessToken = jwt.sign(
        //payload
        {id: userExists.id, name : userExists.name, role: userExists.role},
        //secret
        process.env.JWT_SECRET,
        //options
        {expiresIn: '1d'}
     )

    //return token
    return accessToken;
}

module.exports= {register,login};