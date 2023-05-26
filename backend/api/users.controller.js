const express = require('express');
const bcrypt = require("bcrypt");
const mongodb = require("../database/mongodb");
const jwt = require("jsonwebtoken");
const router = express.Router();
const configs = require('../constants/configs');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const db = mongodb.getDB();
        const usersCollection = db.collection('users');
    
        const user = await usersCollection.findOne({ username });
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, configs.secretKey, { expiresIn: '1h' });
        user.password = null;
        return res.json({ status: true, message: 'Authentication successful', token, user });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
});

router.post('/signup', async (req, res) => {
    const {username, password} = req.body;

    try {
        const db = mongodb.getDB();
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({username});
        if (existingUser) {
            return res.status(409).json({error: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            password: hashedPassword,
            role: "user"
        };

        const result = await usersCollection.insertOne(newUser);

        res.status(201).json({status: true, message: 'User created', userId: result.insertedId});
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;