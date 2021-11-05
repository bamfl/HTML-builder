const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

const readDir = async () => {
  const files = await readdir(folderPath, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile(file)) {
      const filePath = path.join(folderPath, file.name);
      const fileInfo = path.parse(filePath);

      const fileName = fileInfo.name;
      const fileExt = fileInfo.ext.slice(1);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          throw new Error(err);
        }

        const fileSize = stats.size / 1000;

        console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
      });
    }
  }
};

readDir();
