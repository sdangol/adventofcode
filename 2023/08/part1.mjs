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
  let start = "AAA";
  let index = 0;
  while (start !== "ZZZ") {
    if (instructions[index % instructionLength] === "L") {
      start = map[start].left;
    } else if (instructions[index % instructionLength] === "R") {
      start = map[start].right;
    }
    index++;
  }
  return index;
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

console.log(main());
