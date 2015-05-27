'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
	'myApp.appointments',
	'myApp.clients',
    'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/appointments'
    });
}]);
