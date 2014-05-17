'use strict';

/* Services */

var apilaryServices = angular.module('apilaryServices', ['ngResource']);

apilaryServices.factory('Catalogs', ['$resource',
  function($resource) {
    return $resource('api/catalogs/:id', {}, {
      list: {method:'GET', isArray: true},
      get: {method:'GET', params: {id: '@_id'}, isArray: false},
      create: {method:'POST'},
      update: {method:'PUT', params: {id: '@_id'}}
    });
  }]);

apilaryServices.factory('Apis', ['$resource',
  function($resource) {
    return $resource('api/catalogs/:catalog_id/apis/:id', {}, {
      list: {method:'GET', isArray: true},
      get: {method:'GET', isArray: false},
      create: {method:'POST', params: {catalog_id: '@catalog_id'}},
      update: {method:'PUT', params: {id: '@_id'}}
    });
  }]);
