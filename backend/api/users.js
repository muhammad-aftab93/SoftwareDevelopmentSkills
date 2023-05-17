const express = require('express');
const users = require("../users");
const router = express.Router();

// Get All users
router.get('/', (req, res) => {
    res.json(users);
});

module.exports = router;