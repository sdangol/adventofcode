import { readFileSync } from "node:fs";

function main() {
  const inputArray = readInput();
  let sum = 0;
  inputArray.forEach((input) => {
    const gameNumber = checkPossibility(input);
    if (gameNumber !== false) {
      sum += parseInt(gameNumber);
    }
  });
  return sum;
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

function checkPossibility(input) {
  const MAX_RED = 12;
  const MAX_GREEN = 13;
  const MAX_BLUE = 14;
  const [game, sets] = input.split(":");
  const gameNumber = game.split(" ")[1];
  const setsArray = sets.split(";");
  for (const set of setsArray) {
    let red = 0;
    let green = 0;
    let blue = 0;
    const cubes = set.trim().split(",");
    for (const cube of cubes) {
      const [score, colour] = cube.trim().split(" ");
      if (colour === "red") {
        red += parseInt(score);
      } else if (colour === "green") {
        green += parseInt(score);
      } else if (colour === "blue") {
        blue += parseInt(score);
      }
    }
    if (red > MAX_RED || green > MAX_GREEN || blue > MAX_BLUE) {
      return false;
    }
  }
  return gameNumber;
}

console.log(main());
