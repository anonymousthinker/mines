const MINE_ONE = Math.floor((Math.random()) * 10);
const MINE_TWO = Math.floor((Math.random()) * 10);

function takePlayerInput() {
  return prompt('Cell number:');
}

function createHeader(header) {
  for (let index = 1; index < 40; index++) {
    header += '━';
  }

  return header + '┓';
}

function createFooter(footer) {
  for (let index = 1; index < 40; index++) {
    footer += '━';
  }

  return footer + '┛';
}

function createFirstMiddle(middle) {
  for (let index = 1; index <= 10; index++) {
    middle += '┃   ';
  }

  return middle + '┃';
}

function createMiddle(middle, playerInput, mineFound) {
  let updatedMiddle = '';
  let index = 0;
  while(index <= 40) {
    if (middle[index] === ' ' && index === playerInput * 4 + 1) {
      updatedMiddle += mineFound ? '☠︎︎' : '♦';
      index += 1;
      continue;
    }

    updatedMiddle += middle[index];
    index += 1;
  }

  return updatedMiddle;
}

function main() {
  let mineFound = false;
  let header = '┏';
  let footer = '┗';
  let middle = createFirstMiddle('');
  let noOfDiamonds = 8;
  console.log(createHeader(header));
  console.log(middle);
  console.log(createFooter(footer));

  while (!mineFound && noOfDiamonds > 0) {
    const playerInput = +takePlayerInput();
    mineFound = playerInput === MINE_ONE || playerInput === MINE_TWO;

    console.log(createHeader(header));
    middle = createMiddle(middle, playerInput, mineFound);
    console.log(middle);
    console.log(createFooter(footer));
    noOfDiamonds -= 1;
  }

  return mineFound ? 'Oops! Blasted💥' : 'Congrats on finding all 💎!'
}

console.log(main());