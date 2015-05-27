'use strict';

angular.module('myApp.appointments', ['ngRoute', 'ui.calendar', 'firebase', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/appointments', {
        templateUrl: 'appointments/appointments.html',
        controller: 'appointmentsCtrl'
    });
}])

.controller('appointmentsCtrl', ['$scope', '$firebase', function($scope, $firebase) {

    var ref = new Firebase("https://blinding-fire-117.firebaseio.com/rubia/appointments");
    var events = $firebase(ref);
    $scope.events = [events.$asArray()];
    /* config object */
    $scope.uiConfig = {
        calendar: {
            defaultView: 'agendaWeek',
            allDaySlot: false,
            minTime: "08:00:00",
            height: 700,
            editable: true,
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            dayClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventMouseover: $scope.alertOnMouseOver
        }
    };



}]);


angular.module('myApp.appointments').controller('newAppointmentCtrl', ['$scope', '$firebase', function($scope, $firebase) {

    $scope.master = {};
 $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
    

    $scope.update = function(appointment) {
        var ref = new Firebase("https://blinding-fire-117.firebaseio.com/rubia/appointments");
        var fb = $firebase(ref);
        ref.push({
            'client': appointment.client,
            'start': appointment.date,
            'end': appointment.date,
            'hairdresser': appointment.hairdresser
        });
        $scope.reset();
    };

    $scope.reset = function() {
        $scope.appointment = angular.copy($scope.master);
        $scope.appointment.$setPristine();
    };



}]);
