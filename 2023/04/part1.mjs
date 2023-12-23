import { readFileSync } from "node:fs";

let inputArray;

function main() {
  inputArray = readInput();
  let sum = 0;
  for (const line of inputArray) {
    sum += parseInt(getPoint(line));
  }
  return sum;
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

function getPoint(line) {
  const [card, numbers] = line.split(":");
  const [winning, owning] = numbers.trim().split("|");
  const winningNumbers = [
    ...new Set(
      winning
        .trim()
        .split(" ")
        .map((n) => parseInt(n))
        .filter((n) => !Number.isNaN(n))
    ),
  ];
  const ownedNumbers = [
    ...new Set(
      owning
        .trim()
        .split(" ")
        .map((n) => parseInt(n))
        .filter((n) => !Number.isNaN(n))
    ),
  ];
  let points = 0;
  const matching = [];
  for (const winningNumber of winningNumbers) {
    if (ownedNumbers.includes(winningNumber)) {
      if (points === 0) points = 1;
      else points *= 2;
      matching.push(winningNumber);
    }
  }
  console.log(points);
  return points;
}

console.log(main());
