'use strict';

/* Controllers */

var apilaryControllers = angular.module('apilaryControllers', []);

apilaryControllers.controller('CatalogListController', ['$scope', 'Catalogs',
  function($scope, catalogs) {
    $scope.catalogs = catalogs.list();
    $scope.displayCatalogForm = false;
    $scope.displayCreateButton = true;
    $scope.editCatalog = {};
    $scope.catalogMethod = null;

    var createCatalog = function() {
      catalogs.create($scope.editCatalog,
        function (data, respHeader) {
          // success
          $scope.catalogs = catalogs.list();
        }, function (err, respHeader) {
          // error - todo: need error handler
          console.log(err);
        });
      resetForm();
      $scope.displayCatalogForm = false;
      $scope.displayCreateButton = true;
    };

    var updateCatalog = function(id) {
      catalogs.update($scope.editCatalog,
        function (data, respHeader) {
          // success
          $scope.catalogs = catalogs.list();
        }, function (err, respHeader) {
          // error - todo: need error handler
          console.log(err);
        });
      resetForm();
      $scope.displayCatalogForm = false;
      $scope.displayCreateButton = true;
    };

    var resetForm = function() {
      $scope.editCatalog = {
        name: "",
        version: "",
        description: ""
      };
    };

    $scope.createCatalogDialog = function() {
//      catalogMethod = createCatalog;
      $scope.catalogMethod = createCatalog;
      $scope.displayCreateButton = false;
      $scope.displayCatalogForm = true;
    };

    $scope.editCatalogDialog = function(id) {
      $scope.catalogMethod = updateCatalog;
      $scope.displayCatalogForm = true;
      $scope.displayCreateButton = false;
      $scope.editCatalog = catalogs.get({id:id});
    };

    $scope.cancelCatalogDialog = function() {
      $scope.displayCatalogForm = false;
      $scope.displayCreateButton = true;
      resetForm();
    };

  }]);

// =====================================================================================================================

apilaryControllers.controller('CatalogDetailController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    var catalogId = $routeParams.catalogId;

    var catalogs = [
      {
        "id":"1000",
        "name":"ORG API",
        "versions":[
          {"version":"V0.8", "status":"retired"},
          {"version":"V0.9", "status":"deprecated"},
          {"version":"V1",   "status":"active"},
          {"version":"V1.1", "status":"draft"}
        ],
        "description":"Provides APIs to organization information"
      },
      {
        "id":"1001",
        "name":"Catalog API",
        "versions":[
          {"version":"V1",   "status":"active"}
        ],
        "description":"Product catalog management API"
      },
      {
        "id":"1002",
        "name":"Search API",
        "versions":[
          {"version":"V1 beta",   "status":"draft"}
        ],
        "description":"Generic search API"
      }
    ];
    $scope.catalog = getCatalog(catalogs, catalogId);
    $scope.catalogs = catalogs;

    function getCatalog(catalogs, catalogId) {
      for(var i=0; i<catalogs.length; i++) {
        if(catalogs[i].id == catalogId) {
          return catalogs[i];
        }
      }
      return [];
    }

  }]);
