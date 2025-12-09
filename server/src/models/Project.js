const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
});
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
