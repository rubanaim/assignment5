
const userRepository = require('./user.repository');
const bcrypt = require('bcrypt');
async function upsertUser(user){
    const hashedPassword = await bcrypt.hash(user.password,10);

    const upsertedUser = await userRepository.upsertUser(
        {
            id: user.id,
           name: user.name,
           email: user.email,
          password : hashedPassword,
           role : user.role
        }
    );

    return upsertedUser;
}

async function getUserByEmail(email){
    const user = await userRepository.getUserByEmail(email);

    if(!user) throw new Error('no user found')

    return user;
}
async function getUserById(id){
    const user = await userRepository.getUserById(id);

    if(!user) throw new Error('no user found')

    return user;
}

module.exports={upsertUser,getUserByEmail,getUserById};