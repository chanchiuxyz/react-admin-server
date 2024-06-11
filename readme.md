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
    console.error('connection err to DB', error)
  })




```