import { readFileSync } from 'fs';

// import the part data
const fileInput = readFileSync('./input.txt', 'utf-8');

// test data for part 1
const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

// solution for part 1
const getCalibration = (input: string) => {
    const inputArr = input.split(/\r?\n/);

    // we just need the sum, so we can use reduce
    return inputArr.reduce((acc, curr) => {
        let num = '';

        // go from the left and break when we find a number
        for (let i = 0; i < curr.length; i++) {
            const a = curr.charAt(i);
            if (parseInt(a)) {
                num = a;
                break;
            }
        }

        // go from the right and break when we find a number
        for (let i = 0; i < curr.length; i++) {
            const a = curr.charAt(curr.length - 1 - i);
            if (parseInt(a)) {
                num += a;
                break;
            }
        }

        // add to the previous result
        return acc + parseInt(num);
    }, 0);
};

// test input for part 2
const testInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

// hashmap of English words to numbers
const numsMap: { [index: string]: string } = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
};

// solution for part 2, based on part 1 (copy-paste, ha!)
const getCalibration2 = (input: string) => {
    const inputArr = input.split(/\r?\n/);

    // we just need the sum, so we can use reduce
    return inputArr.reduce((acc, curr) => {
        let num = '';

        // keep track of the characters so we can check for
        // the first instance of a number word
        let word = '';

        // go from the left and break when we find a number
        for (let i = 0; i < curr.length; i++) {
            const a = curr.charAt(i);
            word += a;

            // check for any of the word -> number mappings
            let found = Object.keys(numsMap).find(subString => word.includes(subString))
            if (found) {
                num = numsMap[found];
                break;
            }
            if (parseInt(a)) {
                num = a;
                break;
            }
        }

        word = '';

        // go from the right and break when we find a number
        for (let i = 0; i < curr.length; i++) {
            const a = curr.charAt(curr.length - 1 - i);
            word = `${a}${word}`;
            let found = Object.keys(numsMap).find(subString => word.includes(subString))

            // check for any of the word -> number mappings
            if (found) {
                num += numsMap[found];
                break;
            }
            if (parseInt(a)) {
                num += a;
                break;
            }
        }
        return acc + parseInt(num);
    }, 0);
};

console.log(`test answer 1: ${getCalibration(testInput)}`);
console.log(`problem answer 1: ${getCalibration(fileInput)}`);

console.log(`test answer 2: ${getCalibration2(testInput2)}`);
console.log(`problem answer 2: ${getCalibration2(fileInput)}`);