const request = require('supertest');
const express = require('express');
const app = require('../server');
const User = require('../models/user')


const validDataUser = {
    email: "pavlo.sad1@gmail.com",
    password: "12345678"
}



describe("Test the auth path", () => {

    describe('Login', () => {
        beforeEach(async () => {
            try{
                jest.mock('mongoose', () => {
                    return { createConnection: jest.fn() };
                })
            }catch (err){
                if(err) console.log(err)
            }

        });
            test('Login with valid data', async () => {
                const validUser = User.findOne(validDataUser);
                expect(validUser).toBeDefined();
            })

    });

});

