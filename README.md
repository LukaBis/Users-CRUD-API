<h1>Users CRUD API with Node, Express, MySQL and Mocha</h1>
<img src="https://img.shields.io/badge/License-MIT-blue.svg" />

##### Table of Contents  
- [1.Description](#description)  
- [2.Installation](#instalation)
- [3.HowTo](#HowTo)


<a name="description"/>
<h3>Description</h3>

<p>This is a simple CRUD API. It can be used to store and manage users. Users have their id, first name, last name and age.</p>

<a name="instalation"/>
<h3>Installation</h3>

<p>Firstly, you need to have MySQL installed on your machine. Have MySQL up and running.</p>
<p>Next, you have to navigate to api directory and run:</p>

```
npm install
```

<p>After that you have to setup the database. You can do that by running:</p>

```
node database/setup.js
```

<p>If you want to run this app, then navigate to app directory and run:</p>

```
node server.js
```

<a name="HowTo"></a>
<h3>How to use this api</h3>

<p>You can use Postman to interact with this API.</p>

<p>In order to get all users from database you can navigate to this route: http://localhost:5000/users/</p>

<p>In order to create new user you can send post request to this route: http://localhost:5000/users/ . That request has user json object that looks something like this:</p>

```
{
    "firstName": "Johnny",
    "lastName": "Smith",
    "age": 24
}
```

<p>In order to get one specific user you will have to specify user's id in get request. In other words, send get request on this route http://localhost:5000/users/{userId} .</p>

<p>Similarly, if you want to delete one specific user you send DELETE request on http://localhost:5000/users/{userId} .</p>

<p>In case you need to update some user's data, you send patch request on this route: http://localhost:5000/users/{userId} and you provide object that has properties that you want to update. That JSON would look something like this: </p>

```
{
    "firstName": "new name",
    "age": 25
}
```

<p>Running tests for this API can be done by running this from terminal: </p>

```
./node_modules/mocha/bin/mocha
```
<p>or</p>

```
./node_modules/mocha/bin/mocha --exit
```
