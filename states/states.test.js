const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

let token;

beforeEach(async () => {
    await db('users').del()
})
describe('states router', () => {
    it('should not allow access without token', async () => {
        const res = await request(server).get('/api/states');

        expect(res.status).toBe(401)
    })
    it('should allow access with token', async () => {
        await request(server).post('/api/auth/register')
                .send({username: 'Sonic', password: 'rings'})
            
        let res = await request(server).post('/api/auth/login')
                .send({username: 'Sonic', password: 'rings'})
        
        token = res.body.token

        let res2 = await request(server).get('/api/states')
            .set('Authorization', token)
        
        expect(res2.status).toBe(200)
    })
    it('should be an array containing 50 states', async () => {
        let res = await db('states')

        expect(Array.isArray(res)).toBe(true)
        expect(res).toHaveLength(50)
    })
})