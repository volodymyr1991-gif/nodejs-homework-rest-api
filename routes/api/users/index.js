const express = require("express");
const router = express.Router();
const controllers = require('../../../controllers/users');

// const {
//   ValidationCreateContact,
//   validationUpdateContact,
//   validationUpdateStatusContact,
//   validateMongoId,
// } = require("./validation");

router.post('/register',controllers.register);
router.post('/login',controllers.login);
router.post('/logout',controllers.logout);



module.exports = router; 
