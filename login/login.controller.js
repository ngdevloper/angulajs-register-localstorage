(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', 'loginService', 'FlashService'];
    function LoginController($scope, $location, loginService, FlashService) {
        var vm = this;

        vm.login = login;

        $scope.init = function() {
            console.log("SS")
            loginService.clearLoginCredentials()
        }

        $scope.init();

        function login() {
            vm.dataLoading = true;
            loginService.loginAuth(vm.email, vm.password).then(function (response) {
                console.log(response)
                if (response.success) {
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            }, function(err){
                FlashService.Error(err.message);
                vm.dataLoading = false;
            });
        };
    }

})();
