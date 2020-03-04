const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const Users = require('./users-model');

let token;

describe('users route', () => {
    beforeEach(async () => {
        await db('users').del()
    })
    describe('Authorization check', () => {
        it('should not allow access without a token', async () => {
            const res = await request(server).get('/api/users')
    
            expect(res.status).toBe(401)
        })
        it('should allow access with a token', async () => {
            await request(server).post('/api/auth/register')
                .send({username: 'Squirtle', password : 'squirt'})
    
            let res = await request(server).post('/api/auth/login')
                .send({username: 'Squirtle', password : 'squirt'})
            
            token =  res.body.token
    
            let res2 = await request(server).get('/api/users')
                .set('Authorization', token)
    
            expect(res2.status).toBe(200)
        })
    })
    describe('add()', () => {
        it('should add a user to the user database', async () => {
            await Users.add({username: 'Pikachu', password: 'chuuuu!'})
            const pokemon = await Users.add({username: 'Charmander', password: 'charrr!'})

            const users = await db('users');

            expect(users).toHaveLength(2)
            expect(pokemon.username).toBe('Charmander')
        })
    })
    describe('get()', () => {
        it('should return an array', async () => {
            let res = await Users.get('users')
            
            expect(Array.isArray(res)).toBe(true)
        })
    })
    describe('getBy()', () => {
        it('should return the correct user', async () => {
            await Users.add({username: 'Pikachu', password: 'chuuuu!'})
            let pokemon = await Users.add({username: 'Charmander', password: 'charrr!'})
            
            let user = await Users.getBy({username: pokemon.username})

            expect(user.username).toBe('Charmander')
        })
    })
    describe('getById()', () => {
        it('should return user with the correct id', async () => {
            let user = await Users.add({username: 'bob', password: 'bobbo'})
            let res = await Users.getById(user.id)
            
            expect(res.id).toBe(user.id)
        })
    })
    describe('update()', () => {
        it('should update the user', async () => {
            let user = await Users.add({username: 'bob', password: 'bobbo'})

            user.about = 'I like testing!'

            await Users.update(user.id, user)

            let newUser = await Users.getById(user.id)
            expect(newUser.about).toBe('I like testing!')
        })
    })
})