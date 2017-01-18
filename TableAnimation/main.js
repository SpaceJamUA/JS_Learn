var table = document.createElement('table');
function rand(min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}


for(var i = 0; i < 10; i++){
  var tr = document.createElement('tr')
  table.appendChild(tr);
  for(var j = 0; j < 10; j++){
    var td = document.createElement('td');
    td.textContent = rand(0,99) + '';
    td.style.backgroundColor = 'rgb(' +rand(0,255) + ',' + rand(0,255) + ',' + rand(0,255) + ')';
    tr.appendChild(td);
   }
}

document.body.appendChild(table);

function positin(){
var getLeft = getComputedStyle(table).width;
var getTop = getComputedStyle(table).height;

table.style.marginLeft = (parseInt(getLeft))/(-2) + 'px';
table.style.marginTop =  (parseInt(getTop))/(-2) + 'px';
};

positin();
