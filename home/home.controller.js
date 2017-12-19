(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$location'];
    function HomeController(UserService, $rootScope,$location) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.logOut = logOut;

        

        function initController() {
            if(JSON.parse(localStorage.loggeduser) == null) {
                $location.path("/login")
                return;
            }
            loadCurrentUser();
            loadAllUsers();
        }

        initController();

        function loadCurrentUser() {
            UserService.GetByEmail($rootScope.globalCurrentUser.email)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    console.log(users)
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
        function logOut() {
            localStorage.setItem("loggeduser", null);
            $location.path("/login")
        }
    }

})();