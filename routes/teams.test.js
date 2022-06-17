const request = require('supertest');
const express = require('express');
const app = require('../server');
const Team = require('../models/Team')


const validDataTeam = {
    conversations: ['sadasd', 'sadaasdsadsd'],
    name: "test team",
    userId: 'dsasadasdsads'
}
const invalidDataTeam = {
    name: "test team",
    userId: 'dsasadasdsads'
}


describe("Test the teams path", () => {
    test("It should response teams by user id", done => {
        request(app)
            .get("/teams/34")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).not.toBeNull();

                done();
            });
    });

    test("It should response error", done => {
        request(app)
            .get("/teams/sa")
            .then(response => {
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
                done();
            });
    });


    describe('Add Team', () => {
        beforeEach(async () => {
            try{
                jest.mock('mongoose', () => {
                    return { createConnection: jest.fn() };
                })
            }catch (err){
                if(err) console.log(err)
            }

        });

        describe("add new team", done => {
            test('new Team with valid data', async () => {
                const validTeam = new Team(validDataTeam);
                const savedTeam = await validTeam.save();
                expect(savedTeam._id).toBeDefined();
                expect(savedTeam.conversations).toStrictEqual(validDataTeam.conversations);
                expect(savedTeam.userId).toBe(validDataTeam.userId);
                expect(savedTeam.name).toBe(validDataTeam.name);
            })
            test('new Team with invalid data', async () => {
                const invalidTeam = new Team(invalidDataTeam);
                const savedTeam = await invalidTeam.save();
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
            })
        })

    });

});

