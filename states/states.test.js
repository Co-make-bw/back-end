const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('states router', () => {
    beforeEach(async () => {
        await db('users').del()
    })
    it('should not allow access without token', async () => {
        const res = await request(server).get('/api/states');

        expect(res.status).toBe(401)
    })
    // it('should allow access with token', async () => {
    //     const res = await request(server).get('/api/states')
    //         .auth('username', 'password')
    //         .set('Accept', 'application/json')
        
    //     expect(res.status).toBe(200)
    // })
})
        // it('should allow access with token', async () => {
        //     await request(server).post('/api/auth/register')
        //         .send({username: 'Sonic', password: 'rings'})
            
        //     await request(server).post('/api/auth/login')
        //         .send({username: 'Sonic', password: 'rings'})
        // })