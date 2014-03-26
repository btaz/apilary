'use strict';

/* Controllers */

var apilaryControllers = angular.module('apilaryControllers', []);

apilaryControllers.controller('CatalogListController', ['$scope',
  function($scope) {
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
    $scope.catalogs = catalogs;
    $scope.displayCreateForm = false;
    $scope.displayCreateButton = true;

    $scope.createCatalog = function() {
      $scope.displayCreateButton = false;
      $scope.displayCreateForm = true;
    };

    $scope.listCatalogs = function() {
    }

  }]);

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
      // throw error here
    }

  }]);
