/*
roles Model
 */
// mongoose
const mongoose = require('mongoose')

// Schema
const roleSchema = new mongoose.Schema({
  name: {type: String, required: true}, // role name
  auth_name: {type: String, default: ''}, // authorizer
  auth_time: {type: Number, default: null}, // authorize time
  create_time: {type: Number, default: Date.now}, // create time
  menus: {type: Array, default: []} // path array
})

// define Model
const RoleModel = mongoose.model('roles', roleSchema)

//  export Model
module.exports = RoleModel
