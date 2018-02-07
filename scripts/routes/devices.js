const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Device = require('../models/device');


router.post('/save', (req, res, next) => {
    var newDevice = new Device({
        _id: req.body.id,
        data: req.body.data
    });

    console.log(req.body.data)

    Device.addDevice(newDevice, (err, data) => {
        console.log(data)
    })
})

router.post('/create/:id', (req, res, next) => {
    let element = req.body.data;

    function checkIfAlreadyPresent(array, element, id) {
        console.log(array);
        console.log(element);
        let isInArray = false;
        array.forEach(function (item) {
            if ((item.name === element.name)) {
                console.log('element is in array')
                isInArray = false;
            } else {
                console.log('element is not present in array')
                isInArray = true;
            }
        });
        if (isInArray) {
            Device.update({ _id: id }, { $push: { data: element } }, { safe: true, upsert: true }, (err, data) => {
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
        }

    }

    Device.findById(req.params.id, function (err, data) {
        if (data !== undefined) {
            checkIfAlreadyPresent(data.data, element, req.params.id)
        } else {
            console.log('data is missing');
        }
    })

});

module.exports = router;
