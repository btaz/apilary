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
      console.log("MongoDB: The catalog was not found");
    } else {
      res.send(catalogs[0]);
    }
  });
};

exports.createCatalog = function(req, res) {
  db.catalogs.save(req.body, function(err, catalogs) {
    if(err || !catalogs) {
      console.log("MongoDB: Can't save new catalog");
    } else {
        res.send({});
    }
    });
};

exports.updateCatalog = function(req, res) {
  req.body._id = db.ObjectId(req.body._id);
  db.catalogs.save(req.body, function(err, catalogs) {
    if(err || !catalogs) {
      console.log("MongoDB: Can't save the catalog");
    } else {
      res.send({});
    }
  });
};

exports.createApi = function(req, res) {
  req.body.catalog = db.ObjectId(req.params.catalog_id);
  db.apis.save(req.body, function(err, catalogs) {
    if(err || !catalogs) {
      console.log("MongoDB: Can't save a new API");
    } else {
      res.send({});
    }
  });
};

exports.getApis = function(req, res) {
  db.apis.find({catalog:db.ObjectId(req.params.catalog_id)}, function(err, apis) {
    if(err || !apis) {
      console.log("MongoDB: No APIs were found");
    } else {
      res.send(apis);
    }
  });
};

exports.getApi = function(req, res) {
  db.apis.find({
      catalog:db.ObjectId(req.params.catalog_id),
      _id:db.ObjectId(req.params.catalog_id)
    }, function(err, apis) {
      if(err || !apis) {
        console.log("MongoDB: No APIs were found");
      } else {
        res.send(apis[0]);
      }
  });
};

