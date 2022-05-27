// backend
let currentCollection = "Round1";

// real time listener
db.collection(currentCollection).onSnapshot(snapshot => {
    console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
            console.log("Add", change.doc.data());
            renderGuess(change.doc.data().Index, change.doc.data().Value)
        }
        else if (change.type === "removed") {
            console.log("Remove", change.doc.data());
        }
    });
});


// frontend
var arrNames = [];

var lastClicked;
var grid = createGrid(10, 10, function(el,row,col,i) {
    let calcIndex = row * 10 + col;
    console.log("element:",el);
    console.log("row:",row);
    console.log("col:",col);

    const guess = {
        Index: calcIndex,
        Value: prompt("Name")
    }
    db.collection(currentCollection).add(guess).catch(err => console.log(err));
    //console.log(arrNames)
});
var table = createGuessTable();

document.body.appendChild(grid);
document.body.appendChild(table);
     
function createGrid(rowcount, colcount, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.id = "fieldgrid"
    grid.className = "grid";
    for (var r=0; r < rowcount; r++){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0; c < colcount; c++){
            var cell = tr.appendChild(document.createElement('td'));
            cell.id = "cell" + i++;
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

function renderGuess(key, value) {
    let cell = document.getElementById("cell" + key);
    if (cell) {
        cell.innerHTML = "X";

        if (arrNames[key] != null && arrNames[key].length > 0) {
            cell.className = "multiclicked"
            arrNames[key].push(value);
        } else {
            cell.className = "clicked";
            arrNames[key] = [value];
        }
    }
}