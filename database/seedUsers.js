import mysql from 'mysql';

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api"
});

const seedUsers = function(users, done) {

    connection.connect(function(err) {
        if (err) throw err;

        let arrayOfInsertedUserIds = [];

        for (var i = 0; i < users.length; i++) {
            let sql = `INSERT INTO users (id, firstName, lastName, age) VALUES (?, ?, ?, ?);`;
            let query = mysql.format(sql, [i + 1, users[i].firstName, users[i].lastName, users[i].age]);

            connection.query(query, function (err, result) {
                if (err) throw err;

                arrayOfInsertedUserIds.push(result["insertId"]);

                if(arrayOfInsertedUserIds.length == users.length) {
                    // when last user is inserted we call done()
                    done()
                }
            });
        }
    });

};

export default seedUsers;
