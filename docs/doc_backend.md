
# [NAMEPLATE]

Introduction text


[![](https://img.shields.io/badge/YouTube_ExpressJS_introduction-100000?style=for-the-badge&logo=express&logoColor=2BFF00&labelColor=22272e&color=22272e)](https://www.youtube.com/watch?v=SccSCuHhOw0)


## Usage/Examples

#### The basics:

There are three main ways to declare a variable in JavaScript:

- const
- let
- var

#### CONST

Introduced in ES6, const is similar to let in terms of block scope and no hoisting.

Variables declared with const must be initialized at the time of declaration.

const does not allow for reassigning or redeclaring.

```javascript
const z = 1;
z = 2;         // This is not allowed and will cause an error.
const z = 3;   // This is also not allowed and will cause an error.
```

#### LET

Introduced in ES6 (ECMAScript 2015), let addresses some of the shortcomings of var.

It has block scope, meaning it is only accessible within the nearest set of curly braces (like in a loop or an if-statement).

Variables declared with let are not hoisted to the top of their block.

let allows for reassigning values but does not allow for redeclaring the same variable within the same scope.

```javascript
let y = 1;
y = 2;     // This is allowed.
let y = 3; // This is not allowed and will cause an error.
```

#### VAR

var is the oldest keyword for variable declaration in JavaScript.

It has function scope when declared within a function and global scope when declared outside of a function.

Variables declared with var are hoisted, meaning they are moved to the top of their scope before code execution.

var allows for redeclaring the same variable within the same scope and also allows for reassigning values.

```javascript
var x = 1;
var x = 2; // This is allowed.
x = 3;     // This is also allowed.
```


#### Console.log( )

console.log is a function in JavaScript that logs any information you want to the console. It's a part of the console object, which provides access to the browser's debugging console.

It is commonly used for debugging purposes to display the value of variables, the flow of execution, or any message that helps in the debugging process.

The output of console.log appears in the web browser's console (usually accessible by pressing F12 or right-clicking the page and selecting "Inspect" -> "Console"). (useful for frontend -> but if used by backend, then it will print in the terminal)


```javascript
console.log('Hello, World!'); // This will print "Hello, World!" in the console.
let message = 'Hello again';
console.log(message); // This will print the value of the variable 'message'.
```


###


#### This is how the imports looks like for some of the modules:

```javascript
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const http = require('http');
const fs = require('fs');
```
###

#### Import declaration for functions that exist in the folder "functions".

```javascript
const placeHolder = require('./functions/placeHolder.js');
```

| Name for the filepath | filepath 
| :-------- | :------- 
| `placeHolder` | `./functions/placeHolder.js` 

###

#### Declaration of the port:

```javascript
const port = 9999;
```

| Port | Full URL 
| :-------- | :------- 
| `9999` | `http://localhost:9999` 

###

#### Express Configuration:

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
	origin: 'localhost',
	methods: 'GET,POST',
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
```

| Code | Description 
| :-------- | :------- 
| `app.use(express.json());` | This line tells Express to use middleware that parses incoming requests with JSON payloads. Essentially, it allows your Express app to understand and process JSON data that is sent in the body of requests (like POST requests) |
| `app.use(express.urlencoded({ extended: true }));` | This middleware is similar to express.json() but is specifically for parsing URL-encoded data. The extended: true option tells Express to use the qs library for parsing, which allows for rich objects and arrays to be encoded into the URL-encoded format, providing a deeper parsing capability. |

CORS (Cross-Origin Resource Sharing) is a mechanism that allows or restricts requested resources on a web server depending on where the HTTP request was initiated. This is used for security reasons and to control where your server's resources can be accessed from.

| Code | Description 
| :-------- | :------- 
| `const corsOptions = {...};` | This is defining an object corsOptions that holds the configuration for CORS in your Express app. It specifies which origins and methods are allowed when accessing your server.|
| `origin: 'localhost'` |  indicates that only requests coming from 'localhost' are allowed. Note: In a real-world scenario, you'd typically specify the full URL (like http://localhost:9999) |
| `methods: 'GET,POST'` |  means only GET and POST requests are allowed from the specified origin. |
| `methods: 'GET,POST'` |  means only GET and POST requests are allowed from the specified origin. |
| `app.options('*', cors(corsOptions));` |      This line is setting up CORS for preflight requests. A preflight request is automatically made by browsers in certain cases, usually with requests that are more "complex" than a simple GET or POST (like requests with custom headers, etc.). The '*' means this applies to all routes. It tells the Express app to respond to preflight requests with the CORS headers defined in corsOptions.|
| `app.use(cors(corsOptions));` |  Finally, this applies the CORS configuration to all other routes in your application. This line tells Express to use the CORS middleware with your specified corsOptions, enabling cross-origin requests based on your configuration.|

###

#### dotenv and configuration:

```javascript
dotenv.config();
```

Configures the application to use the .env file.


If you would like to use a variable from the .env file:

```javascript
process.env.KEY
```

Example .env file:
```javascript
DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=password
```

Example use case:

```javascript
console.log(process.env.DB_HOST)
```
Returns:
```javascript
localhost
```

This is primarily used to api-keys etc...

###

#### Routing and Routes: 

```javascript
app.post('/api/', async (req, res) => {
  console.log(req.body);
  const placeHolderFunction = await placeHolder.placeholder();
  console.log(placeHolderFunction);
});
```

Declaration of the route:

/api/ is the endpoint (localhost:port/api/)

```javascript
app.post('/api/', async (req, res) => {
});
```

Request:

req.body => will give you the entire body of the request (usually JSON format)
```javascript
app.post('/api/', async (req, res) => {
  console.log(req.body); // gives you the entire body of the request
  console.log(req.body.username); // gives you the username if it exists within the body
});
```

Response:

res => has a number of options, but normally res.status is the main one, and then also .json or .send
```javascript
app.post('/api/', async (req, res) => {
  console.log(req.body);
  console.log(req.body.username); 

  res.status(200).send('At least not a 404 error :D')
  res.status(200).JSON({ username: req.body.username }) //sends the username back
});
```


###


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

