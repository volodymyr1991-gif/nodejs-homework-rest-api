const User = require('../model/user')

const findById = async (id)=>{
return await User.FindById({id})
}

const findByEmail = async (email)=>{
    return await User.FindOne({email})
}

const  create = async (body)=>{
    const user = new User(body)
    return await user.save()
}   

const updateToken = async (id, token) =>{
 return await User.updateOne({_id: id}, {token})   
}

module.exports = {
    findById,
    findByEmail,
    create,
    updateToken,
}