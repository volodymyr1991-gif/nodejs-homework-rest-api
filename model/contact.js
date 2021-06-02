const { Schema, model } = require('mongoose');


const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      isFavorite: {
        type: Boolean,
        default: false,
      },
  
  comments: [{ body: String, date: Date }],
 
  }, 
  {
    versionKey: false, 
    timestapms: true, 
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true},
    transform: function (doc, ret ) {
      delete ret._id
      return ret
    }
  },
 
 );

 contactsSchema.virtual('info').get(function () {
  return `This is ${this.name} number phone ${this.phone} `
})

contactsSchema.path('name').validate( function (value ) {
  const re = /[A-Z]\w+/g
  return re.test(String(value))
})

 const Contact = model('contact', contactsSchema)

 module.exports = Contact