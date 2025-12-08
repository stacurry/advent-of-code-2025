"use strict";

const { ranges, ingredients } = require("./input");

const part1 = () => {
  const parsedRanges = ranges.map((range) =>
    range.split("-").map((part) => parseInt(part))
  );

  let freshIngredients = 0;
  ingredients.forEach((ingredient) => {
    let fresh = false;
    let index = 0;
    while (fresh === false && index < parsedRanges.length) {
      const [start, end] = parsedRanges[index];
      if (start <= ingredient && end >= ingredient) {
        fresh = true;
        freshIngredients++;
      }
      index++;
    }
  });
  console.log(freshIngredients);
};

const part2 = () => {
  const parsedRanges = ranges
    .map((range) => range.split("-").map((part) => parseInt(part)))
    .sort((a, b) => a[0] - b[0]);

  const mergedRanges = [];
  let currentRange = parsedRanges[0];
  let index = 1;
  while (index < parsedRanges.length) {
    const [nextStart, nextEnd] = parsedRanges[index];
    const [currentStart, currentEnd] = currentRange;
    if (nextStart <= currentEnd + 1) {
      currentRange = [currentStart, Math.max(currentEnd, nextEnd)];
    } else {
      mergedRanges.push(currentRange);
      currentRange = parsedRanges[index];
    }
    index++;
  }
  mergedRanges.push(currentRange);

  const totalFreshIngredients = mergedRanges.reduce((total, [start, end]) => {
    return total + (end - start + 1);
  }, 0);

  console.log(totalFreshIngredients);
};

part1();
part2();
