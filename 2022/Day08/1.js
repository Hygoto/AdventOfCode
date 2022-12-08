const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day08/input'),
  crlfDelay: Infinity,
});

let grid = [];
rl.on('line', (line) => {
    if (grid.length === 0) {
        for (let index = 0; index < line.length; index++) {
            grid.push([]);
        }
    }
    for (let index = 0; index < line.length; index++) {
        grid[index].push(parseInt(line.charAt(index)));
    }
});
rl.on('close', () => {
    let visibleGrid = [];
    for (let index = 0; index < grid.length; index++) {
        visibleGrid[index] = Array(grid[0].length).fill(false);
    }
    for (let index = 0; index < grid.length; index++) {
        visibleGrid[index] = findVisible(grid[index], visibleGrid[index]);
        visibleGrid[index] = findVisible(grid[index].reverse(), visibleGrid[index].reverse());
    }
    grid = grid.map((_, colIndex) => grid.map(row => row[colIndex]));
    visibleGrid = visibleGrid.map((_, colIndex) => visibleGrid.map(row => row[colIndex]));
    for (let index = 0; index < grid.length; index++) {
        visibleGrid[index] = findVisible(grid[index], visibleGrid[index]);
        visibleGrid[index] = findVisible(grid[index].reverse(), visibleGrid[index].reverse());
    }
    let visible = 0;
    visibleGrid.forEach(element => {
        element.forEach(element => {
            if (element === true) visible++;
        });
    });
    console.log(visible);
});

function findVisible(line, visible) {
    let tallest = -1;
    for (let index = 0; index < line.length; index++) {
        if (line[index] > tallest) {
            tallest = line[index];
            visible[index] = true;
        }
    }
    return visible;
}
