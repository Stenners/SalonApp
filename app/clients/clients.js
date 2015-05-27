'use strict';

angular.module('myApp.clients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clients', {
    templateUrl: 'clients/clients.html',
    controller: 'clientsCtrl'
  });
}])

.controller('clientsCtrl', [function() {

}]);