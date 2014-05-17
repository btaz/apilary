'use strict';

/* Controllers */

var apilaryControllers = angular.module('apilaryControllers', []);

/*
 * Catalog Controller
 * Catalog Controller
 * Catalog Controller
 */
apilaryControllers.controller('CatalogListController', ['$scope', 'Catalogs',
  function($scope, catalogs) {
    $scope.catalogs = {
      list:catalogs.list(),
      saveChangesMethod:null
    };
    $scope.modal = {};
    $scope.page = {
      displayCatalogForm:false,
      displayCreateButton:true
    };

    var createCatalog = function() {
      catalogs.create($scope.modal.catalog,
        function (data, respHeader) {
          // success
          $scope.catalogs.list = catalogs.list();
        }, function (err, respHeader) {
          // error - todo: need error handler
          console.log(err);
        });
      resetModalForm();
      $scope.page.displayCatalogForm = false;
      $scope.page.displayCreateButton = true;
    };

    var updateCatalog = function(id) {
      catalogs.update($scope.modal.catalog,
        function (data, respHeader) {
          // success
          $scope.catalogs.list = catalogs.list();
        }, function (err, respHeader) {
          // error - todo: need error handler
          console.log(err);
        });
      resetModalForm();
      $scope.page.displayCatalogForm = false;
      $scope.page.displayEditButton = true;
    };

    $scope.createCatalogModal = function() {
      $scope.modal.modalTitle = "Create Catalog";
      $scope.modal.saveChangesMethod = createCatalog;
      $scope.page.displayCreateButton = false;
      $scope.page.displayCatalogForm = true;
      $('#catalogModal').modal('show'); // todo; switch to the Angular method
    };

    $scope.editCatalogModal = function(id) {
      $scope.modal.modalTitle = "Edit Catalog";
      $scope.modal.saveChangesMethod = updateCatalog;
      $scope.page.displayCreateButton = false;
      $scope.page.displayCatalogForm = true;
      $scope.modal.catalog = catalogs.get({id:id});
      $('#catalogModal').modal('show');
    };

    var resetModalForm = function() {
      $scope.modal.catalog = {
        name:"",
        versions:[{
            "version" : "V1",
            "status" : "active"
          }],
        description:""
      };
    };

    resetModalForm();
  }]);

/*
 * Catalog Detail Controller
 * Catalog Detail Controller
 * Catalog Detail Controller
 */
apilaryControllers.controller('CatalogDetailController', ['$scope', '$location', '$routeParams', 'Catalogs', 'Apis',
  function($scope, $location, $routeParams, catalogs, apis) {
    $scope.modal = {};
    $scope.page = {
      catalog:{},
      apis:[]
    };

    var getCatalogById = function(catalogId) {
      $scope.page.catalog = catalogs.get({id:catalogId}, function(catalog) {
        $scope.page.catalog = catalog;
        $scope.page.version = $location.search().version;
        // todo add a check for non-existent version as well
        if(angular.isUndefined($scope.page.version)) {
          $scope.page.version = catalog.versions[0].version;
        }
      });
    };

    var getApis = function(catalogId) {
      $scope.page.apis = apis.list({catalog_id:catalogId}, function(apis) {
        $scope.page.apis = apis;
      });
    };

    var updateCatalog = function(id) {
      catalogs.update($scope.modal.catalog,
        function (data, respHeader) {
          // success
          $scope.page.catalog = getCatalogById($routeParams.catalogId);
        }, function (err, respHeader) {
          // error - todo: need error handler
          console.log(err);
        });
      $scope.page.displayCatalogForm = false;
      $scope.page.displayEditButton = true;
    };

    $scope.editCatalogModal = function(catalogId) {
      $scope.modal.modalTitle = "Edit Catalog";
      $scope.modal.saveChangesMethod = updateCatalog;
      $scope.page.displayCreateButton = false;
      $scope.page.displayCatalogForm = true;
      $scope.modal.catalog = catalogs.get({id:catalogId});
      $('#catalogModal').modal('show');
    };

    $scope.editCatalogVersionModal = function(catalogId) {
      $scope.modal.modalTitle = "Edit Catalog Version";
      $('#catalogVersionModal').modal('show');
    };

    $scope.createCatalogApiModal = function(catalogId) {
      $scope.modal.modalTitle = "Create API";
      $scope.modal.saveChangesMethod = createApi;
      $('#catalogApiModal').modal('show');
    };

    var createApi = function() {
      $scope.modal.api.version = $scope.page.version;
      apis.create({catalog_id:$scope.page.catalog._id}, $scope.modal.api,
        function (data, respHeader) {
          // success
          $scope.apis.list = apis.list();
        }, function (err, respHeader) {
          // error - todo: need error handler
          console.log(err);
        });
// todo: we have two resets, needs to be name specific
//      resetModalForm();
      getApis($routeParams.catalogId);
      $scope.page.displayApiForm = false;
      $scope.page.displayApiCreateButton = true;
    };

    getCatalogById($routeParams.catalogId);
    getApis($routeParams.catalogId);

  }]);
