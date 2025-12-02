"use strict";

const { codes: codeString } = require("./input");

const part1 = () => {
  const codes = codeString.split(",");
  let total = 0;

  codes.forEach((code) => {
    const start = parseInt(code.split("-")[0]);
    const end = parseInt(code.split("-")[1]);

    let currentNum = start;
    while (currentNum <= end) {
      const str = currentNum.toString();
      const length = str.length;
      if (length % 2) {
        currentNum++;
      } else {
        const midpoint = length / 2;
        const firstHalf = str.slice(0, midpoint);
        const secondHalf = str.slice(midpoint);

        if (firstHalf === secondHalf) {
          total += currentNum;
        }
        currentNum++;
      }
    }
  });

  console.log("final total:", total);
};

const part2 = () => {
  const codes = codeString.split(",");
  let total = 0;

  codes.forEach((code) => {
    const start = parseInt(code.split("-")[0]);
    const end = parseInt(code.split("-")[1]);

    let currentNum = start;
    while (currentNum <= end) {
      const str = currentNum.toString();
      const length = str.length;

      let cursor = 1;
      let sequence = "";
      const tested = new Set();
      const invalid = new Set();
      while (cursor <= str.length / 2) {
        sequence = str.slice(0, cursor);
        if (!length % cursor || !tested.has(sequence)) {
          tested.add(sequence);
          const chunks = [...str.matchAll(sequence)].flat();

          if (chunks.length === length / cursor) {
            if (!invalid.has(currentNum)) {
              invalid.add(currentNum);
              total += currentNum;
            }
          }
          cursor++;
        }
      }
      currentNum++;
    }
  });

  console.log("final total:", total);
};

part1();
part2();
