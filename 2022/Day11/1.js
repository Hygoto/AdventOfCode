const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./2022/Day11/input'),
  crlfDelay: Infinity,
});

let monkeys = [];
let monkey = 0;
rl.on('line', (line) => {
    if (line != '') {
        const data = line.split(': ');
        switch (data[0]) {
            case '  Starting items':
                monkeys[monkey].items = data[1].split(', ').map(function (x) { return parseInt(x, 10); });
                break;

            case '  Operation':
                monkeys[monkey].operation = data[1].substring(6);
                break;

            case '  Test':
                monkeys[monkey].test = parseInt(data[1].match(/\d+/)[0]);
                break;

            case '    If true':
                monkeys[monkey].true = parseInt(data[1].match(/\d+/)[0]);
                break;

            case '    If false':
                monkeys[monkey].false = parseInt(data[1].match(/\d+/)[0]);
                break;
        
            default:
                monkeys.push({});
                break;
        }
    }
    else monkey++;
});
rl.on('close', () => {
    let inspected = Array(monkeys.length).fill(0);
    for (let round = 0; round < 20; round++) {
        for (monkey = 0; monkey < monkeys.length; monkey++) {
            inspected[monkey] += monkeys[monkey].items.length;
            monkeys[monkey].items.forEach(item => {
                item = eval(`const old = ${item}; ${monkeys[monkey].operation}`);
                item = (item / 3) | 0;
                if (item % monkeys[monkey].test === 0) monkeys[monkeys[monkey].true].items.push(item);
                else monkeys[monkeys[monkey].false].items.push(item);
            });
            monkeys[monkey].items = [];
        }
    }
    inspected.sort(compareNumbers);
    console.log(inspected[0] * inspected[1]);
});

function compareNumbers(a, b) {
    return b - a;
  } 
