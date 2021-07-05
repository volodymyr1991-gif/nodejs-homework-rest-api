const express = require("express");
const router = express.Router();
const connectWatch = require('../../../helpers/guard')
const contactsController = require("../../../controllers/contact");
// const passport = require('passport')


router.get("/", connectWatch, contactsController.getAllContacts);

router.get("/:contactId", connectWatch, contactsController.getById);

router.post("/", connectWatch, contactsController.createContact);

router.delete("/:contactId", connectWatch, contactsController.deleteContact);

router.patch("/:contactId", connectWatch, contactsController.patchContact);

module.exports = router;

// const {
//   ValidationCreateContact,
//   validationUpdateContact,
//   validationUpdateStatusContact,
//   validateMongoId,
// } = require("./validation");

// router.get("/", guard , controllers.listContactsAll).post("/", ValidationCreateContact, controllers.addContact);

// router
// .get("/:contactId", guard,validateMongoId, controllers.getContactById)
// .delete("/:contactId",guard,validateMongoId, controllers.removeContact)
// .put("/:contactId",guard,validateMongoId, validationUpdateContact, controllers.updateContact);

// router.patch(
//   "/:contactId/favorite",guard,
//   validationUpdateStatusContact,
//   controllers.updateContact
// );

// module.exports = router;
