/*
Router module
 */
const express = require('express')
// md5 encryption
const md5 = require('blueimp-md5')
// MongoDB model
const UserModel = require('../models/UserModel')
const CategoryModel = require('../models/CategoryModel')
const ProductModel = require('../models/ProductModel')
const RoleModel = require('../models/RoleModel')


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

// add user
router.post('/manage/user/add', (req, res) => {
  // get the parameter of req
  const {username, password} = req.body
  // check user  existed or not
  UserModel.findOne({username})
    .then(user => {
      // if exist
      if (user) {
        res.send({status: 1, msg: 'user existed'})
        return new Promise(() => {
        })
      } else { // not exist
        // save
        return UserModel.create({...req.body, password: md5(password || 'chan')})
      }
    })
    .then(user => {
      res.send({status: 0, data: user})
    })
    .catch(error => {
      console.error('register err', error)
      res.send({status: 1, msg: 'register err'})
    })
})


// update user
router.post('/manage/user/update', (req, res) => {
  const user = req.body
  user.password = md5(user.password || 'chan')
  UserModel.findOneAndUpdate({_id: user._id}, user)
    .then(oldUser => {
      const data = Object.assign(oldUser, user)
      res.send({status: 0, data})
    })
    .catch(error => {
      console.error('update user err', error)
      res.send({status: 1, msg: 'update user err'})
    })
})

// delete user
router.post('/manage/user/delete', (req, res) => {
  const {userId} = req.body
  UserModel.deleteOne({_id: userId})
    .then(() => {
      res.send({status: 0})
    })
})



// get users
router.get('/manage/user/list', (req, res) => {
  UserModel.find({username: {'$ne': 'admin'}}) // '$ne' : not equals !=
    .then(users => {
      RoleModel.find().then(roles => {
        res.send({status: 0, data: {users, roles}})
      })
    })
    .catch(error => {
      console.error('get users err', error)
      res.send({status: 1, msg: 'get users err'})
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
// get category name by category id
router.get('/manage/category/name', (req, res) => {
  const categoryId = req.query.categoryId
  CategoryModel.findOne({_id: categoryId})
    .then(category => {
      res.send({status: 0, data: category.name})
    })
    .catch(error => {
      console.error('get category name err', error)
      res.send({status: 1, msg: 'get category name err'})
    })
})


// modify category
router.post('/manage/category/modify', (req, res) => {
  console.log('category:',req.body)
  const {categoryName, categoryId} = req.body
  CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName})
    .then(oldCategory => {
      res.send({status: 0})
    })
    .catch(error => {
      console.error('modify category error', error)
      res.send({status: 1, msg: 'modify category error, try again'})
    })
})

// add merchandise
router.post('/manage/merchandise/add', (req, res) => {
  const merchandise = req.body
  ProductModel.create(merchandise)
    .then(merchandise => {
      res.send({status: 0, data: merchandise})
    })
    .catch(error => {
      console.error('add merchandise', error)
      res.send({status: 1, msg: 'add merchandise'})
    })
})

// get merchandise
router.get('/manage/merchandise/list', (req, res) => {
  const {pageNum, pageSize} = req.query
  ProductModel.find({})
    .then(merchandise => {
      res.send({status: 0, data: pageFilter(merchandise, pageNum, pageSize)})
    })
    .catch(error => {
      console.error('merchandise list', error)
      res.send({status: 1, msg: 'merchandise list error'})
    })
})


// add role
router.post('/manage/role/create', (req, res) => {
  const {roleName} = req.body
  console.log(req.body)
  RoleModel.create({name: roleName})
    .then(role => {
      res.send({status: 0, data: role})
    })
    .catch(error => {
      console.error('add role error', error)
      res.send({status: 1, msg: 'add role error'})
    })
})

// get roles
router.get('/manage/role/list', (req, res) => {
  RoleModel.find()
    .then(roles => {
      res.send({status: 0, data: roles})
    })
    .catch(error => {
      console.error('get roles error', error)
      res.send({status: 1, msg: 'get roles error'})
    })
})

// update role 
router.post('/manage/role/update', (req, res) => {
  const role = req.body
  role.auth_time = Date.now()
  RoleModel.findOneAndUpdate({_id: role._id}, role)
    .then(oldRole => {
      // console.log('---', oldRole._doc)
      res.send({status: 0, data: {...oldRole._doc, ...role}})
    })
    .catch(error => {
      console.error('update role error', error)
      res.send({status: 1, msg: 'update role error'})
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

// upload and delete pictures
require('./file-upload')(router)
module.exports = router