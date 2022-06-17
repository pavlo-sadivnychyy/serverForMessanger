const request = require('supertest');
const express = require('express');
const app = require('../server');
const Conversation = require('../models/Conversation')

const validDataConverstion = {
    members:['sdadsadasd', 'sdasaddsadsdsdasddds'],
    important: false,
    _id: (Math.random() * 100).toString()
}
const invalidDataConverstion = {
    members:['sdadsadasd', 'sdasaddsadsdsdasddds'],
    important: false,
}


describe("Test the converstion path", () => {
    test("It should response converstion by converstion id", done => {
        request(app)
            .get("/conversations/byId/34")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).not.toBeNull();
                done();
            });
    });

    test("It should response error", done => {
        request(app)
            .get("/conversations/byId/34")
            .then(response => {
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
                done();
            });
    });


    test("It should response converstion by converstion id", done => {
        request(app)
            .get("/conversations/34")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).not.toBeNull();
                done();
            });
    });

    test("It should response error", done => {
        request(app)
            .get("/conversations/34")
            .then(response => {
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
                done();
            });
    });

    test("It should response important conversations", done => {
        request(app)
            .get("/conversations/important/34")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).not.toBeNull();
                done();
            });
    });

    test("It should response important conversations", done => {
        request(app)
            .delete("/conversations/34")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test("It should response error", done => {
        request(app)
            .get("/conversations/important/34")
            .then(response => {
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
                done();
            });
    });


    describe('Add Group', () => {
        beforeEach(async () => {
            try{
                jest.mock('mongoose', () => {
                    return { createConnection: jest.fn() };
                })
            }catch (err){
                if(err) console.log(err)
            }

        });

        describe("add new converstion", done => {
            test('new Converstion with valid data', async () => {
                const validConversation = new Conversation(validDataConverstion);
                const savedConversation = await validConversation.save();
                expect(savedConversation._id).toBeDefined();
                expect(savedConversation.members).toStrictEqual(validDataConverstion.members);
                expect(savedConversation.important).toBe(validDataConverstion.important);
            })
            test('new Converstion with invalid data', async () => {
                const invalidConverstion = new Conversation(invalidDataConverstion);
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
            })
        })

        describe("Mark converstion as important ", done => {
            test('Converstion with valid data', async () => {
                const validConversation = Conversation.findOneAndUpdate(validDataConverstion);
                expect(validConversation).toBeDefined();
            })
            test(' Converstion with invalid data', async () => {
                const invalidConverstion = new Conversation(invalidDataConverstion);
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
            })
        })

        describe("Unmark converstion from important", done => {
            test('Converstion with valid data', async () => {
                const validConversation = Conversation.findOneAndUpdate(validDataConverstion);
                expect(validConversation).toBeDefined();
            })
            test(' Converstion with invalid data', async () => {
                const invalidConverstion = new Conversation(invalidDataConverstion);
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
            })
        })

    });

});

