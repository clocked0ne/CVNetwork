'use strict';

var config    = require('../config/config');
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

router.get('/user/:userid', function (req, res, next) {
	console.dir(req.params.userid);
	return res.render('user', { view: { dashboard: 0 } });
});

router.get('/groups', function (req, res, next) {
	req.pipe(request('https://cv-sharing-hackaton.herokuapp.com/groups')).pipe(res);
});

router.post('/savecv', function (req, res, next) {
	request.post({
		url: config.addAPI,
		json: true,
		body: req.body
	}, function (error, response, body) {
		if (error)
			return res.status(500).send(error);
		return res.status(200).send({ id: body });
	});
});

router.post('/share/:userId', function (req, res, next) {
	var url = config.shareAPI.split(/{id}/)[0] + req.params.userId + config.shareAPI.split(/{id}/)[1];
	request.post({
		url: url,
		qs: { groupId: req.query.groupId },
		json: true
	}, function (error, response, body) {
		if (error)
			return res.status(500).send(error);
		return res.status(200).send({ 'url': body });
	});
});

module.exports = router;
