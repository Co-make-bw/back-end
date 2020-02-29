## Install dependencies
- `npx gitignore node`
- Add Mac Cruft inside gitignore
- Add package.json `npm init -y`
- Install nodemon, jest and supertest as development dependencies 
    * `npm i -D nodemon jest supertest`
- `npm install knex`
- `npm install express`
- `npm install -g knex`
- `npm i bcryptjs`
- `npm i cors`
- `npm i helmet`
- `npm install jsonwebtoken`
- `npm i dotenv`
- `npm i pg`
- Add scripts 
    * `"test": "jest --watch"`
    * `"server": "nodemon index.js"`
    * `"start": "node index.js"`
```js
"jest": {
    "testEnvironment": "node"
  }
```
## Create root files
- .env
- index.js
## Create folders with files
- api
    * `api-router.js`
    * `configure-middleware.js`
    * `server.js`
- auth
    * `auth-router.js`
    * `restricted-middleware.js`
- data
    * `dbConfig.js`
- users
    * `users-model.js`
    * `users-router.js`
- config
    * `secrets.js`