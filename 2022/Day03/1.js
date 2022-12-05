const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day03/input'),
    crlfDelay: Infinity,
});

let sum = 0;
rl.on('line', (line) => {
    let items = new Array(53).fill(0);
    for (let index = 0; index < line.length/2; index++) {
        if (line.charCodeAt(index) < 97) items[line.charCodeAt(index) - 38]++;
        else items[line.charCodeAt(index) - 96]++;
    }
    for (let index = line.length/2; index < line.length; index++) {
        if (line.charCodeAt(index) < 97 && items[line.charCodeAt(index) - 38] > 0) {
            sum += line.charCodeAt(index) - 38;
            index = line.length;
        }
        else if (items[line.charCodeAt(index) - 96] > 0) {
            sum += line.charCodeAt(index) - 96;
            index = line.length;
        }
    }
});
rl.on('close', () => console.log(sum));
