'use strict';

/* Controllers */

var apilaryControllers = angular.module('apilaryControllers', []);

apilaryControllers.controller('CatalogController', ['$scope',
  function($scope) {
    var catalogs = [
      {
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
        "name":"Catalog API",
        "versions":[
          {"version":"V1",   "status":"active"}
        ],
        "description":"Product catalog management API"
      },
      {
        "name":"Search API",
        "versions":[
          {"version":"V1 beta",   "status":"draft"}
        ],
        "description":"Generic search API"
      }
    ];
    $scope.catalogs = catalogs;

    $scope.listCatalogs = function() {
    }

  }]);
