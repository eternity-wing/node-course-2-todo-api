const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {todos, populateTodos, users, populateUsers} = require('./seed/seed');



beforeEach(populateTodos);
beforeEach(populateUsers);


describe('Post /todos', () => {
    it('shoud create new todo', (done) => {
        var text = 'test todo text';
        request(app)
        .post('/todos') 
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text)
        }).end((err, res) => {
            if(err){
                return done(err);
            }


            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        }); 
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400) 
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });

    describe('GET /todos', () => {
        it('shoud get all todos', (done) => {
            request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            }).end(done);
        });
    });

    describe('GET /todos/:id',() => {
        it('should return todo doc', (done) => {
            request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
        });


        it('should return 404 if todo not found', (done) => {
            var hexId = new ObjectID().toHexString();
            request(app)
            .get(`/todos/${hexId}`).
            expect(404).end(done);
        });


        it('should return 404 for non-object ids', (done) => {
            request(app)
            .get(`/todos/123`).
            expect(404).end(done);
        });


    });

    describe('DELETE /todos/:id ', () => {
        // it('should remove a todo', (done) => {
        //     var hexId = todos[1]._id.toHexString();
        //     request(app)
        //     .delete(`/todos/${hexId}`)
        //     .expect(200)
        //     .expect((res) => {
        //         expect(res.body.todo._id).toBe(hexId);
        //     }).end((err, res) => {
        //         if(err){
        //             return done(err);
        //         }
        //         Todo.findById(res._id).then((todo) => {
        //             expect(todo).toNotExist();
        //             done();
        //         }).catch((e) => done(e));
        //     });
        // });

        // it('should return 404 if todo not found', (done) => {
        //     var id = "";
        //     request(app).delete(`/todos/${hexId}`).expect(404).end(done);
        // });

        // it('should return 404 if object-id invalid', (done) => {
        //     var id = "";
        //     request(app).delete(`/todos/${hexId}`).expect(200).end(done);
        // });


    });

    describe('GET users/me', () => {
        it('should return user if authenticated', (done) => {
            request(app)
            .get('/users/me').set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
                
            })
            .end(done);
        });


        it('should return 401 if not authenticated', (done) => {
            request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
        });

    });


    describe('POST /users', () => {
        it('shoud create a user', (done) => {
            var email = 'example@example.com';
            var password = '123mnb!';
            request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if(err){
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch((e) => done());
            });
        });

        it('shoud return validation error if request invalid', (done) => {
            request(app)
            .post('/users')
            .send({email: 'and', password: '123'})
            .expect(400)
            .end(done);
        });

        it('shoud not create user if email in use', (done) => {
            request(app)
            .post('/users')
            .send({email: users[0].email, password: 'Password123!'})
            .expect(400)
            .end(done);
        });

    });


    describe('POST /users/login', () => {
        it('should login user and return auth token', (done) => {
            request(app)
            .post('/users/login')
            .send({
                 email: users[1].email,
                 password: users[1].password
                })
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toBeTruthy();
                })
                .end((err, res) => {
                    if(err){
                        return done(err);
                    }
                    
                    User.findById(users[1]._id).then((user) => {
                        // expect(user.tokens[0]).toInclude({
                        //     access: 'auth',
                        //     token: res.headers['x-auth']
                        // });
                        done();
                    }).catch((e) => done(e));
                });
        });

        it('should reject invalid login', (done) => {
            request(app)
            .post('/users/login')
            .send({
                 email: users[1].email,
                 password: users[1].password + '1'
                })
                .expect(400)
                .expect((res) => {
                    expect(res.headers['x-auth']).toBeFalsy();
                })
                .end((err, res) => {
                    if(err){
                        return done(err);
                    }
                    
                    User.findById(users[1]._id).then((user) => {
                        expect(user.tokens.length).toBe(1);
                        done();
                    }).catch((e) => done(e));
                });
        });

    });

});


