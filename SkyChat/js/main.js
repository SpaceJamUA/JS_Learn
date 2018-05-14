let app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/login.html',
      controller: 'loginCtrl'
    })
    .when('/chat', {
      templateUrl: '../views/chat.html',
      controller: 'chatCtrl'
    })
});
