## Getting started
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

## Inside .env
- Add `PORT=5000`

## Inside index.js
- Add `require('dotenv').config();` at the very top
- Add `const server = require('./api/server.js');`
- Add `const PORT = process.env.PORT || 5000;`
- Add `server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));`

## Inside users-router.js
- Add `const express = require('express');`
- Add `const router = express.Router();`
- Add `const Users = require('./users-model');`
- Add `module.exports = router;`

## Inside dbConfig.js
// Need to change
- Add `const knex = require('knex');`
- Add `const configOptions = require('../knexfile').development;`
- Add `module.exports = knex(configOptions);`

## Inside users-model.js
- Add `const db = require('../data/dbConfig');`
- Add `module.exports = {}`

## Inside server.js
- Add `const express = require('express');`
- Add `const apiRouter = require('./api-router.js');`
- Add `const configureMiddleware = require('./configure-middleware.js');`
- Add `const server = express();`
- Add `configureMiddleware(server);`
- Add `server.use('/api', apiRouter);`
- Add (optional) `server.get('/', (req, res) => res.send('<h1>Hello from Node auth1 Project</h1>'));`
- Add `module.exports = server;`

## Inside configure-middleware.js
- Add:
```js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};
```

## Inside api-router.js
- Add `const router = require('express').Router();`
- Add `const authRouter = require('../auth/auth-router.js');`
- Add `const usersRouter = require('../users/users-router.js');`
- Add `const restrcited = require('../auth/restricted-middleware');`
- Add `router.use('/auth', authRouter);`
- Add `router.use('/users', restrcited, usersRouter);`
- Add `module.exports = router;`

## Inside auth-router.js
- Add `const bcrypt = require('bcryptjs');`
- Add `const router = require('express').Router();`
- Add `const Users = require('../users/users-model.js');`
- Add `module.exports = router;`
- Add `const secrets = require('../config/secrets');`

## Inside .env
- Add JWT_SECRET=I like pineapple on pizza

## Inside secrets.js
- Add `const jwt = require('jsonwebtoken');`
- Add:
```js
module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'I like pineapple on pizza',

    generateToken(user) {
        const payload = {
            subject: user.id,
            username: user.username,
            department: user.department
        }
        const options = {
            expiresIn: '1h'
        }
        return jwt.sign(payload, this.jwtSecret, options)
    }
}
```

## Add post request to `/register` and `/login`

## Inside users-model.js
- Add functions for
    * get
    * getBy
    * getById
    * add

## Inside users-router
- Add get request

## Inside restricted-middleware.js
- Add `module.exports = (req, res, next) => etc`
- See `restricted-middleware.js` for details

## Add folders and files
- issues
  - `issues-router.js`
  - `issues-model.js`
  - add endpoints and models
- states
  - `states-router.js`
  - `states-model.js`
  - add endpoints and models


## Initialize knex
- `knex init`

## Edit knexfile.js
**BEFORE**
```js
module.exports = {
  
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },
}
```

## Create a migration
- `knex migrate:make create_users_table`

## Inside new migration file
- Create a table however you please
- Add migration `knex migrate:latest`

  -----TO DO-----
## Prepare for adding seeds
- Run `npm install knex-cleaner`
- Run `knex seed:make 00-cleanup`
- Inside the cleanup seed add
```js
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    // resets ids
    mode: 'delete',
    // don't empty migration tables
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], 
  });
};
```
- This removes all tables (excluding the two tables that track migrations) in the correct order before any seed files run.

## Make seeds
- **Important** create seeds *in the same order you created your tables* 
    * In other words, don’t create a seed with a foreign key, until that reference record exists
**Example Seeds**
- `knex seed:make 01-users`
- `knex seed:make 02-profile`

## Inside each seed
- Change all `table_name`'s to the name of the table
- Remove the following code block:
```js
  return knex('profile').del()
    .then(function () {
    });
```
- Seeds should now look like:
```js
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('profile').insert([
    {id: 1, colName: 'rowValue1'},
    {id: 2, colName: 'rowValue2'},
    {id: 3, colName: 'rowValue3'}
  ]);
};
```
- Add data to your seeds accordingly
- Run `knex seed:run` when done