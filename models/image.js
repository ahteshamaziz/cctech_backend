const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Images = new Schema({
    
    image_id:{
        type: String
    },
    date:{
        type: String
    },
    img: {
      type: String
    },
    name:{
      type: String
    }



});



module.exports = mongoose.model('Images', Images,'Images');
