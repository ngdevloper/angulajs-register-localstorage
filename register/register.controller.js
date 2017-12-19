(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['registerService', '$location', '$rootScope', '$scope', 'FlashService'];
    function RegisterController(registerService, $location, $rootScope, $scope, FlashService) {
        var vm = this;

        vm.register = register;
        
        $scope.dateInvalid=false;
   
        $scope.config1 = {};
        $scope.config1.opened = false;
        $scope.open1 = function(event){
             event.preventDefault();
             event.stopPropagation();
             $scope.config1.opened = true;
        };        

       

        $scope.init = function() {
            
            registerService.countryList().then(function(response){
                $scope.countries = response.data;
                vm.user = {
                    country : $scope.countries[0].name,
                    gender : "Male"
                }
            })
        }

        $scope.init();

        function register() {
            vm.dataLoading = true;
            registerService.Create(vm.user)
                .then(function (response) {
                    console.log(response)
                    if (response.success) {
                        FlashService.Success('Registered successfully :)', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                }, function(error){
                    FlashService.Error(error.message);
                    vm.dataLoading = false;
                });
        }
    }

})();
