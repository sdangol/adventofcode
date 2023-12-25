import { readFileSync } from "node:fs";

function main() {
  const inputArray = readInput();
  const instructions = inputArray[0];
  const instructionLength = instructions.length;
  inputArray.splice(0, 2);
  const map = {};
  for (const line of inputArray) {
    const [source, destination] = line.split(" = ");
    const [left, right] = destination
      .substring(1, destination.length - 1)
      .split(", ");
    map[source] = { left, right };
  }
  let startNodes = Object.keys(map).filter((key) => key.endsWith("A"));
  const indexes = [];
  for (let node of startNodes) {
    let index = 0;
    while (!node.endsWith("Z")) {
      if (instructions[index % instructionLength] === "L") {
        node = map[node].left;
      } else if (instructions[index % instructionLength] === "R") {
        node = map[node].right;
      }
      index++;
    }
    indexes.push(index);
  }
  const steps = indexes.reduce(lcm);
  return steps;
}

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

console.log(main());
