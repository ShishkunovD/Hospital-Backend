const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  login: String,
  password: String,
  reseptions: [{type: Types.ObjectId, ref: 'Reseption'}]
})

module.exports = model('User', schema);