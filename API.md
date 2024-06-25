# API

## catalogue：
	1). login

## 1. login

### reqURL：
	http://localhost:5000/login

### method：
	POST

### params
	|param		 |required|type     |memo
	|username    |Y       |string   |username
	|password    |Y       |string   |password(md5)

### response：
	success:
      {
        "status": 0,
        "data": {
          "_id": "5c3b297dea95883f340178b0",
          "password": "21232f297a57a5a743894a0e4a801fc3",
          "username": "admin",
          "create_time": 1717310748288,
          "__v": 0,
          "role": {
            "menus": []
          }
        }
      }
	error
	  {
        "status": 1,
        "msg": "username or password err!"
      }


##  add category
### reqURL：
    http://localhost:5000/manage/category/add

### method
    POST

### parameter:

    |parameter		|required |type     |memo
    |parentId      |Y       |string   |father's id
    |categoryName  |Y       |string   |categoryname

### response：
    add category I:
        {
          "status": 0,
          "data": {
            "parentId": "0",
            "_id": "66680865ed5ca334cfd419b9",
            "name": "electronics",
            "__v": 0
          }
        }
    add category II
        {
          "status": 0,
          "data": {
            "parentId": "66680865ed5ca334cfd419b9",
            "_id": "5c3ec1814594a00e5877b842",
            "name": "computer",
            "__v": 0
          }
        }      

get category I or category II
### reqURL：
	http://localhost:5000/manage/category/list

### method：
	GET

### parameter 
	|parameter		|required |type     |memo
	|parentId    |Y       |string   |father's id

### response：：
    categary I:
      {
        "status": 0,
        "data": [
          {
            "parentId": "0",
            "_id": "5c2ed631f352726338607046",
            "name": "category01",
            "__v": 0
          },
          {
            "parentId": "0",
            "_id": "5c2ed647f352726338607047",
            "name": "category02",
            "__v": 0
          }
        ]
      }
   categary II:
      {
        "status": 0,
        "data": [
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed65df352726338607049",
            "name": "3333",
            "__v": 0
          },
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed66ff35272633860704a",
            "name": "444",
            "__v": 0
          }
        ]
      }


## get category name by category id
### reqURL：
	http://localhost:5000/manage/category/name

### method：
	GET

### parameter 
	|parameter		|required |type     |memo
	|_id           |Y       |string   |category id

### response：：
{
    "status": 0,
    "data": "category name"
}
  
      
## modify category
### reqURL：
    http://localhost:5000/manage/category/modify

### method:
    POST

### parameter:

    |parameter		|required |type     |memo
    |categoryId    |Y       |string   |_id
    |categoryName  |Y       |string   |name

### response：
    {
      "status": 0
    }

##  add merchandise
### reqURL：
    http://localhost:5000/manage/merchandise/add

### method:
    POST

### parameter:
    |parameter		 |required |type     |memo
    |categoryId    |Y       |string   |categoryId
    |pCategoryId   |Y       |string   |parentCategoryId
    |name          |Y       |string   |name
    |desc          |N       |string   |desc
    |price         |N       |string   |price
    |imgs          |N       |array    |imgs pics'name (json string)
### response:
    {
        "status": 0,
        "data": {
            "status": 1,
            "imgs": [
                "image-XXXXXXX.jpg"
            ],
            "_id": "5cf394d29929a304dcc0c6eb",
            "name": "mackBook",
            "desc": "protable computer",
            "price": 11111,
            "pCategoryId": "5ca9d6c0b49ef916541160bb",
            "categoryId": "5ca9db78b49ef916541160ca",
            "__v": 0
        }
    }

##  get merchandise
### reqURL：
    http://localhost:5000/manage/product/list

### method:
    GET

### parameter:

    |parameter|isRequired |type     |memo
    |pageNum    |Y       |Number   |page number
    |pageSize   |Y       |Number   |page size

