const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from:Number,
  to: Number,
  type:String,
  body: {type:String, default:''},
  imageUrl: {type:String, default:''},
  imageCaption: {type:String, default:''},
  voiceUrl: {type:String, default:''},
},{timestamps:true});

mongoose.model('Message', MessageSchema)

module.exports = mongoose.model('Message')
