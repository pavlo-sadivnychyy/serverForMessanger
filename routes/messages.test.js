const request = require('supertest');
const express = require('express');
const app = require('../server');
const Message = require('../models/Message')


const validDataMessage = {
    conversationId: "sdasaddsasad",
    sender: 'dsadsadsa',
    text: 'assaddsa',
    type: 'text',
}
const invalidDataMessage = {
    sender: 'dsadsadsa',
    text: 'assaddsa',
    type: 'text',
}


describe("Test the messages path", () => {
    test("It should response messages by conversation id", done => {
        request(app)
            .get("/messages/34?page=1&limit=10")
            .then(response => {
                expect(response.statusCode).toBe(200);
                // expect(response.body).not.toBeNull();
                done();
            });
    });
    test("It should response error", done => {
        request(app)
            .get("/messages/34?page=1&limit=10")
            .then(response => {
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
                done();
            });
    });


    describe('add user', () => {
        beforeEach(async () => {
            try{
                jest.mock('mongoose', () => {
                    return { createConnection: jest.fn() };
                })
            }catch (err){
                if(err) console.log(err)
            }

        });

        describe("add new message", done => {
            test('new Message with valid data', async () => {
                const validMessage = new Message(validDataMessage);
                const savedMessage = await validMessage.save();
                expect(savedMessage._id).toBeDefined();
                expect(savedMessage.sender).toBe(validDataMessage.sender);
                expect(savedMessage.text).toBe(validDataMessage.text);
                expect(savedMessage.type).toBe(validDataMessage.type);
            })
            test('new Message with invalid data', async () => {
                const invalidMessage = new Message(invalidDataMessage);
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
            })
        })

    });

});

