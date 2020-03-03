const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const statesRouter = require('../states/states-router');
const issuesRouter = require('../issues/issues-router');
const restrcited = require('../auth/restricted-middleware');

router.use('/auth', authRouter);
router.use('/users', restrcited, usersRouter);
router.use('/states', restrcited, statesRouter);
router.use('/issues', restrcited, issuesRouter);

module.exports = router;