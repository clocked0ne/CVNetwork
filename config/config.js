'use strict';

var config = {
	protocol: 'http',
	siteURL: 'localhost',
	port: process.env.PORT || 5000,
	requestLogging: false,
	addAPI: 'https://cv-data.herokuapp.com/api/cvdata/add',
	shareAPI: 'https://cv-sharing-hackaton.herokuapp.com/user/{id}/share',
	session: {
		secret: 'defaultSecret',
		name: 'session'
	},
	cloudFrontS3: {
		key: '<youraccesskeyhere>',
		secret: '<yoursecretaccesskeyhere>',
		bucket: 'bucket-name',
		region: 'eu-west-1',
		distributionId: '<cloudfrontsubdomain>'
	},
	gulpBuildMaps: false,
	frontend: {
		useCDN: false,
		staticFilesURI: '<xxxxxxxxxxxxxx.cloudfront.net>',
		staticFilesPath: '/static'
	}
};

module.exports = config;
