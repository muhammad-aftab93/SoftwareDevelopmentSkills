const express = require('express');
const app = express();
const path = require('path');
const mongodb = require("./database/mongodb");
const cors = require('cors');

app.use(cors());
// app.use(cors({
//     origin: '*',
//     methods: '*',
//     allowedHeaders: '*',
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./api/users.controller'));
app.use('/api/courses', require('./api/courses.controller'));

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

mongodb.connect().then().catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

