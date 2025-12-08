"use strict";

const { rows } = require("./input");
const grid = rows.map((row) => row.split(""));
const numRows = grid.length;
const numCols = grid[0].length;

const numberOfAdjacentRolls = (rowIdx, colIdx) => {
  const movements = [
    [0, 1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let adjacentRolls = 0;
  movements.forEach((movement) => {
    const rowToCheck = rowIdx + movement[0];
    const colToCheck = colIdx + movement[1];

    if (
      rowToCheck >= 0 &&
      rowToCheck < numRows &&
      colToCheck >= 0 &&
      colToCheck < numCols
    ) {
      if (grid[rowToCheck][colToCheck] === "@") {
        adjacentRolls++;
      }
    }
  });
  return adjacentRolls;
};

const part1 = () => {
  let rollsAvailable = 0;
  let rowIdx = 0;
  while (rowIdx < numRows) {
    let colIdx = 0;
    while (colIdx < numCols) {
      if (grid[rowIdx][colIdx] === "@") {
        const adjacentRolls = numberOfAdjacentRolls(rowIdx, colIdx);
        if (adjacentRolls < 4) {
          rollsAvailable++;
        }
      }
      colIdx++;
    }
    rowIdx++;
  }
  console.log(rollsAvailable);
};

const oneLoopThrough = () => {
  let rollsAvailable = 0;
  let rowIdx = 0;
  while (rowIdx < numRows) {
    let colIdx = 0;
    while (colIdx < numCols) {
      if (grid[rowIdx][colIdx] === "@") {
        const adjacentRolls = numberOfAdjacentRolls(rowIdx, colIdx);
        if (adjacentRolls < 4) {
          grid[rowIdx][colIdx] = ".";
          rollsAvailable++;
        }
      }
      colIdx++;
    }
    rowIdx++;
  }
  return rollsAvailable;
};

const part2 = () => {
  let rollsAvailable = 0;
  while (true === true) {
    const availableFromLoop = oneLoopThrough();
    if (availableFromLoop === 0) {
      break;
    }
    rollsAvailable += availableFromLoop;
  }
  console.log(rollsAvailable);
};

part1();
part2();
