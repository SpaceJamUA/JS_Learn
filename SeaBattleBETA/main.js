var table = document.createElement('table');
var SIZE_BOARD = 10;
var field = [];
var seaArmy = [[],[],[],[],[],[],[],[],[],[]];
var countWar = 0;
var liveShip = 10;

var button = document.createElement('button');
button.textContent = 'Auto Arrangement';
document.body.appendChild(button);

button.addEventListener('click', putShipRandom);

function pushinka() {
  for(var i = 0; i<10; i++){
    for(var k = 0; k < 10; k++){
      for(var z = 0; z < countWar; z++){
        if(field[i][k].count == z){
          seaArmy[z].push(field[i][k]);
        }
      }
    }
  }
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < seaArmy[i].length; j++){
      seaArmy[i][j].absoluteBorder = seaArmy[i][0].absoluteBorder;
    }
  }
}




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
        openStatus : false,
        absoluteBorder : [[],[]]
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
    field[vertical][horizontal].count = countWar;
    countWar+=1;
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

    for (var i = 0; i < 2; i++){
      field[vertical+i][horizontal].ship = true;
      field[vertical+i][horizontal].count = countWar;
    }
    countWar+=1;

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

    for (var i = 0; i < 2; i++){
      field[vertical][horizontal+i].ship = true;
      field[vertical][horizontal+i].count = countWar;
    }
    countWar+=1;

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


    for (var i = 0; i < 3; i++){
      field[vertical][horizontal+i].ship = true;
      field[vertical][horizontal+i].count = countWar;
    }
    countWar+=1;

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

    for (var i = 0; i < 3; i++){
      field[vertical+i][horizontal].ship = true;
      field[vertical+i][horizontal].count = countWar;
    }
    countWar+=1;

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

    for (var i = 0; i < 4; i++){
      field[vertical+i][horizontal].ship = true;
      field[vertical+i][horizontal].count = countWar;
    }
    countWar+=1;

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

    for (var i = 0; i < 4; i++){
      field[vertical][horizontal+i].ship = true;
      field[vertical][horizontal+i].count = countWar;
    }
    countWar+=1;
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
        field[vertical][horizontal].absoluteBorder[0].push(actingVerticalBoard);
        field[vertical][horizontal].absoluteBorder[1].push(actingHorizontalBoard);
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
        td.dataset.vertical = i;
        td.dataset.horizontal = j;
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
      return pushinka();
    }

    function rand(min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }


    function hit(vertical, horizontal){
      if(field[vertical][horizontal].ship){
        field[vertical][horizontal].openStatus = true;

        for(var i = -1; i <=1; i+=2){
          for(var j = -1; j <=1; j+=2){
            if(vertical+i >= 0 && vertical+i < SIZE_BOARD
              && horizontal+j >= 0 && horizontal+j < SIZE_BOARD){
                field[vertical+i][horizontal+j].openStatus = true;
              }
            }
          }

        checkHit(vertical, horizontal);

        } else {
          field[vertical][horizontal].openStatus = true;
        }

        createFieldBattle();
      }


      function clickHit(ev){
        var vertical = +ev.target.dataset.vertical;
        var horizontal = +ev.target.dataset.horizontal;
        // var ok = field[vertical][horizontal].count;
        // if(typeof ok != 'undefined'){
        //   console.log(ok);
        // }

        hit(vertical,horizontal);
      }

      table.addEventListener('click', clickHit);

      function checkHit(vertical, horizontal){
        for(var i = 0; i < seaArmy[field[vertical][horizontal].count].length; i++){
          if(!seaArmy[field[vertical][horizontal].count][i].openStatus){
            return
          }
        }
        for (var i = 0; i < field[vertical][horizontal].absoluteBorder[0].length; i++) {
          field[field[vertical][horizontal].absoluteBorder[0][i]][field[vertical][horizontal].absoluteBorder[1][i]].openStatus = true;
        }
        liveShip -= 1;
        if(!liveShip){
          alert('Game Over');
          for(var i = 0; i < SIZE_BOARD; i++){
            for(var j = 0; j < SIZE_BOARD; j++){
              field[i][j].openStatus = true;
            }
          }
          createFieldBattle();
        }

      }
