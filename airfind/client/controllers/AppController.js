var myApp = angular.module("myApp", []);

myApp.controller('AppController',['$scope','$http', function ($scope, $http) {
    console.log('AppController Initialized...');

    $scope.getAirports = function () {
        $http.get('/api/airports').success(function (response) {
            $scope.airports = response;
        });
    }
    
    $scope.findAirportsByState = function () {
        var state = $scope.stateCode;

        $http.get('/api/airports/state/' + state).success(function (response) {
            $scope.airports = response;
        });
    }

    $scope.findAirportsByProx = function () {
        var location = {
            distance: $scope.location.distance
        };
        var address = $scope.location.address;

        $http.get('/geocode/location?address=' + address).success(function (loc_response) {
            location.lat = loc_response.locations[0].latitude;
            location.lon = loc_response.locations[0].longitude;

            $http.post('/api/airports/prox', location).success(function (response) {
                $scope.airports = response;
            });
        });
    }
}]);