## Restaurant

#### Routes

List of Routes:

| Endpoints                | Description                                            |
| :----------------------- | :----------------------------------------------------- |
| `POST /cuisines`         | Membuat entitas utama                                  |
| `GET /cuisines`          | Mengambil semua data entitas utama                     |
| `GET /cuisines/:id`      | Mengambil detail entitas utama berdasarkan **ID**      |
| `PUT /cuisines/:id`      | Mengedit data entitas utama berdasarkan **ID**         |
| `PATCH /cuisines/:id`    | Mengedit column status entitas utama berdasarkan**ID** |
| `POST /categories`       | Membuat entitas \*Category\*\*                         |
| `GET /categories`        | Mengambil semua data entitas **Category**              |
| `GET /histories `        | Mengambil semua data entitas **Histories**             |
| `GET /dashboard`         | Mengambil count dari entitas utama dan categories      |
| `DELETE /cuisines/:id`   | Menghapus data entitas utama berdasarkan **ID**        |
| `POST /pub/register` | Membuat data **Customer**         |
| `POST /pub/login` | login         |
| `GET /pub/cuisines` | Mengambil semua data entitas utama        |
| `GET /pub/cuisines/:id` |Mengambil detail entitas utama berdasarkan **ID**         |
| `GET /pub/favorites` |Mengambil data Favorite         |
| `POST /pub/favorites` |Membuat data Favorite       |

#### 1. POST /register

#### Description

```http
 	Membuat user baru
```

#### Response

_200 - Created_

- Body

```http
{
    "statusCode": 201,
    "data": {
        "id": 5,
        "username": "user3",
        "email": "user3@email.com",
        "password": "$2a$10$5rHzz0QHzqjL3yRaZqyYY.lv2oL5IMSPvN7J5v8jwHagIdWKslruq",
        "phoneNumber": "555555",
        "address": "user3",
        "role": "admin",
        "updatedAt": "2023-05-20T09:13:58.131Z",
        "createdAt": "2023-05-20T09:13:58.131Z"
    },
    "message": "created"
}
```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "error": [
        "UserName cannot be empty!",
        "Email is Already!",
        "Email cannot be empty!"
        "Password cannot be empty!!"
        "Role cannot be empty!"
    ]
}
```

#### 2. POST /login

#### Description

```http
 	Mengizinkan user untuk masuk ke dalam sistem
```

#### Response

_200 - OK_

- Body

```http
{
    "statusCode": 200,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyM0BlbWFpbC5jb20iLCJpYXQiOjE2ODQ1NzQyMDN9.37vMpt19AiosBql3PruqTYgZ0BZCLUgv7MzBfK-ssfY",
    "email": "user3@email.com",
    "id": 5,
    "role": "admin",
    "message": "Logged in"
}
```

_401 - Unauthorized_

- Body

```http
{
    "statusCode": 401,
    "error": "Email not found"
}
```

```http
{
    "statusCode": 401,
    "error": "Username/Password invalid!"
}
```

#### 3. POST /glogin

#### Description

```http
 	Mengizinkan user untuk masuk ke dalam sistem menggunakan akun Google
```

#### Request

- Headers

```http
  {
  "token_google": String
  }
```

#### Response

- Body
  _200 - OK_

```http
{
    "statusCode": 200,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoibmFmaWlyZmFuemlkbnlAZ21haWwuY29tIiwiaWF0IjoxNjgxNjU2NTk2fQ.p-Qp0SQVTy6UrwGOPrrXj53g1CinOlEnNeS4eWzewTU",
    "id": 4,
    "email": "ciptandaru@gmail.com",
    "username": "Dhimas Ciptandaru",
    "role": "staff",
    "msg": "Logged in"
}
```

_201 - Created_

```http
{
    "statusCode": 201,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoibmFmaWlyZmFuemlkbnlAZ21haWwuY29tIiwiaWF0IjoxNjgxNjU2NTk2fQ.p-Qp0SQVTy6UrwGOPrrXj53g1CinOlEnNeS4eWzewTU",
    "id": 4,
    "email": "ciptandaru@gmail.com",
    "username": "Dhimas Ciptandaru",
    "role": "staff",
    "msg": "created"
}
```

_401 - Unauthorized_

- Body

```http
{
    "statusCode": 401,
    "error": "Forbidden, not enough access!"
}
```

#### 4. POST /cuisines

#### Description

```http
  Membuat entitas utama
