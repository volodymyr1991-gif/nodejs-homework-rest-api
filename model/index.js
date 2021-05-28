// const fs = require("fs/promises");
const fs = require("fs");
const { promises: fsPromise } = fs;
const path = require("path");
const { v4: uuid } = require("uuid");

const readData = async () => {
  const data = await fsPromise.readFile(
    path.join(__dirname, "contacts.json"),
    "utf-8"
  );
  return JSON.parse(data);
};

// Інший варіант

// async function listContactsAll() {
//   try {
//     const contacts = await fsPromise.readFile(
//       path.join(__dirname, "./contacts.json"),
//       "utf-8"
//     );
//     return JSON.parse(contacts);
//   } catch (err) {
//     errHandle(err);
//   }
// }

// всі наявні контакти

const listContactsAll = async () => {
  return await readData();
};

// пошук по id

const getContactById = async (contactId) => {
  const data = await readData();
  const [result] = data.filter((contacts) => contacts.id === contactId);

  return result;
};

// видалення по id

const removeContact = async (contactId) => {
  const data = await readData();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const result = data.splice(index, 1);
    await fsPromise.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(data)
    );
    return result;
  }
  // const result = await getContactById(contactId);
  // const newContacts = data.filter((contacts) => contacts.id !== contactId);
  // await fsPromise.writeFile(
  //   path.join(__dirname, "contacts.json"),
  //   JSON.stringify(newContacts)
  // );
  return null;
};

// додавання до колекції

const addContact = async (body) => {
  const id = uuid();
  const record = {
    id,
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };

  const data = await readData();
  data.push(record);
  await fsPromise.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(data)
  );
  return record;
};

// Зміна по id

const updateContact = async (contactId, body) => {
  const data = await readData();
  const [result] = data.filter((contacts) => contacts.id === contactId);
  if (result) {
    Object.assign(result, body);
    await fsPromise.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(data)
    );
  }
  return result;
};

module.exports = {
  listContactsAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
