const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day12/input'),
    crlfDelay: Infinity,
});

let sum = 0;
rl.on('line', (line) => {
    let grouplengths = line.match(/\d+/g);
    for (let index = 0; index < grouplengths.length; index++) {
        grouplengths[index] = parseInt(grouplengths[index]);
    }
    line = line.split(' ')[0];
    line = line.replace(/(\.)+/g, '.');
    let groups = line.match(/(\?)+|(\.)+|(#)+/g);
    let tmp = 0;
    while (tmp != groups.length && groups.length != 0) {
        [line, groups] = removeOutsideDots(line, groups);
        tmp = groups.length;
        [line, groups, grouplengths] = removeOutsideSprings(line, groups, grouplengths);
    }
    tmp = [line.match(/[#?]/g), line.match(/[#]/g)];
    if (tmp[0] == null) tmp[0] = [];
    if (tmp[1] == null) tmp[1] = [];
    if (tmp[0].length == grouplengths.reduce(add, 0) || tmp[1].length == grouplengths.reduce(add, 0)) {
        sum += 1;
        return;
    }
    sum += branch(line, grouplengths, 0);
});
rl.on('close', () => console.log(sum));

function branch(line, grouplengths, previousDamaged) {
    if (line == '' && grouplengths.length == 0) return 1;
    else if (line == '' && grouplengths.length == 1 && grouplengths[0] == previousDamaged) return 1;
    else if (line == '') return 0;
    else if (line.charAt(0) == '#' && grouplengths.length == 0) return 0;
    else if (line.charAt(0) == '#' && previousDamaged >= grouplengths[0]) return 0;
    else if (line.charAt(0) == '#') {
        return branch(line.slice(1), grouplengths, previousDamaged+1)
    }
    else if (line.charAt(0) == '.' && previousDamaged == 0) {
        return branch(line.slice(1), grouplengths, 0);
    }
    else if (line.charAt(0) == '.' && previousDamaged == grouplengths[0]) {
        return branch(line.slice(1), grouplengths.slice(1), 0);
    }
    else if (line.charAt(0) == '.') {
        return 0;
    }
    else if (previousDamaged < grouplengths[0] && previousDamaged > 0) {
        return branch(line.slice(1), grouplengths, previousDamaged+1);
    }
    else if (previousDamaged == grouplengths[0]) {
        return branch(line.slice(1), grouplengths.slice(1), 0);
    }
    else if (grouplengths.length == 0) {
        return branch(line.slice(1), grouplengths, 0);
    }
    else {
        let tmp = [line.replace('?', '#'), line.replace('?', '.')];
        tmp[0] = branch(tmp[0], grouplengths, previousDamaged);
        tmp[1] = branch(tmp[1], grouplengths, previousDamaged);
        return tmp[0] + tmp[1];
    }
}

function add(accumulator ,currentValue) {
    return accumulator + currentValue;
}

function removeOutsideDots(line, groups) {
    if (groups[0] == '.') {
        line = line.slice(1);
        groups.splice(0, 1);
    }
    if (groups.length != 0 && groups[groups.length-1] == '.') {
        line = line.slice(0, -1);
        groups.pop();
    }
    return [line, groups];
}
function removeOutsideSprings(line, groups, grouplengths) {
    if (groups.length != 0 && groups[0].charAt(0) == '#') {
        line = line.slice(grouplengths[0]);
        grouplengths.splice(0, 1);
        groups.splice(0, 1);
        if (line.charAt(0) == '?') line = line.replace('?', '.');
    }
    if (groups.length != 0 && groups[groups.length-1].charAt(0) == '#') {
        line = line.slice(0, -grouplengths[grouplengths.length-1]);
        grouplengths.pop();
        if (line.charAt(line.length-1) == '?') line = line.replace(/.$/,".");
    }
    groups = line.match(/(\?)+|(\.)+|(#)+/g);
    if (groups == null) groups = [];
    return [line, groups, grouplengths];
}
