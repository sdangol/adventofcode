import { readFileSync } from "node:fs";

let inputArray,
  seedToSoilMap,
  soilToFertiliserMap,
  fertiliserToWaterMap,
  waterToLightMap,
  lightToTemperatureMap,
  temperatureToHumidityMap,
  humidityToLocationMap;

function main() {
  inputArray = readInput();
  const seeds = inputArray[0].split(":")[1].trim().split(" ");
  seedToSoilMap = getMap("seed-to-soil map:");
  soilToFertiliserMap = getMap("soil-to-fertilizer map:");
  fertiliserToWaterMap = getMap("fertilizer-to-water map:");
  waterToLightMap = getMap("water-to-light map:");
  lightToTemperatureMap = getMap("light-to-temperature map:");
  temperatureToHumidityMap = getMap("temperature-to-humidity map:");
  humidityToLocationMap = getMap("humidity-to-location map:");

  const locations = [];
  for (const seed of seeds) {
    const soil = getMappedOutput(parseInt(seed), seedToSoilMap);
    const fertiliser = getMappedOutput(parseInt(soil), soilToFertiliserMap);
    const water = getMappedOutput(parseInt(fertiliser), fertiliserToWaterMap);
    const light = getMappedOutput(parseInt(water), waterToLightMap);
    const temperature = getMappedOutput(parseInt(light), lightToTemperatureMap);
    const humidity = getMappedOutput(
      parseInt(temperature),
      temperatureToHumidityMap
    );
    const location = getMappedOutput(parseInt(humidity), humidityToLocationMap);
    locations.push(location);
  }
  return Math.min(...locations);
}

function readInput() {
  const data = readFileSync("./input.txt", "utf8");
  // const data = readFileSync("./test.txt", "utf8");
  return data.split("\n");
}

function getMap(mapType) {
  const map = [];
  let searchIndex = inputArray.findIndex((l) => l === mapType) + 1;
  while (
    inputArray[searchIndex] !== "" &&
    inputArray[searchIndex] !== undefined
  ) {
    const [destination, source, length] = inputArray[searchIndex].split(" ");
    map.push({
      destination: parseInt(destination),
      source: parseInt(source),
      length: parseInt(length),
    });
    searchIndex++;
  }
  return map;
}

function getMappedOutput(input, mapArray) {
  let output = input;
  for (const map of mapArray) {
    if (input >= map.source && input < map.source + map.length) {
      output = map.destination + (input - map.source);
      return output;
    }
  }
  return output;
}

console.log(main());
