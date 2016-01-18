var myApp = angular.module("myApp");

myApp.controller('CustomersController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    console.log('customer controller initialization...');

    $scope.getCustomers = function () {
        $http.get('/api/customers').success(function (response) {
            $scope.customers = response;
        });
    }

    $scope.nizFaktura = [];

    $scope.getSingleCustomer = function () {
        var id = $routeParams.id;

        $http.get('/api/customers/' + id).success(function (response) {
            $scope.singleCustomer = response;

            $http.get('/api/invoices/').success(function (fakture) {
                fakture.forEach(function (data) {
                    if(response._id == data.customer._id){
                        $scope.nizFaktura.push(data);
                        //console.log('Podaci: ' + data);
                        console.log('Podaci iz niza faktura servis ' + $scope.nizFaktura);
                    }
                })
            });
        })
    }

    $scope.addCustomer = function () {
        //when we press submit all data from form will be inside $scope.customer object(variable)
        var customer = $scope.customer;

        //sending 'post' request to backend api...
        $http.post('/api/customers/', customer).success(function (response) {
            console.log('Success! ' + response);
            window.location.href = '/#customers';
        });

    }

    $scope.updateCustomer = function () {
        var customer = $scope.customer;
        $http.put('/api/customers/' + $scope.customer._id, customer).success(function (response) {
            window.location.href = '/#customers';
        });
    }
    
    $scope.getCustomer = function () {
        var id = $routeParams.id;
        
        $http.get('/api/customers/' + id).success(function (response) {
            $scope.customer = response;
        });
    }
    
    $scope.deleteCustomer = function (id) {
        $http.delete('/api/customers/' + id).success(function (response) {
            window.location.href = '/#customers';
        });
    }

}]);