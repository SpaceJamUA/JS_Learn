var userObj = {};

$('#sendBtn').on('click', function(){
  userObj.name = $('#userName')[0].value;
  userObj.secondname = $('#userSecondName')[0].value;
  userObj.email = $('#userEmail')[0].value;
  userObj.gender = $('#userGender')[0].value.toLowerCase();
  userObj.pass = $('#userPass')[0].value;
  userObj.condition = $('#userConditions').is(':checked');
  $.ajax({
    url: "http://codeit.pro/frontTestTask/user/registration",
    method: "POST",
    data: userObj,
    dataType: "html",
    success: function (data) {
      if(JSON.parse(data).status == 'OK'){
          return 'some Magic';
      }else if(JSON.parse(data).status == 'Error'){
        alert(JSON.parse(data).message);
      }else{
        alert(JSON.parse(data).message);
      }
    }
  });
})
