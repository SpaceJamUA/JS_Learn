(function() {
  function commentsBody(){
    var divComments = document.createElement('div');
    divComments.classList = ('feedBack');

    var headerComments = document.createElement('div');
    headerComments.classList = ('headerComments');

    var guestName = document.createElement('div');
    guestName.classList = ('guestName');
    var someName = document.createElement('b');
    someName.textContent = document.querySelector('#name').value;

    var dateComments = document.createElement('div');
    dateComments.classList = ('dateComments') ;
    var someDate = document.createElement('span');
    someDate.textContent =getSomeDate(new Date());

    var bodyComments = document.createElement('div');
    bodyComments.classList = ('bodyComments');
    var someText = document.createElement('span');
    someText.textContent = document.querySelector('#text').value;

    guestName.appendChild(someName);
    dateComments.appendChild(someDate);

    headerComments.appendChild(guestName);
    headerComments.appendChild(dateComments);

    bodyComments.appendChild(someText);

    divComments.appendChild(headerComments);
    divComments.appendChild(bodyComments);

    document.querySelector('.commentsContent').append(divComments);
  }

  function getSomeDate(date){
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
  }

  var btnComments = document.querySelector('.addBtn>button');

  function addComments(ev) {
    if(document.querySelector('#name').value && document.querySelector('#text').value){
      commentsBody();
    } else {
      return;
    }
    document.querySelector('#name').value = '';
    document.querySelector('#text').value = '';
  }
  btnComments.addEventListener('click', addComments);


  function runOnKeys(func) {
    var codes = [].slice.call(arguments, 1);
    var pressed = {};
    document.onkeydown = function(e) {
      e = e || window.event;
      pressed[e.keyCode] = true;
      for (var i = 0; i < codes.length; i++) {
        if (!pressed[codes[i]]) {
          return;
        }
      }
      pressed = {};
      func();
    };
    document.onkeyup = function(e) {
      e = e || window.event;
      delete pressed[e.keyCode];
    };
  }
  runOnKeys(
    function() {
      addComments();
    },
    13,
    17
  );
})();
