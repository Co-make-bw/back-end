require('dotenv').config();

const request = require('supertest');
const server = require('./server');

describe('server', () => {
    describe('environment', () => {
        it('should run the tests', () => {
            expect(true).toBe(true)
        })
    })
})