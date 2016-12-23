var field = [];
var width  =  +prompt('Введите ширину игрового поля' , '');
var height =  +prompt('Введите высоту игрового поля' , '');

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

(function(){
  for (var i = 0; i < +width; i++){
    field[i]=[];
    for (var k=0; k < +height; k++ ){
      field[i][k] = {
        border: false,
        ship : false,
        opened : false,
        msg: 'missed',
      }
    }
  }
  return field;
}(height, width));
console.table(field);
//
// function setMsg(x, y){
//   if (x>width || y>height || x<0 || y<0){
//     alert('error');
//   } else {
//     field[x][y].msg = prompt('Ввeдите коментарий для этой ячейки', '');
//   }
// }

function hit(x, y){
  if (x>width || y>height || x<0 || y<0){
    alert('error');
  } else {
    field[x][y].opened = true;
    if (field[x][y].ship == true){
      field[x][y].ship = false;
      field[x][y].msg = 'Убит';
      alert('ВЫ ПОПАЛИ! ХОРОШИЙ ВЫСТРЕЛ КОМАНДОР');
    } else if(  field[x][y].msg == 'Убит'){
      alert('Вы уже стреляли в этот квадрат и попали');
    } else if(field[x][y].msg == 'missed'){
      field[x][y].msg = 'Вы уже стреляли в этот квадрат и промахнулись';
      alert('Промахнулись');
    } else {
      alert('Вы уже стреляли в этот квадрат и промахнулись');
    }
  }
}

function hasShips(){
  var result = 0;
  for (var i = 0; i < +width; i++){
    for (var k=0; k < +height; k++ ){
      if (field[i][k].ship == true){
        result+=1;
      }
    }
  }
  return result;
}

// var firstShip = 4;
// function putShipOne(){
//
//   do {
//     var x = rand(0,9);
//     var y = rand(0,9);
//
//     if(x == 0 && y == 0){//ВЛУ
//       if (field[x][y].ship == false
//         && field[x+1][y].ship == false
//         && field[x][y+1].ship == false
//         && field[x+1][y+1].ship == false){
//            field[x][y].ship = true;
//            firstShip -= 1;
//         }
//       } else if(x == width && y == height ){//НПУ
//         if (field[x][y].ship == false
//             && field[x-1][y].ship == false
//             && field[x][y-1].ship == false
//             && field[x-1][y-1].ship == false){
//               field[x][y].ship = true;
//               firstShip -= 1;
//         }
//       } else if(x == 0 && y == height ){//ВПУ
//         if (field[x][y].ship == false
//             && field[x-1][y].ship == false
//             && field[x][y+1].ship == false
//             && field[x-1][y+1].ship == false){
//               field[x][y].ship = true;
//               firstShip -= 1;
//             }
//       } else if (x == width && y == 0){//НЛУ
//         if (field[x][y].ship == false
//             && field[x-1][y].ship == false
//             && field[x][y+1].ship == false
//             && field[x-1][y+1].ship == false){
//               field[x][y].ship = true;
//               firstShip -= 1;
//             }
//
//       } else if(x == 0 && y < height && y > 0 ){//Лево
//         if (field[x][y].ship == false
//             && field[x+1][y].ship == false
//             && field[x][y-1].ship == false
//             && field[x][y+1].ship == false
//             && field[x+1][y+1].ship == false
//             && field[x+1][y-1].ship == false){
//               field[x][y].ship = true;
//               firstShip -= 1;
//             }
//       } else if(x == width && y < height && y > 0){//Право
//         if (field[x][y].ship == false
//             && field[x-1][y].ship == false
//             && field[x][y-1].ship == false
//             && field[x][y+1].ship == false
//             && field[x-1][y-1].ship == false
//             && field[x-1][y+1].ship == false){
//               field[x][y].ship = true;
//               firstShip -= 1;
//             }
//       } else if(x > 0 && x < width && y == 0){//ВЕРХ
//         if (field[x][y].ship == false
//             && field[x-1][y].ship == false
//             && field[x+1][y].ship == false
//             && field[x][y+1].ship == false
//             && field[x+1][y+1].ship == false
//             && field[x-1][y+1].ship == false){
//               field[x][y].ship = true;
//               firstShip -= 1;
//             }
//       } else if(x > 0 && x < width && y == height){//Низ
//         if (field[x][y].ship == false
//             && field[x-1][y].ship == false
//             && field[x+1][y].ship == false
//             && field[x][y-1].ship == false
//             && field[x-1][y-1].ship == false
//             && field[x+1][y-1].ship == false){
//               field[x][y].ship = true;
//               firstShip -= 1;
//             }
//       } else {  if (field[x][y].ship == false
//               && field[x-1][y].ship == false
//               && field[x+1][y].ship == false
//               && field[x][y-1].ship == false
//               && field[x][y+1].ship == false
//               && field[x+1][y+1].ship == false
//               && field[x-1][y-1].ship == false
//               && field[x-1][y+1].ship == false
//               && field[x+1][y-1].ship == false){
//                 field[x][y].ship = true;
//                 firstShip -= 1;
//               }
//             }
//           } while (firstShip > 0);
//       }
//


