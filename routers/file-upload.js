/*
upload picture
 */
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const dirPath = path.join(__dirname, '..', 'public/upload')

const storage = multer.diskStorage({
  // destination: 'upload', //string, the server will create the folder
  destination: function (req, file, cb) { //function() need create folder manually
    // console.log('destination()', file)
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function (err) {
        if (err) {
          console.log(err)
        } else {
          cb(null, dirPath)
        }
      })
    } else {
      cb(null, dirPath)
    }
  },
  filename: function (req, file, cb) {
    // console.log('filename()', file)
    var ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})
const upload = multer({storage})
const uploadSingle = upload.single('image')

module.exports = function fileUpload(router) {

  // upload
  router.post('/manage/img/upload', (req, res) => {
    console.log(req.file)
    uploadSingle(req, res, function (err) { //handle err
      if (err) {
        return res.send({
          status: 1,
          msg: 'upload err'
        })
      }
      var file = req.file
      console.log(file)
      res.send({
        status: 0,
        data: {
          name: file.filename,
          url: 'http://localhost:5000/upload/' + file.filename
        }
      })

    })
  })

  // delete picture
  router.post('/manage/img/delete', (req, res) => {
    const {name} = req.body
    fs.unlink(path.join(dirPath, name), (err) => {
      if (err) {
        console.log(err)
        res.send({
          status: 1,
          msg: 'delete err'
        })
      } else {
        res.send({
          status: 0
        })
      }
    })
  })
}
