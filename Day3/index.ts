import { readFileSync } from 'fs';

const fileInput = readFileSync('./input.txt', 'utf-8');

const testInput =
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
1.......-1`;

const specialCharacters = '=*+/&#-%$@';

const findPartsSum = (input: string) => {
    const inputArr = input.split(/\r?\n/);
    const grid = inputArr.map(x => x.split(''));
    const validNumbers: number[] = [];
    let output = 0;

    const height = inputArr.length;
    const width = grid[0].length;

    for (let i = 0; i < inputArr.length; i++) {
        const row = inputArr[i];
        const numbers = inputArr[i].match(/\d+/g);
        let newRow = inputArr[i];
        if (numbers) {
            for (const number of numbers) {
                let isValid = false;
                let start = newRow.indexOf(number);
                let end = newRow.indexOf(number) + number.length - 1;
                if (start > 0) {
                    start = start - 1;
                    if (specialCharacters.includes(grid[i][start])) {
                        isValid = true;
                    }
                }
                if (end < width - 1) {
                    end = end + 1;
                    if (specialCharacters.includes(grid[i][end])) {
                        isValid = true;
                    }
                }
                for (let j = start; j <= end; j++) {
                    if (i > 0 && specialCharacters.includes(grid[i - 1][j])) {
                        isValid = true;
                    }
                    if (i < height - 1 && specialCharacters.includes(grid[i + 1][j])) {
                        isValid = true;
                    }
                }
                if (isValid) {
                    validNumbers.push(parseInt(number));
                    output += parseInt(number);
                }
                // handle for duplicates in the same row
                newRow = newRow.replace(number, '.'.repeat(number.length));
            }
        }
    }
    return output;
}

const findGears = (input: string) => {

    const inputArr = input.split(/\r?\n/);
    const grid = inputArr.map(x => x.split(''));
    let numbersGrid = inputArr.map(x => x.split('').map(y => '.'));
    let output = 0;

    const height = inputArr.length;
    const width = grid[0].length;

    for (let i = 0; i < inputArr.length; i++) {
        const row = inputArr[i];
        const numbers = inputArr[i].match(/\d+/g);
        let newRow = inputArr[i];
        if (numbers) {
            for (const number of numbers) {
                let start = newRow.indexOf(number);
                let end = newRow.indexOf(number) + number.length - 1;
                for (let j = start; j <= end; j++) {
                    numbersGrid[i][j] = number;
                }
                newRow = newRow.replace(number, '.'.repeat(number.length));
            }
        }
    }

    for (let i = 0; i < inputArr.length; i++) {
        let row = inputArr[i];
        const gears = row.match(/\*/g);
        let matches = [];
        if (gears) {
            for (const gear of gears) {
                const j = row.indexOf(gear);
                if (i > 0) {
                    if (numbersGrid[i - 1][j] !== '.') {
                        // check above
                        matches.push(numbersGrid[i - 1][j]);
                    } else {
                        if (j > 0 && numbersGrid[i - 1][j - 1] !== '.') {
                            matches.push(numbersGrid[i - 1][j - 1]);
                        }
                        if (j < width - 1 && numbersGrid[i - 1][j + 1] != '.') {
                            matches.push(numbersGrid[i - 1][j + 1]);
                        }
                    }
                }
                if (i < height - 1){
                    if (numbersGrid[i + 1][j] !== '.') {
                        // check below
                        matches.push(numbersGrid[i + 1][j]);
                    } else {
                        if (j > 0 && numbersGrid[i + 1][j - 1] !== '.') {
                            matches.push(numbersGrid[i + 1][j - 1]);
                        }
                        if (j < width - 1 && numbersGrid[i + 1][j + 1] !== '.') {
                            matches.push(numbersGrid[i + 1][j + 1]);
                        }
                    }
                }
                if (j > 0 && numbersGrid[i][j - 1] !== '.'){
                    matches.push(numbersGrid[i][j - 1]);
                }
                if (j < width - 1 && numbersGrid[i][j + 1] !== '.'){
                    matches.push(numbersGrid[i][j + 1]);
                }
                if (matches.length === 2){
                    output += matches.reduce((acc, curr) => acc * parseInt(curr), 1);
                }
                matches = [];
                row = row.replace('*', '.');
            }
        }
    }
    return output;
}

console.log(`test part one: ${findPartsSum(testInput)}`);
console.log(`result part one: ${findPartsSum(fileInput)}`);
console.log(`test part two: ${findGears(testInput)}`);
console.log(`result part two: ${findGears(fileInput)}`);  
