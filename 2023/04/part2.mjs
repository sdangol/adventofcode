import { readFileSync } from "node:fs";

let inputArray;
let cardPiles = {};

function main() {
  inputArray = readInput();
  let sum = 0;
  for (const line of inputArray) {
    const [card, numbers] = line.split(":");
    const cardNumber = card.split(" ").slice(-1);
    cardPiles[cardNumber] = {
      count: 1,
      numbers,
    };
  }
  for (const index in cardPiles) {
    for (let i = 0; i < cardPiles[index].count; i++) {
      processCard(cardPiles[index], index);
    }
  }
  for (const index in cardPiles) {
    sum += cardPiles[index].count;
  }
  return sum;
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

function processCard(card, index) {
  const [winning, owning] = card.numbers.trim().split("|");
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
  const matching = [];
  for (const winningNumber of winningNumbers) {
    if (ownedNumbers.includes(winningNumber)) {
      index++;
      if (cardPiles[index]) {
        cardPiles[index].count++;
      }
      matching.push(winningNumber);
    }
  }
}

console.log(main());
