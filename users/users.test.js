const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');
const Users = require('./users-model');

let token;

beforeEach(async () => {
    return await db('users').del()
})
afterAll(async () => {
    return await db('users').del()
})
describe('users route', () => {
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
    // describe('remove()', () => {
    //     it('should remove the user', async () => {
    //         await Users.add({username: 'bob', password: 'bobbo'})
    //         let user = await Users.add({username: 'Tom', password: 'ford'})

    //         await Users.remove(user.id)
            
    //         let res = await db('users')

    //         expect(res).toHaveLength(1)
    //     })
    // })
    describe('getStates()', () => {
        it('should only return a users states', async () => {
            let user1 = await Users.add({username: 'bob', password: 'bobbo'})
            let user2 = await Users.add({username: 'bill', password: 'billy'})

            user1ID = user1.id;
            user2ID = user2.id;

            await Users.addUserState(user1ID, 21)

            await Users.addUserState(user2ID, 20)
            await Users.addUserState(user2ID, 25)

            let res = await Users.getStates(user1ID)
            
            let database = await db('user_states')
            let res2 = database.filter(state => state.user_id === user1ID)
            
            expect(res[0].state_id).toBe(21)
            expect(res[0].state_id).toBe(res2[0].state_id)
            
        })
    })
    describe('addUserStates()', () => {
        it('should associate a state to a user', async () => {
            let user = await Users.add({username: 'frodo', password: 'baggins'})
            let userID = user.id
            await Users.addUserState(userID, 21)
            await Users.addUserState(userID, 29)

            let res = await db('user_states')
            expect(res.every(state => state.user_id === userID)).toBe(true)
        })
    })
    describe('getUserState()', () => {
        it('should return the correct state', async () => {
            let user = await Users.add({username: 'pippin', password: 'pip'})
            let userID = user.id

            await Users.addUserState(userID, 21)
            let state = await Users.getUserState(userID, 21)

            expect(state.state).toMatch('Massachusetts')
        })
    })
    describe('removeUserState()', () => {
        it('should remove the correct state', async () => {
            let user = await Users.add({username: 'frodo', password: 'baggins'})
            let userID = user.id

            await Users.addUserState(userID, 21)
            await Users.addUserState(userID, 29)

            await Users.removeUserState(userID, 21)

            let res = await Users.getUserState(userID, 21)

            expect(res).toBeUndefined()
        })
    })
})