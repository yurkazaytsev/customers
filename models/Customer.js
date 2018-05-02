var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Customer = new Schema({
  customerID: {
    type: Number,
    index: true,
    unique: true,
    required: true},
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    }
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['m', 'w'],
    required: true
  },
  lastContact: {
    type: Date,
    default: null
  },
  customerLifetimeValue: {
    type: Number,
    default: 0
  }
},{
    collection: 'customers'
});

module.exports = mongoose.model('Customer', Customer);
