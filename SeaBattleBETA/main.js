var table = document.createElement('table');
var SIZE_BOARD = 10;
var field = [];

var SHIP_STATUS = {
  typeShipOne : {
    freeShips:4,
  },
  typeShipTwo : {
    freeShips:3,
  },
  typeShipThree: {
    freeShips:2,
  },
  typeShipFour:{
    freeShips:1,
  }
};

buildField();
createFieldBattle();


function buildField(){
  for (var i = 0; i < SIZE_BOARD; i++){
    field[i]=[];
    for (var k=0; k < SIZE_BOARD; k++ ){
      field[i][k] = {
        border: false,
        ship : false,
        openStatus : false
      }
    }
  }
}

function putShip(typeShip,vertical,horizontal, direction){
  switch (typeShip) {
    case 1: return createShipOne( vertical,horizontal);
    break;
    case 2: return createShipTwo( vertical,horizontal, direction);
    break;
    case 3: return createShipThree( vertical,horizontal, direction);
    break;
    case 4: return createShipFour( vertical,horizontal, direction);
    break;
  }
}

function createShipOne(vertical,horizontal){
  if(!SHIP_STATUS.typeShipOne.freeShips){
    return;
  }

  if ( (field[vertical][horizontal].ship == false)
  && (field[vertical][horizontal].border == false) ){
    SHIP_STATUS.typeShipOne.freeShips -= 1;
    field[vertical][horizontal].ship = true;

    var borderHorizontal = [-1,-1,0,1,1,1,0,-1];
    var borderVertical = [0,-1,-1,-1,0,1,1,1];

    return createBorder(vertical, horizontal,borderHorizontal,borderVertical);
  }
}


function createShipTwo( vertical,horizontal, direction){
  if(!SHIP_STATUS.typeShipTwo.freeShips){
    return;
  }
  switch(direction){
    case 0: return createShipTwoVertical(vertical, horizontal);
    break;
    case 1: return createShipTwoHorizontal(vertical, horizontal);
    break;
  }
}

function createShipTwoVertical(vertical, horizontal){  //vertical ship
  if ((vertical < SIZE_BOARD-1)
  && field[vertical][horizontal].ship == false
  && field[vertical][horizontal].border == false
  && field[vertical+1][horizontal].ship == false
  && field[vertical+1][horizontal].border == false){

    field[vertical][horizontal].ship = true;
    field[vertical+1][horizontal].ship = true;

    SHIP_STATUS.typeShipTwo.freeShips -= 1;

    var borderHorizontal = [0,1,1,1,1,0,-1,-1,-1,-1];
    var borderVertical = [-1,-1,0,1,2,2,2,1,0,-1];

    return createBorder(vertical, horizontal,borderHorizontal,borderVertical);
  }
}

function createShipTwoHorizontal(vertical, horizontal){  //horizontal ship
  if ((horizontal < SIZE_BOARD-1)
  && field[vertical][horizontal].ship == false
  && field[vertical][horizontal].border == false
  && field[vertical][horizontal+1].ship == false
  && field[vertical][horizontal+1].border == false){
    field[vertical][horizontal].ship = true;
    field[vertical][horizontal+1].ship = true;

    SHIP_STATUS.typeShipTwo.freeShips -= 1;

    var borderHorizontal = [-1,-1,0,1,2,2,2,1,0,-1];
    var borderVertical = [0,-1,-1,-1,-1,0,1,1,1,1];

    return createBorder(vertical, horizontal,borderHorizontal,borderVertical);
  }
}

function createShipThree(vertical,horizontal, direction){
  if(!SHIP_STATUS.typeShipThree.freeShips){
    return;
  }
  switch(direction){
    case 0: return createShipThreeVertical(vertical, horizontal);
    break;
    case 1: return createShipThreeHizontal(vertical, horizontal);
    break;
  }
}

function createShipThreeHizontal(vertical, horizontal){  //vertical ship
  if ((horizontal < SIZE_BOARD-2)
  && field[vertical][horizontal].ship == false
  && field[vertical][horizontal].border == false
  && field[vertical][horizontal+1].ship == false
  && field[vertical][horizontal+1].border == false
  && field[vertical][horizontal+2].ship == false
  && field[vertical][horizontal+2].border == false){



    field[vertical][horizontal].ship = true;
    field[vertical][horizontal+1].ship = true;
    field[vertical][horizontal+2].ship = true;

    SHIP_STATUS.typeShipThree.freeShips -= 1;

    var borderHorizontal = [-1,-1,0,1,2,3,3,3,2,1,0,-1];
    var borderVertical = [0,-1,-1,-1,-1,-1,0,1,1,1,1,1];

    return createBorder(vertical, horizontal,borderHorizontal,borderVertical);
  }
}

