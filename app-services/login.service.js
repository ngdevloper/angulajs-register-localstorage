angular.module('app')
    .factory('loginService', function($q,$filter, $rootScope, UserService) {

    
    var loginFactory = {};


    loginFactory.loginAuth = function(email, password) {
        console.log(email)
        console.log(password)
        var defer = $q.defer();
        try {
            
            var getusers = JSON.parse(localStorage.getItem("userdetails"));
            console.log(getusers)
            var filtered = $filter('filter')(getusers, { email: email });
            console.log(filtered);
            var user = filtered.length ? filtered[0] : null;
            if (user !== null && user.password === password) {
                var currentUser = { email: user.email, password: user.password }
                $rootScope.globalCurrentUser = currentUser;
                localStorage.setItem("loggeduser", JSON.stringify(currentUser));
                defer.resolve({success: true});
            } else {
                defer.reject({success: false, message: "Username or password is incorrect. Please try again :("});
            }
        }
        catch(exception) {
            defer.reject({success: false,  message: "Signup unsuccessfully. Clear the browser cache and try again :("});
        }
        return defer.promise;
    }

    loginFactory.clearLoginCredentials = function() {
       var loggedUser =  localStorage.setItem("loggeduser", null);
       return loggedUser;
    }
    return loginFactory;
});