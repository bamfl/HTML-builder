const path = require('path');
const { rm, mkdir, readdir, copyFile } = require('fs/promises');

const sourceFolderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

mkdir(copyFolderPath, { recursive: true });

const copyDir = async () => {
  await rm(copyFolderPath, { recursive: true });

  await mkdir(copyFolderPath, { recursive: true });

  const files = await readdir(sourceFolderPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(sourceFolderPath, file.name);
    const copyFilePath = path.join(copyFolderPath, file.name);

    await copyFile(filePath, copyFilePath);
  }
};

copyDir();
