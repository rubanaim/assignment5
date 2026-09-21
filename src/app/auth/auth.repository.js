
const prisma = require('../../../common/db/prisma');

async function checkUserExitByEmail(email){
    const user = await prisma.user.findUnique({
        where: {
            email : email
        }
    });
    return user; //object or null
}

async function saveUser(user){
    const createdUser = await prisma.user.create({
        data :{
            email : user.email,
            name : user.name,
            password : user.password,
            role: user.role
        },
        omit :{password:true} //retuens the user data without password
    })
    return createdUser;
}


module.exports={
    checkUserExitByEmail,
    saveUser
}