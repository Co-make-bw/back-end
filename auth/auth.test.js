const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('authentication router', () => {
    it('should run the tests', () => {
        expect(true).toBe(true)
    })
    beforeEach(async () => {
        await db('users').del();
    })
    describe('register', () => {
        ('it returns 201 created', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({username: 'user', password: 'pass'})
            
            expect(res.status).toBe(201)
        })
        it('adds a user to the users database', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({username: 'user', password: 'pass'})

            const users =  await db('users')
            expect(users).toHaveLength(1)
        })
        it('returns an object with json formatted body', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({username: 'user', password: 'pass'})
            
            expect(res.type).toMatch(/json/)
        })
    })
    describe('login', () => {
        it('should return 200 OK', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({username: 'user', password: 'pass'})

            let res = await request(server)
                .post('/api/auth/login')
                .send({username: 'user', password: 'pass'})
            
            expect(res.status).toBe(200)
        })
    })
})