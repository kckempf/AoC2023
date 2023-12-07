import { readFileSync } from 'fs';

const fileInput = readFileSync('./input.txt', 'utf-8');
const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const findScore = (input: string) => {
    const inputArr = input.split(/\r?\n/);
    let output = 0;
    for (const row of inputArr) {
        const winningNumbers = row.split(' | ')[0].split(':')[1].match(/\d+/g);
        const drawnNumbers = row.split(' | ')[1].match(/\d+/g);
        const winCount = winningNumbers?.reduce((acc, curr) => acc + (drawnNumbers?.includes(curr) ? 1 : 0), 0);
        if (winCount && winCount > 0){
            output += 2 ** (winCount - 1);
        }
    }
    return output;
}

const countCards = (input: string) => {
    const inputArr = input.split(/\r?\n/);
    const hold = inputArr.map(x => 1);
    for (let i = 0; i < inputArr.length; i++){
        const row = inputArr[i];
        const winningNumbers = row.split(' | ')[0].split(':')[1].match(/\d+/g);
        const drawnNumbers = row.split(' | ')[1].match(/\d+/g);
        const winCount = winningNumbers?.reduce((acc, curr) => acc + (drawnNumbers?.includes(curr) ? 1 : 0), 0);
        if (winCount && winCount > 0){
            for (let j = i + 1; (j <= i + winCount && j < hold.length); j++){
                hold[j] += hold[i];
            }
        }
    }
    return hold.reduce((acc, curr)=>acc + curr, 0);
}

console.log(findScore(testInput));
console.log(findScore(fileInput));
console.log(countCards(testInput));
console.log(countCards(fileInput));