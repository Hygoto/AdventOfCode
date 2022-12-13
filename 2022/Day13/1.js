const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2022/Day13/input'),
    crlfDelay: Infinity,
});

let pair = 1;
let sum = 0;
let packets = [];
rl.on('line', (line) => {
    if (line != '') {
        packets.push(JSON.parse(line));
        if (packets.length === 2) {
            const order = compare(packets[0], packets[1]);
            sum += pair * order;
            pair++;
            packets = [];
        }
    }
});
rl.on('close', () => console.log(sum));

function compare(array1, array2) {
    let order = -1;
    let length;
    if (array1.length > array2.length) length = array2.length;
    else length = array1.length;
    for (let index = 0; index < length; index++) {
        if (Array.isArray(array1[index]) && Array.isArray(array2[index])) order = compare(array1[index], array2[index]);
        else if (Array.isArray(array1[index])) order = compare(array1[index], [array2[index]]);
        else if (Array.isArray(array2[index])) order = compare([array1[index]], array2[index]);
        else if (array1[index] > array2[index]) order = 0;
        else if (array1[index] < array2[index]) order = 1;
        if (order != -1) return order;
    }
    if (array1.length > array2.length) return 0;
    else if (array1.length < array2.length) return 1;
    else return -1;
}
