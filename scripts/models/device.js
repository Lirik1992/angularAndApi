const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Device Schema
const DeviceSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    data: {
        type: Array
    }
});


const Device = module.exports = mongoose.model('Device', DeviceSchema);

module.exports.addDevice = function (newDevice, callback) {
    newDevice.save(callback);
};

module.exports.getDeviceById = function (id, callback) {
    Device.findById(id, callback)
}
