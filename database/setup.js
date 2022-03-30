import mysql from 'mysql';

/*
    Run node database/setup.js to create database
*/

var connection = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "password"
});

connection.connect(function(err) {
    if (err) throw err;

    connection.query("CREATE DATABASE api", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });

    connection.query(
        `
        CREATE TABLE api.users (
            id int NOT NULL AUTO_INCREMENT,
            firstName varchar(255),
            lastName varchar(255),
            age int,
            PRIMARY KEY (id)
        );
        `,
        function(err, result) {
            if (err) throw err;
            console.log("Table created");
            process.exit();
        }
    );
});
