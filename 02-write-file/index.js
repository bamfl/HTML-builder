const process = require('process');
const { stdin: input, stdout: output } = process;

const readline = require('readline');
const rl = readline.createInterface({ input, output });

const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'write-text.txt');
const readStream = fs.createReadStream(filePath);
const writeStream = fs.createWriteStream(filePath);

rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      rl.close();
    }
  });
});

rl.on('line', (input) => {
  readStream.on('data', (chunk) => {
    writeStream.write(chunk);
    writeStream.write(input);
  });
});

rl.question('Please, enter the text: \n', (answer1) => {
  writeStream.write(`${answer1} \n`);
});