function createShipThreeVertical(vertical, horizontal){
  if ((vertical < SIZE_BOARD-2)
  && field[vertical][horizontal].ship == false
  && field[vertical][horizontal].border == false
  && field[vertical+1][horizontal].ship == false
  && field[vertical+1][horizontal].border == false
  && field[vertical+2][horizontal].ship == false
  && field[vertical+2][horizontal].border == false){

    field[vertical][horizontal].ship = true;
    field[vertical+1][horizontal].ship = true;
    field[vertical+2][horizontal].ship = true;

    SHIP_STATUS.typeShipThree.freeShips -= 1;

    var borderHorizontal = [0,1,1,1,1,1,0,-1,-1,-1,-1,-1];
    var borderVertical = [-1,-1,0,1,2,3,3,3,2,1,0,-1];

    return createBorder(vertical, horizontal,borderHorizontal,borderVertical);
  }
}



function createShipFour( vertical,horizontal, direction){
  if(!SHIP_STATUS.typeShipFour.freeShips){
    return;
  }
  switch(direction){
    case 0: return createShipFourVertical(vertical, horizontal);
    break;
    case 1: return createShipFourHorizontal(vertical, horizontal);
    break;
  }
}


function createShipFourVertical(vertical, horizontal){
  if ((vertical < SIZE_BOARD-3)
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

    SHIP_STATUS.typeShipFour.freeShips -= 1;

    var borderHorizontal = [0,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1];
    var borderVertical = [-1, -1,0,1,2,3,4,4,4,3,2,1,0,-1];

    return createBorder(vertical, horizontal,borderHorizontal,borderVertical);
  }
}

function createShipFourHorizontal(vertical, horizontal){
  if ((horizontal < SIZE_BOARD-3)
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

    SHIP_STATUS.typeShipFour.freeShips -= 1;

    var borderHorizontal = [-1,-1,0,1,2,3,4,4,4,3,2,1,0,-1];
    var borderVertical = [0,-1,-1,-1,-1,-1,-1,0,1,1,1,1,1,1];

    return createBorder(vertical, horizontal,borderHorizontal,borderVertical);
  }
}

function createBorder(vertical, horizontal,borderHorizontal,borderVertical){
  for(var i = 0; i < borderHorizontal.length; i++){
    var actingHorizontalBoard = horizontal+borderHorizontal[i];
    var actingVerticalBoard = vertical+borderVertical[i];
    if( actingHorizontalBoard >= 0 && actingVerticalBoard >= 0
      && actingHorizontalBoard <= (field.length-1)
      && actingVerticalBoard <= (field.length-1)) {
        field[actingVerticalBoard][actingHorizontalBoard].border = true;
      }
    }
    createFieldBattle();
  }



  function createFieldBattle(){
    table.innerHTML = '';
    for(var i = 0; i < SIZE_BOARD;i++){
      var tr = document.createElement('tr');
      for (var j = 0 ; j < SIZE_BOARD; j++){
        var td = document.createElement('td');
        if (field[i][j].ship && field[i][j].openStatus){
          td.classList = 'seaShipElementShow';
          tr.appendChild(td);
        }else if(field[i][j].border && field[i][j].openStatus){
          td.classList = 'seaElementShow';
          tr.appendChild(td);
        }else if(field[i][j].openStatus){
          td.classList = 'seaElementShow';
          tr.appendChild(td);
        } else {
          td.classList = 'seaElement';
          tr.appendChild(td);
        }
      }
      table.appendChild(tr);
    }
    document.body.appendChild(table);
  }

  function putShipRandom(){
    do {
      putShip(rand(1, 4),rand(0, 9),rand(0, 9),rand(0,1))
    } while(SHIP_STATUS.typeShipOne.freeShips || SHIP_STATUS.typeShipTwo.freeShips
      || SHIP_STATUS.typeShipThree.freeShips || SHIP_STATUS.typeShipFour.freeShips);
    }

    function rand(min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }


    function hit(vertical, horizontal){
      if(field[vertical][horizontal].ship){
        field[vertical][horizontal].openStatus = true;

        for(var i = -1; i <=1; i+=2){
          for(var j = -1; j <=1; j+=2){
            if(vertical-1 >= 0 && vertical+1 < SIZE_BOARD
              && horizontal-1 >= 0 && horizontal+1 < SIZE_BOARD){
                field[vertical+i][horizontal+j].openStatus = true;
              }
            }
          }
        } else {
          field[vertical][horizontal].openStatus = true;
        }
        createFieldBattle();
      }
