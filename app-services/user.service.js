angular.module('app')
.factory('UserService', function($q,$filter) {


var userService = {};


function getUsers()  {
    if(!localStorage.userdetails){
        localStorage.userdetails = JSON.stringify([]);
    }

    return JSON.parse(localStorage.getItem("userdetails"));
}

userService.GetAll = function() {
    var deferred = $q.defer();
    deferred.resolve(getUsers());
    return deferred.promise;
}

userService.GetById = function(id) {
    var deferred = $q.defer();
    var filtered = $filter('filter')(getUsers(), { id: id });
    var user = filtered.length ? filtered[0] : null;
    deferred.resolve(user);
    return deferred.promise;
}

userService.GetByEmail = function(username) {
    var deferred = $q.defer();
    var filtered = $filter('filter')(getUsers(), { username: username });
    var user = filtered.length ? filtered[0] : null;
    deferred.resolve(user);
    return deferred.promise;
}

return userService;
});

