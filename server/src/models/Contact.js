const mongoose = require("mongoose");
const { Schema } = mongoose;
const contactSchema = new Schema({
  fullName:{
    type:String,
    required:true
  },
  email:{
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      immutable: true,
  },
  mobile:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
});
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;