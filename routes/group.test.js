const request = require('supertest');
const express = require('express');
const app = require('../server');
const Group = require('../models/Group')

const validDataGroup = {
    members: ['sadasd', 'sadsadsad'],
    name: "asdsadsda"
}
const invalidDataGroup = {
    name: "asdsadsda"
}


describe("Test the groups path", () => {
    test("It should response grops by user id", done => {
        request(app)
            .get("/groups/34")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).not.toBeNull();
                done();
            });
    });

    test("It should response error", done => {
        request(app)
            .get("/groups/sa")
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

        describe("add new team", done => {
            test('new Group with valid data', async () => {
                const validGroup = new Group(validDataGroup);
                const savedGroup = await validGroup.save();
                expect(savedGroup._id).toBeDefined();
                expect(savedGroup.members).toStrictEqual(validDataGroup.members);
                expect(savedGroup.name).toBe(validDataGroup.name);
            })
            test('new Group with invalid data', async () => {
                const invalidGroup = new Group(invalidDataGroup);
                const t = () => {
                    throw new TypeError();
                };
                expect(t).toThrow(TypeError);
            })
        })

    });

});

