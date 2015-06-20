var mongoose = require('mongoose');

mongoose.connect('mongodb://flights:testflight@ds047642.mongolab.com:47642/flights');

module.exports = mongoose.connection;