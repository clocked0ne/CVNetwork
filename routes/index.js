'use strict';

var express   = require('express');
var router    = express.Router();
var request   = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
	return res.render('index', { view: { dashboard: 0 } });
});

router.get('/dashboard', function (req, res, next) {
	return res.render('dashboard', { view: { dashboard: 1 } });
});

router.post('/savecv', function (req, res, next) {
	request.post({
		url: 'http://192.168.2.54:8080/api/cvdata/add',
		json: true,
		body: req.body
	}, function (error, response, body) {
		if (error) {
			console.dir(error);
			return res.status(500).send(error);
		}
		return res.send(body);
	});
});

module.exports = router;
