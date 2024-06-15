/*
Router module
 */
const express = require('express')
// md5 encryption
const md5 = require('blueimp-md5')
// MongoDB model
const UserModel = require('../models/UserModel')
const CategoryModel = require('../models/CategoryModel')
// const ProductModel = require('../models/ProductModel')
// const RoleModel = require('../models/RoleModel')


// router
const router = express.Router()
// console.log('router', router)


const filter = {password: 0, __v: 0}


// login
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

// add catecary
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

// get category
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


// modify category
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

/*
divide pages
 */
function pageFilter(arr, pageNum, pageSize) {
  pageNum = pageNum * 1
  pageSize = pageSize * 1
  const total = arr.length
  const pages = Math.floor((total + pageSize - 1) / pageSize)
  const start = pageSize * (pageNum - 1)
  const end = start + pageSize <= total ? start + pageSize : total
  const list = []
  for (var i = start; i < end; i++) {
    list.push(arr[i])
  }

  return {
    pageNum,
    total,
    pages,
    pageSize,
    list
  }
}



module.exports = router