const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const rootPath = path.normalize(__dirname + '/../');

// // Connect to database
// mongoose.connect(config.database);

// //On connection
// mongoose.connection.on('connected', () => {
//     console.log('Connected to database ' + config.database);
// });

// mongoose.connection.on('error', (err) => {
//     console.log('Database error ' + err);
// });


const app = express();
const server = require('http').Server(app);
// const io = require('socket.io')(server, {serverClient: true});


// // Router routes
// const users = require('./routes/users');
// const devices = require('./routes/devices');

// Port
const port = 3000;

// Cors Middleware
app.use(cors());

// Set static folder
app.use(express.static(rootPath + '/app'));

// // Body-parser Middleware
// app.use(bodyParser.json());

// // Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);

// // Path to collections
// app.use('/users', users);
// app.use('/devices', devices);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});


// io.on('connection', function(socket) {
//     socket.emit('connected', 'You are connected');
//     socket.on('my event', function(data) {
//         console.log(data)
//     });
// });


//Start Server
server.listen(port, () => {
    console.log("Server started on " + port);
});

