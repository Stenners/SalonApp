'use strict';

angular.module('myApp.appointments', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/appointments', {
    templateUrl: 'appointments/appointments.html',
    controller: 'appointmentsCtrl'
  });
}])

.controller('appointmentsCtrl', [function($scope, $firebase) {

	var ref = new Firebase("https://blinding-fire-117.firebaseio.com/rubia/appointments");
    var fb = $firebase(ref);

	// sync as object 
    var syncObject = fb.$asObject();

    // three way data binding
    syncObject.$bindTo($scope, 'appointments');

}]);