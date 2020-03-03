require('dotenv').config();

const request = require('supertest');
const server = require('./server');

describe('server', () => {
    describe('environment', () => {
        it('should run the tests', () => {
            expect(true).toBe(true)
        })
        it('should use the testing environment', () => {
            expect(process.env.DB_ENV).toBe('testing')
        })
        it('should return status 200 after GET', async () => {
            const res = await request(server).get('/')

            expect(res.status).toBe(200)
        })
    })
})