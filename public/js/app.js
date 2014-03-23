'use strict';

/* App Module */

var apilaryApp = angular.module('apilaryApp', [
  'ngRoute',
  'apilaryControllers',
  'apilaryServices'
]);

apilaryApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/catalogs', {
        templateUrl: 'partials/catalog-list.html',
        controller: 'CatalogListController'
      }).
      when('/catalog/:catalogId', {
        templateUrl: 'partials/catalog-detail.html',
        controller: 'CatalogDetailController'
      }).
      otherwise({
        redirectTo: '/catalogs'
      });
  }]);