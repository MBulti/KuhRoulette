// main
var arrNames = [];
let currentCollectionNumber = 1;
var realTimeListener = startListener();
var grid = createGuessGrid();
var table = createGuessTable();

document.body.appendChild(grid);
document.body.appendChild(table);
     

// frontend
$('select[id=roundselect]').change(function() {
    selectedValue = $(this).val();
    if (selectedValue === "")
    {
        // get the current round count
        currentCollectionNumber = $('option', this).length;
        $('<option>')
            .text("Runde " + currentCollectionNumber)
            .attr('value', currentCollectionNumber)
            .insertBefore($('option[value=""]', this)); // this is only possible in JQuery... otherwise we could use good old plain JS
        $(this).val(currentCollectionNumber);
        changeRound(currentCollectionNumber)
    } else {
        changeRound(selectedValue);
    }
});
function changeRound(value) {
    // remove old
    this.realTimeListener();
    var grid = document.getElementById('fieldgrid');
    grid.innerHTML = '';
    arrNames = [];

    // update and redraw the grid, due to firebase "onChange" we need to redraw the whole table ... 
    currentCollectionNumber = value;
    realTimeListener = startListener();
    grid = createGuessGrid(); 
}
function createGuessGrid() {
    return createGrid(11, 11, function(el,row,col,i) {
        let calcIndex = (row - 1) * 10 + (col - 1);
        console.log("element:",el);
        console.log("row:",row);
        console.log("col:",col);
    
        let guessName = prompt("Bitte Namen eingeben für Feld " + String.fromCharCode(64 + col) + row + ":");
        if (guessName) {
    
            const guess = {
                Index: calcIndex,
                Value: guessName,
                IsWinner: false,
            }
            db.collection(currentCollection()).add(guess).catch(err => console.log(err));
        }
        //console.log(arrNames)
    });
}
function createGuessTable() {
    var grid = document.getElementById('guesstable');
    return grid;
}
function createGrid(rowcount, colcount, callback ){
    var i=0;
    var grid = document.getElementById('fieldgrid');
    for (var r=0; r < rowcount; r++){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0; c < colcount; c++){
            var cell = tr.appendChild(document.createElement('td'));

            if (r === 0) {
                cell.className = "border";
                if (c === 0) continue;
                cell.innerHTML = String.fromCharCode(64 + c); // ASCI table: 65 = A, 66 = B ...
                continue;
            }
            if (c === 0) {
                cell.className = "border";
                if (r === 0) continue;
                cell.innerHTML = r;
                continue;
            }

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
function renderGuess(key, value, isWinner = false) {
    let cell = document.getElementById("cell" + key);
    if (cell) {
        cell.innerHTML = "X";

        if (isWinner) {
            cell.className = "winner";
        }
        else {
            if (arrNames[key] != null && arrNames[key].length > 0) {
                cell.className = "multiclicked"
                arrNames[key].push(value);
            } else {
                cell.className = "clicked";
                arrNames[key] = [value];
            }
        }
    }
    console.log(arrNames);
}
function currentCollection() {
    return "Round" + currentCollectionNumber;
}

// backend
function startListener() {
    console.log(currentCollection())
    return db.collection(currentCollection()).onSnapshot(snapshot => {
        console.log(snapshot.docChanges());
        snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                console.log("Add", change.doc.data());
                renderGuess(change.doc.data().Index, change.doc.data().Value, change.doc.data().IsWinner)
            }
            else if (change.type === "removed") {
                console.log("Remove", change.doc.data());
            }
        });
    });
}