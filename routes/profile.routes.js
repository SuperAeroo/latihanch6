const router = require('express').Router();
const { createProfile, updateProfile } = require('../controllers/profile.controllers');
const { profilePicture } = require('../libs/multer');

router.post('/', profilePicture.single('profile_picture'), createProfile );
router.put('/:id', profilePicture.single('profile_picture'), updateProfile );

module.exports = router;