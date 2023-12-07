const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('./2023/Day07/input'),
    crlfDelay: Infinity,
});

let decks = [];
rl.on('line', (line) => {
    decks.push(line.split(" "));
    decks[decks.length - 1][0] = decks[decks.length - 1][0].split("");
    for (let index = 0; index < decks[decks.length - 1][0].length; index++) {
        switch (decks[decks.length - 1][0][index]) {
            case 'T':
                decks[decks.length - 1][0][index] = 10;
                break;
            
            case 'J':
                decks[decks.length - 1][0][index] = 11;
                break;
    
            case 'Q':
                decks[decks.length - 1][0][index] = 12;
                break;
    
            case 'K':
                decks[decks.length - 1][0][index] = 13;
                break;
    
            case 'A':
                decks[decks.length - 1][0][index] = 14;
                break;
        
            default:
                decks[decks.length - 1][0][index] = parseInt(decks[decks.length - 1][0][index]);
                break;
        }
    }
    let deckValue = 0;
    for (let index = 0; index < decks[decks.length - 1][0].length; index++) {
        deckValue += decks[decks.length - 1][0][index] * Math.pow(10, 2 * (decks[decks.length - 1][0].length - 1) - 2 * index);
    }
    const counts = Array(14);
    counts.fill(0);
    decks[decks.length - 1][0].forEach(element => { counts[element-1]++});
    counts.sort(compareNumbers);
    if (counts[0] == 5) deckValue += 6 * Math.pow(10, 2 * (decks[decks.length - 1][0].length - 1) + 2);
    else if (counts[0] == 4) deckValue += 5 * Math.pow(10, 2 * (decks[decks.length - 1][0].length - 1) + 2);
    else if (counts[0] == 3 && counts[1] == 2) deckValue += 4 * Math.pow(10, 2 * (decks[decks.length - 1][0].length - 1) + 2);
    else if (counts[0] == 3) deckValue += 3 * Math.pow(10, 2 * (decks[decks.length - 1][0].length - 1) + 2);
    else if (counts[0] == 2 && counts[1] == 2) deckValue += 2 * Math.pow(10, 2 * (decks[decks.length - 1][0].length - 1) + 2);
    else if (counts[0] == 2) deckValue += 1 * Math.pow(10, 2 * (decks[decks.length - 1][0].length - 1) + 2);
    decks[decks.length - 1][0] = deckValue;
});
rl.on('close', () => {
    decks.sort(compareDecks);
    let winnings = 0;
    for (let index = 0; index < decks.length; index++) {
        winnings += decks[index][1] * (index + 1);
    }
    console.log(winnings);
});

function compareDecks(a, b) {
    return a[0] - b[0];
  }

  function compareNumbers(a, b) {
    return b - a;
  }
