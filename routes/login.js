const express = require('express')
const routes =  express.Router();
// const auth = require('../Middleware/auh')
var bodyPaser = require('body-parser');
var jsonParser = bodyPaser.json();
const loginController = require('../controllers/login');
const { JsonWebTokenError } = require('jsonwebtoken');


routes.post("/postregister",jsonParser,loginController.postregister);
routes.post("/postlogIn",jsonParser,loginController.postlogin)

routes.get("/getlogin",verifyToken,loginController.getlogin)



function verifyToken(req,res,next){
    const bearerHeader = req.header['authorization'];

     if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        req.token = bearer[1];
    
        jwt.verify(req.token,jwtkey,(err,authData)=>{
            if(err){
                res.json({result:err})
            }else{
                 next();
            }
        }) 
     }else{
         res.send({"result":"Token not provided"})
     }

   
}

module.exports = routes;