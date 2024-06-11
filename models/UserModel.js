/*
users model
 */

const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

// userSchema
const userSchema = new mongoose.Schema({
  username: {type: String, required: true}, // username
  password: {type: String, required: true}, // password
  phone: String,
  email: String,
  create_time: {type: Number, default: Date.now},
  role_id: String
})

//  define Model
const UserModel = mongoose.model('users', userSchema)

// default administrator: admin/admin
UserModel.findOne({username: 'admin'}).then(user => {
  if(!user) {
    UserModel.create({username: 'admin', password: md5('admin')})
            .then(user => {
              console.log('default: username: admin password: admin')
            })
  }
})


module.exports = UserModel