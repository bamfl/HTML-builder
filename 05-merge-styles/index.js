const path = require('path');
const { rm, writeFile, readFile, appendFile, readdir } = require('fs/promises');

const sourceFolderPath = path.join(__dirname, 'styles');
const distFolderPath = path.join(__dirname, 'project-dist');
const bundleFilePath = path.join(distFolderPath, 'bundle.css');


const createBundle = async () => {
	await writeFile(bundleFilePath, '');
  await rm(bundleFilePath, { recursive: true });

  const files = await readdir(sourceFolderPath, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile(file)) {
      const filePath = path.join(sourceFolderPath, file.name);
      const fileExt = path.parse(filePath).ext;

      if (fileExt === '.css') {
        const data = await readFile(filePath, 'utf-8');

        await appendFile(bundleFilePath, `${data}\n\n`);
      }
    }
  }
};

createBundle();
