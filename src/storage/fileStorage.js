const fs = require('fs/promises');
const path = require('path');

const storagePath = path.join(__dirname, 'json');

const readData = async (fileName) => {
  const filePath = path.join(storagePath, `${fileName}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeData(fileName, []);
      return [];
    }
    throw new Error(`Failed to read ${fileName}.json: ${err.message}`);
  }
};

const writeData = async (fileName, data) => {
  const filePath = path.join(storagePath, `${fileName}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

const appendData = async (fileName, item) => {
  const data = await readData(fileName);
  data.push(item);
  await writeData(fileName, data);
  return item;
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
};

module.exports = {
  readData,
  writeData,
  appendData,
  generateId,
};
