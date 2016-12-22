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
// var twoShip = 3;
// function putShipTwo(){
//   do{
//     var x = rand(0,9);
//     var y = rand(0,9);
//     var cord = rand(0,3);
//     if(x == 0 && y == 0){
//
//
//     }
//   } while ( twoShip>0 );
// }

var oneShip = 10;
function putOneShip(){

   do{
    var  x = rand(0, width-1);
     var y = rand(0, height-1);
      if ( (field[x][y].ship == false) && (field[x][y].border == false) ){
        field[x][y].ship = true;
        oneShip -= 1;
        if( x > 0 ){
          field[x-1][y].border = true;
        }
        if( x < (width-1) && typeof field[x+1][y] == 'object' ){
          field[x+1][y].border = true;
        }
        if(y > 0 ){
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
        if(y > 0 &&  x < (width-1) && typeof field[x+1][y-1] == 'object' ){
          field[x+1][y-1].border = true;
        }
      }

   } while (oneShip > 0)
}



      function getStatus(){
        for (var i = 0; i < +width; i++){
          for (var k=0; k < +height; k++){
            if (field[i][k].ship == true){
              console.log('На кординатах' + ' ' + i + ',' + k + ' есть однопалубный ШИП')
            }
          }
        }
      }
