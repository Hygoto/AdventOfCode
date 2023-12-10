const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day10/input'),
    crlfDelay: Infinity,
});

let map = [];
let sPos = 0;
rl.on('line', (line) => {
    map.push(line.split(''));
    if (line.includes('S')) sPos = [sPos, line.indexOf('S')];
    else if (sPos [0] == undefined) sPos++;
});
rl.on('close', () => {
    let steps = 1;
    let currentPos;
    let lastDirection;
    if (['-', 'L', 'F'].includes(map[sPos[0]][sPos[1]-1])) {
        currentPos = [sPos[0], sPos[1]-1];
        lastDirection = 1;
    }
    else if (['-', 'J', '7'].includes(map[sPos[0]][sPos[1]+1])) {
        currentPos = [sPos[0], sPos[1]+1];
        lastDirection = 3;
    }
    else if (['|', 'J', 'L'].includes(map[sPos[0]-1][sPos[1]])) {
        currentPos = [sPos[0]-1, sPos[1]];
        lastDirection = 0;
    }
    else if (['|', 'F', '7'].includes(map[sPos[0]+1][sPos[1]])) {
        currentPos = [sPos[0]+1, sPos[1]];
        lastDirection = 2;
    }
    do {
        switch (map[currentPos[0]][currentPos[1]]) {
            case '|':
                if (lastDirection == 0) currentPos = [currentPos[0]+1, currentPos[1]];
                else {
                    currentPos = [currentPos[0]-1, currentPos[1]];
                    lastDirection = 2;
                }
                break;
            case '-':
                if (lastDirection == 3) currentPos = [currentPos[0], currentPos[1]+1];
                else {
                    currentPos = [currentPos[0], currentPos[1]-1];
                    lastDirection = 1;
                }
                break;
            case 'L':
                if (lastDirection == 0) {
                    currentPos = [currentPos[0], currentPos[1]+1];
                    lastDirection = 3;
                }
                else {
                    currentPos = [currentPos[0]-1, currentPos[1]];
                    lastDirection = 2;
                }
                break;
            case 'J':
                if (lastDirection == 0) {
                    currentPos = [currentPos[0], currentPos[1]-1];
                    lastDirection = 1;
                }
                else {
                    currentPos = [currentPos[0]-1, currentPos[1]];
                    lastDirection = 2;
                }
                break;
            case '7':
                if (lastDirection == 2) {
                    currentPos = [currentPos[0], currentPos[1]-1];
                    lastDirection = 1;
                }
                else {
                    currentPos = [currentPos[0]+1, currentPos[1]];
                    lastDirection = 0;
                }
                break;
            case 'F':
                if (lastDirection == 2) {
                    currentPos = [currentPos[0], currentPos[1]+1];
                    lastDirection = 3;
                }
                else {
                    currentPos = [currentPos[0]+1, currentPos[1]];
                    lastDirection = 0;
                }
                break;
        
            default:
                break;
        }
        steps++;
    } while(currentPos[0] != sPos[0] || currentPos[1] != sPos[1])
    console.log(Math.ceil(steps/2));
});

