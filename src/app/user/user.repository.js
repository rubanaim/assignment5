
const prisma = require('../../../common/db/prisma');

//2. Create or update based on PK -- id (upsert)
//upsert checks where conditin -- if id exists update -- if not create user
async function upsertUser(user){
    const result = await prisma.user.upsert({
        where: {
            id: Number(user.id)
        },
        update: {
            name : user.name,
            email: user.email,
            password: user.password,
            role : user.role
        },
         create: {
            id: Number(user.id),
            name: user.name,
            email: user.email,
            password: user.password,
            role : user.role
        },

        omit: {
            password : true
        }
    });
    return result;
}

//Write an API endpoint to find a user by their email address.
async function getUserByEmail(email){
const user = await prisma.user.findUnique({
    where : {email : email},
    omit : {password : true}
});
return user;
}

//Retrieve a user by their PK, excluding the “role” field from the response.
async function getUserById(id){
const user = await prisma.user.findUnique({
    where : {
        id:  Number(id)

    },
    omit : {password : true}
});
return user;
}

module.exports={upsertUser, getUserByEmail, getUserById};