const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const classSchema = new mongoose.Schema({
  name: {type: String, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  uuid: {type: String, default: uuidv4, unique: true},

  rows: [ 
    {
      rowName: String,
      flag : Boolean
    }
  ]
  
});

module.exports = mongoose.model('Class', classSchema);