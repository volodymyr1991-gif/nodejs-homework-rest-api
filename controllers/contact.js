
const Contacts = require('../repositories/contacts');

async function getAllContacts(req, res, next) {
  try {
    const userId = req.user.id;

    const contacts = await Contacts.listContacts(userId, req.query);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(req.params.id, userId);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
}

async function createContact(req, res, next) {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
}

async function deleteContact(req, res, next) {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(req.params.id, userId);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
}

async function patchContact(req, res, next) {
  try {
    const userId = req.user.id;

    const contact = await Contacts.updateContact(
      req.params.id,
      req.body,
      userId
    );

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAllContacts,
  getById,
  createContact,
  deleteContact,
  patchContact,
};


// const listContactsAll = async (req, res, next) => {
//   console.log('Hi')
//   try {
//     const userId = req.user.id
//     const contact = await Contacts.listContactsAll(userId, req.query)
//     return res.json({ status: 'success', code: 200, data: { contact } })
//   } catch (e) {
//     next(e)
//   }
  
//     // next(e);
//   };
  
//   const getContactById = async (req, res, next) => {
  
//     try {
//       const userId = req.user.id
//       const contact = await Contacts.getContactById(userId,req.params.contactId);
//       if (contact) {
//   console.log(contact);
//         return res.json({ status: "success", code: 200, data: { contact } });
//       }
//       return res.json({ status: "error", code: 404, message: "not found" });
//     } catch (e) {
//       next(e);
//     }
//   };
  
//   const  addContact = async (req, res, next) => {
//     try {
//       const userId = req.user.id
//       const contact = await Contacts.addContact(userId,req.body);
//       return res
//         .status(201)
//         .json({ status: "success", code: 201, data: { contact } });
//     } catch (e) {
//       if(e.name === 'ValidationError'){
//   e.status = 400
//       }
//       next(e);
//     }
//   };
  
//  const removeContact = async (req, res, next) => {
//     try {
//       const userId = req.user.id
//       const contact = await Contacts.removeContact(userId,req.params.contactId);
//       if (contact) {
  
//         return res.json({ status: "success", code: 200, data: { contact } });
//       }
//       return res.json({ status: "error", code: 404, message: "not found" });
//     } catch (e) {
//       next(e);
//     }
//   };
  
//  const updateContact = async (req, res, next) => {
//     try {
//       const userId = req.user.id
//       const contact = await Contacts.updateContact(
//         userId,
//         req.params.contactId,
//         req.body
//       );
//       if (contact) {
//         return res.json({ status: "success", code: 200, data: { contact } });
//       }
//       return res.json({ status: "error", code: 404, message: "not found" });
//     } catch (e) {
//       next(e);
//     }
//   };
  
//   module.exports = {
//       listContactsAll,
//       getContactById,
//       addContact,
//       removeContact,
//       updateContact,
//   }
//   router.patch(
//     "/:contactId/favorite",
//     validationUpdateStatusContact,
//     async (req, res, next) => {
//       try {
//         const contact = await Contacts.updateContact(
//           req.params.contactId,
//           req.body
//         );
//         if (contact) {
//           return res.json({ status: "success", code: 200, data: { contact } });
//         }
//         return res.json({ status: "error", code: 404, message: "not found" });
//       } catch (e) {
//         next(e);
//       }
//     }
//   );