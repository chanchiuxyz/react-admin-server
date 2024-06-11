/*
categorys Model
 */

const mongoose = require('mongoose')

// Schema
const categorySchema = new mongoose.Schema({
  name: {type: String, required: true},
  parentId: {type: String, required: true, default: '0'}
})

// define Model
const CategoryModel = mongoose.model('categorys', categorySchema)

module.exports = CategoryModel