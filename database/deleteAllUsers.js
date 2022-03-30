import mysql from 'mysql';

const deleteAllUsers = function() {

    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "api"
    });

    connection.connect(function(err) {
        if (err) throw err;

        connection.query("DELETE FROM users", function (err, result) {
            if (err) throw err;
        });
    });

};

export default deleteAllUsers;
