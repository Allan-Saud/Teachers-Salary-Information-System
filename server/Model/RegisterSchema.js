
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], 
    required: true
  },
  
  panNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return /^\d{10}$/.test(value); 
      },
      message: props => `${props.value} is not a valid PAN number!`
    }
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return /^\d{10}$/.test(value); 
      },
      message: props => `${props.value} is not a valid account number!`
    }
  },
  image: {
    type: String
  }
});

const register = mongoose.model("registers", registerSchema);
module.exports = register;



