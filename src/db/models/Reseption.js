const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  name: String,
  doctor: String,
  data: Date,
  complaints: String,
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Reseption', schema);