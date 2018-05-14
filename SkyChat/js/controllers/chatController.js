app.controller('chatCtrl', function($scope, minDb) {
  $scope.dataBase = [];
  $scope.joinNewUser;
  let animDb = [];
  const port = 3000,
    socket = io.connect('http://localhost:' + port),
    idData = minDb.name,
    anim = document.querySelector("#animation");

  socket.emit('newUser', idData);

  socket.on('joinNewUser', (name) => {
    loginNewUs(name);
  });

  $scope.send = () => {
    if (!$scope.msgInput) {
      return
    };
    let message = {
      userName: idData,
      name: $scope.msgInput,
      socket: socket.id,
      date: now()
    };
    $scope.msgInput = '';
    socket.emit('message', message);
  }

  socket.on('messageToClients', (msg) => {
    $scope.dataBase.push({
      message: msg.name,
      userName: msg.userName,
      id: msg.socket,
      date: msg.date
    });
    $scope.socket = socket.id;
    $scope.$apply();
  });



  let loginNewUs = (name) => {
    animDb.push(name);
    if (animDb.length > 1) {
      return
    } else {
      queueAnim(animDb);
    }
  }

  let queueAnim = (arr) => {
    $scope.joinNewUser = arr[0] + " Join to chat";
    setTimeout(() => {
      anim.classList = "newUser"
    });
    $scope.$apply();
    anim.addEventListener("animationend", () => {
      anim.classList = "none";
      animDb.splice(0, 1);
      if (arr.length) {
        return queueAnim(arr);
      }
    });
  }

  let now = () => {
    let date = new Date();
    return date.getHours() + ':' + date.getMinutes();
  }


});

app.directive('sendMsgBtn', function() {
  return {
    link: (scope, element, attrs) => {
      element.bind("keydown", function(event) {
        if (event.ctrlKey && event.keyCode == 13) {
          scope.msgInput += "\n";
          scope.$apply();
        } else if (event.which == 13) {
          scope.send();
        }
      })
    }
  }
});
