const path = require('path');
const { rm, writeFile, appendFile, readFile, mkdir, readdir, copyFile } = require('fs/promises');

const buildFolderPath = path.join(__dirname, 'project-dist');

const templateHtmlFilePath = path.join(__dirname, 'template.html');
const indexHtmlFilePath = path.join(buildFolderPath, 'index.html');

const assetsSourceFolderPath = path.join(__dirname, 'assets');
const assetsCopyFolderPath = path.join(buildFolderPath, 'assets');

const stylesSourceFolderPath = path.join(__dirname, 'styles');

const componentsFolderPath = path.join(__dirname, 'components');

const createNewFolder = async (path) => {
  await mkdir(path, { recursive: true });
  await rm(path, { recursive: true });
  await mkdir(path, { recursive: true });
};

const copyDir = async (sourcePath, distPath) => {
  await mkdir(distPath, { recursive: true });
  await rm(distPath, { recursive: true });
  await mkdir(distPath, { recursive: true });

  const files = await readdir(sourcePath, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile(file)) {
      const filePath = path.join(sourcePath, file.name);
      const copyFilePath = path.join(distPath, file.name);

      await copyFile(filePath, copyFilePath);
    } else {
      const subSourceFolderPath = path.join(sourcePath, file.name);
      const subCopyFolderPath = path.join(distPath, file.name);

      copyDir(subSourceFolderPath, subCopyFolderPath);
    }
  }
};

const createBundle = async (sourcePath, distPath) => {
  const bundleFilePath = path.join(distPath, 'style.css');

  await writeFile(bundleFilePath, '');
  await rm(bundleFilePath, { recursive: true });

  const files = await readdir(sourcePath, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile(file)) {
      const filePath = path.join(sourcePath, file.name);
      const fileExt = path.parse(filePath).ext;

      if (fileExt === '.css') {
        const data = await readFile(filePath, 'utf-8');

        await appendFile(bundleFilePath, `${data}\n\n`);
      }
    }
  }
};

const mountComponents = async () => {
  let html = await readFile(indexHtmlFilePath, 'utf-8');
  const components = await readdir(componentsFolderPath, { withFileTypes: true });

  for (const component of components) {
    if (component.isFile(component)) {
      const componentPath = path.join(componentsFolderPath, component.name);
      const componentName = path.parse(componentPath).name;
      const componentExt = path.parse(componentPath).ext;

      if (componentExt === '.html') {
        const componentHtml = await readFile(componentPath, 'utf-8');
        const regexp = new RegExp(`{{${componentName}}}`);

        if (html.match(regexp)) {
          html = html.replace(regexp, componentHtml);
        }
      }
    }
  }

  await writeFile(indexHtmlFilePath, html);
};

const buildPage = async () => {
  await createNewFolder(buildFolderPath);
  await copyFile(templateHtmlFilePath, indexHtmlFilePath);
  await copyDir(assetsSourceFolderPath, assetsCopyFolderPath);
  await createBundle(stylesSourceFolderPath, buildFolderPath);
  await mountComponents();
};

buildPage();
