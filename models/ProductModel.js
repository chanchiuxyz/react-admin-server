/*
merchandise
 */
// mongoose
const mongoose = require('mongoose')

// Schema
const productSchema = new mongoose.Schema({
  categoryId: {type: String, required: true}, // categoryId
  pCategoryId: {type: String, required: true}, // paretCategoryId
  name: {type: String, required: true}, // name
  price: {type: Number, required: true}, // price
  desc: {type: String},
  status: {type: Number, default: 1}, // status: 1:onSell, 2: Off shelf
  imgs: {type: Array, default: []}, //imgs pics'name json string
  detail: {type: String}
})


//  Model
const ProductModel = mongoose.model('products', productSchema)

// exports
module.exports = ProductModel