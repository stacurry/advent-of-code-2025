"use strict";

const fs = require("fs");

const parseRotation = function (rotation) {
  const letter = rotation[0];
  const number = parseInt(rotation.slice(1));

  if (letter === "L") {
    return (-1 * number) % 100;
  }
  return number % 100;
};

const determineNewValue = function (startValue, incrementValue) {
  const naiveValue = startValue + incrementValue;
  if (naiveValue < 0) {
    return 100 + naiveValue;
  }

  if (naiveValue > 99) {
    return naiveValue - 100;
  }
  return naiveValue;
};

const processInput = function () {
  const fileContent = fs.readFileSync("./input.txt", "utf-8");

  const input = fileContent.split(/\r?\n/);

  let startValue = 50;
  let password = 0;

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
