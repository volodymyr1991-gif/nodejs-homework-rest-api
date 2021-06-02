const Contacts = require('../repositories/contacts');

const listContactsAll = async (req, res, next) => {
    const contacts = await Contacts.listContactsAll();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  
    // next(e);
  };
  
  const getContactById = async (req, res, next) => {
    try {
      const contact = await Contacts.getContactById(req.params.contactId);
      if (contact) {
  console.log(contact);
        return res.json({ status: "success", code: 200, data: { contact } });
      }
      return res.json({ status: "error", code: 404, message: "not found" });
    } catch (e) {
      next(e);
    }
  };
  
  const  addContact = async (req, res, next) => {
    try {
      const contact = await Contacts.addContact(req.body);
      return res
        .status(201)
        .json({ status: "success", code: 201, data: { contact } });
    } catch (e) {
      if(e.name === 'ValidationError'){
  e.status = 400
      }
      next(e);
    }
  };
  
 const removeContact = async (req, res, next) => {
    try {
      const contact = await Contacts.removeContact(req.params.contactId);
      if (contact) {
  
        return res.json({ status: "success", code: 200, data: { contact } });
      }
      return res.json({ status: "error", code: 404, message: "not found" });
    } catch (e) {
      next(e);
    }
  };
  
 const updateContact = async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        return res.json({ status: "success", code: 200, data: { contact } });
      }
      return res.json({ status: "error", code: 404, message: "not found" });
    } catch (e) {
      next(e);
    }
  };
  
  module.exports = {
      listContactsAll,
      getContactById,
      addContact,
      removeContact,
      updateContact,
  }
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