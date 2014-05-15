'use strict';

/* App Module */

var apilaryApp = angular.module('apilaryApp', [
  'ngRoute',
  'apilaryControllers',
  'apilaryServices'
]);

apilaryApp.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(false);
    $routeProvider.
      when('/catalogs', {
        templateUrl: 'partials/catalog-list.html',
        controller: 'CatalogListController'
      }).
      when('/catalogs/:catalogId', {
        templateUrl: 'partials/catalog-detail.html',
        controller: 'CatalogDetailController'
      }).
      otherwise({
        redirectTo: '/catalogs'
      });
  }]);