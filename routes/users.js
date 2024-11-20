const express = require('express');

const router = express.Router();
const multer  = require('multer')
const db = require('../data/database');
const storageConfig = multer.diskStorage(
{
destination: function (req, file, cb) {
cb(null, 'images');
},
filename: function (req, file,cb) {
  cb(null, Date.now() + '-' + file.originalname);

}
}
);
const upload = multer({storage:storageConfig});

router.get('/',async function(req, res) {
  const allInfo= await db.getDb().collection('users').find({}, {_id:0}).toArray();
  res.render('profiles', {users : allInfo});
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});
router.post('/profiles',upload.single('image') ,async function(req, res){
const uploadedImage = req.file;
const userData = req.body;
await db.getDb().collection('users').insertOne({
  username: userData.username,
  userImagePath: uploadedImage.path 
});
 res.redirect('/');
}); 
module.exports = router;