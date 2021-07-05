const Joi = require("joi");

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/\S+@\S+\.\S+/)
    .required(),
  password: Joi.string().required(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string().valid("free", "pro", "premium"),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Field ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.createUser = (req, _res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

module.exports.updateSubscription = (req, _res, next) => {
  return validate(schemaUpdateSubscription, req.body, next);
};


// const mongoose = require('mongoose')

// const schemaCreateContact = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).required(),

//   phone: Joi.number().integer().required(),

//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     })
//     .required(), 
//   isFavorite: Joi.boolean().optional(),
// });

// const schemaUpdateContact = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).optional(),

//   phone: Joi.number().integer().min(5).max(11).optional(),

//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     })
//     .required(),
//   isFavorite: Joi.boolean().optional(),
// }).or("name", "phone", "email", "isFavorite");

// const schemaUpdateStatusContact = Joi.object({
//   isFavorite: Joi.boolean().optional(),
// });

// const validate = async (schema, obj, next) => {
//   try {
//     await schema.validateAsync(obj);
//     next();
//   } catch (err) {
//     next({
//       status: 400,
//       message: err.message.replace(/"/g, ""),
//     });
//   }
// };

// module.exports = {
//   ValidationCreateContact: (req, res, next) => {
//     return validate(schemaCreateContact, req.body, next);
//   },
//   validationUpdateContact: (req, res, next) => {
//     return validate(schemaUpdateContact, req.body, next);
//   },
//   validationUpdateStatusContact: (req, res, next) => {
//     return validate(schemaUpdateStatusContact, req.body, next);
//   },
//   validateMongoId: (req, res, next)=>{
//     if(!mongoose.Types.ObjectId.isValid(req.params.contactId)){
//       return next({
//         status: 400,
//         messages: 'Invalid object id'
//       })
//     }
//     next()
//   }
// };

// Also -
