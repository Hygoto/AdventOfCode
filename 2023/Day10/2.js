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
    let loop = [];
    let setEnclosed = false;
    let enclosedSide = 0;
    let enclosed;
    let lastEnclosedCount = 0;
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
    let firstLastDirection = lastDirection;
    do {
        if (setEnclosed && enclosed == undefined) enclosed = new Set();
        if (enclosed == undefined) loop.push(currentPos.toString());
        switch (map[currentPos[0]][currentPos[1]]) {
            case '|':
                if (lastDirection == 0) {
                    if (enclosed != undefined && !loop.includes(`${currentPos[0]},${currentPos[1]-(1*enclosedSide)}`)) enclosed.add(`${currentPos[0]},${currentPos[1]-(1*enclosedSide)}`);
                    currentPos = [currentPos[0]+1, currentPos[1]];
                }
                else {
                    if (enclosed != undefined && !loop.includes(`${currentPos[0]},${currentPos[1]+(1*enclosedSide)}`)) enclosed.add(`${currentPos[0]},${currentPos[1]+(1*enclosedSide)}`);
                    currentPos = [currentPos[0]-1, currentPos[1]];
                    lastDirection = 2;
                }
                break;
            case '-':
                if (lastDirection == 3) {
                    if (enclosed != undefined && !loop.includes(`${currentPos[0]+(1*enclosedSide)},${currentPos[1]}`)) enclosed.add(`${currentPos[0]+(1*enclosedSide)},${currentPos[1]}`);
                    currentPos = [currentPos[0], currentPos[1]+1];
                }
                else {
                    if (enclosed != undefined && !loop.includes(`${currentPos[0]-(1*enclosedSide)},${currentPos[1]}`)) enclosed.add(`${currentPos[0]-(1*enclosedSide)},${currentPos[1]}`);
                    currentPos = [currentPos[0], currentPos[1]-1];
                    lastDirection = 1;
                }
                break;
            case 'L':
                if (lastDirection == 0) {
                    if (enclosed == undefined) enclosedSide--;
                    if (enclosed != undefined && enclosedSide > 0 && !loop.includes(`${currentPos[0]+1},${currentPos[1]}`)) enclosed.add(`${currentPos[0]+1},${currentPos[1]}`);
                    if (enclosed != undefined && enclosedSide > 0 && !loop.includes(`${currentPos[0]},${currentPos[1]-1}`)) enclosed.add(`${currentPos[0]},${currentPos[1]-1}`);
                    currentPos = [currentPos[0], currentPos[1]+1];
                    lastDirection = 3;
                }
                else {
                    if (enclosed == undefined) enclosedSide++;
                    if (enclosed != undefined && enclosedSide < 0 && !loop.includes(`${currentPos[0]+1},${currentPos[1]}`)) enclosed.add(`${currentPos[0]+1},${currentPos[1]}`);
                    if (enclosed != undefined && enclosedSide < 0 && !loop.includes(`${currentPos[0]},${currentPos[1]-1}`)) enclosed.add(`${currentPos[0]},${currentPos[1]-1}`);
                    currentPos = [currentPos[0]-1, currentPos[1]];
                    lastDirection = 2;
                }
                break;
            case 'J':
                if (lastDirection == 0) {
                    if (enclosed == undefined) enclosedSide++;
                    if (enclosed != undefined && enclosedSide < 0 && !loop.includes(`${currentPos[0]+1},${currentPos[1]}`)) enclosed.add(`${currentPos[0]+1},${currentPos[1]}`);
                    if (enclosed != undefined && enclosedSide < 0 && !loop.includes(`${currentPos[0]},${currentPos[1]+1}`)) enclosed.add(`${currentPos[0]},${currentPos[1]+1}`);
                    currentPos = [currentPos[0], currentPos[1]-1];
                    lastDirection = 1;
                }
                else {
                    if (enclosed == undefined) enclosedSide--;
                    if (enclosed != undefined && enclosedSide > 0 && !loop.includes(`${currentPos[0]+1},${currentPos[1]}`)) enclosed.add(`${currentPos[0]+1},${currentPos[1]}`);
                    if (enclosed != undefined && enclosedSide > 0 && !loop.includes(`${currentPos[0]},${currentPos[1]+1}`)) enclosed.add(`${currentPos[0]},${currentPos[1]+1}`);
                    currentPos = [currentPos[0]-1, currentPos[1]];
                    lastDirection = 2;
                }
                break;
            case '7':
                if (lastDirection == 2) {
                    if (enclosed == undefined) enclosedSide--;
                    if (enclosed != undefined && enclosedSide > 0 && !loop.includes(`${currentPos[0]-1},${currentPos[1]}`)) enclosed.add(`${currentPos[0]-1},${currentPos[1]}`);
                    if (enclosed != undefined && enclosedSide > 0 && !loop.includes(`${currentPos[0]},${currentPos[1]+1}`)) enclosed.add(`${currentPos[0]},${currentPos[1]+1}`);
                    currentPos = [currentPos[0], currentPos[1]-1];
                    lastDirection = 1;
                }
                else {
                    if (enclosed == undefined) enclosedSide++;
                    if (enclosed != undefined && enclosedSide < 0 && !loop.includes(`${currentPos[0]-1},${currentPos[1]}`)) enclosed.add(`${currentPos[0]-1},${currentPos[1]}`);
                    if (enclosed != undefined && enclosedSide < 0 && !loop.includes(`${currentPos[0]},${currentPos[1]+1}`)) enclosed.add(`${currentPos[0]},${currentPos[1]+1}`);
                    currentPos = [currentPos[0]+1, currentPos[1]];
                    lastDirection = 0;
                }
                break;
            case 'F':
                if (lastDirection == 2) {
                    if (enclosed == undefined) enclosedSide++;
                    if (enclosed != undefined && enclosedSide < 0 && !loop.includes(`${currentPos[0]-1},${currentPos[1]}`)) enclosed.add(`${currentPos[0]-1},${currentPos[1]}`);
                    if (enclosed != undefined && enclosedSide < 0 && !loop.includes(`${currentPos[0]},${currentPos[1]-1}`)) enclosed.add(`${currentPos[0]},${currentPos[1]-1}`);
                    currentPos = [currentPos[0], currentPos[1]+1];
                    lastDirection = 3;
                }
                else {
                    if (enclosed == undefined) enclosedSide--;
                    if (enclosed != undefined && enclosedSide > 0 && !loop.includes(`${currentPos[0]-1},${currentPos[1]}`)) enclosed.add(`${currentPos[0]-1},${currentPos[1]}`);
                    if (enclosed != undefined && enclosedSide > 0 && !loop.includes(`${currentPos[0]},${currentPos[1]-1}`)) enclosed.add(`${currentPos[0]},${currentPos[1]-1}`);
                    currentPos = [currentPos[0]+1, currentPos[1]];
                    lastDirection = 0;
                }
                break;
        
            default:
                setEnclosed = true;
                enclosedSide = Math.sign(enclosedSide);
                currentPos = loop[0].split(',');
                currentPos[0] = parseInt(currentPos[0]);
                currentPos[1] = parseInt(currentPos[1]);
                lastDirection = firstLastDirection;
                break;
        }
        if (enclosed != undefined && enclosed.size != lastEnclosedCount) {
            fill(enclosed, loop);
            lastEnclosedCount = enclosed.size;
        }
    } while((currentPos[0] != sPos[0] || currentPos[1] != sPos[1]) || (enclosed == undefined))
    console.log(enclosed.size);
});

function fill(enclosed, loop) {
    let current = Array.from(enclosed)[enclosed.size-1].split(',');
    current[0] = parseInt(current[0]);
    current[1] = parseInt(current[1]);
    if (!loop.includes(`${current[0]+1},${current[1]}`) && !enclosed.has(`${current[0]+1},${current[1]}`)) {
        enclosed.add(`${current[0]+1},${current[1]}`);
        fill(enclosed, loop);
    }
    if (!loop.includes(`${current[0]-1},${current[1]}`) && !enclosed.has(`${current[0]-1},${current[1]}`)) {
        enclosed.add(`${current[0]-1},${current[1]}`);
        fill(enclosed, loop);
    }
    if (!loop.includes(`${current[0]},${current[1]+1}`) && !enclosed.has(`${current[0]},${current[1]+1}`)) {
        enclosed.add(`${current[0]},${current[1]+1}`);
        fill(enclosed, loop);
    }
    if (!loop.includes(`${current[0]},${current[1]-1}`) && !enclosed.has(`${current[0]},${current[1]-1}`)) {
        enclosed.add(`${current[0]},${current[1]-1}`);
        fill(enclosed, loop);
    }
}
