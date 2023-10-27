const router = require('express').Router();
const { register, login, authenticate } = require('../controllers/user.controllers');
const { restrict } = require('../midlewares/user.midlewares');
const {  } = require('../midlewares/user.midlewares');

router.post('/register', register);
router.post('/login', login);
router.get('/', restrict, authenticate );

router.post('/authenticate');

module.exports = router;