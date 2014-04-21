var api = require('../resources/resources');
var settings = require('../conf/app_settings.js').settings;
var db = require("mongojs").connect(settings.mongoDb.databaseUrl, settings.mongoDb.collections);

exports.getCatalogs = function(req, res) {
  db.catalogs.find({}, function(err, catalogs) {
    if(err || !catalogs) {
      console.log("MongoDB: No catalogs were found");
    } else {
      res.send(catalogs);
    }
  });
};

exports.getCatalog = function(req, res) {
  db.catalogs.find({_id:db.ObjectId(req.params.id)}, function(err, catalogs) {
    if(err || !catalogs) {
      console.log("MongoDB: No catalogs were found");
    } else {
      res.send(catalogs[0]);
    }
  });
};

exports.createCatalog = function(req, res) {
  db.catalogs.save(req.body, function(err, catalogs) {
    if(err || !catalogs) {
      console.log("MongoDB: Can't save");
    } else {
        res.send({});
    }
    });
};

exports.updateCatalog = function(req, res) {
  req.body._id = db.ObjectId(req.body._id);
  db.catalogs.save(req.body, function(err, catalogs) {
    if(err || !catalogs) {
      console.log("MongoDB: Can't save");
    } else {
      res.send({});
    }
  });
};
