const express = require("express");
const router = express.Router();
const Contacts = require("../../model");
const {
  ValidationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require("./validation");

router.get("/", async (req, res, next) => {
  const contacts = await Contacts.listContactsAll();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });

  // next(e);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "not found" });
  } catch (e) {
    next(e);
  }
});

router.post("/", ValidationCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contact } });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({ status: "error", code: 404, message: "not found" });
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", validationUpdateContact, async (req, res, next) => {
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
});

router.patch(
  "/:contactId/vaccinated",
  validationUpdateStatusContact,
  async (req, res, next) => {
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
  }
);

module.exports = router;
