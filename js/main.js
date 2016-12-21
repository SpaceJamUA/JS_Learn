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

function setMsg(x, y){
  if (x>width || y>height || x<0 || y<0){
    alert('error');
  } else {
    field[x][y].msg = prompt('Ввeдите коментарий для этой ячейки', '');
  }
}

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

var firstShip = 4;
function putShip(){
  for (firstShip;  firstShip >0 ; firstShip--){
    var x = rand(0,9);
    var y = rand(0,9);

    if (field[x][y].ship == true
      || field[x-1][y].ship == true
      || field[x+1][y].ship == true
      || field[x][y-1].ship == true
      || field[x][y+1].ship == true
      || field[x+1][y+1].ship == true
      || field[x-1][y-1].ship == true
      || field[x-1][y+1].ship == true
      || field[x+1][y-1].ship == true){
        return putShip();
      } else {
        field[x][y].ship = true;
      }
    }
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
