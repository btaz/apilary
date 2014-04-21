var settings = require('../conf/app_settings.js').settings;
var resource = require('../resources/restapi').resource;

exports.Topics = resource(settings.topicsApiHost, settings.topicsApiPort,
  settings.topicsApiPath + '/questions/categories');
