const Contact =require('../model/contact')

// всі наявні контакти

const listContactsAll = async (userId,query) => {

  // const results = await Contact.find({owner:userId})
  const {
    sortBy,
    sortByDesc,
    filter,
    vaccinated = null,
    limit = 5,
    offset = 0,
  } = query

  console.log(
    '🚀 ~ file: cats.js ~ line 13 ~ getAll ~ vaccinated',
    typeof vaccinated,
  )
  const optionsSearch = { owner: userId }
  if (vaccinated !== null) {
    optionsSearch.isVaccinated = vaccinated
  }
  const results = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: { path: 'owner', select: 'email -_id' },
  })

  return results
};

// пошук по id

const getContactById = async (id,userId) => {

  const results = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'email -_id',
  })
  return results
};

// видалення по id

const removeContact = async (contactId,userId) => {

  const  result  = await Contact.findOneAndRemove(
    { _id: contactId },{owner:userId})
  return result
};

// додавання до колекції

const addContact = async (userId, body) => {
const results = await Contact.create({owner:userId, ...body})
return results

};

// Зміна по id

const updateContact = async (contactId,userId, body) => {

 const result  = await Contact.findOneAndUpdate(
   { _id: contactId,owner:userId },
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
