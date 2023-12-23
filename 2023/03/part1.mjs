import { readFileSync } from "node:fs";

let inputArray;
let usedIndexes = [];
function isSymbol(letter) {
  return letter?.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
}

function main() {
  inputArray = readInput();
  let sum = 0;
  for (let i in inputArray) {
    i = parseInt(i);
    const line = inputArray[i];
    for (let j in line) {
      j = parseInt(j);
      const letter = line[j];
      if (isSymbol(letter) && letter !== ".") {
        if (
          !isSymbol(inputArray[i - 1]?.[j - 1]) &&
          !usedIndexes.includes(`${i - 1}|${j - 1}`)
        ) {
          sum += parseInt(getPartNumber(i - 1, j - 1));
        }
        if (
          !isSymbol(inputArray[i - 1]?.[j]) &&
          !usedIndexes.includes(`${i - 1}|${j}`)
        ) {
          sum += parseInt(getPartNumber(i - 1, j));
        }
        if (
          !isSymbol(inputArray[i - 1]?.[j + 1]) &&
          !usedIndexes.includes(`${i - 1}|${j + 1}`)
        ) {
          sum += parseInt(getPartNumber(i - 1, j + 1));
        }
        if (
          !isSymbol(inputArray[i]?.[j - 1]) &&
          !usedIndexes.includes(`${i}|${j - 1}`)
        ) {
          sum += parseInt(getPartNumber(i, j - 1));
        }
        if (
          !isSymbol(inputArray[i]?.[j + 1]) &&
          !usedIndexes.includes(`${i}|${j + 1}`)
        ) {
          sum += parseInt(getPartNumber(i, j + 1));
        }
        if (
          !isSymbol(inputArray[i + 1]?.[j - 1]) &&
          !usedIndexes.includes(`${i + 1}|${j - 1}`)
        ) {
          sum += parseInt(getPartNumber(i + 1, j - 1));
        }
        if (
          !isSymbol(inputArray[i + 1]?.[j]) &&
          !usedIndexes.includes(`${i + 1}|${j}`)
        ) {
          sum += parseInt(getPartNumber(i + 1, j));
        }
        if (
          !isSymbol(inputArray[i + 1]?.[j + 1]) &&
          !usedIndexes.includes(`${i + 1}|${j + 1}`)
        ) {
          sum += parseInt(getPartNumber(i + 1, j + 1));
        }
      }
    }
  }
  return sum;
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

function getPartNumber(i, j) {
  let partNumber = inputArray[i][j];
  usedIndexes.push(`${i}|${j}`);
  let J = j - 1;
  while (inputArray?.[i]?.[J] && !isSymbol(inputArray[i][J])) {
    partNumber = inputArray[i][J] + partNumber;
    usedIndexes.push(`${i}|${J}`);
    J--;
  }
  J = j + 1;
  while (inputArray?.[i]?.[J] && !isSymbol(inputArray[i][J])) {
    partNumber = partNumber + inputArray[i][J];
    usedIndexes.push(`${i}|${J}`);
    J++;
  }
  // console.log(partNumber);
  return partNumber;
}

console.log(main());
