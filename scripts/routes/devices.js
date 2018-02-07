const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Device = require('../models/device');

router.post('/create/:id', (req, res) => {
    let element = req.body.data[0];

    function checkIfAlreadyPresent(array, element, id) {
        console.log(array);
        console.log(element);
        let isNotInArray = false;
        array.forEach(function (item) {
            if(JSON.stringify(item) === JSON.stringify(element)) {
                console.log('array has that value');
            }
        });
        if(isNotInArray) {
            Device.update({_id: id}, {$push: {data: element}}, {safe: true, upsert: true}, (err, data) => {
                if(!err) {
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
        }
    }

    Device.findById(req.params.id, function(err, data) {
        if(data !== undefined) {
            checkIfAlreadyPresent(data.data, element, req.params.id)
        } else {
            console.log('data is missing');
        }
    })

});

module.exports = router;
