const express = require("express");
const router = express.Router();
const usersController = require('../../../controllers/users');
const connectWatch = require('../../../helpers/guard')
const validate = require("./validation");


router.post("/register", validate.createUser, usersController.create);
router.post("/login", usersController.login);
router.post("/logout", connectWatch, usersController.logout);
router.get("/current", connectWatch, usersController.current);

router.patch(
  "/sub",
  connectWatch,
  validate.updateSubscription,
  usersController.updateSubscription
);

module.exports = router; 

// const {
//   ValidationCreateContact,
//   validationUpdateContact,
//   validationUpdateStatusContact,
//   validateMongoId,
// } = require("./validation");

// router.post('/register',controllers.register);
// router.post('/login',controllers.login);
// router.post('/logout',guard ,controllers.logout);




