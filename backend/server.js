const express = require('express');
const app = express();
const path = require('path');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Users Routes
app.use('/api/users', require('./api/users.controller'));

// Serve static files from the 'dist' directory
app.use(express.static(__dirname + '/dist'));

// Redirect all traffic to the 'index.html'
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

