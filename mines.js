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

function createField(middle) {
  for (let index = 1; index <= 10; index++) {
    middle += '┃   ';
  }

  return middle + '┃';
}

function updateField(middle, playerInput, mineFound) {
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

function runGame(mineFound, noOfDiamonds, field) {
  while (!mineFound && noOfDiamonds > 0) {
    const playerInput = +takePlayerInput();
    mineFound = playerInput === MINE_ONE || playerInput === MINE_TWO;

    console.log(createHeader('┏'));
    field = updateField(field, playerInput, mineFound);
    console.log(field);
    console.log(createFooter('┗'));
    noOfDiamonds -= 1;
  }

  return mineFound ? 'Oops! Blasted💥' : 'Congrats on finding all 💎!';
}

function main() {
  const mineFound = false;
  const headerOne = 'Find all 💎 in the field to win!';
  const headerTwo = ' Also dont let the 💣 find u first!\n┏';
  const noOfDiamonds = 8;
  const field = createField('');
  console.log(createHeader(headerOne + headerTwo));
  console.log(field);
  console.log(createFooter('┗'));

  return runGame(mineFound, noOfDiamonds, field);
}

console.log(main());
