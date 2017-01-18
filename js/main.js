var field = [];
// var sizeBoard =  +prompt('Введите ширину игрового поля' , '');
var sizeBoard = 10;
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
(function(){
  for (var i = 0; i < sizeBoard; i++){
    field[i]=[];
    for (var k=0; k < sizeBoard; k++ ){
      field[i][k] = {
        border: false,
        ship : false,
        opened : false,
        msg: 'missed',
      }
    }
  }
  return field;
}(sizeBoard));
console.table(field);
var oneShip = 4;
function putShipOne(){
  do{
    var  x = rand(0, sizeBoard);
    var y = rand(0, sizeBoard);
    if ( (field[x][y].ship == false) && (field[x][y].border == false) ){
      field[x][y].oneShip = true;
      field[x][y].ship = true;
      oneShip -= 1;
      if( x > 0 ){
        field[x-1][y].border = true;
      }
      if( x < (sizeBoard-1) ){
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
      if( x < (sizeBoard-1) && typeof field[x+1][y+1] == 'object' ){
        field[x+1][y+1].border = true;
      }
      if(y > 0 &&  x < (sizeBoard-1) ){
        field[x+1][y-1].border = true;
      }
    }
  } while (oneShip > 0)
}
var twoShip = 3;
function putShipTwo(){
  do{
    var  vertical = rand(0, sizeBoard);
    var  horizontal = rand(0, sizeBoard);
    var  way = rand(0,2);// 0 = x = right ______ 1 = y = down
    if (way == 0){
      if ((vertical < sizeBoard-1)
      && field[vertical][horizontal].ship == false
      && field[vertical][horizontal].border == false
      && field[vertical+1][horizontal].ship == false
      && field[vertical+1][horizontal].border == false){
        field[vertical][horizontal].ship = true;
        field[vertical+1][horizontal].ship = true;
        field[vertical][horizontal].twinShip = true;
        field[vertical+1][horizontal].twinShip = true;
        twoShip -= 1;
        if(typeof field[vertical+1][horizontal-1] == 'object'){// Низ лево
          field[vertical+1][horizontal-1].border = true;
        }
        if(typeof field[vertical][horizontal-1] == 'object'){//  лево
          field[vertical][horizontal-1].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal-1] == 'object'){// верх лево
          field[vertical-1][horizontal-1].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal] == 'object'){// верх
          field[vertical-1][horizontal].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal+1] == 'object'){// верх право
          field[vertical-1][horizontal+1].border = true;
        }
        if(typeof field[vertical][horizontal+1] == 'object'){// право
          field[vertical][horizontal+1].border = true;
        }
        if(typeof field[vertical+1][horizontal+1] == 'object'){// право низ
          field[vertical+1][horizontal+1].border = true;
        }
        if((vertical < sizeBoard-2) && typeof field[vertical+2][horizontal+1] == 'object'){// право низ низ
          field[vertical+2][horizontal+1].border = true;
        }
        if((vertical < sizeBoard-2) && typeof field[vertical+2][horizontal] == 'object'){//  низ низ
          field[vertical+2][horizontal].border = true;
        }
        if((vertical < sizeBoard-2) && typeof field[vertical+2][horizontal-1] == 'object'){// лево низ низ
          field[vertical+2][horizontal-1].border = true;
        }
      }
    } else {
      if ((horizontal < sizeBoard-1)
      && field[vertical][horizontal].ship == false
      && field[vertical][horizontal].border == false
      && field[vertical][horizontal+1].ship == false
      && field[vertical][horizontal+1].border == false){
        field[vertical][horizontal].ship = true;
        field[vertical][horizontal+1].ship = true;
        field[vertical][horizontal].twinShip = true;
        field[vertical][horizontal+1].twinShip = true;
        twoShip -= 1;
        if(vertical < sizeBoard - 1){// низ право
          field[vertical+1][horizontal+1].border = true;
        }
        if(vertical < sizeBoard - 1 ){//низ
          field[vertical+1][horizontal].border = true;
        }
        if((vertical < sizeBoard - 1) && typeof field[vertical+1][horizontal-1] == 'object' ){//низ лево
          field[vertical+1][horizontal-1].border = true;
        }
        if(typeof field[vertical][horizontal-1] == 'object' ){// лево
          field[vertical][horizontal-1].border = true;
        }
        if((vertical > 0 ) && typeof field[vertical-1][horizontal-1] == 'object' ){// лево верх
          field[vertical-1][horizontal-1].border = true;
        }
        if(vertical > 0 ){//  верх
          field[vertical-1][horizontal].border = true;
        }
        if(vertical > 0 ){//  верх право
          field[vertical-1][horizontal+1].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal+2] == 'object' ){// верх верх право
          field[vertical-1][horizontal+2].border = true;
        }
        if( typeof field[vertical][horizontal+2] == 'object' ){// право право
          field[vertical][horizontal+2].border = true;
        }
        if( (vertical < sizeBoard - 1) && typeof field[vertical+1][horizontal+2] == 'object' ){// низ низ право
          field[vertical+1][horizontal+2].border = true;
        }
      }
    }
  } while (twoShip > 0);
}
var threeShip = 2;
function putShipThree(){
  do{
    var  vertical = rand(0, sizeBoard);
    var  horizontal = rand(0, sizeBoard);
    var  way = rand(0,2);// 0 = x = right ______ 1 = y = down
    if (way == 0){
      if ((vertical < sizeBoard-2)
      && field[vertical][horizontal].ship == false
      && field[vertical][horizontal].border == false
      && field[vertical+1][horizontal].ship == false
      && field[vertical+1][horizontal].border == false
      && field[vertical+2][horizontal].ship == false
      && field[vertical+2][horizontal].border == false){

        field[vertical][horizontal].ship = true;
        field[vertical+1][horizontal].ship = true;
        field[vertical+2][horizontal].ship = true;
        field[vertical][horizontal].threeShip = true;
        field[vertical+1][horizontal].threeShip = true;
        field[vertical+2][horizontal].threeShip = true;
        threeShip -= 1;

        if(typeof field[vertical+1][horizontal-1] == 'object'){// Низ лево
          field[vertical+1][horizontal-1].border = true;
        }
        if(typeof field[vertical][horizontal-1] == 'object'){//  лево
          field[vertical][horizontal-1].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal-1] == 'object'){// верх лево
          field[vertical-1][horizontal-1].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal] == 'object'){// верх
          field[vertical-1][horizontal].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal+1] == 'object'){// верх право
          field[vertical-1][horizontal+1].border = true;
        }
        if(typeof field[vertical][horizontal+1] == 'object'){// право
          field[vertical][horizontal+1].border = true;
        }
        if(typeof field[vertical+1][horizontal+1] == 'object'){// право низ
          field[vertical+1][horizontal+1].border = true;
        }
        if( typeof field[vertical+2][horizontal+1] == 'object'){// право низ низ
          field[vertical+2][horizontal+1].border = true;
        }
        if( typeof field[vertical+2][horizontal-1] == 'object'){// лево низ низ
          field[vertical+2][horizontal-1].border = true;
        }
        if((vertical < sizeBoard-3) && typeof field[vertical+3][horizontal-1] == 'object'){// лево низ низ низ
          field[vertical+3][horizontal-1].border = true;
        }
        if((vertical < sizeBoard-3)){//  низ низ низ
          field[vertical+3][horizontal].border = true;
        }
        if((vertical < sizeBoard-3) && typeof field[vertical+3][horizontal+1] == 'object'){// право низ низ низ
          field[vertical+3][horizontal+1].border = true;
        }
      }
    } else {
      if ((horizontal < sizeBoard-2)
      && field[vertical][horizontal].ship == false
      && field[vertical][horizontal].border == false
      && field[vertical][horizontal+1].ship == false
      && field[vertical][horizontal+1].border == false
      && field[vertical][horizontal+2].ship == false
      && field[vertical][horizontal+2].border == false){

        field[vertical][horizontal].ship = true;
        field[vertical][horizontal+1].ship = true;
        field[vertical][horizontal+2].ship = true;
        field[vertical][horizontal].threeShip = true;
        field[vertical][horizontal+1].threeShip = true;
        field[vertical][horizontal+2].threeShip = true;
        threeShip -= 1;

        if(vertical < sizeBoard - 1){// низ право
           field[vertical+1][horizontal+1].border = true;
        }
        if(vertical < sizeBoard - 1 ){//низ
          field[vertical+1][horizontal].border = true;
        }
        if((vertical < sizeBoard - 1) && typeof field[vertical+1][horizontal-1] == 'object' ){//низ лево
          field[vertical+1][horizontal-1].border = true;
        }
        if(typeof field[vertical][horizontal-1] == 'object' ){// лево
          field[vertical][horizontal-1].border = true;
        }
        if((vertical > 0 ) && typeof field[vertical-1][horizontal-1] == 'object' ){// лево верх
          field[vertical-1][horizontal-1].border = true;
        }
        if(vertical > 0 ){//  верх
          field[vertical-1][horizontal].border = true;
        }
        if(vertical > 0 ){//  верх право
          field[vertical-1][horizontal+1].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal+2] == 'object' ){// верх верх право
          field[vertical-1][horizontal+2].border = true;
        }
        if( (vertical < sizeBoard - 1) && typeof field[vertical+1][horizontal+2] == 'object' ){// низ низ право
          field[vertical+1][horizontal+2].border = true;
        }
        if( (vertical > 0 ) && typeof field[vertical-1][horizontal+3] == 'object' ){// верх право право право
          field[vertical-1][horizontal+3].border = true;
        }
        if( typeof field[vertical][horizontal+3] == 'object' ){// право право право
          field[vertical][horizontal+3].border = true;
        }
        if( (vertical < sizeBoard - 1 ) && typeof field[vertical+1][horizontal+3] == 'object' ){// низ право право право
          field[vertical+1][horizontal+3].border = true;
        }

      }
    }
  } while (threeShip > 0);
}

