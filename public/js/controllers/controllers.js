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

apilaryControllers.controller('CatalogDetailController', ['$scope', '$routeParams', 'Catalogs',
  function($scope, $routeParams, catalogs) {
    var catalogId = $routeParams.catalogId;
    var catalog = catalogs.get({id:catalogId}, function(){
      if(angular.isUndefined(catalog.versions) || catalog.versions.length == 0) {
        catalog.versions = [{ "version": "V1", "status": "active" }];
      }
    });

    $scope.catalog = catalog;
  }]);
