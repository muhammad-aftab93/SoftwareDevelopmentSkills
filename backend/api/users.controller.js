const express = require('express');
const usersController = require("../users");
const bcrypt = require("bcrypt");
const mongodb = require("../database/mongodb");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = 'your-secret-key';

// Get All usersController - just for the testing purposes
router.get('/', (req, res) => {
    res.json(usersController);
});

// Login Api
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const db = mongodb.getDB();
        const usersCollection = db.collection('users');
    
        // Find the user by username
        const user = await usersCollection.findOne({ username });
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Passwords match, generate a JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        
        // clearing user password before returning the user to the frontend application
        user.password = null;
    
        // Passwords match, authentication successful
        return res.json({ status: true, message: 'Authentication successful', token, user });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
});

// Signup Api
router.post('/signup', async (req, res) => {
    const {username, password} = req.body;

    try {
        const db = mongodb.getDB();
        const usersCollection = db.collection('users');

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({username});
        if (existingUser) {
            return res.status(409).json({error: 'User already exists'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = {
            username,
            password: hashedPassword,
            role: "user"
        };

        // Insert the user document into the collection
        const result = await usersCollection.insertOne(newUser);

        res.status(201).json({status: true, message: 'User created', userId: result.insertedId});
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Protected route example
router.get('/protected', (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the JWT token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Token is valid, return protected data
        res.json({ message: 'Protected data', userId: decoded.userId });
    });
});

module.exports = router;