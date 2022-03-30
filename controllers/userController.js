import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql';


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : 'api'
});

let users = [];

export const createUser = (req, res) => {
    const user = req.body;

    connection.query(
        `
        INSERT INTO users (firstName, lastName, age)
        VALUES ('${user.firstName}', '${user.lastName}', ${user.age});
        `,
        function(err, result) {
            if (err) {
                res.send('Something went wrong');
                throw err;
            }

            res.send(`user ${user.firstName} stored`);
            //console.log(`User ${user.firstName} added`);
        }
    );
};

export const getUsers = (req, res) => {

    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        // console.log('All users: ', results);
        res.send(results);
    });

}

export const getUser = (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM users WHERE id = ' + id, function (error, results, fields) {
        if (error) throw error;
        //console.log('All users: ', results);
        res.send(results);
    });

}

export const deleteUser = (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM users WHERE id = ' + id, function (error, results, fields) {
        if (error) throw error;
        //console.log('User deleted');
    });

    res.send(`User with the id ${id} deleted`);
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find(user => user.id == id);

    if (firstName) {
        connection.query(`UPDATE users SET firstName = '${firstName}' WHERE id = ${id}`, function (error, results, fields) {
            if (error) throw error;
        });
    }

    if (lastName) {
        connection.query(`UPDATE users SET lastName = '${lastName}' WHERE id = ${id}`, function (error, results, fields) {
            if (error) throw error;
        });
    }

    if (age) {
        connection.query(`UPDATE users SET age = ${age} WHERE id = ${id}`, function (error, results, fields) {
            if (error) throw error;
        });
    }

    res.send(`User with the id ${id} updated`);
}
