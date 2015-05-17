'use strict';

angular.module('myApp.view2', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'view2Ctrl'
    });
}])

.controller('view2Ctrl', ['$scope', '$firebase', function($scope, $firebase) {

    var ref = new Firebase("https://blinding-fire-117.firebaseio.com/rubia/appointments");
    var fb = $firebase(ref);

    // sync as object 
    var syncObject = fb.$asObject();

    // three way data binding
    syncObject.$bindTo($scope, 'appointments');

}]);

angular.module('myApp.view2').controller('newAppointmentCtrl', ['$scope', '$firebase', function($scope, $firebase) {

    $scope.master = {};

    $scope.update = function(appointment) {
        var ref = new Firebase("https://blinding-fire-117.firebaseio.com/rubia/appointments");
        var fb = $firebase(ref);
        ref.push({
            'client': appointment.client,
            'date': appointment.date,
            'hairdresser': appointment.hairdresser
        });
        $scope.reset();
    };

    $scope.reset = function() {
        $scope.appointment = angular.copy($scope.master);
        $scope.appointment.$setPristine();
    };

   

}]);
