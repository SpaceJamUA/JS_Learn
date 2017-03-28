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
      createTotalContent(data.list);
      createListOfCompany(data.list);
      mathLocation(data.list);
      createNewsDiv();
    }
  })
}
function createTotalContent(data){
  $('#TotalCompanies')[0].innerHTML = '';
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
  $('#ListOfCompanies')[0].innerHTML = '';
  $('#ListOfCompanies')[0].data = false;
  $('#ListOfCompanies')[0].dataset.type = 'false';
  $('#ListOfCompanies').on('click',function(ev){
    for(var i = 0; i < $('.scrollList').children().length; i++){
      $('.scrollList').children()[i].classList.remove('chosenCompany');
    }
    ev.target.classList += (' chosenCompany');

    if(ev.target.offsetParent.dataset.type == 'name'){
      openPartners(sortCompanyByName(data[ev.target.data].partners, !ev.target.offsetParent.data));
    }else{
      openPartners(sortCompanyByPerc(data[ev.target.data].partners, !ev.target.offsetParent.data));
    }
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
  $('#CompaniesByLocation')[0].innerHTML = '';
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
  var totalCompanyes = 0;
  for(var i = 0; i < objMathDrow.length; i++){
    totalCompanyes += objMathDrow[i].value;
  }
  for(var i = 0; i < objMathDrow.length; i++){
    objMathDrow[i].value = parseInt(objMathDrow[i].value/totalCompanyes * 100);
  }
  companiesByLocation(objMathDrow);
  createPieEv(objCountries, data);
}
function createNews(data){
  $('#News')[0].innerHTML = '';
  var carouselAll = document.createElement('div');
  carouselAll.id = 'myCarousel';
  carouselAll.classList = ('carousel slide');
  var olNews = document.createElement('ol');
  olNews.classList = ('carousel-indicators');
  var carousel = document.createElement('div');
  carousel.id = 'carousel-inner';
  var carouselInner = document.createElement('div');
  carouselInner.classList = ('carousel-inner');
  for(var i = 0; i < 5; i++){
    var liNews = document.createElement('li');
    var divItem = document.createElement('div');
    divItem.classList = ('item');
    var imgNews = document.createElement('img');
    imgNews.src = data[i].img;
    var textNews = document.createElement('div');
    textNews.classList = ('TextNews');
    var linkTitle = document.createElement('a');
    linkTitle.href = data[i].link;
    linkTitle.textContent = data[i].link;
    var newsInfoText = document.createElement('p');
    newsInfoText.textContent = data[i].description;
    var authorInfo = document.createElement('div');
    authorInfo.classList = ('author');
    var author = document.createElement('p');
    var textAuthor = document.createElement('b');
    var spanAuthor = document.createElement('span');
    spanAuthor.textContent = data[i].author;
    textAuthor.textContent = 'Author:';
    var dateNews = document.createElement('p');
    var textDate = document.createElement('b');
    var spanDate= document.createElement('span');
    spanDate.textContent = takeDat(data[i].date);
    textDate.textContent = 'Date: ';
    if(i == 0){
      liNews.classList.add('active');
      divItem.classList.add('active');
    }
    liNews.dataset.target = '#myCarousel'
    liNews.dataset.slideTo = i;
    $(textNews).append(linkTitle);
    $(textNews).append(newsInfoText);
    $(author).append(textAuthor);
    $(author).append(spanAuthor);
    $(dateNews).append(textDate);
    $(dateNews).append(spanDate);
    $(authorInfo).append(author);
    $(authorInfo).append(dateNews);
    $(olNews).append(liNews);
    $(divItem).append(imgNews);
    $(divItem).append(textNews);
    $(divItem).append(authorInfo);
    $(carouselInner).append(divItem);
  }
  $(carousel).append(olNews);
  $(carouselInner).append(carousel);
  $(carouselAll).append(carouselInner);
  $(carouselAll).append(olNews);
  $('#News').append(carouselAll);
}
function createNewsDiv() {
  $.ajax({
    url: "http://codeit.pro/frontTestTask/news/getList",
    method: "GET",
    dataType: "html",
    success: function (data) {
      return createNews(JSON.parse(data).list);
    }
  });
}
function takeDat(num) {
  var unixtimeToDate = new Date(num*1000);
  var year = unixtimeToDate.getFullYear();
  var month =  (unixtimeToDate.getMonth()+1);
  var day = unixtimeToDate.getDate();
  var date = day + '.' + month + '.' + year;
  return date;
}
function createPieEv(countryes, data){
  for(var i = 0; i < $('.uv-chart').children().length; i++ ){
    $('.uv-chart').children()[i].dataset.country = countryes[i];
    $($('.uv-chart').children()[i]).on('click',function(ev){
      var companyOfThis = [];
      for(i = 0; i < data.length; i++){
        if(data[i].location.name == ev.target.parentNode.dataset.country){
          companyOfThis.push(data[i].name);
        }
      }
      createPieList(companyOfThis, ev.target.parentNode.dataset.country);
    });
  }
}
function createPieList(data,countryName) {
  var ulCompany = document.createElement('ul');
  ulCompany.classList = ('list-group listFromPie');
  var companyName = document.createElement('b');
  companyName.textContent = countryName+':';
  for(var i = 0; i < data.length; i++){
    var liCompany = document.createElement('li');
    liCompany.classList = 'list-group-item';
    liCompany.textContent = data[i];
    $(ulCompany).append(liCompany);
  }
  $('#CompaniesByLocation')[0].innerHTML = '';
  var backToPie = document.createElement('button');
  var glyphBack = document.createElement('span');
  $(backToPie).on('click',function(ev){
    $(backToPie).remove();
    $.ajax({
      url: "http://codeit.pro/frontTestTask/company/getList",
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        mathLocation(data.list);
      }
    })
  })
  glyphBack.classList = ('glyphicon glyphicon-arrow-left');
  backToPie.classList = ('btn btn-default btn-xs backToPie');
  $(backToPie).append(glyphBack);
  $($('#CompaniesByLocation')[0].previousSibling).append(backToPie);
  $('#CompaniesByLocation').append(companyName);
  $('#CompaniesByLocation').append(ulCompany);
}
function createPartners(data) {
  var graphdef = {
    categories: ['partners'],
    dataset:{
      'partners' : data
    }
  };
  var config = {
    legend: {
      position: 'right'
    },
    dimension: {
      width: 700,
      height: 180
    },
    label :{
      fontsize: 15
    },
    margin: {
      right: 10,
      left: 25,
      bottom: 25
    },
    meta: {
      position: '#drawGraphPartners'
    },
    graph: {
      orientation: 'Vertical'
    },
    legend: {
      hidden: true
    }
  }
  var obj = uv.chart('Bar',graphdef, config);
}
function openPartners(data) {
  var divContainer = document.createElement('div');
  divContainer.classList = ('container');
  divContainer.id = 'graphContainer';
  var divCol = document.createElement('div');
  divCol.classList = ('col-lg-12 col-md-12 col-sm-12 col-xs-12');
  divCol.id = 'graphPartners';
  var header = document.createElement('div');
  header.classList = ('header');
  var bText = document.createElement('b');
  bText.textContent = 'Company Partners';
  var btnSortGroup = document.createElement('div');
  btnSortGroup.classList = ('sortBtn');
  var bBtnText = document.createElement('b');
  bBtnText.textContent = 'Sort By:';
  var btnSortName = document.createElement('button');
  btnSortName.classList = ('btn btn-default btn-xs');
  btnSortName.type = 'button';
  btnSortName.textContent = 'Name';
  var spanSortName = document.createElement('span');
  spanSortName.classList = ('glyphicon glyphicon-sort');

  $(btnSortName).on('click',function(ev){
    if($('#ListOfCompanies')[0].dataset.type == 'name'){
      $('#ListOfCompanies')[0].data = !$('#ListOfCompanies')[0].data;
    }
    $('#ListOfCompanies')[0].dataset.type = 'name';
    return openPartners(sortCompanyByName(data, !$('#ListOfCompanies')[0].data));
  })
  var btnSortPerc = document.createElement('button');
  btnSortPerc.classList = ('btn btn-default btn-xs');
  btnSortPerc.type = 'button';
  btnSortPerc.textContent = 'Percentage';
  var spanSortPerc = document.createElement('span');
  $(btnSortPerc).on('click',function(ev){
    if($('#ListOfCompanies')[0].dataset.type == 'false'){
      $('#ListOfCompanies')[0].data = !$('#ListOfCompanies')[0].data;
    }
    $('#ListOfCompanies')[0].dataset.type = 'false';
    return openPartners(sortCompanyByPerc(data, !$('#ListOfCompanies')[0].data));
  })
  spanSortPerc.classList = ('glyphicon glyphicon-sort');
  var divContentBody = document.createElement('div');
  divContentBody.id = 'drawGraphPartners';
  divContentBody.classList = ('contentBody');
  $(header).append(bText);
  $(btnSortGroup).append(bBtnText);
  $(btnSortName).append(spanSortName);
  $(btnSortGroup).append(btnSortName);
  $(btnSortPerc).append(spanSortPerc);
  $(btnSortGroup).append(btnSortPerc);
  $(header).append(btnSortGroup);
  $(divCol).append(header);
  $(divCol).append(divContentBody);
  $(divContainer).append(divCol);
  if(document.body.children.length > 4 ){
    $(document.body.children[2]).remove();
  }
  $(document.body.children[1]).after(divContainer);
  createPartners(data);
}
function sortCompanyByPerc(data,reverse) {
  if(reverse){
    return data.sort(function(a, b) {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
    })
  }else{
    return data.sort(function(a, b) {
      if (a.value > b.value) return 1;
      if (a.value < b.value) return -1;
    })
  }
}
function sortCompanyByName(data,reverse) {
  if(reverse){
    return data.sort(function(a, b) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    })
  }else{
    return data.sort(function(a, b) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
    })
  }
}
