'use strict';
var CONTENT_NAME = ['TotalCompanies','ListOfCompanies','CompaniesByLocation','News'];
var userObj = {};
$('#userConditions').on('click', function() {
  $('.sendFormReg')[0].disabled = !$('.sendFormReg')[0].disabled;
})
$('#sendBtn').on('click', function(){
  userObj.name = $('#userName')[0].value;
  userObj.secondname = $('#userSecondName')[0].value;
  userObj.email = $('#userEmail')[0].value;
  userObj.gender = $('#userGender')[0].value.toLowerCase();
  userObj.pass = $('#userPass')[0].value;
  for(var i = 0;i < $('.groupRegistration').children().length; i++){
    $('.groupRegistration').children()[i].classList.remove('has-error','has-feedback');

    if($('.groupRegistration').children()[i].classList == 'textError'){
      $('.groupRegistration').children()[i].remove();
    }
  }
  $.ajax({
    url: "http://codeit.pro/frontTestTask/user/registration",
    method: "POST",
    data: userObj,
    dataType: "html",
    success: function (data) {
      if(JSON.parse(data).status == 'OK'){
        createDivContent(CONTENT_NAME);
        renderContent();
      }else{
        return checkFieldError(JSON.parse(data).message);
      }
    }
  });
})

function checkFieldError(data) {
  var errorMsg = document.createElement('div');
  errorMsg.classList = 'textError';
  errorMsg.textContent = data;

  if(data.toLowerCase().indexOf('secondname')+1){

    $('#userSecondName')[0].parentNode.classList.add('has-error','has-feedback');
    $('#userSecondName')[0].parentNode.after(errorMsg);
  }else if(data.toLowerCase().indexOf('name')+1){
    $('#userName')[0].parentNode.classList.add('has-error','has-feedback');
    $('#userName')[0].parentNode.after(errorMsg);
  }else if(data.toLowerCase().indexOf('email')+1){
    $('#userEmail')[0].parentNode.classList.add('has-error','has-feedback');
    $('#userEmail')[0].parentNode.after(errorMsg);
  }else if(data.toLowerCase().indexOf('pass')+1){
    $('#userPass')[0].parentNode.classList.add('has-error','has-feedback');
    $('#userPass')[0].parentNode.after(errorMsg);
  } else if(data.toLowerCase().indexOf('gender')+1){
    $('#userGender')[0].parentNode.classList.add('has-error','has-feedback');
    $('#userGender')[0].parentNode.after(errorMsg);
  }
}


function createDivContent(contentName) {
  $('body')[0].innerHTML = '';
  for(var i = 0; i < contentName.length; i++){
    var mainContent = document.createElement('div');
    mainContent.classList = ('mainContent');


    var tagContent = document.createElement('div');
    tagContent.classList = ('col-lg-6 col-sm-12 col-xs-12 mainClass');

    var downloadContent = document.createElement('div');
    downloadContent.classList = ('downloadContent');

    var headerOfContent = document.createElement('div');
    headerOfContent.classList = ('header');

    var headerText = document.createElement('b');
    headerText.textContent = contentName[i];

    var contentBody = document.createElement('div')
    contentBody.classList = ('contentBody');
    contentBody.id = contentName[i];

    var loadingImg = document.createElement('img');
    loadingImg.classList = ('loadingSrc');
    loadingImg.src = '5.gif';
    loadingImg.alt = 'Loading...';

    $(headerOfContent).append(headerText);
    $(downloadContent).append(headerOfContent);
    $(contentBody).append(loadingImg);

    $(downloadContent).append(contentBody);
    $(tagContent).append(downloadContent);
    $(mainContent).append(tagContent);
    $(document.body).append(mainContent);
  }
}

function renderContent() {
  $.ajax({
    url: "http://codeit.pro/frontTestTask/company/getList",
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      // console.log(data.list);
      createTotalContent(data.list);
      createListOfCompany(data.list);
      mathLocation(data.list);
    }
  })

}

function createTotalContent(data){
  $('#TotalCompanies > img').remove();
  var circle = document.createElement('div');
  circle.classList = ('circle');
  var totalCompany = document.createElement('center');
  totalCompany.classList = ('totalCompanyNum');
  totalCompany.textContent = data.length;
  $(circle).append(totalCompany);
  $('#TotalCompanies').append(circle);
}

function createListOfCompany(data) {
  var ulCompany = document.createElement('ul');
  ulCompany.classList = ('list-group scrollList');
  for(var i = 0; i < data.length; i++){
    var liCompany = document.createElement('li');
    liCompany.classList = 'list-group-item';
    liCompany.textContent = data[i].name;
    liCompany.data = i;
    $(ulCompany).append(liCompany);
  }
  $('#ListOfCompanies > img').remove();
  $('#ListOfCompanies').on('click',function(ev){
    for(var i = 0; i < $('.scrollList').children().length; i++){
      $('.scrollList').children()[i].classList.remove('chosenCompany');
    }
    ev.target.classList += (' chosenCompany');
    console.log(data[ev.target.data]);
  });
  $('#ListOfCompanies').append(ulCompany);
}


function companiesByLocation(mathLocation) {
  var graphdef = {
    categories: ['uvCharts'],
    dataset:{
      'uvCharts' : mathLocation
    }
  };
  var config = {
    legend: {
      position: 'right'
    },
    dimension: {
      width: 180,
      height: 170
    },
    margin: {
      bottom: 10,
      top: 15,
      left: 75
    },
    meta: {
      position: '#CompaniesByLocation'
    }
  }
  $('#CompaniesByLocation > img').remove();
  var obj = uv.chart('Pie',graphdef, config)
}

function mathLocation(data) {
  var objAllCountries = [];
  for(var i = 0; i < data.length; i++){
    objAllCountries.push(data[i].location.name);
  }
  var objCountries = objAllCountries.slice();

  for(var i = 0; i < objCountries.length;i++){
    for(var j = i+1; j < objCountries.length;j++){
      if(objAllCountries[i] == objAllCountries[j]){
        objCountries.splice(j,1);
        j--;
      }
    }
  }

  var objMathDrow = [];
  for( i=0; i < objCountries.length; i++){
    objMathDrow.push({name: objCountries[i],value: 0});
    for( j = 0; j < objAllCountries.length; j++){
      if(objMathDrow[i].name == objAllCountries[j]){
        objMathDrow[i].value +=1;
      }
    }
  }

  return companiesByLocation(objMathDrow);
}
