import request from 'supertest';
import app from '../index.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import databaseSetup from '../database/databaseTestingSetup.js';

// run ./node_modules/mocha/bin/mocha
// or run ./node_modules/mocha/bin/mocha --exit

let should = chai.should();
chai.use(chaiHttp);

describe('homepage', function() {

    before((done) => {
        const users = [
            {
                'firstName': 'John',
                'lastName': 'Smith',
                'age': 24
            },
            {
                'firstName': 'Isabella',
                'lastName': 'Doe',
                'age': 25
            },
            {
                'firstName': 'Curtis',
                'lastName': 'Lloyd',
                'age': 54
            }
        ];

        databaseSetup(users, done);

    });

    it('welcome user', function (done) {
        request(app).get('/')
        .expect(200)
        .expect('Hello from homepage', done)
    })

    it('get all users', function (done) {

        chai.request(app)
            .get('/users/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                done();
            });

    })

    it('create new user', function (done) {

        const user = {
            'firstName': 'Johnny',
            'lastName': 'Bravo',
            'age': '30'
        };

        request(app)
        .post('/users/')
        .send(user)
        .expect(200)
        .expect(`user ${user.firstName} stored`, done)
    })

    it('get specific user', function (done) {

        // there are 4 users in database at this point
        // first 3 users have ids from 1 to 3

        chai.request(app)
            .get('/users/2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.length(1);
                res.body[0].should.have.property('firstName').eq('Isabella');
                res.body[0].should.have.property('lastName').eq('Doe');
                done();
            });
    })

    it('delete specific user', function (done) {

        const id = 2;

        chai.request(app)
            .delete(`/users/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eq(`User with the id ${id} deleted`);
                done();
            });
    })

    it('update specific user', function (done) {

        const id = 3;

        chai.request(app)
            .patch(`/users/${id}`)
            .send({ lastName: "newName" })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eq(`User with the id ${id} updated`);
                done();
            });
    })

})
