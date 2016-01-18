var myApp = angular.module("myApp");

myApp.controller('InvoicesController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.getInvoices = function () {
        $http.get('/api/invoices').success(function (response) {
            $scope.invoices = response;
        });
    }

    $scope.getCustomers = function () {
        $http.get('/api/customers').success(function (response) {
            $scope.customers = response;
        });
    }

    $scope.getSingleInvoice = function () {
        var id = $routeParams.id;

        $http.get('/api/invoices/' + id).success(function (response) {
            $scope.singleInvoice = response;

             $http.get('/api/customers/' + response.customer).success(function(podaci){
                 $scope.musterija = podaci;
             });
        });
    }

    $scope.addInvoice = function () {
        var invoice = $scope.invoice;

        $http.post('/api/invoices/', invoice).success(function (response) {
            console.log('Invoice added...');
            window.location.href = '/#invoices';
        });;
    }

    $scope.getInvoice = function(){
        var id = $routeParams.id;

        $http.get('/api/invoices/' + id).success(function (response) {
            $scope.invoice = response;
            //FILL SELECT
            $scope.invoice.customer_id = response.customer._id;
            $scope.invoice.status = response.invoice.status;
        });
    }
    
    $scope.updateInvoice = function () {
        $http.put('/api/invoices/' + $scope.invoice._id, $scope.invoice).success(function (response) {
            window.location.href = '/#invoices';
        });
    }

    $scope.deleteInvoice = function (id) {
        $http.delete('/api/invoices/' + id).success(function (response) {
            window.location.href = '/#invoices';
        });
    }
}]);