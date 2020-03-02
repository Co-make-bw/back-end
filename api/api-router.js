const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const statesRouter = require('../states/states-router')
const restrcited = require('../auth/restricted-middleware');

router.use('/auth', authRouter);
router.use('/users', restrcited, usersRouter);
router.use('/states', restrcited, statesRouter);

module.exports = router;