const MINE_ONE = Math.floor((Math.random()) * 10);
const MINE_TWO = Math.floor((Math.random()) * 10);
const FIELD_LENGTH = 40;

// console.log(MINE_ONE, MINE_TWO)

function takePlayerInput() {
  return prompt('Cell number:');
}

function createHeaderContents(index) {
  return index % 4 === 0 ? '┳' : '━';
}

function createHeader(header) {
  for (let index = 1; index < FIELD_LENGTH; index++) {
    header += createHeaderContents(index);
  }

  return header + '┓';
}

function createFooterContents(index) {
  return index % 4 === 0 ? '┻' : '━';
}

function createFooter(footer) {
  for (let index = 1; index < FIELD_LENGTH; index++) {
    footer += createFooterContents(index);
  }

  return footer + '┛';
}

function createField(field) {
  for (let index = 1; index <= FIELD_LENGTH / 4; index++) {
    field += '┃   ';
  }

  return field + '┃';
}

function updateFieldContent(field, playerInput, mineFound, index) {
  if (field[index] === ' ' && index === playerInput * 4 + 2) {
    return mineFound ? '☠︎︎' : '♦';
  }

  return field[index];
}

function updateField(field, playerInput, mineFound) {
  let updatedField = '';
  let index = 0;

  while (index <= FIELD_LENGTH) {
    updatedField += updateFieldContent(field, playerInput, mineFound, index);
    index += 1;
  }

  return updatedField;
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

  return mineFound ? 'Oops! Blasted 💥 ' : 'Congrats on finding all 💎!';
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
