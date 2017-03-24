var gameStatus =  {
  turnPlayer: true,
  gameStarted: false
}

var LOGIC_PART = {
  SIZE_BOARD : 10,
  buildField: function(){
    this.field = [];
    for (var i = 0; i < this.SIZE_BOARD; i++){
      this.field[i]=[];
      this.armada[i]=[];
      for (var k=0; k < this.SIZE_BOARD; k++ ){
        this.field[i][k] = {
          border: false,
          ship : false,
          openStatus : false,
          absoluteBorder : [[],[]],
        }
      }
    }
  },

  rand: function(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
  },

  putShip: function(typeShip,direction, vertical, horizontal){

    switch (typeShip) {
      case 1: workingShip =   this.marineArmy.singleDeckShip;
      break;
      case 2: workingShip =   this.marineArmy.twoDeckShip;
      break;
      case 3: workingShip =   this.marineArmy.threeDeckShip;
      break;
      case 4: workingShip =   this.marineArmy.fourDeckShip;
      break;
    }

    if(workingShip.thePositionOff >= workingShip.maxAmountShip){return}

    if(direction == 0){
      if( vertical >= workingShip.limitationLocation){return}
      for(var i = 0; i < workingShip.spaceRequirement; i++){
        if(this.field[vertical+i][horizontal].ship || this.field[vertical+i][horizontal].border){
          return;
        }
      }
      return this.verticalLocation(vertical, horizontal);
    } else {
      if( horizontal >= workingShip.limitationLocation){return}
      for(var i = 0; i < workingShip.spaceRequirement; i++){
        if( this.field[vertical][horizontal+i].ship || this.field[vertical][horizontal+i].border){
          return;
        }
      }
      return this.horizontalLocation(vertical, horizontal);
    }
  },

  putShipRandom: function(){
    do {
      this.putShip(this.rand(1,4),this.rand(0,1), this.rand(0,9), this.rand(0,9))
    } while(this.marineArmy.currentAmountShip < this.marineArmy.maxAmountAllShip)
  },

  verticalLocation: function(vertical, horizontal){
    for(i = 0; i < workingShip.spaceRequirement; i++){
      this.field[vertical+i][horizontal].ship = true;
      this.field[vertical+i][horizontal].count = this.marineArmy.countWar;
      this.armada[this.marineArmy.countWar].push(this.field[vertical+i][horizontal]);
    }
    workingShip.liveShip += 1;
    workingShip.thePositionOff +=1;
    this.marineArmy.countWar +=1;
    this.marineArmy.currentAmountShip +=1;
    this.marineArmy.liveShips +=1;

    this.createBorder(vertical, horizontal, workingShip.verticalArrangement);
  },
  horizontalLocation: function(vertical, horizontal){
    for(i = 0; i < workingShip.spaceRequirement; i++){
      this.field[vertical][horizontal+i].ship = true;
      this.field[vertical][horizontal+i].count =   this.marineArmy.countWar;
      this.armada[this.marineArmy.countWar].push(this.field[vertical][horizontal+i]);
    }
    workingShip.liveShip += 1;
    workingShip.thePositionOff +=1;
    this.marineArmy.countWar +=1;
    this.marineArmy.currentAmountShip +=1;
    this.marineArmy.liveShips +=1;

    this.createBorder(vertical, horizontal, workingShip.horizontalArrangement);
  },

  createBorder: function(vertical, horizontal, arrangement){

    for(var i = 0; i < arrangement[0].length; i++){
      var actingVerticalBoard = vertical+arrangement[0][i];
      var actingHorizontalBoard = horizontal+arrangement[1][i];
      if( actingHorizontalBoard >= 0 && actingVerticalBoard >= 0
        && actingHorizontalBoard <= (this.field.length-1)
        && actingVerticalBoard <= (this.field.length-1)) {
          this.field[actingVerticalBoard][actingHorizontalBoard].border = true;
          this.field[vertical][horizontal].absoluteBorder[0].push(actingVerticalBoard);
          this.field[vertical][horizontal].absoluteBorder[1].push(actingHorizontalBoard);
        }
      }
      for(var i = 1; i < this.armada[this.marineArmy.countWar-1].length; i++){
        this.armada[this.marineArmy.countWar-1][i].absoluteBorder = this.armada[this.marineArmy.countWar-1][0].absoluteBorder;
      }
      this.createFieldBattle();
    },

    createFieldBattle: function(){
      this.table.innerHTML = '';
      for(var i = 0; i < this.SIZE_BOARD;i++){
        var tr = document.createElement('tr');
        for (var j = 0 ; j < this.SIZE_BOARD; j++){
          var td = document.createElement('td');
          td.dataset.vertical = i;
          td.dataset.horizontal = j;
          if(this.player && !gameStatus.gameStarted){
            if(this.field[i][j].border){
              td.classList = 'seaElementShow'
            }
            if(this.field[i][j].ship){
              td.classList = 'seaShipElementShow'
            }
          } else if (gameStatus.gameStarted && !this.player) {
            if(this.field[i][j].openStatus){
              td.classList = 'seaElementShow'
            }
            if(this.field[i][j].ship && this.field[i][j].openStatus){
              td.classList = 'seaShipElementHit'
            }
          } else if (gameStatus.gameStarted && this.player) {
            if(this.field[i][j].openStatus){
              td.classList = 'seaElementShow'
            }
            if(this.field[i][j].ship){
              td.classList = 'seaShipElementShow'
            }
            if(this.field[i][j].ship && this.field[i][j].openStatus){
              td.classList = 'seaShipElementHit'
            }
          }
          tr.appendChild(td);

          this.table.appendChild(tr);
        }

        this.table.className = this.classTable;
        document.body.appendChild(this.table);
      }
    },
    hit: function(vertical, horizontal){
      if(this.field[vertical][horizontal].openStatus && gameStatus.turnPlayer){
        alert('Эта ячейка уже открыта');
        return;
      }
      this.field[vertical][horizontal].openStatus = true;

      if(this.field[vertical][horizontal].ship){
        for(var i = -1; i <=1; i+=2){
          for(var j = -1; j <=1; j+=2){
            if(vertical+i >= 0 && vertical+i < this.SIZE_BOARD
              && horizontal+j >= 0 && horizontal+j < this.SIZE_BOARD){
                this.field[vertical+i][horizontal+j].openStatus = true;
              }
            }
          }
          this.createFieldBattle();
          this.checkHit(vertical, horizontal);
        } else {
          this.createFieldBattle();
          gameStatus.turnPlayer = !gameStatus.turnPlayer;
        }

        return this.lineHit();
      },

      lineHit: function() {
        if(gameStatus.turnPlayer){
          return;
        } else {
          return setTimeout(function(){return player.logicMachine.call(player)}, 500);
        }
      },

      logicMachine: function() {
        var verticalMachineHit = this.rand(0,9);
        var horizontalMachineHit = this.rand(0,9);
        if(this.field[verticalMachineHit][horizontalMachineHit].openStatus){

          return this.logicMachine();
        }else{
          this.createFieldBattle();
          return this.hit(verticalMachineHit, horizontalMachineHit);
        }

      },

      checkHit: function(vertical, horizontal){
        for(var i = 0; i < this.armada[this.field[vertical][horizontal].count].length; i++){
          if(!this.armada[this.field[vertical][horizontal].count][i].openStatus){
            return;
          }
        }
        this.marineArmy.liveShips -= 1;
        for (var i = 0; i < this.field[vertical][horizontal].absoluteBorder[0].length; i++) {
          this.field[this.field[vertical][horizontal].absoluteBorder[0][i]][this.field[vertical][horizontal].absoluteBorder[1][i]].openStatus = true;
        }
        this.createFieldBattle();

        if(!this.marineArmy.liveShips){
          this.gameOver();
        }
      },
      gameOver: function() {
        if(this.player){
          alert('Вы проиграли');
        }else{
          alert('Вы победили');
        }
        for(i = 0; i < this.SIZE_BOARD; i++){
          for(k = 0; k < this.SIZE_BOARD; k++){
            this.field[i][k].openStatus = true;
          }
        }
        this.createFieldBattle();
      }
    }


    function SeaBattle(name, player){
      this.name = name;
      this.player = player;
      this.classTable = name;
      this.field = [];
      this.armada = [];
      this.table = document.createElement('table');
      this.direction = 0;
      this.typeShip = 1;
      this.marineArmy = {
        maxAmountAllShip: 10,
        currentAmountShip: 0,
        liveShips: 0,
        countWar: 0,
        singleDeckShip:{
          spaceRequirement: 1,
          freeShips: 4,
          thePositionOff: 0,
          maxAmountShip: 4,
          limitationLocation: this.SIZE_BOARD,
          verticalArrangement:[[-1,-1,0,1,1,1,0,-1],[0,-1,-1,-1,0,1,1,1]],
          horizontalArrangement:[[-1,-1,0,1,1,1,0,-1],[0,-1,-1,-1,0,1,1,1]]
        },
        twoDeckShip:{
          freeShips: 3,
          spaceRequirement: 2,
          thePositionOff: 0,
          maxAmountShip: 3,
          limitationLocation: this.SIZE_BOARD - 1,
          verticalArrangement:[[-1,-1,0,1,2,2,2,1,0,-1],[0,1,1,1,1,0,-1,-1,-1,-1]],
          horizontalArrangement:[[0,-1,-1,-1,-1,0,1,1,1,1],[-1,-1,0,1,2,2,2,1,0,-1]]
        },
        threeDeckShip:{
          freeShips: 2,
          spaceRequirement: 3,
          thePositionOff: 0,
          maxAmountShip: 2,
          limitationLocation: this.SIZE_BOARD - 2,
          verticalArrangement:[[-1,-1,0,1,2,3,3,3,2,1,0,-1],
          [0,1,1,1,1,1,0,-1,-1,-1,-1,-1]],
          horizontalArrangement:[[0,-1,-1,-1,-1,-1,0,1,1,1,1,1],
          [-1,-1,0,1,2,3,3,3,2,1,0,-1]]
        },
        fourDeckShip:{
          freeShips: 1,
          spaceRequirement: 4,
          thePositionOff: 0,
          maxAmountShip: 1,
          limitationLocation: this.SIZE_BOARD - 3,
          verticalArrangement:[[-1,-1,0,1,2,3,4,4,4,3,2,1,0,-1],
          [0,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1]],
          horizontalArrangement:[[0,-1,-1,-1,-1,-1,-1,0,1,1,1,1,1,1],
          [-1,-1,0,1,2,3,4,4,4,3,2,1,0,-1]]
        }
      }
      this.buildField();
      this.createFieldBattle();
      if(!this.player){
        this.putShipRandom();

      }
    }


    SeaBattle.prototype = LOGIC_PART;


    var player = new SeaBattle('player', true);
    var machineBrain = new SeaBattle('machineBrainShow', false);

    (function functionName() {



      var computerTable = document.querySelector('.machineBrainShow')
      computerTable.className = 'machineBrain';


      player.table.addEventListener('click', clickPutShip);

      function clickPutShip(ev){
        var vertical = +ev.target.dataset.vertical;
        var horizontal = +ev.target.dataset.horizontal;

        return player.putShip(player.typeShip,player.direction,vertical,horizontal);
      }

      var typeDirectionButton =document.querySelector('.typeDirection');
      var typeShipButton = document.querySelector('.typeShip');

      typeDirectionButton.addEventListener('blur', function(ev){
        player.direction = +ev.target.children[ev.target.selectedIndex].getAttribute('name')
      })

      typeShipButton.addEventListener('blur', function(ev){
        player.typeShip = +ev.target.children[ev.target.selectedIndex].getAttribute('name')
      })

      var auto = document.getElementsByName('autoArrangement')[0];
      auto.addEventListener('click', function() { return player.putShipRandom()});


      var start = document.getElementsByName('startGame')[0];
      start.addEventListener('click', startGame);

      var hideInterface = document.querySelector('.interface');
      var showRestartGame = document.querySelector('.restartGame');


      function startGame(ev){
        if( player.marineArmy.currentAmountShip < player.marineArmy.maxAmountAllShip){
          return alert('Не все корабли расставлены');
        }
        gameStatus.gameStarted = true;
        hideInterface.className = 'hideInterface';
        showRestartGame.className = 'showRestartGame';
        computerTable.className = 'machineBrainShow';
        player.createFieldBattle();
        console.log(machineBrain);
        console.log(player);

      }
      showRestartGame.addEventListener('click',restartGame);

      function restartGame(ev){
        location.reload();
      }

      machineBrain.table.addEventListener('click', function(ev){
        if(gameStatus.gameStarted){
          var vertical = +ev.target.dataset.vertical;
          var horizontal = +ev.target.dataset.horizontal;
          return machineBrain.hit(vertical,horizontal);
        }
      })
    })();
