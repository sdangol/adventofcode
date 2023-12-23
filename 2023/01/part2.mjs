import { readFileSync } from "node:fs";

const stringToNumberMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function main() {
  const inputArray = readInput();
  let sum = 0;
  inputArray.forEach((input) => {
    const firstDigit = findFirstDigitInString(input);
    const lastDigit = findLastDigitInString(input);
    const calibrationValue = firstDigit + lastDigit;
    console.log(firstDigit, lastDigit, calibrationValue, input);
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
  const match = string
    .match(
      /\d|one|two|three|four|five|six|seven|eight|nine/gi
    )
    .at(0);
  return stringToNumberMap[match] ?? match;
}

function findLastDigitInString(string) {
  const match = string.split("").reverse().join("")
    .match(
      /\d|enin|thgie|neves|xis|evif|ruof|eerht|owt|eno/gi
    )
    .at(0);
  return stringToNumberMap[match.split("").reverse().join("")] ?? match;
}

console.log(main());
