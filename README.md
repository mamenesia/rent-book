<h1 align="center">RENT BOOK RESTful API</h1>

# Overview

## Introduction

Rent Book API is an API that allow the users to read books and genre information data from database. Rent Book API also allow (registered ) users to create, update and delete a book and its genre information into/from database.

There're some features included in the API which allow users to programmatically sort the books (based on released date, title, availability or genre), rent or returning a book, search a book and fetch a certain number of books from database.

This documentation outlines the rent book API functionality.

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/) [![MySQL](https://img.shields.io/badge/mysql-v2..17.2-blue)](https://www.npmjs.com/search?q=mysql) [![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-v8.x-critical)](https://www.npmjs.com/package/jsonwebtoken)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

##Getting Started

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)
###Node.js
Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

Nodejs allow developers to use javascript to write command line tools and for **server side scripting**. Hence, Nodejs represent what we know about "Javascript Everywhere" Paradigm, which allow us to us javascript on both **client-side** and **server-side**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used.

Nodejs was written in 2009 by Ryan Dahl, 13 years after the introduction of first server-side javascript environment which is **Netscape's LiveWire Pro Web**. Dahl write Nodejs based on his critic on the performance limitation of the most popular web server in 2009, Apache HTTP Server.

The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)
###Express.js
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

The philosophy of Expressjs is to provide a small and robust tooling for HTTP servers. Making it a great solution for single page apps, website, hybrids, or public HTTP APIs. 

![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)
###RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

RESTful API design was defined by Dr. Roy Fielding in his 2000 doctorate dissertation. In order to be a true RESTful API, a web service must adhere to the following six REST architectural constraints:

* Use of a uniform interface (UI). Resources should be uniquely identifiable through a single URL, and only by using the underlying methods of the network protocol, such as DELETE, PUT and GET with HTTP, should it be possible to manipulate a resource.
* Client-server based. There should be a clear delineation between the client and server. UI and request-gathering concerns are the client’s domain. Data access, workload management and security are the server’s domain. This loose coupling of the client and server enables each to be developed and enhanced independent of the other.
* Stateless operations. All client-server operations should be stateless, and any state management that is required should take place on the client, not the server.
* RESTful resource caching. All resources should allow caching unless explicitly indicated that caching is not possible.
* Layered system. REST allows for an architecture composed of multiple layers of servers.
* Code on demand. Most of the time a server will send back static representations of resources in the form of XML or JSON. However, when necessary, servers can send executable code to the client.
  
###Authentication
Access to the API is granted by providing your username and password using HTTP basic authentication. The username and password used, is the same username and password you use to register.

###Authorization
For authorization system, this API use JWT (jsonwebtoken).

###HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |
| `401` | `Unauthorized`       | The supplied API credentials are invalid                                            |
| `403` | `Forbidden`          | The credentials provided do not have permission to access the requested resource    |
| `404` | `Not found`          | An attempt was made to access a resource that does not exist in the API             |
| `405` | `Method not allowed` | The resource being accessed doesn't support the method specified (GET, POST, etc.). |
| `500` | `Server Error`       | An error on the server occurred                                                     |

## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:8080/books)
9. Check all **Endpoints** [here](#endpoints)

##Setup .env file
Open **.env** file on code editor and copy the code below :

```
SERVER_PORT = 8080

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'rent_book'

TOKEN_SECRET = 'secretToken'
```

##Setup Database
You can write this code below on your Terminal with mysql cli or import it to **phpmyadmin**.

Create Database named **rent-book** :

```
CREATE DATABASE rent-book;
```

Create Table named **book** :

```
CREATE TABLE book (
    book_id INT AUTO INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    desc TEXT,
    image_url VARCHAR(255),
    released_at DATE,
    genre INT,
    available TINYINT,
    FOREIGN KEY (genre) REFERENCE genre(genre_id,
    FOREIGN KEY (available) REFERENCES status(status_id)
);
```

Create Table named **genre** :

```
CREATE TABLE genre(
    genre_id INT AUTO INCREMENT PRIMARY KEY,
    genre VARCHAR(255)
);
```

Create Table named **status** :

```
CREATE TABLE status(
    status_id TINYINT PRIMARY KEY,
    status VARCHAR(255)
);
```

Create Table named **user** :

```
CREATE TABLE user(
    id INT AUTO INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);
```

## Endpoints

#### **Homepage**

- **Request** : **`GET /`**
- **Response** :

  ```
    {
    "message": "Welcome to Rent Book Api",
    "login": "If you already have an account, please login",
    "register": "Register your account today to use Rent Book API"
  }
  ```

#### **Register**

- **Request** : **`POST /register`**
- **Response** :

  ```
    {
    "status": 200,
    "message": "The user is successfully registered!",
    "user": {
        "username": "dedy003",
        "email": "dedyprasetyoh003@gmail.com",
        "password": "$2a$10$ThIm7Ra5opmjcrVq.vkN3.9J8m5wUCNPfyYBKgm3c9du2/OhY17Mu"
    }
  }
  ```

#### **Register**

- **Request** : **`POST /login`**
- **Response** :
```

```
#### **CRUD Books Endpoint**

- **`GET /books`**
- **`GET /books/show/:id`**
- **`POST /books`**
- **`PATCH /books/:id`**
- **`DELETE /books/:id`**

#### CRUD Genre Endpoint

- **`GET /books/genre`**
- **`POST /books/genre`**
- **`PATCH /books/genre/:id`**
- **`DELETE /books/genre/:id`**

#### Rent and Return Book Endpoint

Rent a Book

- **`GET /books/rent`**
- **`PATCH /books/rent/:id`**

Return a Book

- **`GET /books/return`**
- **`PATCH /books/return/:id`**

#### Request

| Query Parameter        | Type     | Description                                                                                                          |
| :--------------------- | :------- | :------------------------------------------------------------------------------------------------------------------- |
| client_time (optional) | `number` | Send client_time \(in ms since Epoch\) to include the time drift between your client and our server in the response. |

#### Response

```javascript
{
    "timestamp": 1511572042589
}
```

### Support

For API support, please email dedy.prasetyo.h@gmail.com