### response：
   {
    "status": 0,
    "data": {
        "pageNum": 1,
        "total": 4,
        "pages": 2,
        "pageSize": 3,
        "list": [
            {
                "_id": "6676914f39127af25914c605",
                "categoryId": "666b724eadbd9012cce163b9",
                "pCategoryId": "666b724eadbd9012cce163b9",
                "name": "MacBook Air 13-inch Laptop",
                "price": 1449.99,
                "desc": "Apple 2024 MacBook Air 13-inch Laptop with M3 chip: 13.6-inch Liquid Retina Display, 8GB Unified Memory, 256GB SSD Storage, 1080p FaceTime HD Camera, Touch ID; Midnight, English Backlit Keyboard",
                "status": 1,
                "imgs": [
                    "image-1719046456633.jpg",
                    "image-1719046463497.jpg",
                    "image-1719046466173.jpg",
                    "image-1719046470018.jpg"
                ],
                "__v": 0
            },
            {
                "_id": "6677e6a18be3563fcfe1a456",
                "categoryId": "666b724eadbd9012cce163b9",
                "pCategoryId": "666b724eadbd9012cce163b9",
                "name": "ASUS Vivobook 15 Laptop",
                "price": 1099,
                "desc": "15.6” FHD (1920 x 1080) Display, Intel Core i7-1355U CPU, Intel Iris Xᵉ Graphics, 16GB RAM, 1TB SSD, Windows 11 Home, Quiet Blue, X1504VA-AS71-CA",
                "status": 1,
                "imgs": [
                    "image-1719133841189.jpg",
                    "image-1719133845502.jpg",
                    "image-1719133852504.jpg"
                ],
                "__v": 0
            },
            {
                "_id": "6678c09d8be3563fcfe1a478",
                "categoryId": "666b724eadbd9012cce163b9",
                "pCategoryId": "666b724eadbd9012cce163b9",
                "name": "HP 15.6\" FHD Business Laptop",
                "price": 849,
                "desc": "Intel Core i5-1135G7, 32GB DDR4 RAM, 1TB PCIe SSD, Intel Iris Xe Graphics, Numpad, Webcam, Wi-Fi 5, Bluetooth, Silver, Win 11 Pro, 32GB Hotface USB Card",
                "status": 1,
                "imgs": [
                    "image-1719189650206.jpg",
                    "image-1719189654371.jpg",
                    "image-1719189658283.jpg"
                ],
                "__v": 0
            }
        ]
    }
}


## add user

### reqURL：
    http://localhost:5000/manage/role/add

### method:
    POST

### parameter:
    |parameter |isRequired |type     |memo
    |roleName    |Y       |string   |role name

### response
    {
        "status": 0,
        "data": {
            "menus": [],
            "_id": "id",
            "name": "role name",
            "create_time": time,
            "__v": 0
        }
    }

## get roles
### reqURL：
    http://localhost:5000/manage/role/list

### method:
    GET

### parameter: 
    -

### parameter
    {
        "status": 0,
        "data": [
            {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/category"
                ],
                "_id": "id",
                "name": "test",
                "create_time": time,
                "__v": 0,
                "auth_time": time,
                "auth_name": "admin"
            },
            {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/category"
                ],
                "_id": "id",
                "name": "test",
                "create_time": time,
                "__v": 0,
                "auth_time": time,
                "auth_name": "admin"
            },


        ]
    }

## update role (authorize)
### reqURL：
    http://localhost:5000/manage/role/update

### method:
    POST

### parmeter:
  
    |parmeter	|isRequired  |type     |memo
    |_id          |Y       |string   |id
    |menus        |Y       |array    |path array
    |auth_time    |Y       |number   |authorize time
    |auth_name    |Y       |string   |authorizer

### response
    {
        "status": 0,
        "data": {
            "menus": [
                "/role",
                "/charts/bar",
                "/home",
                "/category",
                "/user"
            ],
            "_id": "id",
            "name": "test",
            "create_time": time,
            "__v": 0,
            "auth_time": time,
            "auth_name": "admin"
        }
    }