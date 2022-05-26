var arrNames = [];

var lastClicked;
var grid = createGrid(10, 10, function(el,row,col,i) {
    console.log("element:",el);
    console.log("row:",row);
    console.log("col:",col);

    // TODO: add input for name when clicked
    if (el.className === '') {
        el.className='clicked';
        el.innerHTML = "X"
        arrNames[row * 10 + col] = ["Test"]
    }
    else {
        if (arrNames[row * 10 + col] != null && arrNames[row * 10 + col].length > 0) {
            console.log("Append")
            arrNames[row * 10 + col].push("Test" + arrNames[row * 10 + col].length);
        } else {   
            el.className='';
            el.innerHTML = ""
        }
    }

    console.log(arrNames)
});
var table = createGuessTable();

document.body.appendChild(grid);
document.body.appendChild(table);
     
function createGrid(rowcount, colcount, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0; r < rowcount; r++){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0; c < colcount; c++){
            var cell = tr.appendChild(document.createElement('td'));
            //cell.innerHTML = ++i;
            cell.addEventListener('click',(function(element ,row ,column ,i){
                return function(){
                    callback(element, row, column, i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}

function createGuessTable() {
    return document.createElement('table');
}