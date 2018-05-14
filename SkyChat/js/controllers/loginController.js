app.controller('loginCtrl', function($scope, minDb, $location) {
  $scope.loginToChat = ()=> {
    if(!$scope.userName){
      return;
    }
    minDb.name = $scope.userName;
    $location.path('/chat');
  }
});

app.directive('loginBtn', function(minDb) {
  return {
    link: function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if (event.which === 13) {
          scope.loginToChat();
        }
      })
    }
  }
});
