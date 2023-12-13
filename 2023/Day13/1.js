const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day13/input'),
    crlfDelay: Infinity,
});

let sum = 0;
let pattern = [];
rl.on('line', (line) => {
    if (line != '') {
        pattern.push(line);
    }
    else {
        searchReflection();
        pattern = [];
    }
});
rl.on('close', () => {
    searchReflection();
    console.log(sum)
});

function searchReflection() {
    let x = 1;
    let reflectionStart = -1;
    for (let index = 1; index < pattern.length; index++) {
        if (pattern[index] == pattern[index-x]) {
            x += 2;
            if (reflectionStart == -1) reflectionStart = index;
        }
        else if (index-x < 0) break;
        else if (reflectionStart != -1) {
            index = reflectionStart;
            x = 1;
            reflectionStart = -1;
        }
    }
    if (reflectionStart > -1) {
        sum += 100 * reflectionStart;
        return;
    }
    let tmp = [];
    for (let index = 0; index < pattern.length; index++) {
        tmp.push(pattern[index].split(''));
    }
    pattern = [];
    for (let x = 0; x < tmp[0].length; x++) {
        pattern.push([]);
        for (let y = 0; y < tmp.length; y++) {
            pattern[x].push([tmp[y][x]]);
        }
        pattern[x] = pattern[x].join('');
    }
    x = 1;
    reflectionStart = -1;
    for (let index = 1; index < pattern.length; index++) {
        if (pattern[index] == pattern[index-x]) {
            x += 2;
            if (reflectionStart == -1) reflectionStart = index;
        }
        else if (index-x < 0) break;
        else if (reflectionStart != -1) {
            index = reflectionStart;
            x = 1;
            reflectionStart = -1;
        }
    }
    if (reflectionStart > -1) {
        sum += reflectionStart;
        return;
    }
}
