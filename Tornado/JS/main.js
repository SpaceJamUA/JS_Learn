$(document).ready(function() {
  $('.owl-carousel').owlCarousel({
    loop:true, //Зацикливаем слайдер
    margin:10, //Отступ от картино если выводите больше 1
    nav:true, //Отключил навигацию
    navText : ["",""],

    responsive:{
      0:{
        items:1
      },
      600:{
        items:1
      },
      1000:{
        items:3
      }
    }
  });
});
