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
    let scoreGrid = [];
    for (let index = 0; index < grid.length; index++) {
        scoreGrid[index] = Array(grid[0].length);
    }
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            scoreGrid[x][y] = calcScore(x, y);
        }
    }
    let score = 0;
    scoreGrid.forEach(element => {
        element.forEach(element => {
            if (element > score) score = element;
        });
    });
    console.log(score);
});

function calcScore(x, y) {
    const hight = grid[x][y];
    let stop = [false, false, false, false];
    let points = [0, 0, 0, 0];
    for (let index = 1; index < grid.length; index++) {
        if (x-index < 0) stop[0] = true;
        else if (grid[x-index][y] < hight && !stop[0]) points[0]++;
        else if (!stop[0]) {
            points[0]++;
            stop[0] = true;
        }
        if (x+index > grid.length-1) stop[1] = true;
        else if (grid[x+index][y] < hight && !stop[1]) points[1]++;
        else if (!stop[1]) {
            points[1]++;
            stop[1] = true;
        }
        if (y-index < 0) stop[2] = true;
        else if (grid[x][y-index] < hight && !stop[2]) points[2]++;
        else if (!stop[2]) {
            points[2]++;
            stop[2] = true;
        }
        if (y+index > grid[0].length-1) stop[3] = true;
        if (grid[x][y+index] < hight && !stop[3]) points[3]++;
        else if (!stop[3]) {
            points[3]++;
            stop[3] = true;
        }
    }
    return points[0]*points[1]*points[2]*points[3];
}