```

#### Request

- Headers

```http
  {
  "Content-Type": "application/x-www-form-urlencoded"
  }
```

```http
  {
  "access_token": String
  }
```

- Body

```http
  {
  "name": String,
  "description": String,
  "price": Integer,
  "imgUrl": String,
  "authorId": Integer,
  "categoryId": Integer
  }
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_201 - Created_

- Body

```http
{
    "statuscode": 201,
    "message": {
        "id": 13,
        "name": "asdd",
        "description": "qwertyuiopasdfgnm",
        "price": 100000,
        "imgUrl": "https://images.unsplash.com/photo-1683644673880-dadc9f45b32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        "authorId": 1,
        "categoryId": 2,
        "updatedAt": "2023-05-27T06:23:13.578Z",
        "createdAt": "2023-05-27T06:23:13.578Z",
        "status": "Active"
    },
    "createHistory": {
        "id": 7,
        "name": "POST",
        "description": "asdd with 13 created",
        "updatedBy": "user",
        "updatedAt": "2023-05-27T06:23:13.586Z",
        "createdAt": "2023-05-27T06:23:13.586Z"
    }
}
```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "message:": "Name cannot be empty!",
                "Description cannot be empty!",
                "Price cannot be empty!",
                "Price should not be below 5000!",
                "Image cannot be empty!",
                "User cannot be empty!",
                "Category cannot be empty!"
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 5. GET /cuisines

#### Description

```http
  Mengambil semua data entitas utama
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "statuscode": 200,
    "message": [
        {
            "id": 12,
            "name": "Burgir",
            "description": "Burgir",
            "price": 50000,
            "imgUrl": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            "authorId": "ciptandaru@gmail.com",
            "categoryId": "Food",
            "status": "Active",
            "createdAt": "2023-05-27T06:05:35.145Z",
            "updatedAt": "2023-05-27T06:05:35.145Z",
            "User": {
                "id": 5,
                "username": "Dhimas Ciptandaru",
                "email": "ciptandaru@gmail.com",
                "password": "$2a$10$WY1rKqwjSEhbchIBfq/gp.x00cjtiS4bdWrOuMpWzFOg7TmyziWg6",
                "role": "staff",
                "phoneNumber": null,
                "address": null,
                "createdAt": "2023-05-27T05:41:18.838Z",
                "updatedAt": "2023-05-27T05:41:18.838Z"
            },
            "Category": {
                "id": 1,
                "name": "Food",
                "createdAt": "2023-05-27T05:41:04.527Z",
                "updatedAt": "2023-05-27T05:41:04.527Z"
            }
        },
        {
            "id": 8,
            "name": "Corn Syrup",
            "description": "Maecenas tincidunt lacus at velit.",
            "price": 49382,
            "imgUrl": "https://media.istockphoto.com/id/482156396/id/foto/biofuel-atau-sweetcorn-sirup-jagung.jpg?s=612x612&w=0&k=20&c=cNJssEHfQPzPS0TJuK5XTyLCqLsZj3vj2nF5JHvFJV8=",
            "authorId": "user@email.com",
            "categoryId": "Food",
            "status": "Archived",
            "createdAt": "2023-05-27T05:41:04.822Z",
            "updatedAt": "2023-05-27T05:57:09.632Z",
            "User": {
                "id": 1,
                "username": "user",
                "email": "user@email.com",
                "password": "$2a$10$mmCftD6JXx.7EuARELy1Q.Zjnh0vLNLPGeYER6FdZGPa3dBC80zg.",
                "role": "admin",
                "phoneNumber": "55555",
                "address": "user",
                "createdAt": "2023-05-27T05:41:04.612Z",
                "updatedAt": "2023-05-27T05:41:04.612Z"
            },
            "Category": {
                "id": 1,
                "name": "Food",
                "createdAt": "2023-05-27T05:41:04.527Z",
                "updatedAt": "2023-05-27T05:41:04.527Z"
            }
        },
        ...
    ]
}
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 6. POST /categories

#### Description

```http
 	Mengambil semua data entitas Category
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

