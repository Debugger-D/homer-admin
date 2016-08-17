angular.module('MetronicApp').service('MySessionService', ['$window', '$cookieStore', function ($window, $cookieStore) {
  this.create = function (userId, authName, phone) {
    if(!!$window.sessionStorage["userInfo"]) {
        var userInfo = JSON.parse($window.sessionStorage["userInfo"]);
        this.userInfo = {
            userId: userInfo.userId,
            authName: userInfo.authName,
            phone: userInfo.phone
        }
    } else {
        this.userInfo = {
            userId: userId,
            authName: authName,
            phone: phone
        };
        $window.sessionStorage["userInfo"] = JSON.stringify(this.userInfo);
    }
  };

  this.getCurentUser = function() {
      if(!!$window.sessionStorage["userInfo"]) {

          return {
              userId: userInfo.userId,
              authName: userInfo.authName,
              phone: userInfo.phone
          }
      }
  }

  this.destroy = function () {
    $window.sessionStorage["userInfo"] = '';
    this.userInfo = null;
    $cookieStore.remove("token");
  };

  return this;
}]);
