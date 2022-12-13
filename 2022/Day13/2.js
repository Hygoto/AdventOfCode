const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day13/input'),
    crlfDelay: Infinity,
});

let packets = [];
rl.on('line', (line) => {
    if (line != '') {
        packets.push(JSON.parse(line));
    }
});
rl.on('close', () => {
    const divider = [[[2]], [[6]]];
    packets.push(divider[0], divider[1]);
    packets.sort(compare);
    let key = packets.indexOf(divider[0]) + 1;
    key *= packets.indexOf(divider[1]) + 1;
    console.log(key);
});

function compare(array1, array2) {
    let order = 0;
    let length;
    if (array1.length > array2.length) length = array2.length;
    else length = array1.length;
    for (let index = 0; index < length; index++) {
        if (Array.isArray(array1[index]) && Array.isArray(array2[index])) order = compare(array1[index], array2[index]);
        else if (Array.isArray(array1[index])) order = compare(array1[index], [array2[index]]);
        else if (Array.isArray(array2[index])) order = compare([array1[index]], array2[index]);
        else if (array1[index] > array2[index]) order = 1;
        else if (array1[index] < array2[index]) order = -1;
        if (order != 0) return order;
    }
    if (array1.length > array2.length) return 1;
    else if (array1.length < array2.length) return -1;
    else return 0;
}
