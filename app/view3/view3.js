'use strict';

angular.module('myApp.view3', ['ngRoute', 'ui.calendar', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view3', {
        templateUrl: 'view3/view3.html',
        controller: 'view3Ctrl'
    });
}])

.controller('view3Ctrl', ['$scope', '$firebase', function($scope, $firebase) {

    var ref = new Firebase("https://blinding-fire-117.firebaseio.com/rubia/events");
    var fb = $firebase(ref);

    // sync as object 
    var syncObject = fb.$asObject();

    // three way data binding
    syncObject.$bindTo($scope, 'eventSources');
    /* config object */
    $scope.uiConfig = {
        calendar: {
            defaultView: 'agendaWeek'
        }
    };

    // $scope.eventSources = [

    //     {
    //         events: [{
    //             title: 'Event1',
    //             start: '2015-05-27',
    //             duration: 2
    //         }, {
    //             title: 'Event2',
    //             start: '2015-05-26'
    //         }]
    //     }
    // ];

}]);
