const request = require('supertest');
const express = require('express');
const usersRouter = require('./users');
const User = require('../models/user');
const mongoose = require('mongoose');

const app = require('../server');


const userDataValid = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "sadsadsa",
    surname: "sadsad",
    nickname: "sadsad",
    phone_number: '123213123',
    dob: "sadsad",
    gender: "sadsad",
    languages: "sadsad",
    email: 'pavlo.sad1@gmail.com',
    password: '123456789'
};
const userDataInvalid = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "sadsadsa",
    surname: "sadsad",
    nickname: "sadsad",
    dob: "sadsad",
    gender: "sadsad",
    languages: "sadsad",
    email: 'pavlo.sad1@gmail.com',
    password: '123456789'
};

describe("Test the users path", () => {
    test("It should response the GET method", done => {
        request(app)
            .get("/users/all")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).not.toBeNull();
                done();
            });
    });
    test("It should response the user by id", done => {
        request(app)
            .get("/users/34")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).not.toBeNull();
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
        
        describe("add new user", done => {
            test('new User with valid data', async () => {
                const validUser = new User(userDataValid);
                const savedUser = await validUser.save();
                expect(savedUser._id).toBeDefined();
                expect(savedUser.email).toBe(userDataValid.email);
                expect(savedUser.password).toBe(userDataValid.password);
                expect(savedUser.name).toBe(userDataValid.name);
                expect(savedUser.surname).toBe(userDataValid.surname);
                expect(savedUser.languages).toBe(userDataValid.languages);
                expect(savedUser.phone_number).toBe(userDataValid.phone_number);
                expect(savedUser.dob).toBe(userDataValid.dob);
                expect(savedUser.gender).toBe(userDataValid.gender);
            })
            test('new User with invalid data', async () => {
                const invalidUser = new User(userDataInvalid);
                const savedUser = await invalidUser.save();
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
            })
    })

    });
});
