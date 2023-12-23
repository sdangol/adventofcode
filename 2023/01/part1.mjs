import { readFileSync } from "node:fs";

function main() {
  const inputArray = readInput();
  let sum = 0;
  inputArray.forEach((input) => {
    const firstDigit = findFirstDigitInString(input);
    const lastDigit = findLastDigitInString(input);
    const calibrationValue = firstDigit + lastDigit;
    sum += parseInt(calibrationValue);
  });
  return sum;
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

function findFirstDigitInString(string) {
  return string.match(/\d/gi).at(0);
}

function findLastDigitInString(string) {
  return string.match(/\d/gi).at(-1);
}

console.log(main());
