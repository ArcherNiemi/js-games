var matrix  = [];

var identityMatrix = [];

var inverseMatrix = [];
var activeGridSize = 0;

function makeIdentityMatrix(size){
    identityMatrix = [];
    for(let i = 0; i < size; i++){
        let row = [];
        for(let t = 0; t < size; t++){
            if(t === i){
                row.push(1);
            } else {
                row.push(0);
            }
        }
        identityMatrix.push(row);
    }
}

function makeGrid(gridSize){
    let newGrid = "";
    for(let i = 0; i < gridSize; i++){
        newGrid += "<tr>";
        for(let t = 0; t < gridSize; t++){
            newGrid += `<td><input id='input${i*gridSize+t}'class='box'></input></td>`;
        }
        newGrid += "</tr>";
    }
    document.getElementById("inputContainer").innerHTML = newGrid;
    newGrid = "";
    for(let i = 0; i < gridSize; i++){
        newGrid += "<tr>";
        for(let t = 0; t < gridSize; t++){
            newGrid += `<td><input id='output${i*gridSize+t}' class='box' readonly></input></td>`;
        }
        newGrid += "</tr>";
    }
    document.getElementById("outputContainer").innerHTML = newGrid;
    activeGridSize = gridSize;
}

function makeAugmentedMatrix(){
    let augmentedMatrix = [];
    for(let i = 0; i < matrix.length; i++){
        let row = [];
        for(let t = 0; t < matrix[0].length; t++){
            row.push(matrix[i][t]);
        }
        for(let t = 0; t < identityMatrix[0].length; t++){
            row.push(identityMatrix[i][t]);
        }
        augmentedMatrix.push(row);
    }
    return augmentedMatrix;
}

function updateText(text){
    screenText = document.getElementById("text");
    screenText.textContent = text;
}

function makeInverseMatrix(){
    createMatrix(activeGridSize);
    makeIdentityMatrix(activeGridSize);
    let augmentedMatrix = makeAugmentedMatrix(matrix,identityMatrix);
    for(let i = 0; i < matrix.length; i++){
        for(let t = 0; t < matrix.length; t++){
            if(t !== i){
                let multiplier = augmentedMatrix[t][i] / augmentedMatrix[i][i] * -1;
                augmentedMatrix[t] = multiplyRows(augmentedMatrix[t], augmentedMatrix[i], multiplier);
            }
        }
    }
    for(let i = 0; i < matrix.length; i++){
        let multiplier = 1/augmentedMatrix[i][i]
        augmentedMatrix[i] = multiplyRowByValue(augmentedMatrix[i], multiplier);
    }
    displayOutput(augmentedMatrix);
}

function multiplyRows(row1, row2, factor){
    let newRow = [];
    for(let i = 0; i < row1.length; i++){
        newRow.push(row1[i] + row2[i]*factor);
    }
    return newRow;
}

function multiplyRowByValue(row, value){
    let newRow = []
    for(let i = 0; i < row.length; i++){
        newRow.push(row[i]*value);
    }
    return newRow;
}

function createMatrix(size){
    matrix = [];
    for(let i = 0; i < size; i++){
        let row = [];
        for(let t = 0; t < size; t++){
            let val = parseFloat(document.getElementById(`input${i*size+t}`).value);
            row.push(isNaN(val) ? 0 : val);
        }
        matrix.push(row);
    }
}

function matrixToString(currentmatrix){
    let string = "";
    for(let i = 0; i < currentmatrix.length; i++){
        for(let t = 0; t < currentmatrix[0].length; t++){
            string += `${currentmatrix[i][t].toFixed(2)}  `
        }
        string += "\n";
    }
    return string;
}

function findDeterminant(){
    let firstTerm = 0;
    for(let i = 0; i < matrix.length; i++){
        let addition = 1;
        for(let t = 0; t < matrix[0].length; t++){
            index1 = i+t;
            if(index >= matrix.length){
                index -= matrix.length;
            }
            let multiply = matrix[t][t]
        }
    }
}

function displayOutput(augmentedMatrix) {
    let size = augmentedMatrix.length;
    for (let i = 0; i < size; i++) {
        for (let t = 0; t < size; t++) {
            let val = augmentedMatrix[i][t+size];
            document.getElementById(`output${i * size + t}`).value = val.toFixed(3);
        }
    }
}

function format(number){
    const formatted = new Intl.NumberFormat('en-US').format(number);  
    return formatted;
}