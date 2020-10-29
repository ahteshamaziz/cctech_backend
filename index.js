const express = require('express');
const app = express();
const mongoose = require('mongoose')
const http = require('http');
const httpServer = http.createServer(app);
const image = require('./models/image');
const ObjectId = mongoose.Types.ObjectId;
var multer  = require('multer');
var cors = require('cors');
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')
var path = require('path');

 const loginRoutes = require('./routes/login.js');
 const imageRoutes = require('./routes/image.js');
//  app.use(cors());
//  app.options('*', cors())
app.use(cors({origin: [
  'http://localhost',
  "http://localhost:4200",
  "http://localhost:8100",
  "http://127.0.0.1:8081",
  'http:// 3.91.64.118',
  "http:// 3.91.64.118:4200",
  "http:// 3.91.64.118:8100",


 
  
], credentials: true}));

 app.use(loginRoutes);
app.use(imageRoutes);








aws.config.update({
    secretAccessKey:'AlJw9+5QrFxOVVl22f2t/49qw2NtzgFjNpHY5ev+',
    accessKeyId:'AKIAJYWLKZUTXDVSHC3A',
    region:'us-east-1'
})
    
        var s3 = new aws.S3()
        var upload = multer({
            storage: multerS3({
            s3: s3,
            bucket: 'cctech/img',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            metadata: function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
            },
            key: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
            }
            })
        })


        app.post('/images', upload.single('image'), (req, res, next) => {
            // Create a new image model and fill the properties
            // console.log(req.body);
          
            var newImage = new image();
            newImage.image_id =  mongoose.Types.ObjectId();
            newImage.img = req.file.location;
            newImage.date = new Date();
            newImage.name = req.body.name;
          
            newImage.save(err => {
                if (err) {
                    return res.sendStatus(400);
                }
                res.status(201).send({ newImage });
            });
          });

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

  app.use( express.static(path.join(__dirname + '/dist/photo-share')));






mongoose
  .connect(
  'mongodb://3.91.64.118:27017/cctech',
{ useUnifiedTopology: true,
  useNewUrlParser: true,
  useUnifiedTopology: true }
  )
  .then(result => {
    httpServer.listen(8080);
    console.log('Listening to port 8080')
  })
  .catch(err => {
    console.log(err);
  });


