var express = require('express');
var router = express.Router();

var flights = require('../data');

var flight = require('../flight');

for (var number in flights) {
	flights[number] = flight(flights[number]);
};

exports.flight = function(req, res) {
	var number = req.param('number');

	if (typeof flights[number] === 'undefined') {
		res.status(404).json({status: 'error'});
	} else {
		res.json(flights[number].getInformation());
	}
};

exports.arrived = function(req, res) {
	var number = req.param('number');

	if (typeof flights[number] === 'undefined') {
		res.status(404).json({status: 'error'});
	} else {
		flights[number].triggerArrive();
		res.json({status: 'done'});
	}
};

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