```http
  {
  "name": String
  }
```

#### Response

_201 - OK_

- Body

```http
  {
    "statusCode": 201,
    "data": [
        {
            "id": 4,
            "name": "Sambel",
            "createdAt": "2023-05-15T05:47:17.811Z",
            "updatedAt": "2023-05-15T05:47:17.811Z"
        }
    ]
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 7. GET /categories

#### Description

```http
 	Mengambil semua data entitas Category
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
  {
    "statusCode": 200,
    "data": [
        {
            "id": 1,
            "name": "Food",
            "createdAt": "2023-05-15T05:47:17.811Z",
            "updatedAt": "2023-05-15T05:47:17.811Z"
        }
    ]
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 8. GET /cuisines/:id

#### Description

```http
 	Mengambil detail entitas utama berdasarkan ID
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
 {
    "statusCode": 200,
    "message": {
        "id": 1,
        "name": "Wine - Red, Cabernet Merlot",
        "description": "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.",
        "price": 406746,
        "imgUrl": "http://dummyimage.com/172x100.png/cc0000/ffffff",
        "authorId": 1,
        "categoryId": 1,
        "createdAt": "2023-05-15T06:28:34.133Z",
        "updatedAt": "2023-05-15T06:28:34.133Z"
    }
}
```

_404 - Not Found_

- Body

```http
  {
    "statusCode": 404,
    "error": {
        "name": "Id not found"
    }
  }
```

#### 9. DELETE /cuisines/:id

#### Description

```http
 	Menghapus data entitas utama berdasarkan ID
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "statusCode": 200,
    "message": "Tester success to delete"
}
```

_404 - Not Found_

- Body

```http
  {
    "statusCode": 404,
    "message": "Id not found"
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 10. GET /readHistories

#### Description

```http
 	Mengambil detail entitas utama berdasarkan ID
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "statuscode": 200,
    "message": {
        "id": 1,
        "name": "Wine - Red, Cabernet Merlot",
        "description": "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.",
        "price": 406746,
        "imgUrl": "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8V2luZSUyMCUyMCUyMFJlZCUyQyUyMENhYmVybmV0JTIwTWVybG90fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        "authorId": 1,
        "categoryId": 2,
        "status": "Active",
        "createdAt": "2023-05-27T05:41:04.822Z",
        "updatedAt": "2023-05-27T05:41:04.822Z"
    }
}
```

_404 - Not Found_

- Body

```http
  {
    "statusCode": 404,
    "error": {
        "name": "Id not found"
    }
  }
```

#### 11. PUT /cuisines/13

#### Description

```http
  Membuat entitas utama
```

#### Request

- Headers

```http
  {
  "Content-Type": "application/x-www-form-urlencoded"
  }
```

```http
  {
  "access_token": String
  }
```

- Body

```http
  {
  "name": String,
  "description": String,
  "price": Integer,
  "imgUrl": String,
  "authorId": Integer,
  "categoryId": Integer
  }
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_201 - Created_

- Body

```http
{
    "statuscode": 201,
    "message": {
        "id": 11,
        "name": "asdd",
        "description": "qwertyuiopasdfgnm",
        "price": 100000,
        "imgUrl": "https://images.unsplash.com/photo-1683644673880-dadc9f45b32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        "authorId": 1,
        "categoryId": 2,
        "status": "Active",
        "createdAt": "2023-05-27T06:04:04.698Z",
        "updatedAt": "2023-05-27T06:21:39.812Z"
    },
    "createHistory": {
        "id": 6,
        "name": "PUT",
        "description": "asdd with 11 updated",
        "updatedBy": "user",
        "updatedAt": "2023-05-27T06:21:39.830Z",
        "createdAt": "2023-05-27T06:21:39.830Z"
    }
}
```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "message:": "Name cannot be empty!",
                "Description cannot be empty!",
                "Price cannot be empty!",
                "Price should not be below 5000!",
                "Image cannot be empty!",
                "User cannot be empty!",
                "Category cannot be empty!"
  }
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 12. PATCH /cuisines/14

