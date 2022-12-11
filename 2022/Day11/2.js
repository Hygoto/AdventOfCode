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
                let operation = [];
                if (data[1].charAt(10) === '+') operation.push(true);
                else operation.push(false);
                operation.push(data[1].slice(12));
                if (operation[1] != 'old') operation[1] = parseInt(operation[1]);
                monkeys[monkey].operation = operation;
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
    let lcm = monkeys[0].test;
    for (let index = 1; index < monkeys.length; index++) {
        lcm *= monkeys[index].test;
    }
    let inspected = Array(monkeys.length).fill(0);
    for (let round = 0; round < 10000; round++) {
        for (monkey = 0; monkey < monkeys.length; monkey++) {
            inspected[monkey] += monkeys[monkey].items.length;
            monkeys[monkey].items.forEach(item => {
                item = play(item, monkeys[monkey].operation) % lcm;
                if (item % monkeys[monkey].test === 0) monkeys[monkeys[monkey].true].items.push(item);
                else monkeys[monkeys[monkey].false].items.push(item);
            });
            monkeys[monkey].items = [];
        }
    }
    inspected.sort(compareNumbers);
    console.log(inspected[0] * inspected[1]);
});

function play(item, operation) {
    let number = operation[1];
    if (number === 'old') number = item;
    if (operation[0]) return item + number;
    else return item * number;
}

function compareNumbers(a, b) {
    return b - a;
  } 
