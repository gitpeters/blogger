# Blogger

A comprehensive Node.js & Express.js API for managing users and blogs, leveraging Cloudinary for media uploads and MySQL as the database.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [Endpoints](#endpoints)
   - [User Endpoints](#user-endpoints)
   - [Blog Endpoints](#blog-endpoints)

---

## Introduction

This API is built with **Node.js** and **Express.js** to provide CRUD operations for managing users and blogs. The API uses:

- **Cloudinary** for image uploads.
- **MySQL** as the relational database.
- **Sequelize** as the ORM to manage database interactions

---

## Features

- User management (create, retrieve, update, delete users).
- Blog management with image uploads.
- Secure environment variable handling using `dotenv`.
- Enhanced logging with `morgan`.
- Efficient file uploads using `multer`.

---

## Setup Instructions

### Prerequisites

1. [Node.js](https://nodejs.org) installed on your system.
2. MySQL database set up and running.
3. A Cloudinary account with API credentials.

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gitpeters/blogger.git
   cd <blogger>
   ```
2. **Install dependencies**:
   ```bash
    npm install
   ```
3. **Configure environment variables**:
   Create a `config.env` file in the root directory with the following content:
   ```env
        DB_HOST=<your-database-host>
        DB_USERNAME=<your-database-username>
        DB_PASSWORD=<your-database-password>
        DB_NAME=<your-database-name>
        SERVER_PORT=9000
        CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
        CLOUDINARY_API_KEY=<your-cloudinary-api-key>
        CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```
4. **Start the server**:
   ```bash
       npm start
   ```

## Usage

### Test the API

You can use tools like (Postman)[https://www.postman.com/] or (cURL)[https://curl.se/] to interact with the API

### Base URL

```bash
       http://localhost:9000/api/v1
```

### Endpoints

#### User Endpoints

1. **Create User**

   - URL: `/users`
   - Method: POST
   - Request body:

   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john.doe@example.com"
   }
   ```

   - Response:

   ```json
   {
     "status": "success",
     "data": {
       "user": {
         "id": 2,
         "first_name": "John",
         "last_name": "Doe",
         "email": "john.doe@example.com",
         "created_at": "2024-12-07T15:46:26.000Z",
         "updated_at": "2024-12-07T15:46:26.000Z"
       }
     }
   }
   ```

2. **Get All Users**

   - URL: `/users`
   - Method: GET
   - Response:

   ```json
   {
     "status": "success",
     "result": 2,
     "data": {
       "users": [
         {
           "id": 1,
           "first_name": "John",
           "last_name": "Doe",
           "email": "john.doe@example.com",
           "created_at": "2024-12-07T14:12:16.000Z",
           "updated_at": "2024-12-07T14:12:16.000Z"
         },
         {
           "id": 3,
           "first_name": "Jane",
           "last_name": "Doe",
           "email": "jane.doe@example.com",
           "created_at": "2024-12-07T14:16:22.000Z",
           "updated_at": "2024-12-07T14:16:22.000Z"
         }
       ]
     }
   }
   ```

3. **Update User**

   - URL: `/users/:id`
   - Method: PATCH
   - Request body:

   ```json
   {
     "firstName": "John"
   }
   ```

   - Response:

   ```json
   {
     "status": "success",
     "data": {
       "user": {
         "id": 2,
         "first_name": "John",
         "last_name": "Doe",
         "email": "john.doe@example.com",
         "created_at": "2024-12-07T15:46:26.000Z",
         "updated_at": "2024-12-07T15:46:26.000Z"
       }
     }
   }
   ```

4. **Delete User**

   - URL: `/users/:id`
   - Method: DELETE
   - Response:

   ```json
   {
     "status": "success"
   }
   ```

#### Blog Endpoints

1. **Create Blog Post**

   - URL: `/blogs`
   - Method: POST
   - Request body:

   ```json
   {
     "title": "Power of NodeJs and ExpressJs",
     "content": "Some long text",
     "authorId": 1,
     "coverImage": "/C:/Users/**/**/image4.png"
   }
   ```

   - Response:

   ```json
   {
     "status": "success",
     "data": {
       "post": {
         "id": 1,
         "title": "Power of NodeJs and ExpressJs",
         "content": "Some long text",
         "authorId": 1,
         "coverImage": "https://res.cloudinary.com/dqrbxpbcn/image/upload/v1733658174/uploads/zvl5sr83z23vxs9ydcwc.png",
         "created_at": "2024-12-07T15:46:26.000Z",
         "updated_at": "2024-12-07T15:46:26.000Z"
       }
     }
   }
   ```

2. **Get All Posts**

   - URL: `/blogs`
   - Method: GET
   - Response:

   ```json
   {
     "status": "success",
     "result": 1,
     "data": {
       "posts": [
         {
           "id": 1,
           "title": "Power of NodeJs and ExpressJs",
           "content": "Some long text",
           "authorId": 1,
           "coverImage": "https://res.cloudinary.com/dqrbxpbcn/image/upload/v1733658174/uploads/zvl5sr83z23vxs9ydcwc.png",
           "created_at": "2024-12-07T15:46:26.000Z",
           "updated_at": "2024-12-07T15:46:26.000Z"
         }
       ]
     }
   }
   ```

3. **Update Post**

   - URL: `/blogs/:id`
   - Method: PATCH
   - Request body:

   ```json
   {
     "title": "How to Optimize Sequelize ORM with NodeJs"
   }
   ```

   - Response:

   ```json
   {
     "status": "success",
     "data": {
       "id": 1,
       "title": "How to Optimize Sequelize ORM with NodeJs",
       "content": "Some long text",
       "authorId": 1,
       "coverImage": "https://res.cloudinary.com/dqrbxpbcn/image/upload/v1733658174/uploads/zvl5sr83z23vxs9ydcwc.png",
       "created_at": "2024-12-07T15:46:26.000Z",
       "updated_at": "2024-12-07T15:46:26.000Z"
     }
   }
   ```

4. **Delete Post**

   - URL: `/blogs/:id`
   - Method: DELETE
   - Response:

   ```json
   {
     "status": "success"
   }
   ```
