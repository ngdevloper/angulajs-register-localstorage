(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','ui.bootstrap'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        console.log("AA")
        $rootScope.globalCurrentUser = localStorage.getItem('loggeduser') || null;
        // if ($rootScope.globals.currentUser) {
        //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        // }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            console.log($location.path())
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            console.log($rootScope.globalCurrentUser)
            var loggedIn = $rootScope.globalCurrentUser;
            if (restrictedPage && loggedIn == null) {
                console.log("SS")
                $location.path('/login');
            }
            // else {
            //     if (!restrictedPage) {
            //         console.log("SS-1")
            //         $location.path('/login');
            //     }
            //    else{
            //     console.log("SS-2")
            //         $location.path('/');
            //    }
            // }
        });
    }

})();