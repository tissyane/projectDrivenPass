<h1 align="center">
  DrivenPass
</h1>

<div align="center">

  <h3>Built With</h3>

![uses-postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=plastic&logo=postgresql&logoColor=white)
![uses-prisma](https://img.shields.io/badge/Prisma-3982CE?style=plastic&logo=Prisma&logoColor=white)
![uses-typescript](https://img.shields.io/badge/TypeScript-007ACC?style=plastic&logo=typescript&logoColor=white)
![uses-node](https://img.shields.io/badge/Node.js-43853D?style=plastic&logo=node.js&logoColor=white)
![uses-express](https://img.shields.io/badge/Express.js-404D59?style=plastic&logo=express.js&logoColor=white)

</div>

<br/>

## 📌 Project Description

<p align="justify">
Browsing the internet can be a very fun activity, but at the same time, very dangerous. Numerous studies and surveys (national and international) show that the number of virtual scams continues to grow. Which raises the question: how to protect ourselves?<br/>
There are several different ways to protect yourself. It all starts with using different and secure passwords. For a password to be security, it must contain several characters and numbers mixed in, not to mention that the longer it ii, etc.<br/>
But how are we going to memorize giant passwords with no semantic meaning? It is to solve this pain that password managers were created! With them, 
we only create one “master” password and all other passwords kept secret! So when we need it, just remember the “master” password! <br/>
<b>DrivenPass</b> is your newest password manager, where you can save data such as: credentials and networks.

</p>

<br/>

## 📑 Contents

- [Features](#✅-features)
- [API Documentation](#📮-api-documentation)
- [Enviroment Variables](#🔒-environment-variables)
- [How to run](#⚙️-how-to-run)
- [Contact](#📫-contact)

<br/>

## ✅ Features

- [x] Create an account
- [x] SignIn to your account
- [x] Create/Get/Delete Credentials
- [x] Create/Get/Delete Networks

<br/>

## 📮 API Documentation

</br>

# Authentication Routes

## Route<span style="color:lightgreen"> **POST** </span>/signup

This route is <span style="color:red"> **NOT** </span> authenticated. It's function is to create new users.

The Requisition Body must be in the following format:

```json
{
  "email": "user_email", //string
  "password": "user_password" //string
}
```

### Business rules:

- The password must be at least 10 characters long;
- If the email is already in use returns 409

</br>

## Route <span style="color:lightgreen"> **POST** </span>/signin

This route is <span style="color:red"> **NOT** </span> authenticated. It's function is to login users.

The Requisition Body must be in the following format:

```json
{
  "email": "user_email", //string
  "password": "user_password" //string
}
```

### Business rules:

- Username and password be correctly entered.
- Non-existent e-mail returns 401.
- Incorrect e-mail or password returns status 401.

#### Successful requests return the JWT token needed for authentication.

</br>

### <span style="color:yellow"> All the following routes are authenticated:

</br>

# Credential Routes

## Route <span style="color:lightgreen"> **POST** </span>/credentials

The function of this route is to register website usernames and passwords.

The Body of the request should be in the following format:

```json
{
  "title": "credential_title/name", //string
  "url": "website_url", //string
  "username": "website_login_username", //string
  "password": "website_login_password" //string
}
```

### Business rules:

- Each credential must have a unique title. Otherwise, it will return 409
- It's possible to save more than one credential for the same website

</br>

## Route <span style="color:green"> **GET** </span>/credentials

This route has no information in the body. It will get and return all credentials from the user.

A successful request will bring a response like the one below:

```json
[
  {
    "id": 1,
    "title": "my credential",
    "url": "https://www.driven.com.br/",
    "username": "testuser",
    "password": "123456",
    "userId": 1
  },
  {
    "id": 2,
    "title": "my second credential",
    "url": "https://www.driven.com.br/",
    "username": "testuser2",
    "password": "654321",
    "userId": 1
  }
]
```

Note: Passwords are stored in database after being encrypted. Sensitive data appears decrypted only at request.

</br>

## Route <span style="color:green"> **GET** </span>/credentials/:id

This route has no information in the body. It will get a specific credential by userId and credentialId

A successful request will bring a response like the one below:

```json
{
  "id": 1,
  "title": "my credential",
  "url": "https://www.driven.com.br/",
  "username": "testuser",
  "password": "123456",
  "userId": 1
}
```

## Route <span style="color:red"> **DELETE** </span>/credentials/:id

This route has no information in the body. It will delete a specific credential by credentialId

A successful request will return a status confirmation and the register will be deleted from database.

</br>

# Network(Wifi) Routes

## Route <span style="color:lightgreen"> **POST** </span>/network

This route has the function of adding wifi network information.

The Requisition Body must be in the following format:

```json
{
  "title": "network_title/name", //string
  "network": "network_name", //string
  "password": "network_password" //string
}
```

</br>

## Route <span style="color:green"> **GET** </span>/network

This route has no information in the body. It will get and return all network from the user.

A successful request will bring a response like the one below:

```json
[
  {
    "id": 1,
    "title": "Mom's_house",
    "network": "my_network",
    "password": "010203",
    "userId": 1
  },
  {
    "id": 2,
    "title": "beach_house",
    "network": "go_brasil",
    "password": "123456",
    "userId": 1
  }
]
```

Note: Passwords are stored in database after being encrypted. Sensitive data appears decrypted only at request.

</br>

## Route <span style="color:green"> **GET** </span>/network/:id

This route has no information in the body. It will get a specific network by userId and credentialId

A successful request will bring a response like the one below:

```json
{
  "id": 1,
  "title": "Mom's_house",
  "network": "my_network",
  "password": "010203",
  "userId": 1
}
```

</br>

## Route <span style="color:red"> **DELETE** </span>/network/:id

This route has no information in the body. It will delete a specific network by networkId

A successful request will return a status confirmation and the register will be deleted from database.

</br>

## 🔒 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number`

`JWT_SECRET = any string`

`CRYPTR_SECRET = any string`

</br>

## ⚙️ How to run

```bash
# Clone this repository
$ git clone https://github.com/tissyane/projectDrivenPass.git

# Change to project directory
$ cd projectDrivenPass

# Install all dependencies
$ npm install

# Start the server
$ npm run start
```

</br>

## Lessons Learned

In this project I learned a lot about how to work with Prisma queries and migrations.
I also learned about Typescript and Integration Testing.

</br>

### Authors

- Tissyane Mara Dybas

  <br/>

## 📫 Contact

<a href = "mailto:tissyane@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=plastic&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/tissyane/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=plastic&logo=linkedin&logoColor=white" target="_blank"></a>
