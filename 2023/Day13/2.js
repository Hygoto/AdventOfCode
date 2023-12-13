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
        pattern.push(line.split(''));
    }
    else {
        if (sum == 7998) console.log();
        searchReflection();
        pattern = [];
    }
});
rl.on('close', () => {
    searchReflection();
    console.log(sum)
});

function searchReflection() {
    let normalReflectionline = normalReflection();
    let reflectionLine = reflection(normalReflectionline);
    if (reflectionLine != null) {
        sum += 100 * reflectionLine;
        return;
    }
    let tmp = pattern.slice(0);
    pattern = [];
    for (let x = 0; x < tmp[0].length; x++) {
        pattern.push([]);
        for (let y = 0; y < tmp.length; y++) {
            pattern[x].push(tmp[y][x]);
        }
    }
    normalReflectionline = normalReflection();
    reflectionLine = reflection(normalReflectionline);
    if (reflectionLine != null) {
        sum += reflectionLine;
        return;
    }
}
function reflection(normalReflectionline) {
    let smudge = false;
    let x = 1;
    let reflectionStart = -1;
    for (let index = 1; index < pattern.length; index++) {
        diff = 0;
        if (index - x < 0 && smudge) break;
        else if (index - x < 0) {
            x = 1;
            index = reflectionStart + 1;
            reflectionStart = -1;
        }
        for (let index1 = 0; index1 < pattern[0].length; index1++) {
            if (pattern[index][index1] != pattern[index-x][index1]) diff++;
        }
        if (diff == 0) {
            x += 2;
            if (reflectionStart == -1) reflectionStart = index;
            if (reflectionStart == normalReflectionline) {
                reflectionStart = -1;
                x = 1;
            }
        }
        else if (diff == 1 && !smudge) {
            x += 2;
            smudge = true;
            if (reflectionStart == -1) reflectionStart = index;
            if (reflectionStart == normalReflectionline) {
                reflectionStart = -1;
                x = 1;
                smudge = false;
            }
        }
        else if (reflectionStart != -1) {
            index = reflectionStart;
            x = 1;
            reflectionStart = -1;
            smudge = false;
        }
    }
    if (reflectionStart > -1 && smudge) {
        return reflectionStart;
    }
    else return null;
}
function normalReflection() {
    let x = 1;
    let reflectionStart = -1;
    let diff;
    for (let index = 1; index < pattern.length; index++) {
        diff = 0;
        if (index - x < 0) break;
        for (let index1 = 0; index1 < pattern[0].length; index1++) {
            if (pattern[index][index1] != pattern[index-x][index1]) diff++;
        }
        if (diff == 0) {
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
    return reflectionStart;
}