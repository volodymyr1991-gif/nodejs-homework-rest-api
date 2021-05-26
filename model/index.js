const fs = require("fs/promises");
// const contacts = require("./contacts.json");
const readData = async () => {
 const data = await fs.readFile('./contacts.json', 'utf8');
  return JSON.parse(data)
};

const listContactsAll = async () => {
  return await readData()
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContactsAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
