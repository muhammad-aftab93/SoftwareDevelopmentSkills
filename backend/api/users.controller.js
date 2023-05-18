const express = require('express');
const usersController = require("../users");
const router = express.Router();

// Get All usersController - just for the testing purposes
router.get('/', (req, res) => {
    res.json(usersController);
});

// Login Api
router.post('/login', (req, res) => {
    res.json(true);
});

// Signup Api
router.post('/signup', (req, res) => {
    res.json(true);
});

module.exports = router;