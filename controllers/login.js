
const user = require('../models/Login')
var crypto = require('crypto');
const mongoose  = require('mongoose');
var key = 'password';
var algo = 'aes256';

const jwt = require('jsonwebtoken');
jwtkey = 'jwt'


exports.postregister =(req, res)=>{
    var  username = req.body.username;
    var password = req.body.password;

    var cipher = crypto.createCipher(algo,key);
    var encrypted = cipher.update(password, 'utf8', 'hex')+cipher.final('hex');
    
    const data = new user({
        _id: mongoose.Types.ObjectId(),
        Login_id : mongoose.Types.ObjectId(),
        Username: username,
        Password : encrypted
    })

    data.save().then((result)=>{
       
        // jwt.sign({result},jwtkey,{expiresIn:'300s'},(err,token)=>{
        //     res.status(201).json({token})
        // })
                var results = {"result":"success"}
                res.status(200).json({results})

        // res.status(201).json(result)
    }).catch((err)=>console.log(err))
  
}


exports.postlogin = (req, res)=>{
      
 

    user.findOne({Username:req.body.username}).then((data)=>{
         console.log(data);
       if(!data){
        var result = {"result":"user not found"}
        res.status(200).json({result})
       }else{
        var decipher = crypto.createDecipher(algo,key);
        var decrypted = decipher.update(data.Password,'hex','utf8')+decipher.final('utf8');
     
        if(decrypted == req.body.password){
           
            // jwt.sign({data},jwtkey,{expiresIn:'300s'},(err,token)=>{
                var result = {"result":"success"}
                res.status(200).json({result})
            // })
        }else{
            var result = {"result":"unsuccess"}
            res.status(200).json({result})
        }
       }

        
   
    })


   
  } 
    


exports.getlogin = (req,res) => {
    user.find().then((result)=>{
        res.status(200).json(result)
    })
 }  