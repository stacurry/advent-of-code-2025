"use strict";

const { banks } = require("./input");

const part1 = () => {
  let volts = 0;
  banks.forEach((bank) => {
    const digits = bank.split("").map((digit) => parseInt(digit));
    const highestFirstNum = Math.max(...digits.slice(0, -1));
    const index = digits.indexOf(highestFirstNum);

    const remainingDigits = bank
      .slice(index + 1)
      .split("")
      .map((digit) => parseInt(digit));
    const highestSecondNum = Math.max(...remainingDigits);
    volts += 10 * highestFirstNum + highestSecondNum;
  });
  console.log(volts);
};

const part2 = () => {
  let volts = 0;
  banks.forEach((bank) => {
    let index = -1;
    for (let place = 12; place > 0; place--) {
      const digits = bank
        .slice(index + 1)
        .split("")
        .map((digit) => parseInt(digit));

      const remainingDigits =
        place > 1 ? digits.slice(0, -1 * (place - 1)) : digits;
      const highestNum = Math.max(...remainingDigits);
      index = digits.indexOf(highestNum) + (bank.length - digits.length);
      const add = Math.pow(10, place - 1) * highestNum;
      volts += add;
    }
  });
  console.log(volts);
};

part1();
part2();
