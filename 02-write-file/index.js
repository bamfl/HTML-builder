const { stdin: input, stdout: output } = require('process');

const readline = require('readline');
const rl = readline.createInterface({ input, output });

const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');
let writeStream = fs.createWriteStream(filePath);

rl.on('SIGINT', () => {
  console.log('Exit from process');
  rl.close();
});

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Exit from process');
    rl.close();
  } else {
    fs.readFile(filePath, 'UTF-8', (error, text) => {
      writeStream = fs.createWriteStream(filePath);
      writeStream.write(`${text}${input}`);
    });
  }
});

rl.question('Please, enter the text: \n', (answer) => {
  if (answer === 'exit') {
    console.log('Exit from process');
    rl.close();
  } else {
    fs.readFile(filePath, 'UTF-8', (error, text) => {
      writeStream = fs.createWriteStream(filePath);
      writeStream.write(`${text}${answer}`);
    });
  }
});
