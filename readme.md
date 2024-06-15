# install
```
npm i express
npm i mongoose
npm i cookie-parser
npm i blueimp-md5
npm install --save multer
```

# server.js
```javascript
/*
startup module
1. express start the server
2. mongoose connect to DB
   start the server after connected the DB
3. middleware
 */
const mongoose = require('mongoose')
const express = require('express')
const app = express() 

// Serving static files in Express
app.use(express.static('public'))
// post requet middleware
app.use(express.urlencoded({extended: true})) // parameter: name=tom&pwd=123
app.use(express.json()) // parameter json: {name: tom, pwd: 123}
// decode cookie middleware
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// router middleware
const indexRouter = require('./routers')
app.use('/', indexRouter)  //

const fs = require('fs')

// mongoose connect to MongoDB
mongoose.connect('mongodb://localhost/server_db2')
  .then(() => {
    console.log('DB Connected!!!')
    app.listen('5000', () => {
      console.log('server is runing ,visit: http://localhost:5000')
    })
  })
  .catch(error => {
    console.error('connection  err to DB', error)
  })




```


## login
```
  router.post('/login', (req, res) => {
  console.log('login',req.body)
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)})
    .then(user => {
      if (user) { // success
        // generate cookie(userid: user._id)
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
        if (user.role_id) {
          RoleModel.findOne({_id: user.role_id})
            .then(role => {
              user._doc.role = role
              console.log('role user', user)
              res.send({status: 0, data: user})
            })
        } else {
          user._doc.role = {menus: []}
          res.send({status: 0, data: user})
        }

      } else {// failure
        res.send({status: 1, msg: 'username or password err!'})
      }
    })
    .catch(error => {
      console.error('error', error)
      res.send({status: 1, msg: 'login err, try again later'})
    })
})
```
## add catecary
```
  router.post('/manage/category/add', (req, res) => {
  console.log('ddd',req.body)
  const {categoryName, parentId} = req.body
  console.log(req.body)
  CategoryModel.create({name: categoryName, parentId: parentId || '0'})
    .then(category => {
      res.send({status: 0, data: category})
    })
    .catch(error => {
      console.error('add catecary', error)
      res.send({status: 1, msg: 'add catecary, try again'})
    })
})
```
## get category
```
router.get('/manage/category/list', (req, res) => {
  console.log('category:',req.body)
  const parentId = req.query.parentId || '0'
  CategoryModel.find({parentId})
    .then(categorys => {
      res.send({status: 0, data: categorys})
    })
    .catch(error => {
      console.error('get category err', error)
      res.send({status: 1, msg: 'get category err, try again'})
    })
})
```

## modify category
```
router.post('/manage/category/modify', (req, res) => {
  console.log('category:',req.body)
  const {categoryName, parentId} = req.body
  CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName})
    .then(oldCategory => {
      res.send({status: 0})
    })
    .catch(error => {
      console.error('modify category error', error)
      res.send({status: 1, msg: 'modify category error, try again'})
    })
})
```

