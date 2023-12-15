const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day15/input'),
    crlfDelay: Infinity,
});

let sum = 0;
rl.on('line', (line) => {
    line = line.split(',');
    for (let index = 0; index < line.length; index++) {
        line[index] = line[index].split('=');
    }
    let boxes = new Array(256);
    for (let index = 0; index < boxes.length; index++) {
        boxes[index] = new Map();
    }
    line.forEach(element => {
        if (element.length == 1) {
            element = element[0].slice(0, -1);
            boxes[hash(element)].delete(element);
        }
        else {
            boxes[hash(element[0])].set(element[0], element[1]);
        }
    });
    for (let box = 0; box < boxes.length; box++) {
        let lenses = Array.from(boxes[box].values());
        for (let lens = 0; lens < lenses.length; lens++) {
            sum += (box + 1) * (lens + 1) * (lenses[lens]);
        }
    }
});
rl.on('close', () => console.log(sum));

function hash(string) {
    let hash = 0;
    for (let index = 0; index < string.length; index++) {
        hash += string.charCodeAt(index);
        hash *= 17;
        hash %= 256;
    }
    return hash;
}