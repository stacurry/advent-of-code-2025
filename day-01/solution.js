"use strict";

const fs = require("fs");

let password = 0;

const parseRotation = function (rotation) {
  const letter = rotation[0];
  const number = parseInt(rotation.slice(1));

  const fullRotations = Math.floor(number / 100);

  if (fullRotations) {
    password += fullRotations;
  }

  if (letter === "L") {
    return -1 * (number % 100);
  }
  return number % 100;
};

const determineNewValue = function (startValue, incrementValue) {
  const naiveValue = startValue + incrementValue;
  if (naiveValue < 0) {
    const finalValue = 100 + naiveValue;
    if (startValue !== 0 && finalValue !== 0) {
      password++;
    }
    return finalValue;
  }

  if (naiveValue > 99) {
    const finalValue = naiveValue - 100;
    if (startValue !== 0 && finalValue !== 0) {
      password++;
    }
    return finalValue;
  }
  return naiveValue;
};

const processInput = function () {
  const fileContent = fs.readFileSync("./input.txt", "utf-8");

  const input = fileContent.split(/\r?\n/);

  let startValue = 50;

  input.forEach((rotation) => {
    const incrementValue = parseRotation(rotation);

    const newValue = determineNewValue(startValue, incrementValue);
    if (newValue === 0) {
      password++;
    }
    startValue = newValue;
  });
  console.log("final password:", password);
  return password;
};

processInput();
