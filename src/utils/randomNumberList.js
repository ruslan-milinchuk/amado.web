import { randomNumber } from "./randomNumber";

export const randomNumberList = (data, lengthList) => {
  let arrRandomNumbers = [];
  for (let i = 0; arrRandomNumbers.length !== lengthList; i++) {
    const randNumber = randomNumber(0, data.length - 1);
    if (arrRandomNumbers.indexOf(randNumber) === -1) {
      arrRandomNumbers.push(randNumber);
    }
  }
  return arrRandomNumbers;
};
