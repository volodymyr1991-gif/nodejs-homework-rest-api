const { Schema, model } = require('mongoose');
const {Subscription} = require('../helpers/constans');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 8;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Enter password for a user'],
      },
      email: {
        type: String,
        required: [true, 'Enter email for a user'],
        unique: true,
      //  validate(value){
      //    const re = /\S+@\.S+/g
      //    return re.test(String(value).toLowerCase())
      //  }
      },
      subscription: {
        type: String,
        enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINES],
        default: Subscription.STARTER,
      },
      token: {
        type: String,
        default: null,
      },
 
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


userSchema.pre('save', async function (next) {
  if(this.isModified('password')){
const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
this.password= await bcrypt.hash(this.password, salt)
  }
next()
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

 const Contact = model('user', userSchema)

 module.exports = Contact