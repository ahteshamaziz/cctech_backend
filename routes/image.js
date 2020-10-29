const express = require('express')
const routes =  express.Router();
const mongoose  = require('mongoose');
var multer  = require('multer')

// const auth = require('../Middleware/auh')
const image = require('../models/image');
const ObjectId = mongoose.Types.ObjectId;

const imageController = require('../controllers/image')









routes.get("/getimg",imageController.getimg)

module.exports = routes;