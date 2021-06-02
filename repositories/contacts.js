const Contact =require('../model/contact')

// всі наявні контакти

const listContactsAll = async () => {

  const results = await Contact.find({})
  return results;
};

// пошук по id

const getContactById = async (contactId) => {

  const results = await Contact.findOne({_id: contactId})
  return results
};

// видалення по id

const removeContact = async (contactId) => {

  const  result  = await Contact.findOneAndRemove(
    { _id: contactId },)
  return result
};

// додавання до колекції

const addContact = async (body) => {
const results = await Contact.create(body)
return results

};

// Зміна по id

const updateContact = async (contactId, body) => {

 const result  = await Contact.findOneAndUpdate(
   { _id: contactId },
  { ...body }, 
  { new: true },
 )
 return result
};

module.exports = {
  listContactsAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
