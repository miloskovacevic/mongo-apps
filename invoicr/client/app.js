var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'DashboardController',
        templateUrl: 'views/dashboard.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});