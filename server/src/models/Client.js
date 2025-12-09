const mongoose = require("mongoose");
const { Schema } = mongoose;
const clientSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  designation:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
});
const Client = mongoose.model('Client', clientSchema);
module.exports = Client;

