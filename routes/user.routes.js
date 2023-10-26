const router = require('express').Router();
const { register, login } = require('../controllers/user.controllers');
const {  } = require('../midlewares/user.midlewares');

router.post('/register', register);
router.post('/login', login);

router.post('/authenticate');

module.exports = router;