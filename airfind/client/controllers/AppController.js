var myApp = angular.module("myApp", []);

myApp.controller('AppController',['$scope','$http', function ($scope, $http) {
    console.log('AppController Initialized...');

    $scope.getAirports = function () {
        $http.get('/api/airports').success(function (response) {
            $scope.airports = response;
        });
    }
    
    //$scope.findAirports = function () {
    //    var state = $scope.stateCode;
    //
    //    $http.get('/api/airports');
    //}
}]);