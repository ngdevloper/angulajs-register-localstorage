angular.module('app')
    .factory('registerService', function($q, $filter, $http) {
    var registerFactory = {};

    registerFactory.Create = function(data) {
        console.log(data)
        var defer = $q.defer();
        try {

            var alldata = JSON.parse(localStorage.getItem("userdetails")) || [];
            var filtered = $filter('filter')(alldata, { email: data.email });
            console.log(filtered);
            var user = filtered.length ? filtered[0] : null;
            if (user !== null) {
                defer.reject({ success: false, message: "Email already exists :(" });
            } else {
                alldata.push(data);
                var sdata = JSON.stringify(alldata);
                if (data != undefined) {
                    localStorage.setItem("userdetails", sdata)
                    defer.resolve({ success: true });
                }
                else {
                    defer.reject({ success: false, message: "Signup unsuccessfully. Clear the browser cache and try again :(" });
                }
            }
        }
        catch(exception) {
            defer.reject({success: false,  message: "Signup unsuccessfully. Clear the browser cache and try again :("});
        }
        return defer.promise;
    }


    registerFactory.countryList = function() {
        return $http.get("https://restcountries.eu/rest/v2/all");
    }

    return registerFactory;
});