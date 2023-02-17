let rows = 50;
let cols = 50;
let grid = new Array(rows);
for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols).fill(0);
}


let aliveInit = getRandomInt(250);
for (let i = 0; i < aliveInit; i++) {
    grid[getRandomInt(rows)][getRandomInt(cols)] = 1;
}
// Expected output: 0, 1 or 2
/*grid[5][25] = 1;
grid[5][26] = 1;
grid[6][26] = 1;*/

// boat
/*grid[24][26] = 1;
grid[24][27] = 1;
grid[25][26] = 1;
grid[25][28] = 1;
grid[26][27] = 1;*/

// loaf
/*grid[30][19] = 1;
grid[30][20] = 1;
grid[31][18] = 1;
grid[31][21] = 1;
grid[32][18] = 1;
grid[32][20] = 1;
grid[33][19] = 1;*/


draw(grid);
window.setInterval(function () {
    console.log('nextGeneration');
    nextGeneration();
}, 1000);

function draw(grid) {
    let html = "";
    for (let row = 0; row < grid.length; row++) {
        html += "<tr>";
        for (let col = 0; col < grid[row].length; col++) {
            clazz = "";
            if (grid[row][col] == 1)
                clazz = "class='alive'";
            html += `<td ${clazz} ></td>`;
        }
        html += "</tr>"
    }
    let elem = document.querySelector('table')
    elem.innerHTML = html;
}

function nextGeneration() {
    let next = new Array(grid.length);
    for (let row = 0; row < grid.length; row++) {
        next[row] = new Array(grid[row].length).fill(0);
        for (let col = 0; col < grid[row].length; col++) {
            // finding no Of Neighbours that are alive
            let aliveNeighbours = 0
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if ((row + i >= 0 && row + i < grid.length) && (col + j >= 0 && col + j < grid[row].length))
                        aliveNeighbours += grid[row + i][col + j]
                }
            }
            // The cell needs to be subtracted from
            // its neighbours as it was counted before
            aliveNeighbours -= grid[row][col]

            // Implementing the Rules of Life
            // Cell is lonely and dies
            if ((grid[row][col] == 1) && (aliveNeighbours < 2))
                next[row][col] = 0
            // Cell dies due to over population
            else if ((grid[row][col] == 1) && (aliveNeighbours > 3))
                next[row][col] = 0

            // A new cell is born
            else if ((grid[row][col] == 0) && (aliveNeighbours == 3))
                next[row][col] = 1

            // Remains the same
            else
                next[row][col] = grid[row][col]
        }
    }
    grid = next;
    draw(grid);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}