var oneShip = 4;
function putOneShip(){

  do{
    var  x = rand(0, width);
    var y = rand(0, height);
    if ( (field[x][y].ship == false) && (field[x][y].border == false) ){
      field[x][y].oneShip = true;
      oneShip -= 1;
      if( x > 0 ){
        field[x-1][y].border = true;
      }
      if( x < (width-1) ){
        field[x+1][y].border = true;
      }
      if( y > 0 ){
        field[x][y-1].border = true;
      }
      if(typeof field[x][y+1] == 'object' ){
        field[x][y+1].border = true;
      }
      if( y > 0 && x > 0 ){
        field[x-1][y-1].border = true;
      }
      if(x > 0 && typeof field[x-1][y+1] == 'object' ){
        field[x-1][y+1].border = true;
      }
      if( x < (width-1) && typeof field[x+1][y+1] == 'object' ){
        field[x+1][y+1].border = true;
      }
      if(y > 0 &&  x < (width-1) ){
        field[x+1][y-1].border = true;
      }
    }

  } while (oneShip > 0)
}

var twoShip = 3;
function putShipTwo(){
  do{
    var  x = rand(0, width);
    var y = rand(0, height);
    var way = rand(0,2);// 0 = x = right ______ 1 = y = down
    if (way == 0){
      if ( x < (width-1) && (field[x][y].ship == false) && (field[x][y].border == false)
      && (field[x+1][y].ship == false) && (field[x+1][y].border == false)){
        field[x][y].ship = true;
        field[x][y].twoShip = true;
        field[x+1][y].ship = true;
        field[x+1][y].twoShip = true;
        twoShip -= 1;
        if( x > 0 ){
          field[x-1][y].border = true;// граница слева
        }

        if( y > 0 ){
          field[x][y-1].border = true;// граница верх
        }
        if(typeof field[x][y+1] == 'object' ){
          field[x][y+1].border = true;// граница низ
        }
        if( y > 0 && x > 0 ){
          field[x-1][y-1].border = true;// граница левй верхний угол
        }
        if(x > 0 && typeof field[x-1][y+1] == 'object' ){
          field[x-1][y+1].border = true;// граница левый нижний угол
        }
        if( typeof field[x+1][y+1] == 'object' ){
          field[x+1][y+1].border = true;// граница правый нижний угол
        }
        if(y > 0){
          field[x+1][y-1].border = true;// граница правый верхний угол
        }//asdkhjaskdhajsdhajsas
        if( x > 0 && x < width-2){
          field[x+2][y].border = true;// граница справа Второй ячейки
        }
        if( y > 0 && x > 0 && x < width-2){
          field[x+2][y-1].border = true;// граница правый верхний угол второй ячейки
        }
        if(x > 0 && x < width-2 && typeof field[x+2][y+1] == 'object' ){
          field[x+2][y+1].border = true;// граница правый нижний угол второй ячейки
        }
      }
    } else {
      if ( y < (height-1) && (field[x][y].ship == false) && (field[x][y].border == false)
      && (field[y+1][y].ship == false) && (field[y+1][y].border == false)){
        field[x][y].ship = true;
        field[x][y].twoShip = true;
        field[x][y+1].ship = true;
        field[x][y+1].twoShip = true;
        twoShip -= 1;
        if( x > 0 ){
          field[x-1][y].border = true;// граница слева
        }
        if( y > 0 ){
          field[x][y-1].border = true;// граница верх
        }
        if(x<(width-2)){
          field[x+1][y].border = true;// граница права
        }
        if( y > 0 && x > 0 ){
          field[x-1][y-1].border = true;// граница левй верхний угол
        }
        if(x > 0  ){
          field[x-1][y+1].border = true;// граница левый нижний угол
        }
        if( x < (width-2) ){
          field[x+1][y+1].border = true;// граница правый нижний угол
        }
        if(x < (width-2) && typeof field[x+1][y-1] == 'object'){
          field[x+1][y-1].border = true;// граница правый верхний угол
        }//asdkhjaskdhajsdhajsas
        if( x < (width-2) && typeof field[x+1][y+2] == 'object'){
          field[x+1][y+2].border = true;// граница правый нижний угол Второй ячейки
        }
        if(x > 0 && typeof  field[x-1][y+2] == 'object'){
          field[x-1][y+2].border = true;// граница левый нижний угол второй ячейки
        }
        if(typeof field[x][y+2] == 'object' ){
          field[x][y+2].border = true;// граница  низ второй ячейки
        }

      }
    }
 }while (twoShip > 0);
 return putOneShip();
}


function showAll(){
  for (var i = 0; i < +width; i++){
    for (var k=0; k < +height; k++){
        if (field[i][k].twoShip == true){
        field[i][k] = 2;
        }
        if (field[i][k].oneShip == true){
          field[i][k] = 1;
        }
      }
    }
    console.table(field);
  }
function showBoard(){
  for (var i = 0; i < +width; i++){
    for (var k=0; k < +height; k++){
       if (field[i][k].border == true){
          field[i][k] = 'border';
   }
  }
 }
}
function putAll(){
  return putShipTwo();
}

putAll();
showBoard();
showAll();
