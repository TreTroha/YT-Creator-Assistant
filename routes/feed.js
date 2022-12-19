const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth') 
const postsController = require('../controllers/posts')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/logout', authController.logout)
router.get('/newVideo', ensureAuth,  postsController.getNewVideo) // /feed/newVideo
router.post("/createPost", upload.single("file"), postsController.createPost);

module.exports = router