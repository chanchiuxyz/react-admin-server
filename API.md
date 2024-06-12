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


## 7. add category
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
获取一级或某个二级分类列表
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
  
      

          