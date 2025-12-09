const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriberSchema = new Schema({
  email:{
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      immutable: true
  },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;
