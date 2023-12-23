import { readFileSync } from "node:fs";

function main() {
  const inputArray = readInput();
  let power = 0;
  inputArray.forEach((input) => {
    const [red, green, blue] = getMinimumPossibleCubes(input);
    power += red * green * blue;
  });
  return power;
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

function getMinimumPossibleCubes(input) {
  let MAX_RED = 0;
  let MAX_GREEN = 0;
  let MAX_BLUE = 0;
  const [game, sets] = input.split(":");
  const setsArray = sets.split(";");
  for (const set of setsArray) {
    const cubes = set.trim().split(",");
    for (const cube of cubes) {
      const [score, colour] = cube.trim().split(" ");
      if (colour === "red" && score > MAX_RED) {
        MAX_RED = parseInt(score);
      } else if (colour === "green" && score > MAX_GREEN) {
        MAX_GREEN = parseInt(score);
      } else if (colour === "blue" && score > MAX_BLUE) {
        MAX_BLUE = parseInt(score);
      }
    }
  }
  return [MAX_RED, MAX_GREEN, MAX_BLUE];
}

console.log(main());
