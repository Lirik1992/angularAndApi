const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authentication
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({data: user}, config.secret, {expiresIn: 604800}, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    });
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Update User
router.put('/profile/update', verifyToken, (req, res) => {
    jwt.verify(req.token, config.secret, (err, data) => {
        User.update(
            {_id: req.body.id},
            {$push: {devices: req.body.devices}},
            {safe: true, upsert: true},
            (err, data) => {
                res.json({
                    success: true,
                    data
                });
            }
        );
    });
});

// Passport auth
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// Get profile data
router.get('/profile/user', verifyToken, (req, res) => {
    jwt.verify(req.token, config.secret, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Profile has been found',
                data
            });
        }
    });
});

// JSON Web Token check
router.post('/devices/load', verifyToken, (req, res) => {
    jwt.verify(req.token, config.secret, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created',
                data
            });
        }
    });
});

// Get device by ID
router.get('/profile/device/:id', (req, res) => {
    var id = req.params.id;
    User.findById(id, (err, data) => {
        var devices = data.devices;
        res.json({
            devices
        });
    });
});

// Check if the username is already taken
router.post('/profile/check', (req, res) => {
    User.findOne(req.body.username, (err, data) => {
        if (data != 'undefined') {
            res.json({data});
        } else {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                gender: req.body.gender
            });

            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({success: false, msg: 'Failed to register user'});
                } else {
                    res.json({success: true, msg: 'User registered'});
                }
            });
        }
    });
});

// Verify token MIDDLEWARE
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        //Pull the actual token
        const bearer = bearerHeader.split(' ').splice(1, 1)[0];
        //Set the token
        req.token = bearer;
        // Next MIDDLEWARE
        next();
    } else {
        res.json({message: 'Server responded with the 403 code.'});
    }
}

// Get all Users
router.get('/getall', (req, res, next) => {
    User.find({}, function (err, users) {
        res.json(users);
    });
});


module.exports = router;
