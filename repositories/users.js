const Contact = require('../model/user')

const findById = async (id)=>{
return await Contact.findById(id)
}

const findByEmail = async (email)=>{
    return await Contact.findOne({email})
}

const  create = async (body)=>{
    const user = new Contact(body)
    return await user.save()
}   

const updateToken = async (id, token) =>{
 return await Contact.updateOne({_id: id}, {token})   
}

module.exports = {
    findById,
    findByEmail,
    create,
    updateToken,
}