const mongoose = require('mongoose');
const image = require('../models/image');
const ObjectId = mongoose.Types.ObjectId;



exports.getimg = (req,res) => {
     image.find().then((result)=>{
         res.status(200).json(result)
     })
  }   