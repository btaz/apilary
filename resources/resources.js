var settings = require('../conf/app_settings.js').settings;
var resource = require('../resources/restapi').resource;

// Currently not used. Would be used to call other REST APIs
exports.Topics = resource(settings.topicsApiHost, settings.topicsApiPort,
  settings.topicsApiPath + '/questions/categories');
