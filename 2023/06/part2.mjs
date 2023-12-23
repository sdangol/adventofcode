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
  const seedRange = inputArray[0].split(":")[1].trim().split(" ");
  let seeds = [];
  let soils = [];
  let fertilisers = [];
  let waters = [];
  let lights = [];
  let temperatures = [];
  let humidities = [];
  let locations = [];
  for (const index in seedRange) {
    if (index % 2 === 0) {
      const start = parseInt(seedRange[index]);
      const length = parseInt(seedRange[parseInt(index) + 1]);
      const end = start + length - 1;
      // for (let i = 0; i < length; i++) {
      seeds.push({
        start,
        end,
      });
      // }
    } else {
      continue;
    }
  }
  seedToSoilMap = getMap("seed-to-soil map:");
  soilToFertiliserMap = getMap("soil-to-fertilizer map:");
  fertiliserToWaterMap = getMap("fertilizer-to-water map:");
  waterToLightMap = getMap("water-to-light map:");
  lightToTemperatureMap = getMap("light-to-temperature map:");
  temperatureToHumidityMap = getMap("temperature-to-humidity map:");
  humidityToLocationMap = getMap("humidity-to-location map:");

  for (const seed of seeds) {
    soils.push(...getMappedOutput(seed, seedToSoilMap));
  }
  for (const soil of soils) {
    fertilisers.push(...getMappedOutput(soil, soilToFertiliserMap));
  }
  for (const fertiliser of fertilisers) {
    waters.push(...getMappedOutput(fertiliser, fertiliserToWaterMap));
  }
  for (const water of waters) {
    lights.push(...getMappedOutput(water, waterToLightMap));
  }
  for (const light of lights) {
    temperatures.push(...getMappedOutput(light, lightToTemperatureMap));
  }
  for (const temperature of temperatures) {
    humidities.push(...getMappedOutput(temperature, temperatureToHumidityMap));
  }
  for (const humidity of humidities) {
    locations.push(...getMappedOutput(humidity, humidityToLocationMap));
  }
  return Math.min(...locations.map((l) => l.start));
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
  let output = [];
  for (const map of mapArray) {
    const end = map.source + map.length - 1;
    if (input.start >= map.source && input.end <= end) {
      output.push({
        start: map.destination + (input.start - map.source),
        end: map.destination + (input.end - map.source),
      });
      return output;
    }
    if (
      input.start < map.source &&
      input.end >= map.source &&
      input.end <= end
    ) {
      output.push({
        start: map.destination,
        end: map.destination + (input.end - map.source),
      });
      input.end = map.source - 1;
    }
    if (input.start >= map.source && input.start <= end && input.end > end) {
      output.push({
        start: map.destination + (input.start - map.source),
        end: map.destination + (end - map.source),
      });
      input.start = end + 1;
    }
    if (input.start < map.source && input.end > end) {
      output.push({
        start: map.destination,
        end: map.destination + map.length - 1,
      });
    }
  }
  output.push({
    start: input.start,
    end: input.end,
  });
  return output;
}

console.log(main());
