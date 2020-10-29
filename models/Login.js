const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Login = new Schema({
    
    Login_id:{
        type: String
    },
    Username:{
        type: String
    },
    Password: {
      type: String
    }



});



module.exports = mongoose.model('Login', Login,'Login');
