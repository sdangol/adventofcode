import { readFileSync } from "node:fs";

function main() {
  const inputArray = readInput();
  inputArray.sort(compareHand);
  let sum = 0;
  for (const index in inputArray) {
    const bid = inputArray[parseInt(index)].split(" ")[1];
    sum += parseInt(bid) * (parseInt(index) + 1);
  }
  return sum;
}

function compareHand(a, b) {
  const handA = a.split(" ")[0];
  const handB = b.split(" ")[0];
  const handAValues = {};
  const handBValues = {};
  for (const card of handA) {
    if (handAValues[card]) handAValues[card]++;
    else handAValues[card] = 1;
  }
  for (const card of handB) {
    if (handBValues[card]) handBValues[card]++;
    else handBValues[card] = 1;
  }
  const handAType = getType(handAValues);
  const handBType = getType(handBValues);
  if (handAType < handBType) return -1;
  else if (handAType > handBType) return 1;
  else return secondaryCompare(handA, handB);
}

function getType(handValues) {
  const values = Object.values(handValues);
  if (values.includes(5)) return 7;
  if (values.includes(4)) return 6;
  if (values.includes(3) && values.includes(2)) return 5;
  if (values.includes(3) && !values.includes(2)) return 4;
  if (values.filter((item) => item === 2).length === 2) return 3;
  if (values.filter((item) => item === 1).length === 3) return 2;
  if (values.filter((item) => item === 1).length === 5) return 1;
}

function secondaryCompare(handA, handB) {
  for (let i = 0; i < 5; i++) {
    if (getValue(handA[i]) < getValue(handB[i])) return -1;
    else if (getValue(handA[i]) > getValue(handB[i])) return 1;
  }
  return 0;
}

function getValue(card) {
  if (card === "A") return 14;
  else if (card === "K") return 13;
  else if (card === "Q") return 12;
  else if (card === "J") return 11;
  else if (card === "T") return 10;
  else return parseInt(card);
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

console.log(main());
