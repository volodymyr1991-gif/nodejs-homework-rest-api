const { Schema, model,SchemaTypes } = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    subscription: {
      type: String,
      default: "free",
    },
    password: {
      type: String,
      default: "password",
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

module.exports = Contact;

// const contactsSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'Set name for contact'],
//       },
//       email: {
//         type: String,
//       },
//       phone: {
//         type: String,
//       },
//       subscription: {
//         type: String,
//         default: "free",
//       },
//       password: {
//         type: String,
//         default: "password",
//       },
//       owner: {
//         type: SchemaTypes.ObjectId,
//         ref: 'user',
//       },
  
//   comments: [{ body: String, date: Date }],
 
//   }, 
//   {
//     versionKey: false, 
//     timestapms: true, 
//     toJSON: {virtuals: true}, 
//     toObject: {virtuals: true},
//     transform: function (doc, ret ) {
//       delete ret._id
//       return ret
//     }
//   },
 
//  );

//  contactsSchema.virtual('info').get(function () {
//   return `This is ${this.name} number phone ${this.phone} `
// })

// contactsSchema.path('name').validate( function (value ) {
//   const re = /[A-Z]\w+/g
//   return re.test(String(value))
// })

//  const Contact = model('contact', contactsSchema)

//  module.exports = Contact