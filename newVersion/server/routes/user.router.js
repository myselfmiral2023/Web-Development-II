const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller')

router.post("/register", controller.createUser);
router.post("/login", controller.findUser);
// router.post("/logout", logout);
// router.get('/:id([0-9]+)')


module.exports = router;