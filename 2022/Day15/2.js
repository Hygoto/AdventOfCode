const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day15/input'),
    crlfDelay: Infinity,
});

const maxCoordinate = 4000000;
let positions = [];
rl.on('line', (line) => {
    line = line.match(/\-?\d+/g);
    for (let index = 0; index < line.length; index++) {
        line[index] = parseInt(line[index]);
    }
    positions.push(line);

});
rl.on('close', () => {
    let distances = [];
    positions.forEach(element => {
        distances.push(Math.abs(element[0] - element[2]) + Math.abs(element[1] - element[3]));
    });
    let frequency;
    let inRange;
    for (let x = 0; x <= maxCoordinate; x++) {
        for (let y = 0; y <= maxCoordinate; y++) {
            inRange = false;
            for (let sensor = 0; sensor < distances.length; sensor++) {
                if (Math.abs(x - positions[sensor][0]) + Math.abs(y - positions[sensor][1]) <= distances[sensor]) {
                    inRange = true;
                    y += distances[sensor] - Math.abs(x - positions[sensor][0]) + Math.abs(y - positions[sensor][1]);
                    break;
                }
            }
            if (!inRange) {
                frequency = x * 4000000 + y;
                break;
            }
        }
        if (!inRange) break;
    }
    console.log(frequency);
});
