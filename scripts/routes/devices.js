const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Device = require('../models/device');


router.post('/create', (req, res, next) => {
    
    var newDevice = new Device({
        _id: req.body.id,
        data: req.body.data
    });

    console.log(req.body.data);

    Device.addDevice(newDevice, (err, data) => {
        if (!err) {
            res.json({
                message: 'successfully added an array to collection',
                data
            })
        } else {
            res.json({
                message: 'failed to add an array to collection',
                err
            })
        }
    })
});

//Find device in devices array by id and update it fields
router.post('/update/:deviceID/:deviceIndex', (req, res, next) => {
    console.log('router.post(/update/:deviceID/:deviceIndex) fired up, get following logic callback');
    let deviceID = req.params.deviceID;
    let deviceIndex = req.params.deviceIndex;
    let updatedDevice = req.body;
    console.log(deviceID + '  ' + deviceIndex + '   ' + updatedDevice);

    Device.getDeviceById(deviceID, (err, data) => {
        if(!err) {
            console.log(data.data)
            let oldArray = data.data;
            let newArray = oldArray.map(function(item, index, oldArray) {
                oldArray[deviceIndex] = updatedDevice
                return oldArray;
            })[0];
            console.log('This is the new data array ' + JSON.stringify(newArray));

            Device.update({_id: deviceID}, {
                $set: {
                    data: newArray
                }
            },  {
                safe: true,
                upsert: true
            },
             (err, data) => {
                if(!err) {
                    console.log(data);
                    res.json({
                        message: 'Device has been successfully updated',
                        data
                    })
                } else {
                    res.json({
                        message: 'Failed to update device',
                        err
                    })
                }
            })
        } else {
            res.json({
                message: 'Failed to to get device by id',
                err
            })
        }
    })
});

// Update array if device array exists in it, or create new array and add new value
router.post('/save/:id', (req, res, next) => {
    console.log('router.post(/save/:id) fired up, get following logic callback');
    let element = req.body;

    function checkIfAlreadyPresent(array, element, id) {
        console.log(array);
        console.log(element);
        let isInArray = false;
        array.forEach(function (item) {
            if ((item.name === element.name)) {
                console.log('element is in array');
                isInArray = false;
            } else if (array.length === 0) {
                isInArray = true;
            } else {
                console.log('element is not present in array');
                isInArray = true;
            }
        });
        if (isInArray) {
            Device.update({_id: id}, {$push: {data: element}}, {
                safe: true,
                upsert: true
            }, (err, data) => {
                if (!err) {
                    isInArray = false;
                    res.json({
                        status: 'success',
                        data
                    })
                } else {
                    res.json({
                        status: 'failed',
                        err
                    })
                }
            })
        } else {
            res.json({
                message: 'Array already has that value, failed to add that device'
            });
            next();
        }
    }

    Device.findById(req.params.id, function (err, data) {
        if (data !== null) {
            checkIfAlreadyPresent(data.data, element, req.params.id)
        } else {
            let newDevice = new Device({
                _id: req.params.id,
                data: element
            });
            Device.addDevice(newDevice, (err, data) => {
                if (!err) {
                    res.json({
                        message: 'data record was created',
                        data
                    })
                } else {
                    res.json({
                        message: 'failed to create new record'
                    })
                }
            })
        }
    })

});

// Get device array by ID
router.get('/getDevice/:id', (req, res) => {
    Device.findById(req.params.id, (err, data) => {
        if (!err) {
            res.json({
                message: 'successfully get device by id',
                data
            })
        } else {
            res.json({
                message: 'failed to det device array',
                err
            })
        }
    })
});


router.get('/allDevices', (req, res) => {
    Device.find({}, (err, devices) => {
        if (!err) {
            res.json({
                message: 'successfully get all devices from the server',
                data: devices
            })
        } else {
            res.json({
                message: 'something bad happened',
                error: err
            })
        }
    })
});

module.exports = router;
