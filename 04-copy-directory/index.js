const path = require('path');
const { rm, mkdir, readdir, copyFile } = require('fs/promises');

const sourceFolderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

const copyDir = async (sourcePath, distPath) => {
  await mkdir(distPath, { recursive: true });
  await rm(distPath, { recursive: true });
  await mkdir(distPath, { recursive: true });

  const files = await readdir(sourcePath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(sourcePath, file.name);
    const copyFilePath = path.join(distPath, file.name);

    await copyFile(filePath, copyFilePath);
  }
};

copyDir(sourceFolderPath, copyFolderPath);
