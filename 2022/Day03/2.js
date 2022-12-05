const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day03/input'),
    crlfDelay: Infinity,
});

let sum = 0;
let elf = 0;
let badge = [];
let items = new Array(53).fill(0);
rl.on('line', (line) => {
    if (elf === 0) {
        for (let index = 0; index < line.length; index++) {
            if (line.charCodeAt(index) < 97) items[line.charCodeAt(index) - 38]++;
            else items[line.charCodeAt(index) - 96]++;
        }
        elf++;
    }
    else if (elf === 1) {
        for (let index = 0; index < line.length; index++) {
            if (line.charCodeAt(index) < 97 && items[line.charCodeAt(index) - 38] > 0) {
                badge.push(line.charCodeAt(index) - 38);
            }
            else if (items[line.charCodeAt(index) - 96] > 0) {
                badge.push(line.charCodeAt(index) - 96);
            }
        }
        elf++;
    }
    else {
        for (let index = 0; index < line.length; index++) {
            badge.forEach(element => {
                if (line.charCodeAt(index) < 97 && element === line.charCodeAt(index) - 38) {
                    sum += line.charCodeAt(index) - 38;
                    index = line.length;
                }
                else if (element === line.charCodeAt(index) - 96) {
                    sum += line.charCodeAt(index) - 96;
                    index = line.length;
                }
            });
        }
        elf = 0;
        badge = [];
        items.fill(0);
    }
});
rl.on('close', () => console.log(sum));
