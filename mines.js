const MINE_ONE = Math.floor((Math.random()) * 10);
const MINE_TWO = Math.floor((Math.random()) * 10);
const FIELD_LENGTH = 40;

function takePlayerInput() {
  return prompt('Cell number:');
}

function createHeaderContents(index) {
  return index % 4 === 0 ? '┳' : '━';
}

function createHeader() {
  let header = '┏';
  for (let index = 1; index < FIELD_LENGTH; index++) {
    header += createHeaderContents(index);
  }

  return header + '┓';
}

function createFooterContents(index) {
  return index % 4 === 0 ? '┻' : '━';
}

function createFooter() {
  let footer = '┗';

  for (let index = 1; index < FIELD_LENGTH; index++) {
    footer += createFooterContents(index);
  }

  return footer + '┛';
}

function createField() {
  let field = '';

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
  let updatedField = '';

  for (let index = 0; index <= FIELD_LENGTH; index++) {
    updatedField += createResultContents(field, index);
  }

  return createHeader() + '\n' + updatedField + '\n' + createFooter();
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
    field = updateField(field, playerInput, mineFound);
    const message = createHeader() + '\n' + field + '\n' + createFooter();
    console.log(message);
    
    if (isInputNew(userInput, playerInput)){
      userInput += playerInput;
      noOfDiamonds += 1;
    }
  }

  const finalMsg = mineFound ? 'Oops! Blasted💥' : 'Congrats on finding all💎';
  console.log(finalMsg + '\n' + createResult(field));
}

function main() {
  const mineFound = false;
  const headerOne = 'Find all 💎 in the field to win!';
  const headerTwo = ' But dont let the 💣 find u first!';
  const noOfDiamonds = 0;
  const field = createField();

  let initialInstruction = headerOne + headerTwo + '\n';
  initialInstruction += createHeader() + '\n';
  initialInstruction += field + '\n';
  initialInstruction += createFooter();

  console.log(initialInstruction);

  runGame(mineFound, noOfDiamonds, field);
}

main();