var fourShip = 1;

function putShipFour(){
  do{

    var  vertical = rand(0, sizeBoard);
    var  horizontal = rand(0, sizeBoard);
    var  way = rand(0,2);// 0 = x = right ______ 1 = y = down
    if (way == 0){
      if ((vertical < sizeBoard-3)
      && field[vertical][horizontal].ship == false
      && field[vertical][horizontal].border == false
      && field[vertical+1][horizontal].ship == false
      && field[vertical+1][horizontal].border == false
      && field[vertical+2][horizontal].ship == false
      && field[vertical+2][horizontal].border == false
      && field[vertical+3][horizontal].ship == false
      && field[vertical+3][horizontal].border == false){

        field[vertical][horizontal].ship = true;
        field[vertical+1][horizontal].ship = true;
        field[vertical+2][horizontal].ship = true;
        field[vertical+3][horizontal].ship = true;
        field[vertical][horizontal].fourShip = true;
        field[vertical+1][horizontal].fourShip = true;
        field[vertical+2][horizontal].fourShip = true;
        field[vertical+3][horizontal].fourShip = true;
        fourShip -= 1;

        if(typeof field[vertical+1][horizontal-1] == 'object'){// Низ лево
          field[vertical+1][horizontal-1].border = true;
        }
        if(typeof field[vertical][horizontal-1] == 'object'){//  лево
          field[vertical][horizontal-1].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal-1] == 'object'){// верх лево
          field[vertical-1][horizontal-1].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal] == 'object'){// верх
          field[vertical-1][horizontal].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal+1] == 'object'){// верх право
          field[vertical-1][horizontal+1].border = true;
        }
        if(typeof field[vertical][horizontal+1] == 'object'){// право
          field[vertical][horizontal+1].border = true;
        }
        if(typeof field[vertical+1][horizontal+1] == 'object'){// право низ
          field[vertical+1][horizontal+1].border = true;
        }
        if( typeof field[vertical+2][horizontal+1] == 'object'){// право низ низ
          field[vertical+2][horizontal+1].border = true;
        }
        if( typeof field[vertical+2][horizontal-1] == 'object'){// лево низ низ
          field[vertical+2][horizontal-1].border = true;
        }
        if((vertical < sizeBoard-3) && typeof field[vertical+3][horizontal-1] == 'object'){// лево низ низ низ
          field[vertical+3][horizontal-1].border = true;
        }
        if((vertical < sizeBoard-3) && typeof field[vertical+3][horizontal+1] == 'object'){// право низ низ низ
          field[vertical+3][horizontal+1].border = true;
        }
        if((vertical < sizeBoard-4) && typeof field[vertical+4][horizontal+1] == 'object'){// право  низ x4
          field[vertical+4][horizontal+1].border = true;
        }
        if((vertical < sizeBoard-4) ){//   низ x4
          field[vertical+4][horizontal].border = true;
        }
        if((vertical < sizeBoard-4) && typeof field[vertical+4][horizontal-1] == 'object'){// лево  низ x4
          field[vertical+4][horizontal-1].border = true;
        }
      }
    } else {
      if ((horizontal < sizeBoard-3)
      && field[vertical][horizontal].ship == false
      && field[vertical][horizontal].border == false
      && field[vertical][horizontal+1].ship == false
      && field[vertical][horizontal+1].border == false
      && field[vertical][horizontal+2].ship == false
      && field[vertical][horizontal+2].border == false
      && field[vertical][horizontal+3].ship == false
      && field[vertical][horizontal+3].border == false){

        field[vertical][horizontal].ship = true;
        field[vertical][horizontal+1].ship = true;
        field[vertical][horizontal+2].ship = true;
        field[vertical][horizontal+3].ship = true;
        field[vertical][horizontal].fourShip = true;
        field[vertical][horizontal+1].fourShip = true;
        field[vertical][horizontal+2].fourShip = true;
        field[vertical][horizontal+3].fourShip = true;
        fourShip -= 1;

        if(vertical < sizeBoard - 1){// низ право
          field[vertical+1][horizontal+1].border = true;
        }
        if(vertical < sizeBoard - 1 ){//низ
          field[vertical+1][horizontal].border = true;
        }
        if((vertical < sizeBoard - 1) && typeof field[vertical+1][horizontal-1] == 'object' ){//низ лево
          field[vertical+1][horizontal-1].border = true;
        }
        if(typeof field[vertical][horizontal-1] == 'object' ){// лево
          field[vertical][horizontal-1].border = true;
        }
        if((vertical > 0 ) && typeof field[vertical-1][horizontal-1] == 'object' ){// лево верх
          field[vertical-1][horizontal-1].border = true;
        }
        if(vertical > 0 ){//  верх
          field[vertical-1][horizontal].border = true;
        }
        if(vertical > 0 ){//  верх право
          field[vertical-1][horizontal+1].border = true;
        }
        if(vertical > 0 && typeof field[vertical-1][horizontal+2] == 'object' ){// верх верх право
          field[vertical-1][horizontal+2].border = true;
        }
        if( (vertical < sizeBoard - 1) && typeof field[vertical+1][horizontal+2] == 'object' ){// низ низ право
          field[vertical+1][horizontal+2].border = true;
        }
        if( (vertical > 0 ) && typeof field[vertical-1][horizontal+3] == 'object' ){// верх право право право
          field[vertical-1][horizontal+3].border = true;
        }
        if( (vertical < sizeBoard - 1 ) && typeof field[vertical+1][horizontal+3] == 'object' ){// низ право право право
          field[vertical+1][horizontal+3].border = true;
        }
        if( (vertical >0 ) && typeof field[vertical-1][horizontal+4] == 'object' ){// верх право право право право
          field[vertical-1][horizontal+4].border = true;
        }
        if( typeof field[vertical][horizontal+4] == 'object' ){//  право право право право
          field[vertical][horizontal+4].border = true;
        }
        if( (vertical < sizeBoard - 1 ) && typeof field[vertical+1][horizontal+4] == 'object' ){//  право право право право низ
          field[vertical+1][horizontal+4].border = true;
        }
      }
    }
  } while (fourShip > 0);
}


function hit(vertical, horizontal){
  }

putShipFour();
putShipThree();
putShipTwo();
putShipOne();




var battleBody = document.querySelector('#battle-body');
var fieldTable = '<table border="1">\n';

for ( var i = 0; i < 10; i++){
  fieldTable += '<tr>\n';
  for(var j = 0; j < 10; j++){
    if(field[i][j].ship == true){
    fieldTable += '\t<td class="ship"></td>\n'
  } else {
    fieldTable += '\t<td></td>\n'
  }
 }
  fieldTable += '</tr>\n'
}
fieldTable += '</table>\n'
battleBody.innerHTML = fieldTable;
