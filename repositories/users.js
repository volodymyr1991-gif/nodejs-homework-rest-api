const User = require('../model/user')

async function createUser(body) {
    const user = await User.create(body);
    return user;
  }
  
  async function findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }
  
  async function findById(id) {
    const user = await User.findOne({ _id: id });
    return user;
  }
  
  async function updateToken(id, token) {
    return await User.updateOne({ _id: id }, { token });
  }
  
  async function updateSubscription(id, subscription) {
    return await User.findByIdAndUpdate(
      { _id: id },
      { subscription },
      { new: true }
    );
  }
  
  async function updateAvatar(id, avatarURL) {
    return await User.findByIdAndUpdate(
      { _id: id },
      { avatarURL },
      { new: true }
    );
  }
  
  module.exports = {
    createUser,
    findByEmail,
    updateToken,
    findById,
    updateSubscription,
    updateAvatar,
  };

// const findById = async (id)=>{
// return await Contact.findById(id)
// }

// const findByEmail = async (email)=>{
//     return await Contact.findOne({email})
// }

// const  create = async (body)=>{
//     const user = new Contact(body)
//     return await user.save()
// }   

// const updateToken = async (id, token) =>{
//  return await Contact.updateOne({_id: id}, {token})   
// }

// module.exports = {
//     findById,
//     findByEmail,
//     create,
//     updateToken,
// }