import mysql from 'mysql';
import seedUsers from '../database/seedUsers.js';

const databaseSetup = function(users, done) {

    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "api"
    });

    // firstly,  we clear everything in database i.e. we delete all users
    // secondly, we seed users in database

    connection.connect(function(err) {
        if (err) throw err;

        connection.query("DELETE FROM users", function (err, result) {
            if (err) throw err;
            seedUsers(users, done)
        });
    });

};

export default databaseSetup;
