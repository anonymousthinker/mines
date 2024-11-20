const MINE_ONE = Math.floor((Math.random()) * 10);
const MINE_TWO = Math.floor((Math.random()) * 10);
const FIELD_LENGTH = 40;

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
    return mineFound ? '⌖' : '♦';
  }

  return field[index];
}

function updateField(field, playerInput, mineFound) {
  let updatedField = '';

  for (let index = 0; index <= FIELD_LENGTH; index++) {
    updatedField += updateFieldContent(field, playerInput, mineFound, index);
  }

  return updatedField;
}

function createResultContents(field, index) {
  const indexAtMine = index === MINE_ONE * 4 + 2 || index === MINE_TWO * 4 + 2;
  return indexAtMine ? '⌖' : field[index];
}

function createResult(field) {
  console.log(createHeader('┏'));
  let updatedResult = '';

  for (let index = 0; index <= FIELD_LENGTH; index++) {
    updatedResult += createResultContents(field, index);
  }

  console.log(updatedResult);
  console.log(createFooter('┗'));
}

function isInputNew(userInput, playerInput) {
  for (let index = 0; index < userInput.length; index++) {
    if (userInput[index] === '' + playerInput) {
      return false;
    }
  }
  
  return true;
}

function runGame(mineFound, noOfDiamonds, field) {
  let userInput = '';

  while (!mineFound && noOfDiamonds < 8) {
    const playerInput = +takePlayerInput();
    mineFound = playerInput === MINE_ONE || playerInput === MINE_TWO;

    console.log(createHeader('┏'));
    field = updateField(field, playerInput, mineFound);
    console.log(field);
    console.log(createFooter('┗'));
    
    if (isInputNew(userInput, playerInput)){
      userInput += playerInput;
      noOfDiamonds += 1;
    }
  }

  const finalMsg = mineFound ? 'Oops! Blasted💥' : 'Congrats on finding all💎';
  console.log(finalMsg);
  createResult(field);
}

function main() {
  const mineFound = false;
  const headerOne = 'Find all 💎 in the field to win!';
  const headerTwo = ' But dont let the 💣 find u first!\n┏';
  const noOfDiamonds = 0;
  const field = createField('');
  console.log(createHeader(headerOne + headerTwo));
  console.log(field);
  console.log(createFooter('┗'));

  runGame(mineFound, noOfDiamonds, field);
}

main();