#### Description

```http
  Membuat entitas utama
```

#### Request

- Headers

```http
  {
  "Content-Type": "application/x-www-form-urlencoded"
  }
```

```http
  {
  "access_token": String
  }
```

- Body

```http
  {
  "status": String,
  }
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_201 - Created_

- Body

```http
{
    "statuscode": 201,
    "message": {
        "id": 14,
        "name": "asdd",
        "description": "qwertyuiopasdfgnm",
        "price": 100000,
        "imgUrl": "https://images.unsplash.com/photo-1683644673880-dadc9f45b32a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        "authorId": 1,
        "categoryId": 2,
        "status": "Inactive",
        "createdAt": "2023-05-27T06:25:44.988Z",
        "updatedAt": "2023-05-27T06:26:16.146Z"
    },
    "createHistory": {
        "id": 9,
        "name": "PATCH",
        "description": "asdd status with 14 has been updated from Active into Inactive",
        "updatedBy": "user",
        "updatedAt": "2023-05-27T06:26:16.150Z",
        "createdAt": "2023-05-27T06:26:16.150Z"
    }
}
```

_400 - Bad Request_

- Body

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```

#### 13. GET /dashboard

#### Description

```http
 	Mengambil semua data entitas Category
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "statuscode": 200,
    "tempCuisine": 14,
    "tempCategory": 3
}
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```
#### 14. GET /pub/register

#### Description

```http
 	Membuat user baru
```

#### Response

_200 - Created_

- Body

```http

{
    "email": "customers@email.com",
    "message": "created"
}

```

_400 - Bad Request_

- Body

```http
  {
    "statusCode": 400,
    "error": [
        "UserName cannot be empty!",
        "Email is Already!",
        "Email cannot be empty!"
        "Password cannot be empty!!"
        "Role cannot be empty!"
    ]
}
```

#### 15. POST /pub/login

#### Description

```http
 	Mengizinkan user untuk masuk ke dalam sistem
```

#### Response

_200 - OK_

- Body

```http
{
    "statusCode": 200,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjdXN0b21lckBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2ODU5MDAyNTN9.4gjcVsOClbZIC8VvzeW3lNLZjalPpYdz4KtUF3VllkE",
    "id": 1,
    "role": "customer",
    "message": "Logged in"
}
```

_401 - Unauthorized_

- Body

```http
{
    "statusCode": 401,
    "error": "Email not found"
}
```

```http
{
    "statusCode": 401,
    "error": "Username/Password invalid!"
}
```

#### 16. POST /glogin

#### Description

```http
 	Mengizinkan user untuk masuk ke dalam sistem menggunakan akun Google
```

#### Request

- Headers

```http
  {
  "token_google": String
  }
```

#### Response

- Body
  _200 - OK_

```http
{
    "statusCode": 200,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoibmFmaWlyZmFuemlkbnlAZ21haWwuY29tIiwiaWF0IjoxNjgxNjU2NTk2fQ.p-Qp0SQVTy6UrwGOPrrXj53g1CinOlEnNeS4eWzewTU",
    "id": 4,
    "email": "ciptandaru@gmail.com",
    "username": "Dhimas Ciptandaru",
    "role": "staff",
    "msg": "Logged in"
}
```

_201 - Created_

```http
{
    "statusCode": 201,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoibmFmaWlyZmFuemlkbnlAZ21haWwuY29tIiwiaWF0IjoxNjgxNjU2NTk2fQ.p-Qp0SQVTy6UrwGOPrrXj53g1CinOlEnNeS4eWzewTU",
    "id": 4,
    "email": "ciptandaru@gmail.com",
    "username": "Dhimas Ciptandaru",
    "role": "customer",
    "msg": "created"
}
```

_401 - Unauthorized_

- Body

```http
{
    "statusCode": 401,
    "error": "Forbidden, not enough access!"
}
```
#### 17. GET /pub/cuisines

