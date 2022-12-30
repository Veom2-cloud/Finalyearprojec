const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
  
    username: {
      type: String,
      require,
    },
    email: {type: String , require},
    userId : {type: String , require},
    instruction: {
      type: String,
      require
    },
    ispaid: {
      type: Boolean,
      require: true,
      default: false
    },
    pages: {
      type: Number,
      required: true,
      trim: true
    },
    copies: {
      type: Number,
      required: true,
      trim: true
    },
  
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    },
    date: {type: String , require},
    time: {type:String , require},
    updatedTime : {type: String , require},
    extratime: {type: String,require},
    isDelivered : {type: Boolean , require:true , default: false},
    otp:{ type: String, required: true},


  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;