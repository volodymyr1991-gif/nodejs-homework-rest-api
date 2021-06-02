const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contact");

const {
  ValidationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validateMongoId,
} = require("./validation");

router.get("/", controllers.listContactsAll).post("/", ValidationCreateContact, controllers.addContact);

router
.get("/:contactId",validateMongoId, controllers.getContactById)
.delete("/:contactId",validateMongoId, controllers.removeContact)
.put("/:contactId",validateMongoId, validationUpdateContact, controllers.updateContact);

router.patch(
  "/:contactId/favorite",
  validationUpdateStatusContact,
  controllers.updateContact
);

module.exports = router;
