import { readFileSync } from "node:fs";

function main() {
  const inputArray = readInput();
  const times = inputArray[0]
    .split(" ")
    .filter((t) => t !== "")
    .slice(1);
  const distances = inputArray[1]
    .split(" ")
    .filter((t) => t !== "")
    .slice(1);
  const matches = times.length;
  let ways = 1;
  for (let i = 0; i < matches; i++) {
    let count = 0;
    for (let j = 0; j < times[i]; j++) {
      const maxDistance = getMaxDistance(j, parseInt(times[i]));
      if (maxDistance > distances[i]) {
        count++;
      }
    }
    ways *= count;
  }
  return ways;
}

function getMaxDistance(holdTime, matchTime) {
  if (holdTime === 0) {
    return 0;
  }
  const remainingTime = matchTime - holdTime;
  return holdTime * remainingTime;
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

console.log(main());
