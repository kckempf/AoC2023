import { readFileSync } from 'fs';

// import the part data
const fileInput = readFileSync('./input.txt', 'utf-8');

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

type BagContents = {
    [index: string]: number
}

const bag: BagContents = {
    'red': 12,
    'green': 13,
    'blue': 14
};

const sumOfValidGames = (input: string) => {
    const inputArr = input.split(/\r?\n/);
    let output = 0;
    for (const item of inputArr){
        const gameParts = item.split(': ');
        let gameNumber = parseInt(gameParts[0].split(' ')[1]);
        
        const gameSelection = gameParts[1].split('; ');
        for (const selection of gameSelection){
            const plays = selection.split(', ');
            for (const play of plays){
                if (bag[play.split(' ')[1]] < parseInt(play.split(' ')[0])){
                    gameNumber = 0;
                }
            }
        }

        output += gameNumber;
    }
    return output;
}

const sumOfMinimumCubes = (input: string) => {
    const inputArr = input.split(/\r?\n/);
    let output = 0;
    for (const item of inputArr){
        const gameParts = item.split(': ');
        const minViableBag: BagContents = { 'red': 0, 'green': 0, 'blue': 0}
        const gameSelection = gameParts[1].split('; ');
        for (const selection of gameSelection){
            const plays = selection.split(', ');
            for (const play of plays){
                if (minViableBag[play.split(' ')[1]] < parseInt(play.split(' ')[0])){
                    minViableBag[play.split(' ')[1]] = parseInt(play.split(' ')[0]);
                }
            }
        }

        output += Object.values(minViableBag).reduce((acc, curr)=> acc * curr, 1);
    }
    return output;
}

console.log(`test answer 1: ${sumOfValidGames(testInput)}`);
console.log(`problem answer 1: ${sumOfValidGames(fileInput)}`);
console.log(`test answer 2: ${sumOfMinimumCubes(testInput)}`);
console.log(`problem answer 2: ${sumOfMinimumCubes(fileInput)}`);