#### Description

```http
  Mengambil semua data entitas utama
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "statusCode": 200,
    "message": {
        "count": 20,
        "rows": [
            {
                "id": 20,
                "name": "Vermouth - Sweet, Cinzano 2",
                "description": "Suspendisse accumsan tortor quis turpis. Sed ante.",
                "price": 877274,
                "imgUrl": "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFZlcm1vdXRoJTIwJTIwJTIwU3dlZXQlMkMlMjBDaW56YW5vfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
                "authorId": 1,
                "categoryId": 1,
                "status": "Active",
                "createdAt": "2023-06-04T16:39:14.771Z",
                "updatedAt": "2023-06-04T16:39:14.771Z",
                "Category": {
                    "name": "Food"
                }
            },
            {
                "id": 19,
                "name": "Cheese - Bocconcini 2",
                "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",
                "price": 914127,
                "imgUrl": "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fENoZWVzZSUyMCUyMCUyMEJvY2NvbmNpbml8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
                "authorId": 1,
                "categoryId": 1,
                "status": "Active",
                "createdAt": "2023-06-04T16:39:14.771Z",
                "updatedAt": "2023-06-04T16:39:14.771Z",
                "Category": {
                    "name": "Food"
                }
            },
        ...
        ]
    },
    "totalPage": 3,
    "categories": [
        {
            "id": 1,
            "name": "Food"
        },
        {
            "id": 2,
            "name": "Drink"
        }
    ]
}
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```
#### 18. GET /pub/cuisines/:id

#### Description

```http
  Mengambil semua data entitas utama
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "statuscode": 200,
    "message": {
        "id": 5,
        "name": "Coffee Guatemala Dark",
        "description": "Quisque ut erat. Curabitur gravida nisi at nibh.",
        "price": 792852,
        "imgUrl": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29mZmVlJTIwR3VhdGVtYWxhJTIwRGFya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "authorId": 1,
        "categoryId": 2,
        "status": "Active",
        "createdAt": "2023-06-04T16:39:14.771Z",
        "updatedAt": "2023-06-04T16:39:14.771Z",
        "Category": {
            "id": 2,
            "name": "Drink",
            "createdAt": "2023-06-04T16:39:14.473Z",
            "updatedAt": "2023-06-04T16:39:14.473Z"
        }
    },
    "qrCode": "<svg version=\"1.0\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:x...
}
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```
#### 19. GET /pub/favorite

#### Description

```http
  Mengambil semua data entitas utama
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_200 - OK_

- Body

```http
{
    "data": [
        {
            "id": 1,
            "CuisineId": 16,
            "CustomerId": 1,
            "createdAt": "2023-06-04T16:44:16.566Z",
            "updatedAt": "2023-06-04T16:44:16.566Z",
            "Cuisine": {
                "id": 16,
                "name": "Trout - Hot Smkd, Dbl Fillet 2",
                "description": "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
                "price": 81891,
                "imgUrl": "https://media.istockphoto.com/id/1027633308/id/foto/panggangan-ikan.jpg?s=612x612&w=0&k=20&c=UufoahX-XXCFRzxnfiqidK450flvYAuo5rL1JCFFOOg=",
                "authorId": 1,
                "categoryId": 1,
                "status": "Active",
                "createdAt": "2023-06-04T16:39:14.771Z",
                "updatedAt": "2023-06-04T16:39:14.771Z",
                "Category": {
                    "id": 1,
                    "name": "Food",
                    "createdAt": "2023-06-04T16:39:14.473Z",
                    "updatedAt": "2023-06-04T16:39:14.473Z"
                }
            }
        }
    ]
}
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```
#### 19. POST /pub/favorite

#### Description

```http
  Mengambil semua data entitas utama
```

#### Request

- Headers

```http
  {
  "access_token": String
  }
```

#### Response

_201 - OK_

- Body

```http
{
    "id": 2,
    "CustomerId": 1,
    "CuisineId": 3
}
```

_500 - Internal Server Error_

- Body

```http
  {
    "statusCode": 500,
    "error": "Internal Server Error"
  }
```


