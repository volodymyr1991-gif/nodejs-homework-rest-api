const express = require("express");
const router = express.Router();
const controllers = require("../../../controllers/contact");
const guard = require('../../../helpers/guard')
// const passport = require('passport')

const {
  ValidationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validateMongoId,
} = require("./validation");

router.get("/", guard , controllers.listContactsAll).post("/", ValidationCreateContact, controllers.addContact);

router
.get("/:contactId", guard,validateMongoId, controllers.getContactById)
.delete("/:contactId",guard,validateMongoId, controllers.removeContact)
.put("/:contactId",guard,validateMongoId, validationUpdateContact, controllers.updateContact);

router.patch(
  "/:contactId/favorite",guard,
  validationUpdateStatusContact,
  controllers.updateContact
);

module.exports = router;
